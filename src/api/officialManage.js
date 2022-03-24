import request from '@/utils/request'

let BASEROOT = 'http://172.16.10.18:30086/api/v1'
if (process.env.NODE_ENV == "production") {
  BASEROOT = process.env.VUE_APP_URL + "/text/api"
}

const officialManage = {

  //添加文本
  insertTextMessage (data) {
    return request({
      url: BASEROOT + "/document",
      method: 'POST',
      data: data

    })
  },
  //查询文本
  queryTextMessage (data) {
    return request({
      url: BASEROOT + "/document",
      method: 'GET',
      params: data

    })
  },
  //删除文本
  delTextMessage (data) {
    return request({
      url: BASEROOT + "/document",
      method: 'DELETE',
      params: data

    })
  },
}



export default officialManage

