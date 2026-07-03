import { TOKEN_KEY, USERNAME_KEY } from '@/constants';
import { request } from '@umijs/max';

export async function registerAndLogin(
  body?: API_Params,
  options?: API_Params,
) {
  const response = await request<API_Result>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
  localStorage.setItem(TOKEN_KEY, response.data.datatoken); // 持久化存储
  localStorage.setItem(USERNAME_KEY, response.data.datausername); // 存储 username
  return response.data;
}

export async function login(body?: API_Params, options?: API_Params) {
  const response = await request<API_Result>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
  localStorage.setItem(TOKEN_KEY, response.data.datatoken); // 持久化存储
  localStorage.setItem(USERNAME_KEY, response.data.datausername); // 存储 username
  return response.data;
}

export async function logout(body?: API_Params, options?: API_Params) {
  const response = await request<API_Result>('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
  localStorage.removeItem(TOKEN_KEY); // 清除本地 Token
  localStorage.removeItem(USERNAME_KEY); // 清除本地 username
  return response.data;
}
