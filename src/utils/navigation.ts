import { createSearchParams, history } from '@umijs/max';

/**
 * 根据查询参数 redirect 重定向到指定路径。
 *
 * 该函数用于解析当前URL的查询参数，根据指定的参数键值进行重定向。
 * 如果查询参数中不存在指定的键，或者键对应的值为空，则会重定向到默认的 / 路径。
 *
 * @param parameterKey 查询参数中的键名，默认为 redirect。
 * @param options 配置对象，包含默认路径，默认路径为'/'。
 */
export const redirectBasedOnQueryParam = (
  parameterKey: string = 'redirect',
  options: Utils.RedirectBasedOnQueryParamOptions = { defaultPath: '/' },
) => {
  const searchParams = createSearchParams(window.location.search);
  const redirectUrl = searchParams.get(parameterKey) || options.defaultPath;
  history.replace(redirectUrl);
};
