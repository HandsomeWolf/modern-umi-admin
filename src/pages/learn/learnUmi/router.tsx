import { Outlet } from '@umijs/max';

export default function RouterWrapper() {
  return (
    <div>
      wrapper :
      <Outlet />
    </div>
  );
}
