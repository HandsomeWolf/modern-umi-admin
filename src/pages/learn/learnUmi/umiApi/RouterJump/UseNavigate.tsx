import { useLocation, useNavigate } from '@umijs/max';
import { useEffect, useState } from 'react';

// 使用 history.push 或 history.replace 跳转路由时，会触发 onStateChange 回调，可以在 onStateChange 回调中获取到 state
const UseNavigate = () => {
  const [state] = useState({ a: 1, b: 2 });
  const navigate = useNavigate();
  // 建议组件或 hooks 里用 useLocation 取传递过来的 state
  const location = useLocation();

  // 监听路由变化，当使用navigate路由跳转时，参数为state。

  useEffect(() => {
    // 监听 location 变化
    console.log('Location changed:', location);

    // 获取传递的 state
    if (location.state) {
      console.log('State:', location.state);
    }
  }, [location]);

  useEffect(() => {
    // 跳转到指定路由
    // navigate('/');

    // 跳转当前路径，并刷新 state，这里 {} 为当前路径
    navigate(location.pathname, {
      replace: true,
      state: {
        c: 3,
        d: 4,
      },
    });

    // // 跳转到上一个路由
    // navigate(-1)
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export default UseNavigate;
