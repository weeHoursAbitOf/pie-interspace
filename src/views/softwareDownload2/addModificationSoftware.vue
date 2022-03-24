<template>
  <div class="add-modification-software-content">
    <ul>
      <li>
        <p>软件名称 :</p>
        <span>
          <Input
            :disabled="softwareType == 0 ? true : false"
            v-model="softwareName"
            placeholder
            style="width: 200px"
          />
        </span>
      </li>
      <li>
        <p>软件图标 :</p>
        <span>
          <Upload action :before-upload="beforeUploadIcon">
            <!-- :action="dataUpload"
            :headers="Authorization"
            :data="upload"
            :on-success="handleSuccessIcon"-->
            <div class="software-icon">
              <img
                v-if="softwareIcon"
                class="software-image"
                :src="softwareIcon"
                alt
              />
              <i v-else>
                <Icon class="icon" type="md-add" />
              </i>
            </div>
          </Upload>
        </span>
      </li>
      <li v-show="!isShowSoftware">
        <p>添加软件 :</p>
        <span>
          <div
            class="software-icon"
            style="width: 50px; height: 50px"
            @click="addSoftwareEvent"
          >
            <Icon class="icon" type="md-add" />
          </div>
        </span>
      </li>
    </ul>
    <!-- v-show="isShowSoftware" -->
    <ol>
      <li>
        <p>选择系统 :</p>
        <span>
          <Select
            v-model="system"
            style="width: 200px"
            :disabled="softwareType == 2 ? true : false"
          >
            <Option
              v-for="item in systemList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </span>
      </li>
      <li>
        <p>版本号 :</p>
        <span>
          <Input v-model="versions" placeholder style="width: 200px" />
        </span>
      </li>
      <li>
        <p>应用软件 :</p>
        <span>
          <Input disabled v-model="softwareFile" placeholder />
          <Upload action :before-upload="beforeUploadFile">
            <Button class="software-btn operation-event">
              <!-- {{ softwareType != 2 ? "添加软件" : "更新软件" }} -->
              更新软件
            </Button>
          </Upload>
        </span>
      </li>
      <li>
        <p>描述 :</p>
        <span>
          <Input v-model="description" type="textarea" :rows="4" placeholder />
        </span>
      </li>
    </ol>
    <div class="pie-tb-footer">
      <Button class="software-btn operation-event" @click="cancel">取消</Button>
      <Button class="software-btn operation-event" @click="softwareConfirm"
        >确定</Button
      >
    </div>
  </div>
</template>

