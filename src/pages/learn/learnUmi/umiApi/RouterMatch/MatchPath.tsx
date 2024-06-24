import { matchPath } from '@umijs/max';

// matchPath API 可以将给定的路径以及一个已知的路由格式进行匹配，并且返回匹配结果。
const MatchPathAPI = () => {
  const match = matchPath({ path: '/users/:id' }, '/users/123');
  console.log(match);
  // {
  //   "params": { "id": "123" },
  //   "pathname": "/users/123",
  //   "pathnameBase": "/users/123",
  //   "pattern": { "path": "/users/:id" }
  // }
};

export default MatchPathAPI;
