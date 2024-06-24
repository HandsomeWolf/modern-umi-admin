declare namespace API {
  type UserParameters = API.PaginatedParameters & {
    [key: string]: any;
  };
  type UserItem = {
    id: number;
    avatar: string;
    username: string;
    nickname: string;
    email: string;
    mobile: string;
    createdAt: string;
    roleIds: number[];
    roleNames: string[];
    remark: string;
    status: number;
    type: number;
    sortOrder: number;
    gender: number;
  };
}
