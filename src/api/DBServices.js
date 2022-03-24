import request from '@/utils/request'
import base from "./baseUrl"
let BASEROOT = base + "/data/services"
if (process.env.NODE_ENV == "production") {
    BASEROOT = process.env.VUE_APP_URL + "/data/services"
}

const DBServices = {
    commonQueryAccess(data) {
        return request({
            url: BASEROOT + "/DBService/commonQueryAccess",
            method: 'post',
            data: data
        })
    }
}

export default DBServices

