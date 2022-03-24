import storage from "store";
import {
  ACCESS_TOKEN_SYSTEM
} from "@/store/mutations.js";
/*富文本编辑图片上传配置*/
import baseUrl from "@/config/base-url";  // 导入api接口

const uploadConfig = {
  action: baseUrl.upload, // 必填参数 图片上传地址
  methods: "POST", // 必填参数 图片上传方式
  token: storage.get(ACCESS_TOKEN_SYSTEM), // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: "upLoadImg", // 必填参数 文件的参数名
  size: 500, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: "", // 可选 可上传的图片格式
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{
      header: 1,
    },
    {
      header: 2,
    },
  ],
  [{
      list: "ordered",
    },
    {
      list: "bullet",
    },
  ],
  [{
      script: "sub",
    },
    {
      script: "super",
    },
  ],
  [{
      indent: "-1",
    },
    {
      indent: "+1",
    },
  ],
  [{
    direction: "rtl",
  }, ],
  [{
    size: ["small", false, "large", "huge"],
  }, ],
  [{
    header: [1, 2, 3, 4, 5, 6, false],
  }, ],
  [{
      color: [],
    },
    {
      background: [],
    },
  ],
  [{
    font: [],
  }, ],
  [{
    align: [false, "right", "center", "justify"],
  }, ],
  ["blockquote", "code-block"],
  ["clean"],
  ["link", "image", "video"],
];
const handlers = {
  image: function image() {
    var self = this;
    var fileInput = this.container.querySelector("input.ql-image[type=file]");
    console.log(fileInput);
    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute("name", uploadConfig.name);
      }
      // 可设置上传图片的格式
      fileInput.setAttribute("accept", uploadConfig.accept);
      fileInput.classList.add("ql-image");
      // 监听选择文件
      fileInput.addEventListener("change", function () {
        // 创建formData
        var formData = new FormData();
        formData.append(uploadConfig.name, fileInput.files[0]);
        formData.append("object", "product");
        // 如果需要token且存在token
        // if (uploadConfig.token) {
        //   formData.append('token', uploadConfig.token)
        // }
        // Ajax请求
        var xhr = new XMLHttpRequest();
        // 请求时间超时
        // xhr.timeout = 60 * 1000;
        //设置是否允许携带cookie
        xhr.withCredentials = false;
        //         请求方式post , get     请求地址
        xhr.open(uploadConfig.methods, uploadConfig.action, true);
        // 设置请求头携带token
        xhr.setRequestHeader("Authorization", uploadConfig.token);

        // 上传数据成功，会触发
        xhr.onload = function (e) {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            let length = self.quill.getSelection(true).index;
            //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
            console.log(res);
            self.quill.insertEmbed(length, "image", res.data);
            self.quill.setSelection(length + 1);
          }
          fileInput.value = "";
        };
        // 开始上传数据
        xhr.upload.onloadstart = function (e) {
          fileInput.value = "";
        };
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function (e) {
          console.log(e);
        };
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function (e) {
          // console.log('上传结束')
        };
        xhr.send(formData);
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  },
  //配置上传视频
  video: function (value) {
    var self = this
    var fileInput = this.container.querySelector('input.ql-video[type=file]')
    if (fileInput === null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name)
      }
      fileInput.setAttribute('accept', uploadConfig.type)
      fileInput.classList.add('ql-video')
      fileInput.addEventListener('change', function () {
        var formData = new FormData()
        formData.append(uploadConfig.name, fileInput.files[0])

        // if (uploadConfig.token) {
        //   formData.append('token', uploadConfig.token)
        // }

        formData.append('object', 'product');
        // 如果需要token且存在token
        // if (uploadConfig.token) {
        //   formData.append('token', uploadConfig.token)
        // }
        // 图片上传
        var xhr = new XMLHttpRequest();
        // 请求时间超时
        // xhr.timeout = 60 * 1000;
        //设置是否允许携带cookie
        xhr.withCredentials = false;
        //         请求方式post , get     请求地址
        xhr.open(uploadConfig.methods, uploadConfig.action, true);
        // 设置请求头携带token
        xhr.setRequestHeader("Authorization", uploadConfig.token);
        // 上传数据成功，会触发
        xhr.onload = function (e) {
          if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            let length = self.quill.getSelection(true).index;
            //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
            console.log(res);
            self.quill.insertEmbed(length, 'video', res.data)
            // self.quill.insertEmbed(length, 'image', res.url);
            // self.quill.setSelection(length + 1)
          }
          fileInput.value = ''
        };
        // 开始上传数据
        xhr.upload.onloadstart = function (e) {
          fileInput.value = ''
        };
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function (e) {
          console.log(e)
        };
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function (e) {
          // console.log('上传结束')
        };
        xhr.send(formData)
        // fileUpload(formData).then(response => {
        //   console.log('upload response:', response)
        //   let url = 'https://www.lumingtec.cn/Business/file/' + response.fileName
        //   let length = self.quill.getSelection().index　//获取当前鼠标焦点位置
        //   self.quill.insertEmbed(length, 'video', url)
        // })
      })

      this.container.appendChild(fileInput)
    }
    fileInput.click()
  },
};

export default {
  placeholder: "请输入内容",
  theme: "snow", // 主题
  modules: {
    toolbar: {
      container: toolOptions, // 工具栏选项
      handlers: handlers, // 事件重写
      theme: "snow",
    },
    imageResize: {
      displayStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
      },
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
    syntax: {
      highlight: (text) => {
        return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
      },
    },
  },
};