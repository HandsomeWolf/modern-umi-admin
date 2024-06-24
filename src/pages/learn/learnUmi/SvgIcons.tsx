import { Icon } from '@umijs/max';

// 推荐remix图标集合：https://icones.js.org/collection/ri
const SvgIcons = () => {
  return (
    <div>
      图标
      <Icon icon="local:home-hashtag" />
      {/*<Icon icon="ri:home-8-line" />*/}
      <Icon
        icon="ri:alarm-warning-line"
        spin
        style={{ fontSize: 24, color: 'red' }}
      />
    </div>
  );
};

export default SvgIcons;
