import { terminal, useRouteProps } from '@umijs/max';
const HelmetAPI = () => {
  terminal.log('i am log level');
  terminal.warn('i am warn level');
  terminal.error('i am error level');
  const routeProps = useRouteProps();
  console.log(routeProps);
  return (
    <div>
      <div>terminal 控制台打印</div>
    </div>
  );
};

export default HelmetAPI;
