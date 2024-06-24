import { useResolvedPath } from '@umijs/max';
// Helmet API 作用是：在页面中动态配置 head 中的标签，例如 title
const UseResolvedPathAPI = () => {
  // umijs中所有的相对路径都必须以./开头
  const path = useResolvedPath('./../docs');
  console.log(path); // {pathname: '/docs', search: '', hash: '', state: undefined, key: ''}
  console.log(path);
  return <div>Helmet API</div>;
};

export default UseResolvedPathAPI;
