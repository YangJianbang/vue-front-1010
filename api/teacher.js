import request from "@/utils/request"

export default {
  selectAllTeacher(page,limit) {
    return request({
      url: `/serviceedu/frontteacher/selectAllTeacher/${page}/${limit}`,
      method: 'get'
    })
  },
  getTeacherById(id){
    return request({
      url: `/serviceedu/frontteacher/getTeacherById/${id}`,
      method: 'get'
    })
  }
}
