import * as allIcons from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-components';
import { Icon, matchPath } from '@umijs/max';
import React from 'react';

export const fixMenuItemIcon = (
  menus: MenuDataItem[],
  iconType = 'Outlined',
): MenuDataItem[] => {
  menus.forEach((item) => {
    const { icon, children } = item;
    if (typeof icon === 'string') {
      if (icon.startsWith('local:') || icon.startsWith('ri:')) {
        // 如果图标是自定义的，则使用 Icon 组件
        item.icon = React.createElement(Icon, { icon: icon as any });
      } else {
        // 否则，处理为 ant-design 图标
        const fixIconName =
          icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
        const IconComponent =
          (allIcons as any)[fixIconName] || (allIcons as any)[icon];
        if (IconComponent) {
          item.icon = React.createElement(IconComponent);
        }
      }
    }
    if (children && children.length > 0) {
      item.children = fixMenuItemIcon(children, iconType);
    }
  });
  return menus;
};

export const flattenMenuPaths = (menuData: MenuDataItem[]): string[] => {
  const flatten = (items: MenuDataItem[], result: string[] = []): string[] => {
    items.forEach((item) => {
      if (item.path) result.push(item.path);
      if (Array.isArray(item.children)) {
        flatten(item.children, result);
      }
    });
    return result;
  };
  return flatten(menuData);
};

export const checkPermission = (pathname: string, routeWhiteList: string[]) => {
  return routeWhiteList.some((route) => matchPath(route, pathname));
};
