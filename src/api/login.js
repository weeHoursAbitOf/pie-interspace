import request from '@/utils/request'

const userApi = {
  // Login: '/auth/login',
  // Logout: '/auth/logout',
  // ForgePassword: '/auth/forge-password',
  // Register: '/auth/register',
  // twoStepCode: '/auth/2step-code',
  // SendSms: '/account/sms',
  // SendSmsErr: '/account/sms_err',
  // // get my info
  // UserInfo: '/user/info',
  // UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: "http://127.0.0.1:3001/api/index/index",
    method: 'get'
  })
}


