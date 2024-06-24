import { Helmet } from '@umijs/max';
// Helmet API 作用是：在页面中动态配置 head 中的标签，例如 title
const HelmetAPI = () => {
  return (
    <div>
      <Helmet>
        <title>Hello UmiJS</title>
      </Helmet>
      <div>Helmet API</div>
    </div>
  );
};

export default HelmetAPI;
