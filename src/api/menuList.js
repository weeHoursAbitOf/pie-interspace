import request from '@/utils/request'

let BASEROOT = '/pie/menu/api'
if (process.env.NODE_ENV == "production") {
  BASEROOT = process.env.VUE_APP_URL + "/menu/api"
}

const menuManage = {

  //查询一级菜单
  getMenuList (data) {
    return request({
      url: BASEROOT + "/sys/res/getList",
      method: 'get',
      params: data

    })
  },

}



export default menuManage

