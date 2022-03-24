<template>
  <div class="use-versions-content">
    <div class="use-versions-name-icon">
      <ol>
        <li>
          <p>软件名称：</p>
          <span>
            <Input
              v-model="softwareName"
              :disabled="disabledStatus"
              placeholder=""
              style="width: 200px"
            />
          </span>
        </li>
        <li>
          <p>软件图标：</p>
          <span>
            <Upload
              action
              :before-upload="beforeUploadIcon"
              :disabled="disabledStatus"
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
          <p>软件描述：</p>
          <span>
            <Input
              v-model="description"
              :disabled="disabledStatus"
              type="textarea"
              :rows="6"
              placeholder
              style="width: 820px"
            />
          </span>
        </li>
        <li>
          <p>选择系统：</p>
          <span>
            <Select v-model="system" style="width: 200px">
              <Option
                v-for="(item, index) in systemList"
                :value="item"
                :key="index"
                >{{ item }}</Option
              >
            </Select>
          </span>
          <div class="use-versions-top-btn" v-show="dataItem.isPublish == 0">
            <Button
              :disabled="!disabledStatus"
              class="software-btn"
              @click="newVersions(row)"
              >添加版本</Button
            >
          </div>
        </li>
      </ol>
    </div>
    <div class="use-versions-table">
      <Table
        border
        ref="selection"
        :columns="columns"
        :data="versionsList"
        height="200"
        disabled-hover
      >
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button class="software-btn" @click="detail(row)">详情</Button>
          <Poptip
            placement="left-end"
            confirm
            transfer
            title="title"
            @on-ok="verifyDelete(row)"
            @on-cancel="cancelDelete"
            ok-text="确定"
            cancel-text="取消"
            :disabled="disabledStatus"
            v-show="dataItem.isPublish == 0"
          >
            <div slot="title" class="poptip-delete-content">
              <p>
                输入
                <b>DELETE</b> 删除该消息！
              </p>
              <span>
                <Input
                  v-model="deleteVal"
                  placeholder="请输入DELETE将其删除。。。"
                  style="width: 300px"
                />
              </span>
            </div>
            <Button :disabled="disabledStatus" class="software-btn"
              >删除</Button
            >
          </Poptip>
        </template>
      </Table>
      <div class="pie-tb-footer">
        <page
          :total="pageTotal"
          :pageSize="pageSize"
          :current="pageNum"
          @pageChange="changePage"
          @pageSizeChange="handlePageSizeChange"
        ></page>
      </div>
    </div>
    <div class="use-versions-top-btn" v-show="dataItem.isPublish == 0">
      <Button v-show="disabledStatus" class="software-btn" @click="editSoftware"
        >编辑</Button
      >
    </div>
    <div class="use-versions-bottom-btn" v-show="dataItem.isPublish == 0">
      <Button
        v-show="!disabledStatus"
        class="software-btn"
        @click="editSoftware(row)"
        >取消编辑</Button
      >
      <Button
        v-show="!disabledStatus"
        class="software-btn"
        @click="softwareConfirm"
        >完成编辑</Button
      >
    </div>
    <table-details
      :isModal="isShowTableDetails"
      :tableTitle="tableTitle"
      :dataObject="dataObject"
      @lookOver="lookOver"
    />
  </div>
</template>

