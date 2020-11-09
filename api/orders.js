import request from '@/utils/request'
export default {
  //生成订单
  createCourseOrders(id) {
    return request({
      url: `/orderservice/t-order/createOrder/${id}`,
      method: 'post',
    })
  },
  //根据订单号获取订单详情
  getOrderByOrderNo(orderNo){
    return request({
      url: `/orderservice/t-order/getOrderByOrderNo/${orderNo}`,
      method:'get'
    })
  },
  //根据订单号生成支付二维码
  createNative(orderNo){
    return request({
      url: `/orderservice/t-pay-log/createNative/${orderNo}`,
      method:'get'
    })
  },
  //查询支付状态
  queryPayStatus(orderNo){
    return request({
      url: `/orderservice/t-pay-log/queryPayStatus/${orderNo}`,
      method:'get'
    })
  }
}
