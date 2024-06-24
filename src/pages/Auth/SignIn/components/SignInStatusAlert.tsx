import { Alert } from 'antd';

type SignInStatusAlertProps = {
  content: string;
};
export const SignInStatusAlert = ({ content }: SignInStatusAlertProps) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
