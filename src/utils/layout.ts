import { PAGINATION } from '@/constants';
import { TablePaginationConfig } from 'antd';

export const generatePaginationConfig = (
  isMobile: boolean,
): TablePaginationConfig => ({
  ...(isMobile ? { showTotal: undefined, simple: true } : {}),
  showSizeChanger: true,
  showQuickJumper: true,
  defaultCurrent: PAGINATION.current,
  defaultPageSize: PAGINATION.pageSize,
  position: isMobile ? ['bottomCenter'] : ['bottomRight'],
});
