<template>
  <div class="new-software-content">
    <div class="new-software-iconName">
      <ul>
        <li>
          <p>软件名称 :</p>
          <span>
            <Input
              v-model="softwareName"
              :disabled="softwareType == 2 ? true : false"
              placeholder
              style="width: 300px"
              @on-blur="onSoftwareNameChang"
            />
            <Icon
              type="md-checkbox-outline"
              :class="
                checjTheName || softwareType == 2
                  ? 'success-md-checkmark'
                  : 'error-md-close'
              "
            />
          </span>
        </li>
        <li v-show="softwareType == 2 ? false : true">
          <p>软件图标 :</p>
          <span>
            <Upload
              action
              :before-upload="beforeUploadIcon"
              :disabled="softwareType == 2 ? true : false"
            >
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
          <p>添加版本 :</p>
          <span>
            <div
              class="software-icon"
              style="width: 25px; height: 25px"
              @click="newVersionsEvent"
            >
              <Icon class="icon" type="md-add" />
            </div>
          </span>
        </li>
      </ul>
    </div>
    <div class="new-software-versions">
      <div
        class="software-versions-content"
        v-for="(item, index) in formVersions"
        v-if="item.isShowVersions"
        :key="index"
      >
        <div
          class="icons-delete software-icon"
          style="width: 25px; height: 25px"
          @click="deleteVersionsEvent(index)"
        >
          <Icon class="icon" type="md-remove" />
        </div>
        <ol>
          <li>
            <p>版本号 :</p>
            <span>
              <Input
                v-model="item.version"
                :name="index"
                placeholder
                style="width: 250px"
                @on-blur="onVersionBlur"
              />
              <Icon
                type="md-checkbox-outline"
                :class="
                  item.checkVersion ? 'success-md-checkmark' : 'error-md-close'
                "
              />
            </span>
          </li>
          <li>
            <p>添加软件 :</p>
            <span>
              <div
                class="software-icon"
                style="width: 25px; height: 25px"
                @click="addSoftwareEvent(index)"
              >
                <Icon class="icon" type="md-add" />
              </div>
            </span>
          </li>
        </ol>
        <ol
          v-for="(items, indexs) in item.software"
          :key="indexs"
          v-if="items.isShowSoftware"
        >
          <li>
            <p>选择系统 :</p>
            <span>
              <Select
                v-model="items.system"
                style="width: 250px"
                @on-select="onSystemSelect"
              >
                <Option
                  v-for="it in systemList"
                  :value="it.value"
                  :key="it.value"
                  :tag="{
                    index: index,
                    indexs: indexs,
                  }"
                  >{{ it.label }}</Option
                >
              </Select>
              <div
                class="software-icon"
                style="width: 25px; height: 25px; margin-left: 10px"
                @click="deleteSoftwareEvent(index, indexs)"
              >
                <Icon class="icon" type="md-remove" />
              </div>
              <Icon
                type="md-checkbox-outline"
                :class="
                  items.calibrationSystem
                    ? 'success-md-checkmark'
                    : 'error-md-close'
                "
              />
            </span>
          </li>
          <li>
            <p>应用软件 :</p>
            <span>
              <Input
                disabled
                v-model="items.softwareNameFile"
                placeholder
                style="width: 80%"
              />
              <Button
                class="software-btn operation-event"
                @click="beforeUploadEvent(index, indexs)"
              >
                添加软件
              </Button>
              <input
                style="display: none"
                ref="filElem"
                type="file"
                name="file"
                class="upload-file"
                @change="getFile"
              />
            </span>
          </li>
        </ol>
        <ol v-show="softwareType == 2 ? false : true">
          <li>
            <p>描述 :</p>
            <span>
              <Input
                style="width: 97%"
                v-model="item.description"
                type="textarea"
                :rows="5"
                placeholder
              />
            </span>
          </li>
        </ol>
      </div>
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
    resetParams: {
      type: Boolean,
      default: false,
    },
    dataItem: {
      type: Object,
    },
    softwareType: {
      type: Number,
    },
  },
  data() {
    return {
      checjTheName: "", //校验名称
      softwareName: "", //软件名称
      softwareIcon: "", //图标
      iconFlie: {}, //图片文件
      formVersions: [
        {
          version: "", //版本号
          checkVersion: false, //校验版本
          description: "", //描述
          software: [
            {
              system: "", //系统
              software: {}, //软件
              softwareNameFile: "", //软件名称
              isShowSoftware: true,
              calibrationSystem: false, //校验系统
            },
          ],
          isShowVersions: true,
        },
      ],
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
      uploadFile: {
        multipartFile: {},
      },
      itemIndex: 0,
      itemIndexs: 0,
      softwareFile: "", //软件名称
      timer: {},
    };
  },
  watch: {
    // 添加成功重置参数
    resetParams() {
      this.setResetParameter();
    },
    // 监听添加版本的变化
    dataItem(item) {
      this.softwareName = item.name;
      this.softwareIcon = item.icon;
    },
    softwareType(val) {
      if (val == 1) {
        this.softwareName = "";
        this.softwareIcon = "";
      }
    },
  },
  methods: {
    // 软件名称失去焦点触发校验名称接口
    onSoftwareNameChang() {
      if (this.softwareName) {
        let formData = new FormData();
        formData.append("name", this.softwareName);
        this.$api.software.getCheckParam(formData).then((res) => {
          if (res.code == 200) {
            this.checjTheName = true;
          } else {
            this.checjTheName = false;
          }
        });
      }
    },
    // 软件版本校验
    onVersionBlur(vals) {
      if (vals.target.value) {
        let formData = new FormData();
        formData.append("name", this.softwareName);
        formData.append("version", vals.target.value);
        this.$api.software.getCheckParam(formData).then((res) => {
          if (res.code == 200) {
            this.formVersions[vals.target.name].checkVersion = true;
          } else {
            this.formVersions[vals.target.name].checkVersion = false;
            this.formVersions[vals.target.name].version = "";
          }
        });
      }
    },
    // 软件系统校验
    onSystemSelect(obj) {
      let formData = new FormData();
      formData.append("name", this.softwareName);
      formData.append("version", this.formVersions[obj.tag.index].version);
      formData.append("system", obj.label);
      this.$api.software.getCheckParam(formData).then((res) => {
        if (res.code == 200) {
          this.formVersions[obj.tag.index].software[
            obj.tag.indexs
          ].calibrationSystem = true;
        } else {
          this.formVersions[obj.tag.index].software[
            obj.tag.indexs
          ].calibrationSystem = false;
          this.formVersions[obj.tag.index].software[obj.tag.indexs].system = "";
        }
      });
    },
    //   添加版本
    newVersionsEvent() {
      this.formVersions.push({
        version: "", //版本号
        description: "", //描述
        software: [],
        isShowVersions: true,
        isShowSuccess: false,
      });
    },
    // 添加软件
    addSoftwareEvent(index) {
      this.formVersions[index].software.push({
        // name: this.softwareName, //软件名称
        // icon: this.iconFlie, //图标
        // version: this.formVersions[index].version, //版本号
        // description: this.formVersions[index].description, //描述
        system: "", //系统
        software: {}, //软件
        softwareNameFile: "", //软件名称
        isShowSoftware: true,
      });
    },
    // 删除版本
    deleteVersionsEvent(index) {
      this.formVersions[index].isShowVersions = false;
    },
    // 删除软件
    deleteSoftwareEvent(index, indexs) {
      this.formVersions[index].software[indexs].isShowSoftware = false;
      this.formVersions[index].software.splice(indexs, 1);
    },
    // 图标上传之前
    beforeUploadIcon(file) {
      this.softwareIcon = window.URL.createObjectURL(file);
      this.iconFlie = file;
    },
    // 上传之前
    beforeUploadEvent(index, indexs) {
      this.itemIndex = index;
      this.itemIndexs = indexs;
      // 触发上传事件
      this.$refs.filElem[0].dispatchEvent(new MouseEvent("click"));
    },
    // 上传成功
    getFile(event) {
      let files = event.target.files[0];
      // 软件文件
      this.formVersions[this.itemIndex].software[this.itemIndexs].software =
        files;
      // 软件名称
      this.formVersions[this.itemIndex].software[
        this.itemIndexs
      ].softwareNameFile = files.name;
    },
    // 确定按钮
    softwareConfirm() {
      if (!this.checkoutData()) {
        return false;
      }
      let versions = this.formVersions.every((item) => {
        if (!item.version) {
          this.$Notice.warning({
            title: "请输入版本号。。。",
            top: 50,
            duration: 5,
          });
          return;
        } else if (Number(item.software) == 0) {
          this.$Notice.warning({
            title: "请添加软件。。。",
            top: 50,
            duration: 5,
          });
          return;
        }
        // else if (!item.description) {
        //   this.$Notice.warning({
        //     title: "请输入描述。。。",
        //     top: 50,
        //     duration: 5,
        //   });
        //   return;
        // }
        let software = item.software.every((items) => {
          if (!items.system) {
            this.$Notice.warning({
              title: "请选择系统。。。",
              top: 50,
              duration: 5,
            });
            return;
          } else if (!items.softwareNameFile) {
            this.$Notice.warning({
              title: "请上传软件。。。",
              top: 50,
              duration: 5,
            });
            return;
          } else {
            return true;
          }
        });
        return software;
      });
      if (versions) {
        this.formVersions.forEach((item) => {
          item.software.forEach((items) => {
            let formData = new FormData();
            formData.append("name", this.softwareName);
            formData.append("icon", this.iconFlie);
            formData.append("version", item.version);
            formData.append("description", item.description);
            formData.append("system", items.system);
            formData.append("software", items.software);
            this.$emit("on-add-software-confirm", formData);
          });
        });
      }
    },
    // 取消
    cancel() {
      this.$emit("cancel", false);
    },
    // 重置
    setResetParameter() {
      if (this.softwareType == 1) {
        this.softwareName = "";
        this.softwareIcon = "";
        this.iconFlie = {};
      }
      this.formVersions = [
        {
          version: "", //版本号
          description: "", //描述
          software: [
            {
              system: "", //系统
              software: {}, //软件
              softwareNameFile: "", //软件名称
              isShowSoftware: true,
            },
          ],
          isShowVersions: true,
        },
      ];
      this.dataItem = {};
      this.checjTheName = false;
    },
    checkoutData() {
      if (!this.softwareName) {
        this.$Notice.warning({
          title: "软件名称不能为空。。。",
          top: 50,
          duration: 5,
        });
      } else if (!this.softwareIcon) {
        this.$Notice.warning({
          title: "请上传图标。。。",
          top: 50,
          duration: 5,
        });
      } else {
        return true;
      }
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
