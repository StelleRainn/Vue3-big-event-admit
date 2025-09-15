import request from '@/utils/request'
import { ElMessage } from 'element-plus'

// 注册接口
export const userRegisterService = async ({
  username,
  password,
  repassword
}) => {
  return await request
    .post('api/reg', { username, password, repassword })
    .then((res) => ElMessage.success(res.status))
    .catch((err) => ElMessage.error(err.message))
}

// 登录接口
export const userLoginService = async ({ username, password }) => {
  return await request
    .post('api/login', { username, password })
    .then((res) => ElMessage.success(res.status))
    .catch((err) => ElMessage.error(err.message))
}

// 获取用户信息
export const userGetUserInfoService = async () =>
  await request.get('my/userinfo')
