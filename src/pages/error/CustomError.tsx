import { history } from '@@/core/history';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import React from 'react';

const { Paragraph, Text } = Typography;

const CustomErrorPage: React.FC = () => (
  <Result
    status="error"
    title="操作失败"
    subTitle="请检查以下信息后再次尝试"
    extra={[
      <Button type="primary" key="try" onClick={() => history.back()}>
        返回，再次尝试
      </Button>,
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          出现以下错误：
        </Text>
      </Paragraph>
      {/*<Paragraph>*/}
      {/*  <CloseCircleOutlined style={{ color: 'red', marginRight: '4px' }} />*/}
      {/*  你的网络中断*/}
      {/*</Paragraph>*/}
      <Paragraph>
        <CloseCircleOutlined style={{ color: 'red', marginRight: '4px' }} />
        您的请求超时或网络中断！
      </Paragraph>
    </div>
  </Result>
);

export default CustomErrorPage;
