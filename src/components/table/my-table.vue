<template>
  <div>
    <Table
      :loading="loading"
      ref="tables"
      :data="data"
      :columns="columns"
      v-bind="$attrs"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
      disabled-hover
      :max-height="maxHeight"
    >
      <template slot-scope="{ row }" slot="dataHandle">
        <template v-for="(item, index) in row.userName">
          <span>{{ item.username }}</span>
          <span>;</span>
        </template>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <span v-if="videoUpdate" class="detailBtn-table">视频更新</span>
        <span
          v-if="row.isPublish == 0 ? softwarePopUpOnline : false"
          class="issueBtn-table"
          @click="popUpOnlineEvent(row)"
          >上线</span
        >
        <span
          v-if="row.isPublish != 0 ? softwareTapeOut : false"
          class="updateBtn-table"
          @click="tapeOutEvent(row)"
          >下线</span
        >

        <span
          v-if="row.status == 0 ? tapeOut : false"
          class="updateBtn-table"
          @click="tapeOutEvent(row)"
          >下线</span
        >
        <span
          v-if="row.status != 0 ? popUpOnline : false"
          class="issueBtn-table"
          @click="popUpOnlineEvent(row)"
          >上线</span
        >

        <span
          v-if="row.status == 0 ? controlsBtn : false"
          class="lookBtn-table"
          @click="controls(row)"
          >版本管理</span
        >
        <span v-if="lookBtn" class="lookBtn-table" @click="look(row)"
          >查看</span
        >
        <span
          v-if="row.status == 1 ? serviceBtn : false"
          class="serviceBtn-table"
          @click="service(row)"
          >对外服务</span
        >
        <span
          v-if="row.acceptanceStatus != 10 ? progress : false"
          class="issueBtn-table"
          @click="progressEvent(row)"
          >进度</span
        >
        <span
          v-if="row.acceptanceStatus == 10 ? progress : false"
          class="table-btn-gray-color"
          >进度</span
        >
        <span
          v-if="row.acceptanceStatus == 0 ? checkProductBtn : false"
          class="checkBtn-table"
          @click="checkProductEvent(row)"
          >审核</span
        >
        <span
          v-if="row.acceptanceStatus != 0 ? checkProductBtn : false"
          class="table-btn-gray-color"
          >审核</span
        >
        <span
          v-if="row.acceptanceStatus == 6 ? manualService : false"
          class="serviceBtn-table"
          @click="manualServiceEvent(row)"
          >人工服务</span
        >
        <span
          v-if="row.acceptanceStatus != 6 ? manualService : false"
          class="table-btn-gray-color"
          >人工服务</span
        >

        <span
          v-if="checkBtn && row.isCheckup == 0"
          class="checkBtn-table"
          @click="check(row)"
          >待审核</span
        >
        <span
          v-if="checkBtn && row.isCheckup != 0"
          class="checkBtn-table isCheck"
          >已审核</span
        >
        <span v-if="updateBtn" class="updateBtn-table" @click="update(row)"
          >修改</span
        >

        <span v-if="submitBtn" class="submitBtn-table" @click="submit(row)"
          >提交</span
        >
        <span
          v-if="row.status == 0 ? issueBtn : false"
          class="issueBtn-table"
          @click="issue(row)"
          >发布</span
        >
        <span
          v-if="topBtn"
          :class="row.top == 1 ? 'issueBtn-table' : 'topBtn-table'"
          @click="top(row)"
          >{{ row.top == 1 ? "取消置顶" : "立即置顶" }}</span
        >
        <span v-if="upBtn" class="submitBtn-table" @click="up(row)">上移</span>
        <span v-if="downBtn" class="submitBtn-table" @click="down(row)"
          >下移</span
        >
        <span v-if="backBtn" class="backBtn-table" @click="back(row)"
          >回复</span
        >
        <span v-if="detailBtn" class="detailBtn-table" @click="detail(row)"
          >详情</span
        >

        <span
          v-if="downloadBtn"
          class="backBtn-table"
          @click="downloadClick(row)"
          >下载</span
        >
        <Poptip
          placement="left-end"
          confirm
          transfer
          title="title"
          @on-ok="confirmDelete(row)"
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
          <span v-if="delBtn" class="delBtn-table">删除</span>
        </Poptip>
      </template>
    </Table>
    <table-details
      :isModal="isModal"
      :tableTitle="lookItem"
      :dataObject="lookIObject"
      @lookOver="lookOverOK"
    ></table-details>
    <!-- 提交弹出框 -->
    <my-dialog
      @confirm="confirmSubmit"
      @cancel="cancelSubmit"
      :isModal="isSubmit"
      content="确定要提交吗?"
    ></my-dialog>
    <!-- 发布弹出框 -->
    <my-dialog
      @confirm="confirmIssue"
      @cancel="cancelIssue"
      :isModal="isIssue"
      content="确定要发布吗?"
    ></my-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import tableDetails from "@/components/table/table-details.vue";

