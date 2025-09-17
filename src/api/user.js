import request from '@/utils/request'

// 注册接口
// application/json
export const userRegisterService = async ({ username, password, repassword }) => {
  return await request.post('api/reg', { username, password, repassword })
}

// 登录接口
// application/json
export const userLoginService = async ({ username, password }) => {
  return await request.post('api/login', { username, password })
}

// 获取用户信息
export const userGetUserInfoService = async () => await request.get('my/userinfo')

// 修改用户信息
// application/json
export const userUpdateUserInfoService = ({ id, username, nickname, email, user_pic }) =>
  request.put('my/userinfo', {
    id,
    username,
    nickname,
    email,
    user_pic
  })

// 更新用户头像
// application/json
export const userUpadteAvatarService = (avatar) => request.patch('/my/update/avatar', { avatar })

// 修改密码
// application/json
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd
  })
