import request from '@/utils/request'

export default {
  //注册
  registerUser(registerVo) {
    return request({
      url: `/ucenterservice/member/registerUser`,
      method: 'post',
      data: registerVo
    })
  },
  //发送验证码
  sendPhone(phone) {
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  }
}
