<template>
  <!-- 预警产品 -->
  <div class="pie-tb-content">
    <m-tabs :dataList="tabsData" @clickTabs="clickTabs"></m-tabs>
    <!-- 待发布 -->
    <issue-template
      :title="releasTitle"
      :dataList="dataList"
      @lookOver="lookOver"
      @controlvs="controlvs"
      @edit="edit"
      @deleteOperation="deleteOperation"
      @issue="issue"
    >
      <div slot="operateItem">
        <div class="tb-header-content">
          <div class="tb-header-item">
            <span>目标名称</span>
            <Input v-model="targetName" placeholder="请输入目标名称" class="input-style" />
          </div>
          <div class="tb-header-item">
            <span>目标编号</span>
            <Input v-model="targetNumber" placeholder="请输入目标编号" class="input-style" />
          </div>
          <div class="tb-header-item">
            <span>生成时间</span>
            <DatePicker
              type="date"
              split-panels
              placeholder="选择生成时间"
              class="input-style"
              @on-change="selectTime"
            ></DatePicker>
            <search-btn class="search-btn" @click="searchEvent"></search-btn>
          </div>
          <batch-join-btn class="right-btn-item" @click="join"></batch-join-btn>
        </div>
        <!-- <div class="tb-header-button"> -->
        <!-- </div> -->
      </div>
    </issue-template>
    <!-- 已发布 -->
    <issue-template
      :title="releasedTitle"
      :dataList="dataList"
      :issueBtn="false"
      @lookOver="lookOver"
      @controlvs="controlvs"
      @edit="edit"
      @deleteOperation="deleteOperation"
    >
      <div slot="operateItem">
        <div class="tb-header-content">
          <div class="tb-header-item">
            <span>目标名称</span>
            <Input v-model="targetName" placeholder="请输入目标名称" class="input-style" />
          </div>
          <div class="tb-header-item">
            <span>目标编号</span>
            <Input v-model="targetNumber" placeholder="请输入目标编号" class="input-style" />
          </div>
          <div class="tb-header-item">
            <span>生成时间</span>
            <DatePicker
              type="date"
              split-panels
              placeholder="选择生成时间"
              class="input-style"
              @on-change="selectTime"
            ></DatePicker>
            <search-btn class="search-btn" @click="searchEvent"></search-btn>
          </div>
          <batch-join-btn class="right-btn-item" @click="join"></batch-join-btn>
        </div>
      </div>
    </issue-template>
    <!-- 版本管理弹出框 -->
    <my-modal
      width="60"
      height="70"
      :isModal="isModal"
      @cancel="addCancel"
      title="版本管理"
      :cancelBtn="false"
      :resetBtn="false"
      :confirmBtn="false"
      :close="true"
    >
      <div slot="operateItem">
        <div class="modal-header-content">
          <batch-join-btn class="right-btn-item" @click="join"></batch-join-btn>
        </div>
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="pie-tb-iscontent">
              <Table
                border
                ref="selection"
                :columns="list"
                max-height="500px"
                disabled-hover
                :data="data"
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 加入(编辑)弹出框 -->
    <my-modal
      width="30"
      height="60"
      :isModal="isModalJoin"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      :close="true"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <!-- <div class="tb-header-content"> -->
            <div class="tb-header-item">
              <span>目标名称</span>
              <Input v-model="targetName" placeholder="请输入目标名称" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>目标编号</span>
              <Input v-model="targetNumber" placeholder="请输入目标编号" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>生成时间</span>
              <DatePicker type="date" split-panels placeholder="请选择生成时间" class="input-style"></DatePicker>
            </div>
            <div class="tb-header-item">
              <span>上传图片</span>
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 删除弹出框 -->
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isDelete"></my-dialog>
    <!-- 发布弹出框 -->
    <my-dialog @confirm="confirmDelete" @cancel="cancelDelete" :isModal="isIssue" content="确定要发布吗?"></my-dialog>
  </div>
</template>
<script>
import issueTemplate from "@/components/templateMangment/issue-template.vue";
import searchBtn from "@/components/button/search-btn.vue";
import batchJoinBtn from "@/components/button/batch-join-btn.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import mTabs from "@/components/templateMangment/tabs.vue";
import myModal from "@/components/modals/modal.vue";


