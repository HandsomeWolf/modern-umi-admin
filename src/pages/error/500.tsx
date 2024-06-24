import { history } from '@umijs/max';
import { Button, Result } from 'antd';
const ServerErrorPage = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="抱歉，出了一些问题。"
      extra={
        <Button type="primary" onClick={() => history.replace('/')}>
          回到首页
        </Button>
      }
    />
  );
};

export default ServerErrorPage;
