import { matchRoutes } from '@umijs/max';

// matchRoutes 可以将给定的路径以及多个可能的路由选择进行匹配，并且返回匹配结果。
const MatchRoutesAPI = () => {
  const match = matchRoutes(
    [
      {
        path: '/users/:id',
      },
      {
        path: '/users/:id/posts/:postId',
      },
    ],
    '/users/123/posts/456',
  );
  console.log(match);
  // [
  //  {
  //    "params": {
  //      "id": "123",
  //       "postId": "456"
  //     },
  //     "pathname": "/users/123/posts/456",
  //     "pathnameBase": "/users/123/posts/456",
  //     "route": {
  //       "path": "/users/:id/posts/:postId"
  //     }
  //   }
  // ]
};

export default MatchRoutesAPI;
