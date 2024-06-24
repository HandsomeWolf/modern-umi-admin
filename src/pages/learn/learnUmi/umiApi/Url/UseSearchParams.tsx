import { createSearchParams, useSearchParams } from '@umijs/max';
import { useEffect } from 'react';
// Helmet API 作用是：在页面中动态配置 head 中的标签，例如 title
const UseSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams(createSearchParams({ a: '1', b: '2' }).toString());
  }, []);

  useEffect(() => {
    console.log(searchParams.toString());
  }, [searchParams]);
  return (
    <div>
      UseSearchParams:{typeof searchParams} {searchParams.toString()}
    </div>
  );
};

export default UseSearchParams;
