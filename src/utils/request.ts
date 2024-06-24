// 过滤掉值为空字符串的参数
export const filterEmptyParams = <T extends Record<string, any>>(
  params: T,
): Record<string, any> => {
  return Object.keys(params).reduce(
    (acc: Record<string, any>, key) => {
      if (params[key] !== '') {
        acc[key] = params[key];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

// 重命名key
export function renameKeys<T extends Record<string, any>>(
  obj: T,
  keyMap: { [key: string]: string },
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const newKey = keyMap[key] || key;
    result[newKey] = obj[key];
  });
  return result;
}

// Transforms an object into keys and values.
export function transformObjectToKeysAndValues(
  source: Record<string, any>,
  formatAsStrings: boolean = false,
  separator: string = ',',
  keyReplacements: Record<string, any> = {},
  valueReplacements: Record<string, any> = {},
) {
  // 遍历source，对键和值进行替换
  const replacedSource: Record<string, any> = {};
  Object.entries(source).forEach(([key, value]) => {
    const newKey = Object.prototype.hasOwnProperty.call(keyReplacements, key)
      ? keyReplacements[key]
      : key;
    replacedSource[newKey] = Object.prototype.hasOwnProperty.call(
      valueReplacements,
      value,
    )
      ? valueReplacements[value]
      : value;
  });

  const keys = Object.keys(replacedSource);
  const values = Object.values(replacedSource);
  if (formatAsStrings) {
    return {
      keys: keys.join(separator),
      values: values.join(separator),
    };
  }
  return { keys, values };
}

export function transformSorter(sorter: Record<string, any>) {
  const sortMap: Record<string, string> = {
    ascend: 'asc',
    descend: 'desc',
  };
  const transformedSorter: Record<string, string> = {};
  Object.keys(sorter).forEach((key) => {
    // 此处假设排序值要么是 'ascend'，要么是 'descend'，否则保持原样
    transformedSorter[key] = sortMap[sorter[key]] || sorter[key];
  });
  return transformedSorter;
}

export const api = {
  get<T, P = false>(
    url: string,
    params?: object,
    options: IConfig & { isPaginated?: P } = {
      isShowLoading: true,
      isShowError: true,
      isPaginated: false as P,
    },
  ): Promise<T> {
    return instance.get(url, { params, ...options });
  },
  post<T>(
    url: string,
    params?: object,
    options: IConfig = { isShowLoading: true, isShowError: true },
  ): Promise<T> {
    return instance.post(url, params, options);
  },

  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob',
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: response.data.type,
      });
      const name = (response.headers['file-name'] as string) || fileName;
      const link = document.createElement('a');
      link.download = decodeURIComponent(name);
      link.href = URL.createObjectURL(blob);
      document.body.append(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    });
  },
};
