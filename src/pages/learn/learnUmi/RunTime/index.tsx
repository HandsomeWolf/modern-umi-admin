import { useModel } from '@umijs/max';

const RunTime = () => {
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  console.log(initialState);
  console.log(loading);
  console.log(error);
  console.log(refresh);
  console.log(setInitialState);
  return <div>Run Time</div>;
};

export default RunTime;
