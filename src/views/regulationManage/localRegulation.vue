<template>
  <!-- 法律 -->
  <div class="pie-tb-content">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>站内搜索</span>
              <Input v-model="selectType" class="input">
                <Select v-model="select" slot="prepend">
                  <Option
                    v-for="item in selectList"
                    :value="item.label"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </Input>
              <search-btn class="search-btn" @click="search()"></search-btn>
            </div>
            <div class="btn-content">
              <export-btn
                title="列表导出"
                @click="exportExcel()"
                class="right-btn-item"
              ></export-btn>
              <batch-delete-btn
                class="right-btn-item"
                @click="batchesDelete"
              ></batch-delete-btn>
              <new-btn
                title="加入"
                class="right-btn-item"
                @click="add"
              ></new-btn>
            </div>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="pie-tb-iscontent">
          <my-table
            border
            ref="selection"
            :columns="list"
            :data="dataList"
            @on-selection-change="multiSelect"
            :lookItem="lookItem"
            :lookIObject="lookData"
            disabled-hover
            max-height="500"
            :lookBtn="true"
            :updateBtn="true"
            :delBtn="true"
            :issueBtn="true"
            :topBtn="true"
            :upBtn="true"
            :downBtn="true"
            @look="lookInfo"
            @update="update"
            @confirmDelete="deleteUser"
            @confirmIssue="confirmIssue"
            @top="topMove"
            @up="upMove"
            @down="downMove"
          ></my-table>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <page
            :total="pageTotal"
            :pageSize="pageSize"
            :current="pageNum"
          ></page>
        </div>
      </div>
    </pie-card>
    <!-- 新建、修改弹出框 -->
    <my-modal
      width="80"
      height="80"
      v-model="isModal"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      @confirm="confirmAdd"
    >
      <div slot="operateItem">
        <div class="modal-title">
          <div class="modal-header">
            <span>法律名称</span>
            <Input v-model="topic" class="input-style" />
          </div>
          <div class="modal-header">
            <span>制定机构</span>
            <Input v-model="organization" class="input-style" />
          </div>
          <div class="modal-header">
            <look-btn
              title="预览"
              @click="preview"
              class="text-style"
            ></look-btn>
            <!-- <span class="text-style" @click="preview">预览</span>  -->
          </div>
        </div>
        <editor ref="pieEditor" v-model="content" :textType="1"></editor>
        <!-- <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span class="text">法律名称</span>
                <Input v-model="topic"  class="input-style" clearable />
              </div>
              <div class="tb-header-item">
                <span class="text">法律内容</span>
                <Input v-model="messageContent" type="textarea" :rows="4"  class="input-style" />
              </div>
              <div class="tb-header-item">
                <span class="text">制定机构</span>
                <Input v-model="organization"  class="input-style" clearable />
              </div>
              <div class="tb-header-item">
                <span class="text">发布人</span>
                <Input v-model="publisher"  class="input-style" clearable />
              </div>
              <div class="tb-header-item">
                <span class="text">描述</span>
                <Input v-model="description" type="textarea" :rows="4"  class="input-style" />
              </div>
              <div class="tb-header-item">
                <span class="text">发布状态</span>
                <Select clearable v-model="processState" class="input-style">
                  <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </my-modal>
    <!-- 预览弹出框 -->
    <my-modal
      width="80"
      height="80"
      v-model="previewModal"
      :cancelBtn="false"
      :title="title"
      :resetBtn="false"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <div class="watch">
          <div class="watch-topic">{{ topic }}</div>
          <div class="watch-item">
            <div class="watch-items">{{ createTime }}</div>
            <div class="watch-items">{{ publisher }}</div>
          </div>
          <!-- <div class="watch-content" v-html="content"></div> -->
          <div class="preview-editor">
            <editor ref="previewEditor" :textType="1"></editor>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 删除弹出框 -->
    <my-dialog
      @confirm="confirmDel"
      @cancel="cancel"
      :isModal="confirmDelete"
    ></my-dialog>
  </div>
</template>
<script>
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";
import editor from "@/components/editor/quill-editor";

