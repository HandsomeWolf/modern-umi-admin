import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
  subTitle?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  footerRender: false,
  colorWeak: false,
  title: 'Umi Antd Admin', // product name, By default, the name value of the package.json file is used
  subTitle: 'Simplify management and drive business growth',
  splitMenus: false,
  pwa: true,
  logo: '/images/logo.png',
  iconfontUrl: '',
  token: {
    // Modify antd style through token
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
