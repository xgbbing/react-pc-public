// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

// 获取当前URL中的参数
export const getUrlParameter = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};
