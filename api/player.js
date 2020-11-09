import request from '@/utils/request'
export default {
  //课程列表
  getPlayAuth(id) {
    return request({
      url: `/eduvod/vod/getPlayAuth/${id}`,
      method: 'get',
    })
  },
}
