import request from 'umi-request';

export function picture(path: string, rawBody: any) {
  return request.post(`/${path}/get`, { data: rawBody });
}

export function check(path: string, rawBody: any) {
  return request.post(`/${path}/check`, { data: rawBody });
}
