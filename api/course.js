import request from '@/utils/request'
export default {
  //课程列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `/serviceedu/frontcourse/getAllCourse/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //查询所有分类
  getAllSubject(){
    return request({
      url: `/serviceedu/subject/getAllSubject`,
      method: 'get'
    })
  },
  //根据课程ID查询课程详细信息
  getCourseInfo(id){
    return request({
      url: `/serviceedu/frontcourse/getCourseInfo/${id}`,
      method: 'get'
    })
  }
}
