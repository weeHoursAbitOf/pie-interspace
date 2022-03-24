import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + '/api/v1/user/api'

if (process.env.NODE_ENV == "production") {
  BASEROOT = process.env.VUE_APP_URL + "/api/v1/user/api"
}
const userManage = {
  queryLog(data) {
    return request({
      url: BASEROOT + '/v1/user/queryUserLog',
      method: 'post',
      data: data
    })
  },
  deleteLogs(data) {
    return request({
      url: BASEROOT + "/v1/user/deleteUserLogs",
      method: 'post',
      params: data
    })
  },
  newQueryAllUser(data) {
    return request({
      url: BASEROOT + "/sys/user/newQueryAllUser",
      method: 'post',
      data: data
    })
  },
  //(用户信息管理)查询所有用户的信息
  queryAllUser(data) {
    return request({
      url: BASEROOT + "/sys/user/queryAlluser",
      method: 'get',
      params: data
    })
  },
  // 获取产品资源列表
  getProductItemList(data) {
    return request({
      url: BASEROOT + "/sys/role/getProductItemList",
      method: 'get',
      params: data
    })
  },
  // 新增角色
  newCreateRole(data) {
    return request({
      url: BASEROOT + "/sys/role/newCreateRole",
      method: 'post',
      data: data
    })
  },
  //修改角色信息
  newUpdateRole(id, data) {
    return request({
      url: BASEROOT + `/sys/role/newUpdateRole/${id}`,
      method: 'put',
      data: data
    })
  },
  //批量删除角色
  deleteRoleBatch(data) {
    return request({
      url: BASEROOT + `/sys/role/deleteRoleBatch`,
      method: 'delete',
      params: data
    })
  },
  // 获取产品资源列表
  newGetProductItemList(data) {
    return request({
      url: BASEROOT + "/sys/role/newGetProductItemList",
      method: 'get',
      params: data
    })
  },
  //查询列表机构
  querySelective(data) {
    return request({
      url: BASEROOT + "/enterprise/querySelective",
      method: 'get',
      params: data

    })
  },
  //新增机构
  addEnterprise(data) {
    return request({
      url: BASEROOT + "/enterprise",
      method: 'post',
      data: data
    })
  },
  // 删除机构    
  deleteEnterprise(id, data) {
    return request({
      url: BASEROOT + `/enterprise/${id}`,
      method: 'delete',
      params: data
    })
  },

  // 批量删除机构    
  deleteBatchEnterprise(data) {
    return request({
      url: BASEROOT + `/enterprise/deleteBatch`,
      method: 'delete',
      params: data
    })
  },
  //更新(修改)机构信息
  updateEnterprise(id, data) {
    return request({
      url: BASEROOT + `/enterprise/update/${id}`,
      method: 'put',
      data: data
    })
  },
  //新建角色
  createRole(data) {
    return request({
      url: BASEROOT + "/sys/role/createRole",
      method: 'post',
      data: data
    })
  },
  //删除角色
  deleteRole(roleId, data) {
    return request({
      url: BASEROOT + `/sys/role/deleteRole/${roleId}`,
      method: 'delete',
      params: data
    })
  },
  //查询群组
  queryBySelective(data) {
    return request({
      url: BASEROOT + "/group/queryBySelective",
      method: 'get',
      params: data
    })
  },
  //(用户信息管理)新增用户的信息
  createUser(data) {
    return request({
      url: BASEROOT + "/sys/user/createUser",
      method: 'post',
      data: data
    })
  },
  //(用户信息管理)删除用户的信息
  deleteUser(userId, data) {
    return request({
      url: BASEROOT + `/sys/user/delete/${userId}`,
      method: 'delete',
      params: data
    })
  },
  // (用户信息管理)批量删除用户  
  deleteBatchUser(data) {
    return request({
      url: BASEROOT + `/sys/user/deleteUserBatch`,
      method: 'delete',
      params: data
    })
  },
  // (用户信息管理)更新用户信息  
  updateUser(data) {
    return request({
      url: BASEROOT + `/sys/user/updateUser`,
      method: 'put',
      data: data
    })
  },
  // 创建群组
  createGroup(data) {
    return request({
      url: BASEROOT + `/group/create`,
      method: 'post',
      data: data
    })
  },
  //删除群组
  deleteGroup(id, data) {
    return request({
      url: BASEROOT + `/group/delete/${id}`,
      method: 'delete',
      params: data
    })
  },

  //批量删除群组
  deleteGroupBatch(data) {
    return request({
      url: BASEROOT + `/group/deleteGroupBatch`,
      method: 'delete',
      params: data
    })
  },
  //修改群组信息
  updateGroup(id, data) {
    return request({
      url: BASEROOT + `/group/update/${id}`,
      method: 'put',
      data: data
    })
  },
  getRoleList(data) {
    return request({
      url: BASEROOT + `/sys/role/getRoleList`,
      method: 'post',
      data: data
    })
  },
  updateUserStatus(data) {
    return request({
      url: BASEROOT + `/sys/user/updateUserStatus`,
      method: 'post',
      data: data
    })
  },
  log(data) {
    return request({
      url: BASEROOT + `/v1/user/log`,
      method: 'get',
      params: data
    })
  }
}
export default userManage;

