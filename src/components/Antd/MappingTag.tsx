import { Tag } from 'antd';
import React from 'react';

interface MappingTagProps {
  text: string;
}

// prettier-ignore
const roleColor: { [key: string]: string } = {
  '超级管理员': 'error',
  '管理员': 'warning',
  '业务员': 'success',
  '程序员': 'processing',
  '普通用户': 'default',
};

const getMapping = (text: string) => {
  return roleColor[text] || roleColor['default'];
};

export const MappingTag: React.FC<MappingTagProps> = ({ text }) => {
  return <Tag color={getMapping(text)}>{text}</Tag>;
};
