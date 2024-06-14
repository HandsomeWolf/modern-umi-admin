import { useNavigate } from '@umijs/max';
import { Button, Result } from 'antd';
const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在。"
      extra={
        <Button type="primary" onClick={handleClick}>
          回到首页
        </Button>
      }
    />
  );
};

export default NotFound;
