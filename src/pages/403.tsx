import { useNavigate } from '@umijs/max';
import { Button, Result } from 'antd';
const NoAccess: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权访问这个页面。"
      extra={
        <Button type="primary" onClick={handleClick}>
          回到首页
        </Button>
      }
    />
  );
};

export default NoAccess;
