<template>
  <div class="versions-manage-content">
    <div class="versions-manage-btn">
      <Button class="software-btn" @click="onAddSoftwareEvent">添加版本</Button>
    </div>
    <my-table
      border
      ref="selection"
      :columns="columns"
      height="400"
      disabled-hover
      :data="data"
      :lookItem="lookItem"
      :lookIObject="lookData"
      :updateBtn="true"
      :detailBtn="true"
      :delBtn="true"
      :softwarePopUpOnline="true"
      :softwareTapeOut="true"
      :span-method="handleSpan"
      @update="update"
      @detail="detail"
      @confirmDelete="confirmDelete"
      @popUpOnlineEvent="popUpOnlineEvent"
      @tapeOutEvent="tapeOutEvent"
    ></my-table>
    <div class="pie-tb-footer">
      <page
        :total="pageTotal"
        :pageSize="pageSize"
        :current="pageNum"
        @pageChange="changePage"
        @pageSizeChange="handlePageSizeChange"
      ></page>
    </div>
    <my-modal
      width="20"
      :resetBtn="false"
      v-model="isShowVersions"
      @confirm="confirm"
      @cancel="cancel"
      :title="versionTitle"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div v-if="versionsTyle == 0">是否上线？</div>
          <div v-else>是否下线？</div>
        </div>
      </div>
    </my-modal>
  </div>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
