import { history, useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';

// 使用 history.push 或 history.replace 跳转路由时，会触发 onStateChange 回调，可以在 onStateChange 回调中获取到 state
const HistoryAPI = () => {
  const [state] = useState({ a: 1, b: 2 });

  // 建议组件或 hooks 里用 useLocation 取传递过来的 state
  const location = useLocation();
  console.log(location.state);

  // 监听路由变化，当使用history.push路由跳转时，第二个参数为state。
  // 在这里可以获取到state
  history.listen(({ location, action }) => {
    console.log(location, action);
  });

  useEffect(() => {
    // 跳转到指定路由
    // history.push('/');

    // 带参数跳转到指定路由
    // history.push('/list?a=b&c=d#anchor', state);

    // history.push(
    //   {
    //     pathname: '/list',
    //     search: '?a=b&c=d',
    //     hash: 'anchor',
    //   },
    //   {
    //     some: 'state-data', // state
    //   },
    // );

    // 跳转当前路径，并刷新 state，这里 {} 为当前路径
    history.push(
      {
        pathname: location.pathname,
      },
      { c: 3, d: 4 },
    );

    // // 跳转到上一个路由
    // history.back();
    // history.go(-1);
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export default HistoryAPI;
