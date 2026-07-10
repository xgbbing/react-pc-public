/**
 * 延迟发送请求 - 可用在页面关闭时发送日志场景
 * @param url
 * @param data
 * @returns
 */
export function safeBeacon(url: string, data: object) {
  const payload = JSON.stringify(data);

  // 优先尝试 fetchLater
  if ('fetchLater' in window) {
    try {
      (window as any).fetchLater(url, { method: 'POST', body: payload });
      return;
    } catch (e) {
      console.warn('fetchLater failed, falling back to sendBeacon', e);
    }
  }

  // 降级到 sendBeacon
  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon(url, blob);

    navigator.sendBeacon('/log', 'Log message');
  }
}
