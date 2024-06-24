import { generatePath } from '@umijs/max';

// generatePath API 的作用是：根据指定的路径模板和参数对象，生成一个完整的路径字符串。

const generatePathAPI = () => {
  console.log(generatePath('/users/:id', { id: '42' })); // "/users/42"

  console.log(
    generatePath('/files/:type/*', {
      type: 'img',
      '*': 'cat.jpg',
    }),
  ); // "/files/img/cat.jpg"

  console.log(generatePath('/users/:id/:name', { id: '42', name: 'jane' })); // "/users/42/jane"

  // console.log(generatePath('/users/:id/:name', { id: '42' })); // 报错 Error: Missing ":name" param
  // "/users/42/:name"

  return <div>generatePath</div>;
};

export default generatePathAPI;
