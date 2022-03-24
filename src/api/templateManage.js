import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + '/api/v1/product'
if (process.env.NODE_ENV == "production") {
  BASEROOT = process.env.VUE_APP_URL + "/api/v1/product"
}
const templateManage = {
  //获取模板
  getTemplate(data) {
    return request({
      url: BASEROOT + "/basic/template",
      method: 'get',
      params: data
    })
  },
  //新增模板
  addTemplate(data) {
    return request({
      url: BASEROOT + "/basic/template",
      method: 'post',
      data: data
    })
  },
  //更新模板
  updateTemplate(data) {
    return request({
      url: BASEROOT + "/basic/template",
      method: 'put',
      data: data
    })
  },
  // 删除模板  
  deleteTemplate(data) {
    return request({
      url: BASEROOT + `/basic/template`,
      method: 'delete',
      params: data
    })
  },
  // 编目
  catalog(data) {
    return request({
      url: BASEROOT + "/basic/fields/catalog",
      method: 'get',
      params: data
    })
  },
  breakup(data) {
    return request({
      url: BASEROOT + "/basic/fields/breakup",
      method: 'get',
      params: data
    })
  },
  // 危险
  dangerousIntersect(data) {
    return request({
      url: BASEROOT + "/basic/fields/dangerousIntersect",
      method: 'get',
      params: data
    })
  },
  // 陨落
  reentry(data) {
    return request({
      url: BASEROOT + "/basic/fields/reentry",
      method: 'get',
      params: data
    })
  },
  // 突发
  sudden(data) {
    return request({
      url: BASEROOT + "/basic/fields/sudden",
      method: 'get',
      params: data
    })
  },
  getList(data) {
    return request({
      url: BASEROOT + "/basic/basicService/getList",
      method: 'get',
      params: data
    })
  },

  batchDelete(data) {
    return request({
      url: BASEROOT + "/basic/basicService/batchDelete",
      method: 'delete',
      params: data
    })
  },
  download(data) {
    return request({
      url: BASEROOT + "/basic/basicService/download",
      method: 'post',
      data: data
    })
  },
  // 获取单个产品模板
  getTemplatesByTemplateType(data) {
    return request({
      url: BASEROOT + "/basic/template/getTemplatesByTemplateType",
      method: 'get',
      params: data
    })
  },
  // 获取多个产品模板
  getTemplatesByTemplateTypes(data) {
    return request({
      url: BASEROOT + "/basic/template/getTemplatesByTemplateTypes",
      method: 'get',
      params: data
    })
  },
  getBasicSudden(data) {
    return request({
      url: BASEROOT + "/basic/sudden",
      method: 'get',
      params: data
    })
  },
  getDatchDelete(data) {
    return request({
      url: BASEROOT + `/basic/sudden/batchDelete`,
      method: 'delete',
      params: data
    })
  },
  addBasicSudden(data) {
    return request({
      url: BASEROOT + "/basic/sudden",
      method: 'post',
      data: data
    })
  },
  updateBasicSudden(data) {
    return request({
      url: BASEROOT + "/basic/sudden",
      method: 'put',
      data: data
    })
  },
}



export default templateManage