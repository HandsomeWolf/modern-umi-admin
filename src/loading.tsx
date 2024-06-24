import { Flex, Spin } from 'antd';

// 全局加载组件。
// Umi 4 默认 按页分包 ，从而在页面切换时存在加载过程，通过该文件来配置加载动画。
const Loading: React.FC = () => {
  return (
    <Flex justify="center" align="center" className={'container'}>
      <Spin size="large" />
    </Flex>
  );
};

export default Loading;