export default {
  components: {
    issueTemplate,
    searchBtn,
    batchJoinBtn,
    batchDeleteBtn,
    mTabs,
    myModal,
  },
  data() {
    return {
      releasTitle: "待发布",
      releasedTitle: "已发布",
      dataList: [
        { imgUrl: require("@/assets/public/earlyWarningProduct.svg") },
        { imgUrl: require("@/assets/public/earlyWarningProduct.svg") },
        { imgUrl: require("@/assets/public/earlyWarningProduct.svg") },
        { imgUrl: require("@/assets/public/earlyWarningProduct.svg") },
      ],
      tabsData: [
        {
          title: "发射碰撞预警",
          id: 0,
        },
        {
          title: "在轨碰撞避碰",
          id: 1,
        },
        {
          title: "解体事件分析",
          id: 2,
        },
        {
          title: "陨落事件分析",
          id: 3,
        },
        {
          title: "安全规避分析",
          id: 4,
        },
      ],
      productType: "",
      templateName: "",
      applyRange: "",
      isModal: false,
      isModalJoin: false,
      isDelete: false,
      isIssue: false,
      list: [
        {
          type: "selection",
          width: 52,
          align: "center",
        },
        {
          title: "序号",
          key: "number",
          align: "center",
          width: 70,
        },
        {
          title: "版本号",
          key: "versionNum",
          align: "center",
        },
        {
          title: "生成时间",
          key: "generateTime",
          ellipsis: true,
          align: "center",
          ellipsis: true,
        },
        {
          title: "完成人",
          key: "completePer",
          ellipsis: true,
          align: "center",
          ellipsis: true,
        },
        {
          title: "版本描述",
          key: "versionDescribe",
          ellipsis: true,
          align: "center",
          ellipsis: true,
        },
        {
          title: "操作",
          key: "operation",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "export",
                    size: "small",
                  },
                  style: {
                    marginRight: "15px",
                  },
                  on: {
                    click: () => {
                      // this.showDetail(params.row.uuid);
                      this.$refs.selection.exportCsv({
                        filename: "数据导出统计",
                      });
                    },
                  },
                },
                "导出"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "15px",
                  },
                  on: {
                    click: () => {
                      // this.showDetail(params.row.uuid);
                    },
                  },
                },
                "更新"
              ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "error",
              //       size: "small",
              //     },
              //     on: {
              //       click: () => {
              //         // this.showDelete(params.row.uuid, params.row.ruleName);
              //       },
              //     },
              //   },
              //   "删除"
              // ),
              h('Button',
                {
                  props: { type: 'warning', size: 'small' },
                }, [
                h('Poptip', {
                  props: {
                    confirm: true,
                    transfer: true,
                    placement: 'left-end',
                    title: '确定要删除吗！',
                    type: 'error',
                    size: 'small',
                    width: '200',

                  },
                  on: {
                    'on-ok': () => {
            
                      this.$Notice.success({
                        title: '删除成功',
                        top: 50,
                        duration: 5,
                      });
                    },
                    'on-cancel': function () {
                      this.$Notice.error({
                        title: '点击了取消',
                        top: 50,
                        duration: 5,
                      });
                    }
                  }
                }, '删除')
              ]),
            ]);
          },
        },
      ],
      data: [
        // {
        //   number: 1,
        //   versionNum: "V1.6",
        //   generateTime: "2021-09-17  14:00:00",
        //   completePer: "主任",
        //   versionDescribe: "这是一段版本描述",
        // },
        // {
        //   number: 2,
        //   versionNum: "V1.5",
        //   generateTime: "2021-09-17  14:00:00",
        //   completePer: "组长",
        //   versionDescribe: "这是一段版本描述",
        // },
        // {
        //   number: 3,
        //   versionNum: "V1.4",
        //   generateTime: "2021-09-17  14:00:00",
        //   completePer: "总工",
        //   versionDescribe: "这是一段版本描述",
        // },
        // {
        //   number: 4,
        //   versionNum: "V1.3",
        //   generateTime: "2021-09-17  14:00:00",
        //   completePer: "主任",
        //   versionDescribe: "这是一段版本描述",
        // },
        // {
        //   number: 5,
        //   versionNum: "V1.2",
        //   generateTime: "2021-09-17  14:00:00",
        //   completePer: "主任",
        //   versionDescribe: "这是一段版本描述",
        // },
        // {
        //   number: 6,
        //   versionNum: "V1.1",
        //   generateTime: "2021-09-17  14:00:00",
        //   completePer: "主任",
        //   versionDescribe: "这是一段版本描述",
        // },
      ],
      title: "新建",
      createTime: "",
      targetName: "",
      targetNumber: ""
    };
  },
  methods: {
    // 点击加入弹出框
    join() {
      this.isModalJoin = true;
      this.title = "新建"
    },
    // 点击编辑弹出框
    edit() {
      this.isModalJoin = true;
      this.title = "编辑"
    },
    lookOver() { },
    // 点击版本管理弹出框
    controlvs() {
      this.isModal = true;
    },
    show() {
      this.isModal = true;
    },
    ok() {
      this.$Notice.success({
        title: "Clicked ok",
        top: 50,
        duration: 5,
      });
    },
    //取消编辑
    cancel() {
      this.isModalJoin = false;
    },
    addCancel() {
      this.isModal = false;
    },
    clickTabs(val) {
      console.log(val);
    },
    //取消删除(发布)
    cancelDelete() {
      this.isDelete = false;
      this.isIssue = false;
    },
    //删除操作
    deleteOperation() {
      this.isDelete = true;
    },
    //确认删除（发布）
    confirmDelete() {
      this.isDelete = false;
      this.isIssue = false;
    },
    //发布操作
    issue() {
      this.isIssue = true;
    },
    //搜索
    searchEvent() {

    },
    selectTime(val) {
      this.createTime = val;
      console.log(val)
    },
    init() {
      let params = {
        createTime: this.createTime,
        targetName: this.targetName,
        targetNumber: this.targetNumber
      }
    }
  },
};
</script>
<style lang="less" scoped>
.tb-header-content {
  display: flex;
  font-size: @lable-font-size;

  .tb-header-button {
    display: flex;
  }

  .search-btn {
    margin-left: @search-lable-space;
  }
}

.tb-header-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-right: @table-input-space;
  color: @lable-font-color;
  margin-bottom: @table-input-space;
  font-size: @lable-font-size;

  .input-style {
    margin-left: @table-lable-space;
    width: 280px;
  }
}
.modal-header-content {
  display: flex;
  justify-content: flex-end;
  margin-bottom: @table-input-space;
}
</style>