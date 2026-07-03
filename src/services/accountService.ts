import { TOKEN_KEY, USERNAME_KEY } from '@/constants';
import { request } from '@umijs/max';

export async function register(body?: API_Params, options?: API_Params) {
  return request<API_Result>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
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

  const res = response.data;
  localStorage.setItem(TOKEN_KEY, res.token); // 持久化存储
  localStorage.setItem(USERNAME_KEY, res.username); // 存储 username
  return res;
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
  return response;
}
