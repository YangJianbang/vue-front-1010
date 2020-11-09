import request from "@/utils/request"

export default {
  selectBanner(){
    return request({
      url: '/servicecms/banner/selectBanner',
      method: 'get'
    })
  },
  getHostCourse(){
    return request({
      url: '/serviceedu/frontcourse/getHostCourse',
      method: 'get'
    })
  },
  getTeacher(){
    return request({
      url: '/serviceedu/frontteacher/getTeacher',
      method: 'get'
    })
  }
}
