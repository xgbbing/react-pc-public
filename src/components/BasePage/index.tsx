// TODO: 这里用来统一处理资源加载，页面通过export default BasePage(Home) 引入
export function BasePage(Component: React.ComponentType) {
  return () => {
    // useScene()
    return <Component />;
  };
}
