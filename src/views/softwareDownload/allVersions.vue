<template>
  <div class="use-versions-content">
    <div class="use-versions-name-icon">
      <ol>
        <li>
          <p>软件名称：</p>
          <span>
            <Input v-model="softwareName" placeholder="" style="width: 200px" />
          </span>
        </li>
        <li>
          <p>版本号：</p>
          <span>
            <Input v-model="versions" placeholder="" style="width: 200px" />
          </span>
        </li>
        <li>
          <p>上传时间:</p>
          <span>
            <DatePicker
              :vlaue="beginTime"
              type="datetime"
              placeholder=""
              style="width: 200px"
            />
          </span>
          <p style="padding: 0 10px">~</p>
          <span>
            <DatePicker
              :vlaue="endTime"
              type="datetime"
              placeholder=""
              style="width: 200px"
            />
          </span>
        </li>
        <li>
          <p>选择系统：</p>
          <span>
            <Select v-model="system" style="width: 200px">
              <Option
                v-for="(item, index) in systemList"
                :value="item.label"
                :key="index"
                >{{ item.label }}</Option
              >
            </Select>
          </span>
        </li>
        <li>
          <p></p>
          <span>
            <share-btn
              class="operation-event"
              title="搜索"
              callBackName="on-searc-event"
              @on-searc-event="onSearcEvent"
            />
          </span>
        </li>
      </ol>
    </div>
    <div class="use-versions-table">
      <Table
        border
        ref="selection"
        :columns="columns"
        :data="versionsList"
        height="450"
        disabled-hover
      >
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button class="software-btn" @click="detail(row)">详情</Button>
          <Button class="software-btn" @click="revamp(row)">修改</Button>
          <Poptip
            placement="left-end"
            confirm
            transfer
            title="title"
            @on-ok="verifyDelete(row)"
            @on-cancel="cancelDelete"
            ok-text="确定"
            cancel-text="取消"
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
            <Button class="software-btn">删除</Button>
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
  components: {
    page,
    tableDetails,
  },
  props: {
    resetStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      softwareName: "", //软件名称
      versions: "", //版本号
      system: "", //系统
      systems: "",
      systemList: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "linux",
        },
        {
          value: "2",
          label: "windows",
        },
      ],
      beginTime: "", //开始时间
      endTime: "", //结束时间
      columns: [
        {
          title: "序号",
          width: 80,
          type: "index",
          align: "center",
        },
        {
          title: "软件名称",
          width: 150,
          key: "name",
          align: "center",
        },
        {
          title: "版本号",
          width: 100,
          key: "version",
          align: "center",
        },
        {
          title: "软件系统",
          width: 100,
          key: "system",
          align: "center",
        },
        {
          title: "应用名称",
          width: 200,
          key: "filepath",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              params.row.filepath.substring(
                params.row.filepath.lastIndexOf("/") + 1
              )
            );
          },
        },
        {
          title: "软件大小",
          width: 100,
          key: "size",
          align: "center",
        },
        {
          title: "上传时间",
          width: 250,
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h("div", this.$utils.formatDate(params.row.createTime));
          },
        },
        {
          title: "操作",
          width: 300,
          key: "operation",
          slot: "action",
          align: "center",
        },
      ],
      versionsList: [],
      sid: 0,
      isShowTableDetails: false,
      deleteVal: "", //校验删除
      tableTitle: [
        { title: "软件名称", key: "name" },
        { title: "软件系统", key: "system" },
        { title: "软件版本", key: "version" },
        { title: "应用名称", key: "filepath" },
        { title: "创建时间", key: "updateTime" },
        { title: "软件描述", key: "description" },
      ],
      dataObject: {},
    };
  },
  watch: {
    resetStatus() {
      this.getSearchSoftware();
    },
  },
  mounted() {
    this.system = "0";
    this.getSearchSoftware();
  },
  methods: {
    getSearchSoftware() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        version: this.versions,
        system: this.systems,
        name: this.softwareName,
        startTime: this.beginTime,
        endTime: this.endTime,
      };
      this.$api.software.searchSoftware(params).then((res) => {
        if (res.success) {
          this.pageTotal = res.data.total;
          this.versionsList = res.data.list;
        }
      });
    },
    // 搜索
    onSearcEvent() {
      if (this.system == "0") {
        this.systems = "";
      } else if (this.system == "1") {
        this.systems = "linux";
      } else {
        this.systems = "windows";
      }
      this.getSearchSoftware();
    },
    // 页数
    changePage(num) {
      this.pageNum = num;
      this.getSearchSoftware();
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getSearchSoftware();
    },
    // 修改
    revamp() {
      this.$emit("on-revamp-versions-event");
    },
    // 详情
    detail(row) {
      row.filepath.substring(row.filepath.lastIndexOf("/") + 1);
      this.dataObject = row;
      this.isShowTableDetails = true;
    },
    // 详情取消
    lookOver() {
      this.isShowTableDetails = false;
    },
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
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getSearchSoftware();
          this.cancelDelete();
          if (this.versionsList.length == 1) {
            this.$emit("on-resetParams-event");
          }
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
    // 重置参数
    setResetParamster() {
      this.softwareName = "";
      this.versions = "";
      this.system = "";
      this.beginTime = "";
      this.endTime = "";
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
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    padding: 5px;
    display: flex;
    align-items: center;
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
