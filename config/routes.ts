/**
 * route configuration for Umi
 * @doc https://umijs.org/docs/guides/routes
 */
// Extending routes
// export const routes: IBestAFSRoute[] = [
//   {
//     path: '/welcome',
//     component: 'IndexPage',
//     name: '欢迎', // 兼容此写法
//     icon: 'testicon',
//     // 更多功能查看
//     // https://beta-pro.ant.design/docs/advanced-menu
//     // ---
//     // 新页面打开
//     target: '_blank',
//     // 不展示顶栏
//     headerRender: false,
//     // 不展示页脚
//     footerRender: false,
//     // 不展示菜单
//     menuRender: false,
//     // 不展示菜单顶栏
//     menuHeaderRender: false,
//     // 权限配置，需要与 plugin-access 插件配合使用
//     access: 'canRead',
//     // 隐藏子菜单
//     hideChildrenInMenu: true,
//     // 隐藏自己和子菜单
//     hideInMenu: true,
//     // 在面包屑中隐藏
//     hideInBreadcrumb: true,
//     // 子项往上提，仍旧展示,
//     flatMenu: true,
//   },
// ];
const learnUmiRoutes = [
  {
    path: '/learn-umi',
    name: 'learn-umi',
    icon: 'smile',
    routes: [
      {
        path: '/learn-umi/svg-icons',
        component: '@/pages/learn/learnUmi/SvgIcons',
      },
      {
        path: '/learn-umi/run-time',
        component: '@/pages/learn/learnUmi/RunTime',
      },
    ],
  },
];
const learnAntDStyleRoutes = [
  {
    path: '/learn/antd-style',
    component: '@/pages/learn/AntdStyle',
  },
];

const errorRoutes = [
  {
    path: '/500',
    // layout: false,
    component: '@/pages/error/500',
  },
  {
    path: '/custom-error',
    // layout: false,
    component: '@/pages/error/CustomError',
  },
  {
    path: '/403',
    // layout: false,
    component: '@/pages/error/403',
  },
  {
    path: '*',
    // layout: false,
    component: '@/pages/error/404',
  },
];

export const routes = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    component: './Welcome',
  },
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        path: '/auth',
        redirect: '/auth/sign-in',
      },
      {
        path: '/auth/sign-in',
        component: './auth/SignIn',
      },
    ],
  },
  {
    // path: '/setting',
    routes: [
      {
        path: '/setting/user',
        component: '@/pages/setting/UserManagement',
      },
      {
        path: '/setting/menu',
        component: '@/pages/setting/MenuManagement',
      },
    ],
  },
  ...learnUmiRoutes,
  ...learnAntDStyleRoutes,
];
export default [...routes, ...errorRoutes];
