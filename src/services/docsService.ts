import { request } from '@umijs/max';

export async function getDocs(url: string) {
  const response = await request<any>(url, {
    method: 'GET',
  });
  return response;
}
