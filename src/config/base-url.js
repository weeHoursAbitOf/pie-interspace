/**
 * 接口域名的管理
 */
import base from "@/api/baseUrl"
let baseUrl = {
  upload: base + '/api/v1/document/resources/picture', //上传图片
  uploadFile: base + '/api/v1/document/resources/file', //上传文件
  uploadIcon: base + "/api/v1/software/app/updateIcon",//上传图标
  uploadSoftwareFile: base + '/api/v1/software/app/updateSoftware', //上传软件文件
  authCode: base + '/api/v1/user/api/auth/verificationCode'//验证码
}
if (process.env.NODE_ENV == "production") {
  baseUrl.upload = process.env.VUE_APP_URL + "/api/v1/document/resources/picture"//上传图片
  baseUrl.uploadFile = process.env.VUE_APP_URL + '/api/v1/document/resources/file' //上传文件
  baseUrl.uploadIcon = process.env.VUE_APP_URL + '/api/v1/software/app/updateIcon' //上传图标
  baseUrl.uploadSoftwareFile = process.env.VUE_APP_URL + '/api/v1/software/app/updateSoftware'//上传软件文件
  baseUrl.authCode = process.env.VUE_APP_URL + '/api/v1/user/api/auth/verificationCode'//验证码
}
export default baseUrl;