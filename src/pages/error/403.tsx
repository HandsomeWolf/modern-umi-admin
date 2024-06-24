import { history } from '@@/core/history';
import { Button, Result } from 'antd';
const NoAccessPage: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问这个页面。"
      extra={
        <Button type="primary" onClick={() => history.replace('/')}>
          回到首页
        </Button>
      }
    />
  );
};

export default NoAccessPage;
