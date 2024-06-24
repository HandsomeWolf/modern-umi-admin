import { request } from '@umijs/max';

export async function postSignIn(options?: API.PostSignInRequest) {
  return request<API.PostSignInResponse>('/auth/signIn', {
    method: 'POST',
    data: options,
    // SkipExceptionHandlerReturnThrowException: true,
    // ignoreExceptionHandlerNoThrowException: true,
  });
}
export async function getUserList(
  params: API.UserParameters,
  sort: any,
  filter: any,
) {
  console.log(sort);
  console.log(filter);
  return request<API.PaginatedResult<API.UserItem>>('/system/user', {
    method: 'GET',
    params,
  });
}

// // 创建用户
// export function createUser(params: CreateUserParameters) {
//   return api.post('/users/create', params);
// }
// // 创建用户
// export function editUser(params: EditUserParameters) {
//   return api.post('/users/edit', params);
// }
// // 删除和批量删除用户
// export function deleteUser(params: { userIds: number[] }) {
//   return api.post('/users/delete', params);
// }