export default {
  name: "tableContent",
  components: {
    tableDetails,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    lookBtn: {
      //查看按钮是否显示
      type: Boolean,
      default: false,
    },
    checkBtn: {
      //审核按钮是否显示
      type: Boolean,
      default: false,
    },
    updateBtn: {
      //修改按钮是否显示
      type: Boolean,
      default: false,
    },
    delBtn: {
      //删除按钮是否显示
      type: Boolean,
      default: false,
    },
    submitBtn: {
      //提交按钮是否显示
      type: Boolean,
      default: false,
    },
    issueBtn: {
      //发布按钮是否显示
      type: Boolean,
      default: false,
    },
    topBtn: {
      //置顶按钮是否显示
      type: Boolean,
      default: false,
    },
    upBtn: {
      //上移按钮是否显示
      type: Boolean,
      default: false,
    },
    downBtn: {
      //下移按钮是否显示
      type: Boolean,
      default: false,
    },
    backBtn: {
      //反馈按钮是否显示
      type: Boolean,
      default: false,
    },
    detailBtn: {
      //详情按钮是否显示
      type: Boolean,
      default: false,
    },
    controlsBtn: {
      //版本管理按钮是否显示
      type: Boolean,
      default: false,
    },
    serviceBtn: {
      //对外服务按钮是否显示
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: String,
      default: "500",
    },
    //查看字段
    lookItem: {
      type: Array,
      default: () => {
        return [];
      },
    },
    lookIObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    videoUpdate: {
      type: Boolean,
      default: false,
    },
    popUpOnline: {
      type: Boolean,
      default: false,
    },
    tapeOut: {
      type: Boolean,
      default: false,
    },
    softwarePopUpOnline: {
      type: Boolean,
      default: false,
    },
    softwareTapeOut: {
      type: Boolean,
      default: false,
    },
    topThread: {
      type: Boolean,
      default: false,
    },
    // 下载
    downloadBtn: {
      type: Boolean,
      default: false,
    },
    // 审核
    checkProductBtn: {
      type: Boolean,
      default: false,
    },
    // 进度
    progress: {
      type: Boolean,
      default: false,
    },
    // 人工服务
    manualService: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentExpandIndex: undefined,
      isModal: false,
      isIssue: false,
      isSubmit: false,
      item: {},
      deleteVal: "",
    };
  },

  methods: {
    // 审核
    checkProductEvent(row) {
      this.$emit("check-product-event", row);
    },
    // 进度
    progressEvent(row) {
      this.$emit("progress-event", row);
    },
    // 人工服务
    manualServiceEvent(row) {
      this.$emit("manual-serviceevent", row);
    },
    // 上线
    popUpOnlineEvent(row) {
      this.$emit("popUpOnlineEvent", row);
    },
    // 下线
    tapeOutEvent(row) {
      this.$emit("tapeOutEvent", row);
    },
    // 下载
    downloadClick(row) {
      this.$emit("download", row);
    },
    // videoUpdateClick(row) {
    //   this.$emit("videoUpdate", row);
    // },
    look(row) {
      this.$emit("look", row);
    },
    check(row) {
      console.log(row);
      this.$emit("check", row);
    },
    update(row) {
      this.$emit("update", row);
    },
    submit(row) {
      this.isSubmit = true;
      this.item = row;
    },
    issue(row) {
      // this.isIssue = true;
      // this.item = row;
      this.$emit("issue", row);
    },
    top(row) {
      this.$emit("top", row);
    },
    up(row) {
      this.$emit("up", row);
    },
    down(row) {
      this.$emit("down", row);
    },
    detail(row) {
      this.$emit("detail", row);
    },
    back(row) {
      this.$emit("back", row);
    },
    controls(row) {
      this.$emit("controls", row);
    },
    service(row) {
      this.$emit("service", row);
    },
    //查看
    lookOver(item) {
      this.isModal = true;
      console.log(item);
    },
    //确定查看
    lookOverOK() {
      this.isModal = false;
    },
    expandRow(row, index) {
      // 展开某一行 供ref使用
      if (this.getCurrentExpandIndex != undefined) {
        if (this.getCurrentExpandIndex != index) {
          // 已有展开的行  而且不是当前点击行
          this.$refs.tablesMain.toggleExpand(this.getCurrentExpandIndex);
          this.$store.dispatch("myData/setCurrentExpandIndex", index);
          // this.currentExpandIndex = index;
          this.$refs.tablesMain.toggleExpand(index);
        } else {
          // 点击的是已经展开的行
          this.$refs.tablesMain.toggleExpand(index);
          // this.currentExpandIndex = undefined;
          this.$store.dispatch("myData/setCurrentExpandIndex", undefined);
        }
      } else {
        // 还没有展开的行
        // this.currentExpandIndex = index;
        this.$store.dispatch("myData/setCurrentExpandIndex", index);
        this.$refs.tablesMain.toggleExpand(index);
      }
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("on-current-change", currentRow, oldCurrentRow);
    },
    onSelect(selection, row) {
      this.$emit("on-select", selection, row);
    },
    onSelectCancel(selection, row) {
      this.$emit("on-select-cancel", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    onFilterChange(row) {
      this.$emit("on-filter-change", row);
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status);
    },

    //确定删除
    confirmDelete(row) {
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
          this.$emit("confirmDelete", row);
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
    //取消删除
    cancelDelete() {
      this.deleteVal = "";
    },
    //确定发布
    confirmIssue(item) {
      this.isIssue = false;
      this.$emit("confirmIssue", this.item);
    },
    //取消发布
    cancelIssue() {
      this.isIssue = false;
    },
    //确定提交
    confirmSubmit(item) {
      this.isSubmit = false;
      this.$emit("confirmSubmit", item);
    },
    //取消提交
    cancelSubmit() {
      this.isSubmit = false;
    },
  },
};
</script>
<style lang="less">
table {
  width: 100% !important;
}

.center-left {
  float: left;
  width: 300px;
}

.ivu-poptip-popper .ivu-poptip-confirm .ivu-poptip-transfer .v-transfer-dom {
  left: 1271px !important;
}

.ivu-poptip-popper {
  min-width: 300px;
}

//表格按钮颜色
.lookBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}
.serviceBtn-table,
.updateBtn-table {
  margin-right: 15px;
  color: #fab600;
  cursor: pointer;
}
.delBtn-table {
  margin-right: 15px;
  color: #ff0000;
  cursor: pointer;
}
.submitBtn-table {
  margin-right: 15px;
  color: #5581b7;
  cursor: pointer;
}
.issueBtn-table {
  margin-right: 15px;
  color: rgb(0, 156, 92);
  cursor: pointer;
}
.topBtn-table,
.upBtn-table,
.upLineBtn-table,
.downLineBtn-table,
.downBtn-table {
  margin-right: 15px;
  color: #c9e1ff;
  cursor: pointer;
}
.backBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}
.detailBtn-table {
  margin-right: 15px;
  color: rgb(0, 156, 92);
  cursor: pointer;
}
.checkBtn-table {
  margin-right: 15px;
  color: #00aeff;
  cursor: pointer;
}

.isCheck {
  color: #9a9a9a;
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
.table-btn-gray-color {
  margin-right: 15px;
  color: #999;
  cursor: pointer;
}
</style>
