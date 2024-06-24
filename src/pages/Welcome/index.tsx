import { useBreakpoint } from '@ant-design/pro-components';
import { useEffect } from 'react';
import Styles from './Welcome.module.less';

const Welcome = () => {
  const test0 = useBreakpoint();

  useEffect(() => {
    console.log(test0);
  }, [test0]);

  return (
    <div className={`container-background ${Styles.welcome}`}>
      <h1 className={Styles.welcomeTitle}>React Admin</h1>
    </div>
  );
};

export default Welcome;
