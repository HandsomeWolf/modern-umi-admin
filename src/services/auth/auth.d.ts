declare namespace API {
  import type { MenuDataItem } from '@ant-design/pro-components';
  // 登录请求参数类型
  type PostSignInRequest = {
    username: string;
    password: string;
    autoSignIn?: boolean;
  };
  // 登录响应结果类型
  type PostSignInResponse = Omit<API.ResponseResultType, 'data'> & {
    data: string;
  };
  // 获取用户菜单、权限响应参数类型
  type GetUserMenuWithPermissionResponse = Omit<
    API.ResponseResultType,
    'data'
  > & {
    authorizedMenuItems: MenuDataItem[];
    authorizedButtons: string[];
  };
  // 菜单项类型
  type MenuItem = {
    id: number;
    name: string;
    path: string;
    component: string;
    meta: MenuMeta;
    children?: MenuItem[];
  };
  // 菜单项元数组
  type MenuMeta = {
    query: string;
    guard: string;
    icon: boolean;
    noClosable: boolean;
    hidden: boolean;
    activeMenu: string;
    dot: boolean;
    badge: string;
    isFrame: boolean;
    isCache: boolean;
  };
  // 当前用户信息
  type GetUserInfoResponse = {
    userId: number;
    username: string;
    createdAt: string;
    roleIds: number[];
    roleNames: string[];
    nickname: string;
    avatar: string;
    email: string;
    phone: string;
  };
}