export default {
  components: {
    page,
    myTable,
    editor,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      selectType: "",
      select: "",
      selectList: [
        {
          label: "名称",
          value: "1",
        },
        {
          label: "发布人",
          value: "2",
        },
        // {
        //   label: "发布时间",
        //   value: "3",
        // },
        {
          label: "制定机构",
          value: "4",
        },
      ],
      list: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          width: 70,
          type: "index",
          align: "center",
        },
        {
          title: "法律名称",
          key: "topic",
          align: "center",
          ellipsis: true,
          tooltip: true,
        },
        // {
        //   title: "生效时间",
        //   key: "createTime",
        //   align: "center",
        //   ellipsis: true,
        //   sortable: true,
        //   tooltip: true,
        // },
        // {
        //   title: "法律内容",
        //   key: "messageContent",
        //   align: "center",
        //   ellipsis: true,
        //   tooltip: true,
        // },
        {
          title: "制定机构",
          key: "organization",
          align: "center",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "发布人",
          key: "publisher",
          align: "center",
          ellipsis: true,
          tooltip: true,
        },
        {
          title: "发布时间",
          key: "createTime",
          align: "center",
          ellipsis: true,
          sortable: true,
          tooltip: true,
        },
        // {
        //   title: "描述",
        //   key: "description",
        //   align: "center",
        //   ellipsis: true,
        //   tooltip: true,
        // },
        {
          title: "发布状态",
          key: "status",
          align: "center",
          ellipsis: true,
          filters: [
            {
              label: "删除",
              value: 0,
            },
            {
              label: "草稿",
              value: 1,
            },
            {
              label: "发布",
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 0) {
              return row.status == "删除";
            } else if (value === 1) {
              return row.status == "草稿";
            } else if (value === 2) {
              return row.status == "发布";
            }
          },
        },
        {
          title: "操作",
          slot: "action",
          width: 400,
          align: "center",
        },
      ],
      dataList: [
        {
          topic: "法律",
          organization: "遵守纪律",
          publisher: "佩鲁斯",
          createTime: "2021-10-10 00:00:00",
          status: "草稿",
          index: "law",
          type: "_doc",
          indexId: "",
          score: "NaN",
          id: 1,
          publishTime: "",
          textType: "",
          top: 0,
          orderNum: 1,
          description: "",
          messageContent: "",
        },
        {
          topic: "法律",
          organization: "遵守纪律",
          publisher: "哈巴特",
          createTime: "2021-10-10 00:00:00",
          status: "发布",
          index: "law",
          type: "_doc",
          indexId: "",
          score: "NaN",
          id: 1,
          publishTime: "",
          textType: "",
          top: 0,
          orderNum: 1,
          description: "",
          messageContent: "",
        },
        {
          topic: "法律",
          organization: "遵守纪律",
          publisher: "基恩",
          createTime: "2021-10-10 00:00:00",
          status: "删除",
          index: "law",
          type: "_doc",
          indexId: "",
          score: "NaN",
          id: 1,
          publishTime: "",
          textType: "",
          top: 0,
          orderNum: 1,
          description: "",
          messageContent: "",
        },
      ], //表单列表
      lookItem: [
        //查看表单
        { key: "topic" },
        { key: "createTime" },
        { key: "messageContent" },
        { key: "organization" },
        { title: "发布人", key: "publisher" },
        { title: "发布时间", key: "publishTime" },
        { title: "描述", key: "description" },
        { title: "发布状态", key: "status" },
      ],
      stateList: [
        {
          value: "0",
          label: "删除",
        },
        {
          value: "1",
          label: "草稿",
        },
        {
          value: "2",
          label: "发布",
        },
      ],
      lookData: {},
      isModal: false,
      title: "修改",
      selectRow: [], //选中的行
      topic: "", //法律名称
      createTime: new Date().toLocaleString(), //生效时间
      messageContent: "", //法律内容
      organization: "", //制定机构
      publisher: "管理员", //发布人
      publishTime: "", //发布时间
      description: "", //描述
      processState: "", //发布状态
      confirmDelete: false, //批量删除
      previewModal: false,
      currentId: "", //删除当前行
      content: "",
      addOrUpdate: 0,
      indexId: "", //索引id
      top: "",
      orderNum: "",
      lawName: "",
      publish: "",
      entity: "",
      indexName: "localrule",
      item: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //查询数据
    getData() {
      let params = {
        topic: this.lawName.trim(),
        messageContent: "",
        publisher: this.publish.trim(),
        organization: this.entity.trim(),
        status: "",
        textType: this.indexName,
        pageNum: "",
        pageSize: "",
      };
      this.$api.regulationManage.getDocumentList(params).then((res) => {
        if (res.code == 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].status == 0) {
              res.data[i].status = "删除";
            } else if (res.data[i].status == 1) {
              res.data[i].status = "草稿";
            } else if (res.data[i].status == 2) {
              res.data[i].status = "发布";
            }
          }
          this.dataList = res.data;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //搜索
    search() {
      if (this.select == "名称") {
        this.publish = "";
        this.entity = "";
        this.lawName = this.selectType;
        this.getData();
      } else if (this.select == "发布人") {
        this.lawName = "";
        this.entity = "";
        this.publish = this.selectType;
        this.getData();
      } else {
        this.publish = "";
        this.lawName = "";
        this.entity = this.selectType;
        this.getData();
      }
    },
    // 导出按钮方法
    exportExcel() {
      if (this.selectRow.length == 0) {
        this.$Notice.warning({
          title: "导出数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
      this.selectRow.map((item) => {
        return item;
      });
      this.$refs.selection.$refs.tables.exportCsv({
        filename: "群组数据导出",
        separator: ",",
        columns: this.list.filter((col, index) => index > 0 && index < 10),
        data: this.selectRow,
      });
    },
    //查看
    lookInfo(row) {
      this.title = "查看";
      this.previewModal = true;
      this.topic = row.topic;
      this.publisher = row.publisher;
      this.createTime = row.createTime;
      this.$refs.previewEditor.content = row.messageContent;
      // this.content = row.messageContent;
      // this.lookData = row;
      // console.log(this.lookData);
      // this.$router.push({
      //   path: "/watchLaw",
      //   query: {
      //     watchLaw: row,
      //   },
      // });
      // this.$refs.selection.lookOver();
    },
    //修改弹出框
    update(row) {
      this.addOrUpdate = 1;
      this.isModal = true;
      this.title = "修改";
      this.topic = row.topic;
      this.$refs.pieEditor.content = row.messageContent;
      this.organization = row.organization;
      // this.description = row.description;
      // this.processState = row.status;
      this.createTime = row.createTime;
      this.publisher = row.publisher;
      this.indexId = row.indexId;
      this.top = row.top;
      this.orderNum = row.orderNum;
    },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
    },
    //批量删除
    batchesDelete() {
      if (this.selectRow.length > 0) {
        this.confirmDelete = true;
      } else {
        this.$Notice.warning({
          title: "批量删除数据不能为空",
          top: 50,
          duration: 5,
        });
        return;
      }
    },
    //新建弹出框
    add() {
      this.topic = "";
      this.$refs.pieEditor.content = "";
      this.organization = "";
      this.addOrUpdate = 0;
      this.isModal = true;
      this.title = "新建";
    },
    //新建/修改 确定
    confirmAdd() {
      // this.$refs.pieEditor.insertTextMessage();
      this.content = this.$refs.pieEditor.content;
      if (this.addOrUpdate == 0) {
        let params = {
          messageContent: this.content,
          organization: this.organization,
          publisher: "管理员",
          status: 1,
          textType: this.indexName,
          topic: this.topic,
        };
        this.$api.regulationManage.createInfo(params).then((res) => {
          if (res.code == 0) {
            this.isModal = false;
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            setTimeout(this.getData(), 2000);
          } else {
            this.$Notice.error({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      } else {
        let params = {
          indexId: this.indexId,
          messageContent: this.content,
          orderNum: this.orderNum,
          organization: this.organization,
          publisher: "管理员",
          status: 1,
          top: this.top,
          topic: this.topic,
        };
        this.$api.regulationManage
          .updateInfo(this.indexName, params)
          .then((res) => {
            if (res.code == 0) {
              this.isModal = false;
              this.$Notice.success({
                title: res.message,
                top: 50,
                duration: 5,
              });
              setTimeout(this.getData(), 2000);
            } else {
              this.$Notice.error({
                title: res.message,
                top: 50,
                duration: 5,
              });
            }
          });
      }
    },
    //弹出框 取消
    cancel() {
      this.isModal = false;
      this.confirmDelete = false;
    },
    //根据ID删除
    deleteUser(item) {
      this.indexId = item.indexId;
      this.batchesDeleteOpt();
    },
    //删除操作
    batchesDeleteOpt() {
      let results = this.selectRow.map((item) => item.indexId).join();
      let params = {
        ids: this.indexId ? this.indexId : results,
        indexName: this.indexName,
      };
      this.$api.regulationManage.deleteInfo(params).then((res) => {
        if (res.code == 0) {
          this.confirmDelete = false;
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });

          this.selectRow = [];
          setTimeout(this.getData(), 2000);
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //确认删除
    confirmDel() {
      this.batchesDeleteOpt();
      // this.confirmDelete = false;
    },
    //发布
    confirmIssue(item) {
      let params = {
        indexId: item.indexId,
        indexName: this.indexName,
        status: 2,
      };
      this.$api.regulationManage.issueInfo(params).then((res) => {
        if (res.code == 0) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          setTimeout(this.getData(), 2000);
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //置顶
    topMove(row) {
      let params = {
        indexId: row.indexId,
        isTop: 1,
        orderNum: row.orderNum,
        indexName: this.indexName,
      };
      this.$api.regulationManage.topInfo(params).then((res) => {
        if (res.code == 0) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          setTimeout(this.getData(), 2000);
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //上移
    upMove(row) {
      let params = {
        indexId: row.indexId,
        orderNum: row.orderNum,
        isMove: 0,
        isTop: row.top,
        indexName: this.indexName,
      };
      this.$api.regulationManage.moveInfo(params).then((res) => {
        if (res.code == 0) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          setTimeout(this.getData(), 2000);
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //下移
    downMove(row) {
      let params = {
        indexId: row.indexId,
        orderNum: row.orderNum,
        isMove: 1,
        isTop: row.top,
        indexName: this.indexName,
      };
      this.$api.regulationManage.moveInfo(params).then((res) => {
        if (res.code == 0) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          setTimeout(this.getData(), 2000);
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //预览
    preview() {
      this.title = "预览";
      this.previewModal = true;
      this.topic = this.topic;
      this.publisher = this.publisher;
      this.createTime = this.$utils.formatDate(new Date(), 0);
      // this.content = this.$refs.pieEditor.content;
      this.$refs.previewEditor.content = this.$refs.pieEditor.content;
    },
    confirm() {
      this.previewModal = false;
      setTimeout(this.getData(), 2000);
      this.$refs.previewEditor.content = "";
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-header {
  display: flex;
  justify-content: space-between;
  font-size: @lable-font-size;
  flex-wrap: wrap;

  .tb-header-content {
    display: flex;
    width: 100%;
    justify-content: inherit;
  }

  .tb-header-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: @table-input-space;
    color: @lable-font-color;

    .search-btn {
      margin-left: @search-lable-space;
    }

    .input {
      width: 400px;
    }

    span {
      margin-right: @table-lable-space;
    }
  }

  .btn-content {
    display: flex;

    .right-btn-item {
      margin-left: @table-btn-space;
    }
  }
}

.pie-tb-iscontent {
  max-width: 100%;

  .tb-style {
    max-width: 100%;
  }
}

//弹出框样式
.modal-content-items {
  display: flex;
  justify-content: center;

  .tb-header-content {
    font-size: @lable-font-size;

    .tb-header-item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-right: @table-input-space;
      color: @lable-font-color;
      margin-bottom: 20px;

      .input-style {
        margin-left: @table-lable-space;
        width: 315px;
      }

      span {
        width: 100px;
        text-align: right;
      }

      .item-title {
        margin-left: -130px;
      }
    }

    .tb-header-item:last-child {
      align-items: end;
    }
  }
}
.modal-title {
  display: flex;
  justify-content: space-between;
}
.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 20px;

  span {
    font-size: @lable-font-size;
    color: @lable-font-color;
    margin-right: 10px;
  }
  .input-style {
    width: 400px;
  }
  .text-style {
    // color: #1077f5;
    // cursor: default;
    width: 80px;
  }
}
.watch {
  color: #c9e1ff;
  padding: 20px;
  .watch-topic {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
  }
  .watch-item {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    .watch-items {
      margin-right: 10px;
    }
  }
  .watch-content {
  }
}
.preview-editor {
  /deep/.ql-toolbar.ql-snow {
    display: none;
  }
}
</style>
