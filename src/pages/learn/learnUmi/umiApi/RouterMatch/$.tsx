import { terminal } from '@@/core/terminal';
import { history, useMatch, useParams } from '@umijs/max';
import { useEffect } from 'react';
// http://localhost:8000/learn/learn-umi/router/1/2,3,4,5
// 访问路径 /1/2,3,4,5 被解析为 { bar: '1', '*': '2,3,4,5' }
const LearnUmi = () => {
  const { bar, '*': wildcardPath } = useParams();
  const match = useMatch('/learn/learn-umi/router/:bar/:any');
  console.log(match); // 若路径不匹配，不管是多还是少都返回 null
  console.log(match?.pathname, match?.params.bar, match?.params.any);

  useEffect(() => {
    if (!match) {
      console.log(wildcardPath);
      terminal.warn('路径不匹配');
      history.push('/404');
    }
  }, []);

  if (!match) {
    return null;
  }

  return (
    <div>
      <h1>学习UmiJS</h1>
      <p>Bar: {bar}</p>
      <p>Wildcard Path: {wildcardPath}</p>
    </div>
  );
};
export default LearnUmi;
