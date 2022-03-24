import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/api/v1"
if (process.env.NODE_ENV == "production") {
  BASEROOT = process.env.VUE_APP_URL + "/api/v1"
}

const software = {
  // 获取未发布和已发布数据列表接口
  showIsPublishList(data) {
    return request({
      url: BASEROOT + "/software/appProduct/searchBase",
      method: 'post',
      params: data
    })
  },

  // 获取所有版本号数据列表
  searchSoftware(data) {
    return request({
      url: BASEROOT + "/software/appProduct/searchSoftware",
      method: 'get',
      params: data
    })
  },


  // 获取软件系统 windows linux
  getSearchSystemField(data) {
    return request({
      url: BASEROOT + "/software/appProduct/searchSystemField",
      method: 'post',
      params: data
    })
  },

  // 校验软件名称 软件版本 软件系统
  getCheckParam(data) {
    return request({
      url: BASEROOT + "/software/appProduct/checkParam",
      method: 'post',
      data: data
    })
  },
  // 添加软件
  addSoftware(data) {
    return request({
      url: BASEROOT + "/software/appProduct/add",
      method: 'post',
      data: data
    })
  },
  // 查询所有版本信息列表
  getSearchSystem(data) {
    return request({
      url: BASEROOT + "/software/appProduct/searchSystem",
      method: 'post',
      data: data
    })
  },

  // 版本删除
  deleteVersions(data) {
    return request({
      url: BASEROOT + "/software/appProduct/delete",
      method: 'delete',
      params: data
    })
  },

  // 更新
  updateSoftware(data) {
    return request({
      url: BASEROOT + "/software/appProduct/updateVVersionSoftware",
      method: 'put',
      data: data
    })
  },

}

export default software