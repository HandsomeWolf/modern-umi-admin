import { message } from 'antd';

const setup = () => {
  window.addEventListener('offline', () =>
    message.warning({
      content: '当前处于离线状态',
      duration: 0,
      key: 'offline',
    }),
  );
  window.addEventListener('online', () => {
    message.destroy('offline');
    message.success({ content: '当前处于在线状态' });
  });
};

const initApp = () => {
  setup();
};

initApp();
