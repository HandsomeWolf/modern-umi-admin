import { createSearchParams, useLocation } from '@umijs/max';

// createSearchParams API 的作用是：创建一个 URLSearchParams 对象，用于操作 URL 的查询参数。
// 并且可以使用history.push(`/user/profile?${params}`)跳转到指定页面

// https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/URLSearchParams
const CreateSearchParams = () => {
  const location = useLocation();
  // 可以是数组 返回：foo=1&bar=2
  console.log(
    createSearchParams([
      ['foo', '1'],
      ['bar', '2'],
    ]).toString(),
  );

  // 可以是对象，返回：foo=bar&qux=qoo
  console.log(createSearchParams({ foo: 'bar', qux: 'qoo' }).toString());

  // 可以从url中获取 http://localhost:8000/learn/learn-umi/umi-api/search-params?a=1&b=2 -> a=1&b=2
  console.log(createSearchParams(location.search).toString());

  // 更多操作
  const searchParams = createSearchParams({ foo: 'bar', qux: 'qoo' }); // 返回类型是URLSearchParams
  searchParams.delete('foo');
  searchParams.set('li', 'cong');
  console.log(searchParams.toString()); // qux=qoo

  // 封装 /user/profile?userId=123&showDetails=true
  function navigateToUserProfile(userId: string, showDetails: boolean) {
    const params = createSearchParams({
      userId,
      showDetails: showDetails.toString(),
    }).toString();

    console.log(`/user/profile?${params}`);
    // history.push(`/user/profile?${params}`); // 执行跳转
  }
  navigateToUserProfile('123', true);

  return <div>SearchParams</div>;
};

export default CreateSearchParams;
