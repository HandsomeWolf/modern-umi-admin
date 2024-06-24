import { useResponsive } from 'ahooks';
import { useMemo } from 'react';

const useIsMobile = () => {
  const colSizes = useResponsive();
  return useMemo(() => {
    return !colSizes.sm;
  }, [colSizes]);
};

export default useIsMobile;
