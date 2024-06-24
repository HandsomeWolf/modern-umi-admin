/**
 * Error handling configuration module
 *
 * This module configures the logic for error handling, encompassing error capture, display methods, and special handling for specific errors.
 * It leverages Axios's error handling mechanism along with Ant Design's `message` and `notification` components to present error messages.
 * Additionally, it manages token expiration scenarios, guiding users to re-login.
 */
import { NO_TOKEN_APIS, SIGN_IN_ROUTE_PATH } from '@/constants';
import type {
  AxiosError,
  AxiosResponse,
  RequestConfig,
  RequestOptions,
} from '@umijs/max';
import { history } from '@umijs/max';
import { message, notification } from 'antd';
import storage from './localStorage';

// Defines types of error display
// Error Handling Scheme: Error Types
enum ErrorShowType {
  SILENT = 0, // Silent handling, no error message display
  WARN_MESSAGE = 1, // Display as a warning message
  ERROR_MESSAGE = 2, // Display as an error message
  NOTIFICATION = 3, // Display as a notification
  REDIRECT = 9, // Redirect to a specific path
}

// Response data format agreed with the backend
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * Configuration options interface
 *
 * Defines configuration options for the error handling module, including skipping exception handling to directly throw exceptions and ignoring exception handling not to throw exceptions.
 *
 * @doc https://umijs.org/docs/max/request#配置
 */
type IConfigOptions = {
  config: {
    SkipExceptionHandlerReturnThrowException?: boolean;
    ignoreExceptionHandlerNoThrowException?: boolean;
  };
};

let errorInfo: { name: string } & ResponseStructure; // Stores error information
let configOptions: IConfigOptions['config'] = {}; // Configuration options for error handling

export const errorConfig: RequestConfig = {
  timeout: 10000, // Request timeout duration

  errorConfig: {
    errorThrower: (res) => {
      errorInfo = {
        ...res,
        name: 'BizError', // Converts response info into error info, marking it as BizError type
      };
      if (!configOptions?.ignoreExceptionHandlerNoThrowException) {
        throw errorInfo; // Throws error info if exception handling is not to be ignored
      }
    },
    errorHandler: (error) => {
      const axiosError = error as AxiosError; // Casts error to AxiosError type
      // timeout error
      if (
        axiosError.code === 'ECONNABORTED' ||
        axiosError.code === 'ERR_NETWORK'
      ) {
        // storage.remove('token');
        history.push('/custom-error');
        return;
      }
      // Token missing error code is 401
      if (axiosError.response?.status === 401) {
        // On 401 error, removes token and redirects to login page
        storage.remove('token');
        history.push(SIGN_IN_ROUTE_PATH);
      }
      if (configOptions?.SkipExceptionHandlerReturnThrowException)
        throw errorInfo; // Throws error info if configured to skip exception handling and directly throw
      if (axiosError.name === 'BizError') {
        // For business errors
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          // Displays error message based on the display type
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              storage.clear();
              message.error(errorMessage);
              history.replace(SIGN_IN_ROUTE_PATH);
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (axiosError.name === 'TokenMissing') {
        // For token missing errors, shows error message and redirects to login
        message.error('Token expired, please log in again!');
      } else if (axiosError.response) {
        // If there is response data
        const data = axiosError.response.data as {
          errorMessage: string | string[];
        };
        const errorMessage = Array.isArray(data.errorMessage)
          ? data.errorMessage[0]
          : data.errorMessage;
        message.error(errorMessage); // Displays error message
      } else if (axiosError.request) {
        // If there is request data but no response
        message.error('No response, please try again!');
      } else {
        message.error('Request error, please try again!'); // For other error cases
      }
    },
  },

  requestInterceptors: [
    (config: RequestOptions) => {
      const token = storage.get('token'); // Retrieves token from local storage
      if (token) {
        config.headers!.Authorization = 'Bearer ' + token; // Sets Authorization header
        // config.headers['token'] = token
      } else if (!NO_TOKEN_APIS.includes(config.url!)) {
        // Redirects to login if no token and API doesn't require one
        history.replace(SIGN_IN_ROUTE_PATH);
        const error = new Error('Token is missing');
        error.name = 'TokenMissing';
        throw error;
      }

      return config; // Returns the configuration
    },
  ],

  responseInterceptors: [
    (response: AxiosResponse & IConfigOptions) => {
      // Updates configuration options
      configOptions.ignoreExceptionHandlerNoThrowException =
        response.config?.ignoreExceptionHandlerNoThrowException;
      configOptions.SkipExceptionHandlerReturnThrowException =
        response.config?.SkipExceptionHandlerReturnThrowException;

      return response; // Returns the response
    },
  ],
};
