import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  // Supports the writing style of css object
  container: {
    backgroundColor: token.colorBgLayout,
    borderRadius: token.borderRadiusLG,
    maxWidth: 400,
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // Also supports obtaining the same writing experience as normal css through css string templates
  // recommended to use css string templates
  card: css`
    background: #000;
    width: 100px;
    box-shadow: ${token.boxShadow};
    padding: ${token.padding}px;
    border-radius: ${token.borderRadius}px;
    color: ${token.colorTextTertiary};
    background: ${token.colorBgContainer};
    transition: all 100ms ${token.motionEaseInBack};

    margin-bottom: 8px;
    cursor: pointer;

    &:hover {
      color: ${token.colorTextSecondary};
      box-shadow: ${token.boxShadowSecondary};
    }
  `,
}));

const AntdStyle = () => {
  console.log(useStyles());
  const { styles, cx, theme } = useStyles();
  console.log(styles);
  console.log(theme);
  console.log(cx('a-simple-create-style-demo-classname', styles.container));
  return (
    <div
      className={cx('a-simple-create-style-demo-classname', styles.container)}
    >
      <div className={styles.card}>createStyles Demo</div>
      <div>Current theme mode: {theme.appearance}</div>
    </div>
  );
};

export default AntdStyle;