<script>
import storage from "store";
import { ACCESS_TOKEN_SYSTEM } from "@/store/mutations.js";
import baseUrl from "@/config/base-url";
export default {
  props: {
    dataItem: {
      type: Object,
    },
    updateDataItme: {
      type: Object,
    },
    resetParams: {
      type: Boolean,
      default: false,
    },
    itemId: {
      type: Number,
    },
    resetName: {
      type: Boolean,
      default: false,
    },
    softwareType: {
      type: Number,
    },
  },
  data() {
    return {
      softwareName: "", //软件名称
      system: "", //系统
      systemList: [
        {
          value: "linux",
          label: "linux",
        },
        {
          value: "windows",
          label: "windows",
        },
      ],
      versions: "", //版本
      software: "", //软件
      description: "", //描述
      softwareIcon: "", //软件图标
      // softwareIconPath: "", //软件图标地址
      softwareFile: "", //软件文件
      // softwareFilePath: "", //软件文件地址
      upload: { upLoadImg: "" }, //图标传参
      uploadFile: { multipartFile: "" }, //文件传参
      dataUpload: baseUrl.upload, //图标上传地址
      dataUploadFile: baseUrl.uploadFile, //文件上传地址
      Authorization: {
        //设置请求头携带token
        Authorization: storage.get(ACCESS_TOKEN_SYSTEM),
      },
      isShowSoftware: false, //显示软件添加项
    };
  },
  watch: {
    // 添加软件
    dataItem(item) {
      // this.softwareName = item.name;
      // this.versions = item.lastversion;
    },
    // 修改监听赋值
    updateDataItme(item) {
      this.softwareName = item.name; //软件名称
      this.versions = item.lastversion; //软件版本
      this.description = item.description; //软件描述
      this.system = item.system; //软件系统
      this.softwareIcon = item.icon; //软件图标
      this.isShowSoftware = true;
    },
    // 添加成功重置参数
    resetParams() {
      this.setResetParameter();
    },
    // 重置软件名称
    resetName() {
      this.softwareName = "";
    },
  },
  methods: {
    // 显示隐藏添加软件事件
    addSoftwareEvent() {
      this.isShowSoftware = !this.isShowSoftware;
    },
    // 图标上传之前
    beforeUploadIcon(file) {
      this.softwareIcon = window.URL.createObjectURL(file);
      // 用于传送参数
      this.upload.upLoadImg = file;
    },
    // // 图标上传成功之后
    // handleSuccessIcon(res) {
    //   this.softwareIcon = res.data;
    // },
    // 文件上传之前
    beforeUploadFile(file) {
      // 用于传送参数
      this.uploadFile.multipartFile = file;
      this.softwareFile = file.name;
    },
    // // 文件上传成功之后
    // handleSuccessFile(res) {
    //   this.softwareFile = res.data;
    // },
    // 取消按钮
    cancel() {
      this.$emit("cancel", false);
      this.setResetParameter();
    },
    // 添加软件按钮
    softwareConfirm() {
      if (!this.checkoutData()) {
        return false;
      }
      let formData = new FormData();
      formData.append("sid", this.itemId);
      formData.append("name", this.softwareName); //软件名称
      formData.append("version", this.versions); //版本号
      formData.append("description", this.description); //描述
      formData.append("system", this.system); //系统
      formData.append("icon", this.upload.upLoadImg); //图标
      formData.append("software", this.uploadFile.multipartFile); //软件
      this.$emit("on-add-software-confirm", formData);
      this.$emit("reset-params", !this.resetParams);
      this.setResetParameter();
    },
    // 判断参数不能为空
    checkoutData() {
      if (this.softwareType == 2) {
        if (!this.softwareName) {
          this.$Notice.warning({
            title: "软件名称不能为空！",
            top: 50,
            duration: 5,
          });
          return;
        } else if (!this.system) {
          this.$Notice.warning({
            title: "请选择系统！",
            top: 50,
            duration: 5,
          });
          return;
        } else if (!this.versions) {
          this.$Notice.warning({
            title: "请输入版本！",
            top: 50,
            duration: 5,
          });
          return;
        } else {
          return true;
        }
      } else {
        if (!this.softwareName) {
          this.$Notice.warning({
            title: "软件名称不能为空！",
            top: 50,
            duration: 5,
          });
          return;
        } else if (!this.softwareIcon) {
          this.$Notice.warning({
            title: "请上传图标！",
            top: 50,
            duration: 5,
          });
          return;
        } else if (!this.system) {
          this.$Notice.warning({
            title: "请选择系统！",
            top: 50,
            duration: 5,
          });
          return;
        } else if (!this.versions) {
          this.$Notice.warning({
            title: "请输入版本！",
            top: 50,
            duration: 5,
          });
          return;
        } else if (!this.softwareFile) {
          this.$Notice.warning({
            title: "请上传软件！",
            top: 50,
            duration: 5,
          });
          return;
        } else {
          return true;
        }
      }
    },
    // 重置参数
    setResetParameter() {
      this.softwareName = "";
      this.versions = "";
      this.description = "";
      this.system = "";
      this.upload.upLoadImg = "";
      this.uploadFile.multipartFile = "";
      this.softwareIcon = "";
      this.softwareFile = "";
      this.updateDataItme = {};
      this.isShowSoftware = false;
    },
  },
};
</script>

<style lang="less" scoped>
.add-modification-software-content {
  padding: 0 10px;
}
.pie-tb-footer {
  position: absolute;
  bottom: 20px;
  right: 30px;
  z-index: 10;
}

ol,
ul {
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    p {
      width: 80px;
      text-align: right;
    }
    span {
      flex: 1;
      display: flex;
      margin-left: 10px;
    }
  }
}
.software-icon:extend(.border) {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  .software-image {
    width: 100%;
    height: 100%;
  }
}
.icon {
  font-size: 30px;
}
.software-btn {
  border: 1px solid @content-border-color;
  background-color: #151e23;
  color: @lable-font-color;
  height: 0.1875rem;
  margin-left: 10px;
}
/deep/.ivu-upload-list {
  display: none;
}
</style>
