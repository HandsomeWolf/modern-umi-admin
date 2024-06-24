import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const HomePage = () => {
  const [count, setCount] = useState(1);
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        哈哈我是
        {count}
        <Button onClick={() => setCount(count + 10)}>+</Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
