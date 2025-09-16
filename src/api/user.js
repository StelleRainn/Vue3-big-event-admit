import request from '@/utils/request'

// 注册接口
export const userRegisterService = async ({ username, password, repassword }) => {
  return await request.post('api/reg', { username, password, repassword })
}

// 登录接口
export const userLoginService = async ({ username, password }) => {
  return await request.post('api/login', { username, password })
}

// 获取用户信息
export const userGetUserInfoService = async () => await request.get('my/userinfo')
