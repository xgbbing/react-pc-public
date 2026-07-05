import { request } from '@umijs/max';

/** 获取总览统计数据 */
export async function getOverview(options?: API_Params) {
  const response = await request<API_Result>('/api/analytics/overview', {
    method: 'GET',
    ...(options || {}),
  });
  return response;
}

/** 获取每日访问量 */
export async function getDailyVisits(options?: API_Params) {
  const response = await request<API_Result>('/api/analytics/daily', {
    method: 'GET',
    ...(options || {}),
  });
  return response;
}

/** 获取每周访问量 */
export async function getWeeklyVisits(options?: API_Params) {
  const response = await request<API_Result>('/api/analytics/weekly', {
    method: 'GET',
    ...(options || {}),
  });
  return response;
}

/** 获取每月访问量 */
export async function getMonthlyVisits(options?: API_Params) {
  const response = await request<API_Result>('/api/analytics/monthly', {
    method: 'GET',
    ...(options || {}),
  });
  return response;
}