<script>
import page from "@/components/page/page.vue";
import tableDetails from "@/components/table/table-details.vue";
export default {
  props: {
    systemList: {
      type: Array,
    },
    dataItem: {
      type: Object,
    },
  },
  data() {
    return {
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      disabledStatus: true, //禁用状态
      softwareName: "", //软件名称
      softwareIcon: "", //软件图标
      softwareIconFile: {},
      description: "", //软件描述
      system: "", //系统
      // systemList: [
      //   {
      //     value: "linux",
      //     label: "linux",
      //   },
      //   {
      //     value: "windows",
      //     label: "windows",
      //   },
      // ],
      columns: [
        {
          title: "序号",
          width: 97,
          type: "index",
          align: "center",
        },
        {
          title: "软件版本",
          width: 100,
          key: "version",
          align: "center",
        },
        {
          title: "软件系统",
          width: 150,
          key: "system",
          align: "center",
        },
        {
          title: "上传时间",
          width: 300,
          key: "createTime",
          align: "center",
        },
        {
          title: "操作",
          width: 250,
          key: "operation",
          slot: "action",
          align: "center",
        },
      ],
      versionsList: [
        {
          lastversion: "1.0",
          createTime: "2021-10-03 00:00:00",
        },
      ],
      deleteVal: "", //校验删除
      isShowTableDetails: false,
      tableTitle: [
        { title: "软件名称", key: "name" },
        { title: "软件系统", key: "system" },
        { title: "软件版本", key: "version" },
        { title: "应用名称", key: "filepath" },
        { title: "创建时间", key: "updateTime"},
        { title: "软件状态", key: "isPublish" },
        { title: "软件描述", key: "description" },
      ],
      dataObject: {},
    };
  },
  watch: {
    dataItem(item) {
      this.softwareName = item.name;
      this.softwareIcon = item.icon;
      this.description = item.description;
      this.system = item.system;
      this.disabledStatus = true;
    },
    system() {
      this.getSearchSystem();
    },
    resetParams() {
      this.getSearchSystem();
    },
  },
  components: {
    page,
    tableDetails,
  },
  methods: {
    getSearchSystem() {
      let formData = new FormData();
      formData.append("name", this.softwareName);
      formData.append("system", this.system);
      formData.append("pageNum", this.pageNum);
      formData.append("pageSize", this.pageSize);
      this.$api.software.getSearchSystem(formData).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          let data = res.data.list;
          data.map(
            (item) =>
              (item.createTime = this.$utils.formatDate(item.createTime, 0))
          );
          this.versionsList = data;
        }
      });
    },
    // 页数
    changePage(num) {
      this.pageNum = num;
      this.getSearchSystem();
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getSearchSystem();
    },
    //   上传文件之前
    beforeUploadIcon(file) {
      this.softwareIcon = window.URL.createObjectURL(file);
      // 用于传送参数
      this.softwareIconFile = file;
    },
    // 添加版本
    newVersions() {
      this.$emit("addition-software-event", this.dataItem);
    },
    // 编辑软件
    editSoftware() {
      this.disabledStatus = !this.disabledStatus;
    },
    // 编辑完成
    softwareConfirm() {
      let formData = new FormData();
      formData.append("sid", this.sid);
      formData.append("name", this.softwareName);
      formData.append("icon", this.softwareIconFile);
      formData.append("description", this.description);
      this.$api.software.updateSoftware(formData).then((res) => {
        if (res.code == 200) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          // this.getSearchSystem();
          this.$emit("on-reset-data-event");
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 取消
    cancel() {},
    // 详情
    detail(row) {
      this.dataObject = row;
      this.isShowTableDetails = true;
    },
    // 详情取消
    lookOver() {
      this.isShowTableDetails = false;
    },
    // --------------------------------
    //校验删除
    verifyDelete(row) {
      let params = {
        str: this.deleteVal,
      };
      // 用于验证单个删除delete
      this.$api.user.judgeD(params).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.confirmDelete(row);
          this.deleteVal = "";
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.deleteVal = "";
        }
      });
    },
    // 删除
    confirmDelete(row) {
      let params = {
        id: row.id,
      };
      this.$api.software.deleteVersions(params).then((res) => {
        if (res.code == 200) {
          this.getSearchSystem();
          if (this.versionsList.length == 1) {
            this.$emit("on-reset-data-event");
          }
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //校验删除取消
    cancelDelete() {
      this.deleteVal = "";
    },
  },
};
</script>

<style lang="less" scoped>
.use-versions-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
  position: relative;
  .use-versions-top-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .use-versions-bottom-btn {
    position: absolute;
    bottom: -50px;
    right: 0;
    z-index: 1;
  }
}
.use-versions-table {
  padding-top: 10px;
}
ol {
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    align-items: center;
    margin: 5px 0;
    position: relative;
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
.poptip-delete-content {
  b {
    color: red;
  }
  span {
    display: block;
    padding-top: 20px;
  }
}
</style>
