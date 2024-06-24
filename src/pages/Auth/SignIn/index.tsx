import { ActionIcons } from '@/pages/auth/SignIn/components/ActionIcons';
import { SignInStatusAlert } from '@/pages/auth/SignIn/components/SignInStatusAlert';
import { useStyles } from '@/pages/auth/SignIn/index.style';
import { getUserInfo, postSignIn } from '@/services/auth/auth.api';
import storage from '@/utils/localStorage';
import { redirectBasedOnQueryParam } from '@/utils/navigation';
import { Helmet, useModel } from '@@/exports';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Tabs, message, theme } from 'antd';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const SignIn = () => {
  const { styles } = useStyles();
  // record the error message returned by the server
  const [errorMessageState, setErrorMessageState] = useState<string>();
  // record the sign in type, account or phone
  const [signInType, setSignInType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');

  const { token } = theme.useToken();

  const handleSubmit = async (values: API.PostSignInRequest) => {
    setErrorMessageState(undefined);

    const { success, data, errorMessage } = await postSignIn(values);

    if (!success) {
      setErrorMessageState(errorMessage);
      return;
    }

    storage.set('token', data);

    const { data: userInfo } = await getUserInfo();

    flushSync(() => {
      setInitialState((s) => ({
        ...s,
        userInfo,
      }));
    });

    // redirect to home page
    redirectBasedOnQueryParam();
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>登录 - {Settings.title}</title>
      </Helmet>
      <div className={styles.signIn}>
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/images/logo.png" />}
          title={Settings.title}
          subTitle={Settings.subTitle}
          initialValues={{
            username: 'admin',
            password: '123456',
            autoSignIn: true,
          }}
          actions={<ActionIcons key="icons" />}
          onFinish={handleSubmit}
        >
          <Tabs
            centered
            activeKey={signInType}
            onChange={setSignInType}
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'phone',
                label: '手机号登录',
              },
            ]}
          />
          {errorMessageState && signInType === 'account' && (
            <SignInStatusAlert content={errorMessageState} />
          )}
          {signInType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  autoComplete: 'new-password',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  autoComplete: 'new-password',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                  strengthText:
                    '密码应包含数字、字母和特殊字符，长度至少为8个字符',
                  statusRender: (value) => {
                    const getStatus = () => {
                      if (value && value.length > 12) {
                        return 'ok';
                      }
                      if (value && value.length > 6) {
                        return 'pass';
                      }
                      return 'poor';
                    };
                    const status = getStatus();
                    if (status === 'pass') {
                      return (
                        <div style={{ color: token.colorWarning }}>
                          强度：中
                        </div>
                      );
                    }
                    if (status === 'ok') {
                      return (
                        <div style={{ color: token.colorSuccess }}>
                          强度：强
                        </div>
                      );
                    }
                    return (
                      <div style={{ color: token.colorError }}>强度：弱</div>
                    );
                  },
                }}
                placeholder={'密码: ant.design'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}
          {signInType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default SignIn;
