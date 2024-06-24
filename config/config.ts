import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @description 要在非根目录下部署 umi 项目时，你可以使用 base 配置。
   */
  base: '/',

  publicPath: '/',

  /**
   * @description 要设置路由 history 类型。类型：{ type: 'browser' | 'hash' | 'memory' }
   */
  history: { type: 'browser' },

  /**
   * 在 umi 配置文件设置，开启 icons 功能，并允许自动安装图标库。
   * 本地 svg icon 的使用需要把 svg 保存在 src/icons 目录下，然后通过 local 这个前缀引用
   * 图标集网站：https://icones.js.org/
   */
  icons: { autoInstall: {} },

  /**
   * @description 开启 hash 模式。让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  favicons: ['/images/favicon.png'],

  /**
   * @description 兼容性设置。设置 ie11 不一定完美兼容，需要检查自己使用的所有依赖
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },

  /**
   * @description 路由的配置，不在路由中引入的文件不会编译。只支持 path，component，routes，redirect，wrappers，title 的配置
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,

  /**
   * @description 主题的配置。其实只是 less 的变量设置
   * @doc antd的主题设置 https://ant.design/docs/react/customize-theme-cn
   * @doc umi 的theme 配置 https://umijs.org/docs/api/config#theme
   */
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
  },

  /**
   * @description 的国际化配置。如果对国际化没有要求，打开之后能减少js的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,

  /**
   * @description 可以让你的本地服务器代理到你的服务器上，这样你就可以访问服务器的数据了
   * @see 要注意以下 代理只能在本地开发时使用，build 之后就无法使用了。
   * @doc 代理介绍 https://umijs.org/docs/guides/proxy
   * @doc 代理配置 https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

  /**
   * @description 快速热更新配置。一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,

  // alias: {
  //   '@': require.resolve('/src'),
  // },

  clickToComponent: { editor: 'intellij' },

  /**
   * 开启路由数据预加载
   * @doc https://umijs.org/docs/guides/client-loader
   * @doc https://umijs.org/docs/api/config#clientloader
   */
  clientLoader: {},

  /**
   * bigVendors 是大 vendors 方案，会将 async chunk 里的 node_modules 下的文件打包到一起，可以避免重复。同时缺点是，1）单文件的尺寸过大，2）毫无缓存效率可言。
   * depPerChunk 和 bigVendors 类似，不同的是把依赖按 package name + version 进行拆分，算是解了 bigVendors 的尺寸和缓存效率问题。但同时带来的潜在问题是，可能导致请求较多。我的理解是，对于非大型项目来说其实还好，因为，1）单个页面的请求不会包含非常多的依赖，2）基于 HTTP/2，几十个请求不算问题。但是，对于大型项目或巨型项目来说，需要考虑更合适的方案。
   * granularChunks 在 bigVendors 和 depPerChunk 之间取了中间值，同时又能在缓存效率上有更好的利用。无特殊场景，建议用 granularChunks 策略。
   */
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },

  /**
   * @description antd 插件。内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {
    import: false,
  },

  /**
   * @name
   * @description 权限插件。基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},

  /**
   * @name
   * @description 数据流插件。
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},

  /**
   * @description 一个全局的初始数据流，可以用它在插件之间共享数据。可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},

  /**
   * @description 网络请求配置。它基于 axios 和 aHooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},

  /**
   * 配置额外的 link 标签。
   * 示例：links: [{ href: '/foo.css', rel: 'preload' }],
   */
  // links: [],

  /**
   * @description 配置 <head> 中额外的 script
   */
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
  ],

  /**
   * 配置 <body> 中额外的 script 标签。
   */
  // scripts: [`alert(1);`, `https://a.com/b.js`,{ src: '/foo.js', defer: true }],

  /**
   * @description 配置 mock 功能。让所有 pages 下的 _mock.ts 文件成为 mock 文件
   */
  // mock: {
  //   include: ['mock/**/*', 'src/pages/**/_mock.ts'],
  // },
  mock: false,

  /**
   * @docs https://umijs.org/docs/api/config#mfsu
   */
  mfsu: {
    // esbuild: true,
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,

  /**
   * @name layout 插件
   * @doc https://umijs.org/docs/max/layout-menu
   */
  /**
   * @description 配置全局页面 title，暂时只支持静态的 Title。
   */
  title: 'pixiu-umi-admin',
  layout: {
    // Enable by default, menu internationalization
    locale: false,
    ...defaultSettings,
  },
  npmClient: 'pnpm',
});