import myModal from "@/components/modals/modal.vue";
export default {
  props: {
    dataItem: {
      type: Object,
    },
    resetParams: {
      type: Boolean,
      default: false,
    },
    publishStatus: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          width: 100,
          type: "index",
          align: "center",
        },
        {
          title: "软件名称",
          width: 200,
          key: "name",
          align: "center",
          ellipsis: true,
        },
        {
          title: "软件版本",
          width: 150,
          key: "lastversion",
          align: "center",
        },
        {
          title: "软件系统",
          width: 200,
          key: "system",
          align: "center",
        },
        {
          title: "状态",
          width: 150,
          key: "isPublish",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.isPublish == 0 ? "未发布" : "已发布");
          },
        },
        {
          title: "软件描述",
          key: "description",
          width: 350,
          align: "center",
          ellipsis: true,
        },
        {
          title: "操作",
          width: 300,
          key: "operation",
          slot: "action",
          align: "center",
        },
      ],
      data: [
        {
          sid: 0,
          name: "系统能力linux",
          alias: "",
          category: "software",
          description:
            "fdsfdsf的撒旦搞一哈设计的考试费u撒谎的你涉及面非常宽松的大师傅似的见风使舵士大夫大师傅士大夫是对都是符合当时士大夫士大夫大师傅",
          lastversion: "v2",
          keyword: "",
          icon: require("../../assets/home/brief.svg"),
          isPublish: 1,
          system: "linux",
          versionStatus: "",
          createTime: "2021-02-03 00:00:00",
        },
        {
          sid: 0,
          name: "系统能力linux",
          alias: "",
          category: "software",
          description:
            "fdsfdsf的撒旦搞一哈设计的考试费u撒谎的你涉及面非常宽松的大师傅似的见风使舵士大夫大师傅士大夫是对都是符合当时士大夫士大夫大师傅",
          lastversion: "v2",
          keyword: "",
          icon: require("../../assets/home/brief.svg"),
          isPublish: 1,
          system: "linux",
          versionStatus: "",
          createTime: "2021-02-03 00:00:00",
        },
      ],
      pageTotal: 10,
      pageSize: 10,
      pageNum: 1,
      lookItem: [
        { title: "软件名称", key: "name" },
        { title: "软件系统", key: "system" },
        { title: "软件版本", key: "lastversion" },
        { title: "发布时间", key: "updatetime" },
        { title: "软件状态", key: "isPublish" },
        { title: "软件内存", key: "size" },
        { title: "存储名称", key: "filepath" },
        { title: "描述", key: "description" },
      ],
      lookData: {},
      item: {},
      versionTitle: "上线",
      isShowVersions: false,
      versionsTyle: 0,
      sId: 0,
    };
  },
  components: {
    myTable,
    page,
    myModal,
  },
  watch: {
    dataItem(item) {
      this.item = item;
      this.getSelectAllSoftware(item);
    },
    resetParams() {
      this.getSelectAllSoftware(this.item);
    },
  },
  methods: {
    // 查询所有版本数据列表
    getSelectAllSoftware(item) {
      let formData = new FormData();
      formData.append("name", item.name);
      formData.append("isPublish", this.publishStatus);
      formData.append("pageNum", this.pageNum);
      formData.append("pageSize", this.pageSize);
      this.$api.software.selectAllSoftware(formData).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.data = res.data.rows;
          this.$emit("reset-params", !this.resetParams);
        }
      });
    },
    //   页数
    changePage(num) {
      this.pageNum = num;
      this.getSelectAllSoftware(this.dataItem);
    },
    //   条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getSelectAllSoftware(this.dataItem);
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      let arr = [];
      let pos = 0;
      this.data.forEach((item, index) => {
        if (index === 0) {
          arr.push(1);
          pos = 0;
        } else {
          // this.data[index].description == this.data[index - 1].description
          if (
            this.data[index].name == this.data[index - 1].name &&
            this.data[index].lastversion == this.data[index - 1].lastversion
          ) {
            arr[pos] += 1;
            arr.push(0);
          } else {
            arr.push(1);
            pos = index;
          }
        }
      });
      if (
        columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 5
      ) {
        const _row = arr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // 添加软件
    onAddSoftwareEvent() {
      this.$emit("addition-software-event", this.dataItem);
    },
    // 修改
    update(row) {
      this.$emit("update-software-event", row);
    },
    // 上线
    popUpOnlineEvent(row) {
      this.isShowVersions = true;
      this.versionTitle = "上线";
      this.versionsTyle = 0;
      this.sId = row.sid;
    },
    // 下线
    tapeOutEvent(row) {
      this.isShowVersions = true;
      this.versionTitle = "下线";
      this.versionsTyle = 1;
      this.sId = row.sid;
    },
    // 确定上下线
    confirm() {
      if (this.versionsTyle == 0) {
        let params = {
          name: "",
          sid: this.sId,
        };
        this.$api.software.publish(params).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getSelectAllSoftware(this.dataItem);
            this.$emit("reset-data-event");
            this.cancel();
          }
        });
      } else {
        let params = {
          name: "",
          sid: this.sId,
        };
        this.$api.software.offline(params).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getSelectAllSoftware(this.dataItem);
            this.$emit("reset-data-event");
            this.cancel();
          }
        });
      }
    },
    // 取消
    cancel() {
      this.isShowVersions = false;
    },
    // 删除
    confirmDelete(row) {
      this.$api.software.deleteSoftwar(row.sid).then((res) => {
        if (res.success == true) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });

          this.getSelectAllSoftware(this.dataItem);
          this.$emit("reset-data-event");
        }
      });
    },
    // 详情
    detail(row) {
      let formData = new FormData();
      formData.append("name", row.name);
      formData.append("sid", row.sid);
      formData.append("isPublish", row.isPublish);
      formData.append("pageNum", "");
      formData.append("pageSize", "");
      this.$api.software.showSoftwareDetail1(formData).then((res) => {
        if (res.success == true) {
          res.data.list[0].filepath = res.data.list[0].filepath.substring(
            res.data.list[0].filepath.lastIndexOf("/") + 1
          );
          res.data.list[0].isPublish =
            res.data.list[0].isPublish == 0 ? "未发布" : "已发布";
          res.data.list[0].updatetime = this.$utils.formatDate(
            res.data.list[0].updatetime,
            0
          );
          this.lookData = res.data.list[0];
          this.$refs.selection.lookOver();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.versions-manage-btn {
  height: 50px;
  position: relative;
}
.software-btn {
  border: 1px solid @content-border-color;
  background-color: #151e23;
  color: @lable-font-color;
  height: 0.1875rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
.modal-content-items {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}
</style>
