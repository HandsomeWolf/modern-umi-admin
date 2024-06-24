import { request } from '@umijs/max';

/**
 * 登录接口 POST
 * @param options
 */

export async function postSignIn(options?: API.PostSignInRequest) {
  return request<API.PostSignInResponse>('/auth/signIn', {
    method: 'POST',
    data: options,
    // SkipExceptionHandlerReturnThrowException: true,
    // ignoreExceptionHandlerNoThrowException: true,
  });
}
export async function getPermissions() {
  return request<{
    data: API.GetUserMenuWithPermissionResponse;
  }>('/auth/permissions', {
    method: 'GET',
  });
}
export async function getUserInfo() {
  return request<{
    data: API.GetUserInfoResponse;
  }>('/auth/userInfo', {
    method: 'GET',
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function postSignOut() {
  return request<Record<string, any>>('/auth/signOut', {
    method: 'POST',
  });
}

/** 登录接口 POST /api/login/account */
