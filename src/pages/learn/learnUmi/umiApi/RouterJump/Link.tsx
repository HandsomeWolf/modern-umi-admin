import { Link } from '@umijs/max';

// 跳转到外部请使用 a 标签
const LinkAPI = () => {
  return (
    <div>
      <Link
        to="/learn/learn-umi/umi-api/helmet"
        // prefetch // 将鼠标放到该组件上方时，Umi 就会自动开始进行跳转路由的组件 js 文件和数据预加载。
        // replace // 替换当前
        // reloadDocument // 不做路由跳转，等同于 <a href> 的跳转行为。
        // state={{ a: 1, b: 2 }}
      >
        内部跳转
      </Link>
    </div>
  );
};

export default LinkAPI;
