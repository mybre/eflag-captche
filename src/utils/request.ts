import request from 'umi-request';

export function picture(path: string, rawBody: any) {
  return request.post(`${path}/kaptcha/get`, { data: rawBody });
}

export function check(path: string, rawBody: any) {
  return request.post(`${path}/kaptcha/check`, { data: rawBody });
}
