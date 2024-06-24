import { setAlpha } from '@ant-design/pro-components';
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css }) => ({
  action: css`
    margin-inline-start: 16px;
    color: ${setAlpha(token.colorTextBase, 0.2)};
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: ${token.colorPrimaryActive};
    }
  `,
  container: css`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-image: url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr');
    background-size: 100% 100%;
  `,
  signIn: css`
    flex: 1;
    padding: 32px 0;
  `,
}));
