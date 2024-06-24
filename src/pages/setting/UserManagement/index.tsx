import { RenderTextWithTooltip } from '@/components/Antd';
import { MappingTag } from '@/components/Antd/MappingTag';
import useIsMobile from '@/hooks/layout/useIsMobile';
import { getUserList } from '@/services/system/user/user.api';
import { generatePaginationConfig } from '@/utils/layout';
import { filterEmptyParams } from '@/utils/request';
import {
  ControlOutlined,
  DeleteOutlined,
  KeyOutlined,
  PlusOutlined,
  PrinterOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import {
  ActionType,
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Form,
  MenuProps,
  Popconfirm,
  Space,
  Typography,
} from 'antd';
import React, { useRef, useState } from 'react';

const UserManagement = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm<API.UserItem>();
  const isMobile = useIsMobile();
  // const [currentRow, setCurrentRow] = useState<API.UserItem>();
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [
    createWithUpdateUserDrawerFromVisit,
    setCreateWithUpdateUserDrawerFromVisit,
  ] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (record: API.UserItem) => {
    setIsEditing(true);
    setCreateWithUpdateUserDrawerFromVisit(true);
    form.setFieldsValue(record);
  };
  const handleCreateButtonClick = () => {
    setIsEditing(false);
    setCreateWithUpdateUserDrawerFromVisit(true);
    form.resetFields();
  };
  const handleExportButtonClick = async () => {};
  const handleImportButtonClick = () => {};
  const handleDeleteButtonClick = (id: number) => {
    console.log(id);
  };
  const handleBatchDeletionButtonClick = async () => {
    // setSelectedRows([]);
    // actionRef.current?.reloadAndRest?.();
  };

  const handleResetPasswordButtonClick = (id: number) => {
    console.log(id);
  };

  const handleAssigningRolesButtonClick = (id: number) => {
    console.log(id);
  };

  const columns: ProColumns<API.UserItem>[] = [
    // {
    //   title: '序号',
    //   dataIndex: 'index',
    //   hideInSearch: true,
    //   width: 60,
    //   align: 'center',
    // },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      width: 80,
      align: 'center',
      render: (avatar) => (
        <Avatar
          src={avatar === '-' ? undefined : avatar}
          icon={<UserOutlined />}
        />
      ),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
      ellipsis: true,
      width: 120,
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
      align: 'center',
      width: 160,
      render: (text) => <RenderTextWithTooltip text={text} />,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      align: 'center',
      width: 160,
      render: (text) => <RenderTextWithTooltip text={text} />,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
      copyable: true,
      align: 'center',
      width: 140,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      align: 'center',
      width: 80,
      valueType: 'select',
      valueEnum: {
        0: { text: '男' },
        1: { text: '女' },
      },
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      align: 'center',
      width: 120,
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '激活', status: 'Success' },
      },
    },
    {
      disable: true,
      title: '类型',
      dataIndex: 'type',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      align: 'center',
      width: 120,
      valueEnum: {
        0: { text: '系统用户' },
        1: { text: '外部用户' },
      },
    },
    {
      // disable: true,
      title: '角色',
      dataIndex: 'roleNames',
      // filters: true,
      // onFilter: true,
      // search: false,
      align: 'center',
      width: 120,
      // valueEnum: {
      //   0: { text: '系统用户' },
      //   1: { text: '外部用户' },
      // },
      // renderFormItem: (_, { defaultRender }) => {
      //   return defaultRender(_)
      // },
      render: (_, record) => (
        <Space>
          {record.roleNames.map((roleName) => (
            <MappingTag text={roleName} key={roleName} />
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
      align: 'center',
      width: 180,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    // {
    //   title: '排序号',
    //   search: false,
    //   dataIndex: 'sortOrder',
    //   valueType: 'text',
    //   align: 'center',
    //   width: 90,
    // },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'text',
      align: 'center',
      ellipsis: true,
      width: 200,
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      key: 'option',
      width: 160,
      fixed: isMobile ? false : 'right',
      render: (_, record, __, action) => (
        <Flex gap="middle" justify="center" align="center">
          <Typography.Link onClick={() => handleEditClick(record)}>
            编辑
          </Typography.Link>
          <Popconfirm
            title="是否删除该条数据?"
            onConfirm={() => handleDeleteButtonClick(record.id)}
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
          <TableDropdown
            key="actionGroup"
            onSelect={() => action?.reload()}
            menus={[
              {
                key: 'resetPassword',
                name: '重置密码',
                icon: <KeyOutlined />,
                onClick: () => handleResetPasswordButtonClick(record.id),
              },
              {
                key: 'assignRoles',
                name: '分配角色',
                icon: <ControlOutlined />,
                onClick: () => handleAssigningRolesButtonClick(record.id),
              },
            ]}
          />
        </Flex>
      ),
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: `导出选中（已选${selectedRowKeys.length}条）`,
      key: '1',
      disabled: selectedRowKeys.length === 0,
      onClick: () => {
        // message.info('导出选中');
      },
    },
    {
      label: `导出所有（共${total}条）`,
      key: '2',
      disabled: total === 0,
      onClick: () => {
        // message.info('导出全部');
      },
    },
  ];

  return (
    // the PageContainer component adds a title and breadcrumbs to the page
    <PageContainer title="用户管理" subTitle="用户数据，精准管理">
      <ProTable<API.UserItem, API.TablePagination>
        actionRef={actionRef}
        // Configure the row selection settings
        rowSelection={{
          // Enables the preservation of selected row keys, ensuring selected rows remain chosen during data updates
          preserveSelectedRowKeys: true,
          // Binds to the keys of the selected rows, controlling which rows are selected */
          selectedRowKeys,
          // Callback function triggered when the selection state changes, used to update the keys of the selected rows
          onChange: (selectedRowKey) => {
            setSelectedRowKeys(selectedRowKey);
          },
        }}
        headerTitle="用户列表"
        columns={columns}
        rowKey="id"
        bordered
        search={{
          // labelWidth: 'auto',
          labelWidth: 120,
        }}
        scroll={{ x: 1600 }}
        request={async (params, sort, filter) => {
          const response = await getUserList(params, sort, filter);
          setTotal(response.total);
          return response;
        }}
        beforeSearchSubmit={(params) => {
          return filterEmptyParams(params);
        }}
        columnsState={{
          persistenceKey: 'pro-table-users',
          persistenceType: 'localStorage',
        }}
        pagination={generatePaginationConfig(isMobile)}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateButtonClick}
          >
            新建
          </Button>,
          ...(!isMobile
            ? [
                <Button
                  type="default"
                  key="import"
                  icon={<VerticalAlignTopOutlined />}
                  onClick={handleImportButtonClick}
                >
                  导入
                </Button>,
                <Dropdown key="export" trigger={['click']} menu={{ items }}>
                  <Button
                    type="default"
                    key="export"
                    icon={<VerticalAlignBottomOutlined />}
                    onClick={handleExportButtonClick}
                  >
                    导出
                  </Button>
                </Dropdown>,
                <Dropdown key="print" trigger={['click']} menu={{ items }}>
                  <Button
                    type="default"
                    key="print"
                    icon={<PrinterOutlined />}
                    onClick={handleExportButtonClick} // 注意：这里应该是handlePrintButtonClick，假设你有相应的处理函数
                  >
                    打印
                  </Button>
                </Dropdown>,
              ]
            : []),
        ]}
      />

      {/* Select any data in the table to display the FooterToolbar component */}
      {selectedRowKeys?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowKeys.length}
              </a>{' '}
              项
            </div>
          }
        >
          <Button icon={<KeyOutlined />}>批量重置密码</Button>
          <Button icon={<ControlOutlined />}>批量分配角色</Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleBatchDeletionButtonClick}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      {/* Creating and editing Modal Dialog Box */}
      <ModalForm<API.UserItem>
        modalProps={{
          centered: true,
        }}
        title={isEditing ? '编辑用户' : '新建用户'}
        open={createWithUpdateUserDrawerFromVisit}
        onOpenChange={setCreateWithUpdateUserDrawerFromVisit}
        form={form}
        autoFocusFirstInput
        submitTimeout={2000}
        onFinish={async (values) => {
          console.log(values);
          // message.success('提交成功');
          return true;
        }}
      >
        {!isEditing && (
          <ProFormGroup>
            <ProFormText
              rules={[
                {
                  required: true,
                },
              ]}
              name="username"
              width="md"
              label="用户名"
              placeholder="请输入用户名"
            />
            <ProFormText.Password
              rules={[
                {
                  required: true,
                },
              ]}
              width="md"
              initialValue="123456"
              name="password"
              label="密码"
              placeholder="请输入密码"
            />
          </ProFormGroup>
        )}
        <ProFormGroup>
          <ProFormText
            width="md"
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
          />
          <ProFormDigit
            min={11}
            max={11}
            fieldProps={{ precision: 0 }}
            width="md"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
          />
        </ProFormGroup>
        <ProFormGroup>
          <ProFormText
            rules={[
              {
                required: true,
              },
            ]}
            width="md"
            name="nickname"
            label="昵称"
            placeholder="请输入昵称"
          />
          <ProFormSelect
            options={[
              {
                value: 0,
                label: '男',
              },
              {
                value: 1,
                label: '女',
              },
            ]}
            width="md"
            name="gender"
            label="性别"
          />
        </ProFormGroup>
        <ProFormGroup>
          <ProFormSelect
            options={[
              {
                value: 0,
                label: '系统用户',
              },
              {
                value: 1,
                label: '外部用户',
              },
            ]}
            width="md"
            initialValue={500}
            name="type"
            label="类型"
          />
          <ProFormSelect
            mode="multiple"
            showSearch
            allowClear
            options={[
              {
                value: 1,
                label: '管理员',
              },
              {
                value: 2,
                label: '普通用户',
              },
            ]}
            width="md"
            name="roleIds"
            label="角色"
          />
        </ProFormGroup>
        <ProFormGroup>
          {/*<ProFormDigit*/}
          {/*  fieldProps={{ precision: 0 }}*/}
          {/*  width="md"*/}
          {/*  name="sortOrder"*/}
          {/*  initialValue={500}*/}
          {/*  label="排序号"*/}
          {/*/>*/}
          <ProFormRadio.Group
            label="状态"
            width="md"
            name="status"
            initialValue={1}
            options={[
              {
                label: '禁用',
                value: 0,
              },
              {
                label: '激活',
                value: 1,
              },
            ]}
          />
        </ProFormGroup>
        <ProFormTextArea name="remark" label="备注" />
      </ModalForm>
    </PageContainer>
  );
};

export default UserManagement;
