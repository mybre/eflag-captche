import request from 'umi-request';

export function picture(baseURL: any, path: string, rawBody: any) {
  return request.post(`${path}/get`, { data: rawBody, prefix: baseURL || window.location.origin });
}

export function check(baseURL: any, path: string, rawBody: any) {
  return request.post(`${path}/check`, { data: rawBody, prefix: baseURL || window.location.origin });
}
