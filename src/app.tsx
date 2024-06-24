import {
  AvatarDropdown,
  AvatarName,
  Footer,
  Question,
} from '@/components/Layout';
import { PUBLIC_ROUTE_PATHS, SIGN_IN_ROUTE_PATH } from '@/constants';
import { getPermissions, getUserInfo } from '@/services/auth/auth.api';
import storage from '@/utils/localStorage';
import {
  checkPermission,
  fixMenuItemIcon,
  flattenMenuPaths,
} from '@/utils/menu';
import { errorConfig } from '@/utils/requestErrorConfig';
import { RunTimeLayoutConfig } from '@@/plugin-layout/types';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import { RequestConfig, history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';

export async function getInitialState(): Promise<{
  settings: Partial<LayoutSettings>;
  userInfo?: API.GetUserInfoResponse;
}> {
  const token = storage.get('token');
  if (token) {
    try {
      const { data: userInfo } = await getUserInfo();
      return {
        userInfo,
        settings: defaultSettings as Partial<LayoutSettings>,
      };
    } catch (e) {
      return {
        settings: defaultSettings as Partial<LayoutSettings>,
      };
    }
  } else {
    const { location } = history;
    if (!PUBLIC_ROUTE_PATHS.includes(location.pathname)) {
      history.replace(SIGN_IN_ROUTE_PATH);
    }
    return {
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
}

let permissions: API.GetUserMenuWithPermissionResponse;
const fetchPermissions = async () => {
  if (!permissions) {
    const { data } = await getPermissions();
    permissions = data;
  }
};

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    menu: {
      request: async () => {
        await fetchPermissions();
        return permissions.authorizedMenuItems;
      },
    },
    logout: () => {
      // TODO：sign out
      console.log('sign out');
    },
    menuDataRender: (menusData) => fixMenuItemIcon(menusData),
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.userInfo?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.userInfo?.nickname,
    },
    // rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    onPageChange: (location) => {
      if (
        !initialState?.userInfo &&
        location?.pathname !== SIGN_IN_ROUTE_PATH
      ) {
        history.replace(SIGN_IN_ROUTE_PATH);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    childrenRender: (children) => {
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                })).then();
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * Handles route changes to perform specific logic.
 *
 * This function is primarily used to guard against route changes. When a route change occurs, it checks if the user is
 * attempting to access the login page while already logged in. If so, it redirects the user to the home page to prevent
 * unnecessary access to the login page.
 *
 * @param {any} location - Contains information about the current route. Extracts the pathname to determine the current route.
 */
export const onRouteChange = async ({ location }: any) => {
  // Retrieve the token from storage to determine if the user is logged in.
  const token = storage.get('token');
  // Check if the user is trying to access the login page and is already logged in (token exists).
  if (SIGN_IN_ROUTE_PATH === location.pathname && token) {
    // If the conditions are met, redirect the user to the home page.
    history.replace('/');
    return;
  }
  if (token) {
    await fetchPermissions();
    const paths = flattenMenuPaths(permissions.authorizedMenuItems);

    const isPathInMenu =
      checkPermission(location.pathname, PUBLIC_ROUTE_PATHS) ||
      checkPermission(location.pathname, paths);

    if (!isPathInMenu) {
      return history.push('/403');
    }
  }
};

/**
 * @description It provides a unified network request and error handling solution based on useRequest of axios and ahooks.
 */
export const request: RequestConfig = {
  baseURL: 'http://localhost:3210/api/v1',
  ...errorConfig,
};
