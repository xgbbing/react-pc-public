import { request } from '@umijs/max';

export async function register(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/test/register', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function testregister(
  params?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/test/register', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
    ...(options || {}),
  });
}

export async function login(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function logout(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/account/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
