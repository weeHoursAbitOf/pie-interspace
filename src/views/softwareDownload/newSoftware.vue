<template>
  <div class="new-software-content">
    <div class="new-software-iconName">
      <ul>
        <li>
          <p>软件名称 :</p>
          <span>
            <Input
              v-model="softwareName"
              :placeholder="softwareType != 1"
              style="width: 300px"
            />
          </span>
        </li>
        <li>
          <p>软件图标 :</p>
          <span>
            <Upload action :before-upload="beforeUploadIcon">
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
        <li>
          <p>版本号 :</p>
          <span>
            <Input
              v-model="versions"
              :placeholder="softwareType == 0"
              style="width: 300px"
            />
          </span>
        </li>
        <li>
          <p>选择系统：</p>
          <span>
            <Select
              v-model="system"
              style="width: 250px"
              :placeholder="softwareType == 0"
            >
              <Option
                v-for="it in systemList"
                :value="it.value"
                :key="it.value"
                >{{ it.label }}</Option
              >
            </Select>
          </span>
        </li>
        <li>
          <p>应用软件：</p>
          <span>
            <Input disabled v-model="application" style="width: 80%" />
            <Upload action :before-upload="beforeUploadApplication">
              <Button class="software-btn operation-event"> 添加软件 </Button>
            </Upload>
          </span>
        </li>
        <li>
          <p>描述：</p>
          <span>
            <Input
              style="width: 96%"
              v-model="description"
              type="textarea"
              :rows="5"
              placeholder
            />
          </span>
        </li>
      </ul>
    </div>
    <div class="pie-tb-footer">
      <Button class="software-btn operation-event" @click="cancel">取消</Button>
      <Button class="software-btn operation-event" @click="softwareConfirm"
        >确定</Button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 添加版本，修改版本
    rowVersions: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 创建类型1，添加类型2，修改类型0
    softwareType: {
      type: Number,
      default: 1,
    },
    // 修改ID
    id: {
      type: String,
      default: "",
    },
    // 重置参数
    resetStatus: {
      type: Boolean,
      default: false,
    },
    resetParams: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      softwareName: "", //软件名称
      softwareIcon: "", //图标
      iconFlie: {}, //图标文件
      versions: "", //版本号
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
      application: "", //应用软件
      applicationFlie: {}, //应用文件
      description: "", //描述
    };
  },
  watch: {
    rowVersions(row) {
      this.softwareName = row.name;
      this.softwareIcon = row.iconFlie;
      if (this.softwareType != 2) {
        this.versions = row.versions;
        this.system = row.system;
        this.application = row.downloadUrl;
        this.description = row.description;
      }
    },
    // 监听重置状态
    resetStatus() {
      this.setResetParameter();
    },
    resetParams() {
      this.setResetParameter();
    },
  },
  methods: {
    // 图标上传
    beforeUploadIcon(flie) {
      this.softwareIcon = window.URL.createObjectURL(flie);
      this.iconFlie = flie;
    },
    // 应用软件上传
    beforeUploadApplication(flie) {
      this.application = flie.name;
      this.applicationFlie = flie;
    },
    //确定
    softwareConfirm() {
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("name", this.softwareName);
      formData.append("icon", this.iconFlie);
      formData.append("version", this.version);
      formData.append("description", this.description);
      formData.append("system", this.system);
      formData.append("software", this.software);
      this.$emit("on-add-software-confirm", formData);
    },
    // 取消
    cancel() {
      this.$emit("cancel", false);
    },
    // 重置
    setResetParameter() {
      this.softwareName = ""; //软件名称
      this.softwareIcon = ""; //图标
      this.iconFlie = {}; //图标文件
      this.versions = ""; //版本号
      this.system = ""; //系统
      this.application = ""; //应用软件
      this.applicationFlie = {}; //应用文件
      this.description = ""; //描述
      this.rowVersions = {};
    },
  },
};
</script>

<style lang="less" scoped>
.new-software-content {
  max-height: 650px;
  overflow: auto;
  .new-software-versions {
    width: 100%;
    .software-versions-content:extend(.border) {
      margin: 10px;
      padding: 10px;
      position: relative;
      .icons-delete {
        position: absolute;
        top: 10px;
        right: 20px;
        z-index: 1;
      }
    }
  }
  .pie-tb-footer {
    position: absolute;
    bottom: 20px;
    right: 30px;
    z-index: 10;
  }
}
.icon-versions {
  display: flex;
  align-items: center;
}
ol,
ul {
  position: relative;
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
      align-items: center;
      margin-left: 10px;
    }
  }
}
.success-md-checkmark {
  font-size: 18px;
  color: #19be6b;
  margin: 0 5px;
}
.error-md-close {
  font-size: 18px;
  color: #ed4014;
  margin: 0 5px;
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
