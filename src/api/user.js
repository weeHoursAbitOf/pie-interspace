import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + '/api/v1'
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/api/v1"
}
const user = {
    login(data) {
        return request({
            url: BASEROOT + "/user/api/auth/login",
            method: 'post',
            data: data

        })
    },
    createUser(data) {
        return request({
            url: BASEROOT + "/user/api/sys/user/createUser2",
            method: 'post',
            data: data
        })
    },
    // 验证DELETE删除,单个数据删除接口
    judgeD(data) {
        return request({
            url: BASEROOT + "/user/api/auth/judgeD",
            method: 'get',
            params: data
        })
    },
    // 验证批量删除输入的用户密码，进行删除
    judgeDList(data) {
        return request({
            url: BASEROOT + "/user/api/auth/judgeDList",
            method: 'get',
            params: data
        })
    },
}

export default user

