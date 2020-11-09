import request from '@/utils/request'

export default {
  loginUser(loginVo) {
    return request({
      url: '/ucenter/member/loginUser',
      method: 'post',
      data: loginVo
    })
  },
  getLoginUser() {
    return request({
      url: '/ucenter/member/getLoginInfo',
      method: 'get',
    })
  }
}
