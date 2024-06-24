import { history } from '@umijs/max';
import { Button, Result } from 'antd';
const NoFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您无权访问这个页面。"
      extra={
        <Button type="primary" onClick={() => history.replace('/')}>
          回到首页
        </Button>
      }
    />
  );
};

export default NoFoundPage;
