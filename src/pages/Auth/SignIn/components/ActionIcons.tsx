import { useStyles } from '@/pages/auth/SignIn/index.style';
import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
export const ActionIcons = () => {
  const { styles } = useStyles();
  return (
    <Space>
      其它登录方式
      <AlipayCircleOutlined
        key="AlipayCircleOutlined"
        className={styles.action}
      />
      <TaobaoCircleOutlined
        key="TaobaoCircleOutlined"
        className={styles.action}
      />
      <WeiboCircleOutlined
        key="WeiboCircleOutlined"
        className={styles.action}
      />
    </Space>
  );
};
