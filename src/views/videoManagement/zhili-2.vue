<template>
  <div class="pie-tb-content">
    <div class="shot-title">2.5米口径望远镜</div>
    <div class="shot-content">
      <div class="shot-item">
        <div class="tb-header-item-title">实时镜头</div>
        <div class="video-box">
          <video-box class="video-box-item" :videoList="false"></video-box>
        </div>
      </div>
      <div class="shot-item">
        <div class="tb-header-item-title">历史镜头</div>
        <div class="video-box">
          <video-box class="video-box-item" :playbackBtn="true"></video-box>
        </div>
      </div>
      <div class="shot-item">
        <div class="tb-header-item-title">经典镜头</div>
        <div class="video-box">
          <video-box class="video-box-item" :classicsBtn="true" @classics="classics"></video-box>
        </div>
      </div>
    </div>
    <!-- 镜头选择 -->
    <my-modal width="20" height="40" @cancel="cancel" @confirm="lensconfirm" v-model="isLensSelect">
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <RadioGroup v-model="lensList" vertical>
                  <Radio label="镜头一">
                    <span>镜头一</span>
                  </Radio>
                  <Radio label="镜头二">
                    <span>镜头二</span>
                  </Radio>
                  <Radio label="镜头三">
                    <span>镜头三</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 镜头取消弹出框 -->
    <my-dialog
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      :isModal="isCancelLens"
      content="确定要取消吗?"
    ></my-dialog>
    <!-- 历史回放设置 -->
    <my-modal
      width="30"
      height="50"
      :resetBtn="true"
      @cancel="cancel"
      @reset="reset"
      @confirm="backConfirm"
      v-model="backModal"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item playback-item">
                <label class="labelText" for>历史回放</label>
                <DatePicker
                  type="datetime"
                  placeholder="Select date and time"
                  style="width: 200px"
                  :value="time"
                  @on-change="change"
                ></DatePicker>
              </div>

              <div class="tb-header-item">
                <label class="labelText" for>回放周期</label>
                <RadioGroup class="radio">
                  <Radio label="30分钟"></Radio>
                  <Radio label="60分钟"></Radio>
                  <Radio label="120分钟"></Radio>
                  <Radio label="自定义">
                    自定义
                    <Input type="text" name id placeholder="请输入时间（单位：分钟）" />
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 经典镜头管理 -->
    <my-modal @cancel="cancel" @confirm="classicsConfirm" v-model="isClassics">
      <div slot="operateItem" class="operate-item">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="table">
                <span>站内搜索</span>
                <Input v-model="keyWord" class="input"></Input>
                <search-btn class="search-btn"></search-btn>
              </div>
              <div class="btn-content">
                <export-btn title="列表导出" @click="exportExcel()" class="right-btn-item"></export-btn>
                <batch-delete-btn class="right-btn-item"></batch-delete-btn>
                <new-btn title="创建" class="right-btn-item" @click="add"></new-btn>
              </div>

              <div class="pie-tb-iscontent">
                <my-table
                  border
                  ref="selection"
                  :columns="list"
                  :data="data"
                  @on-selection-change="multiSelect"
                  :lookItem="lookItem"
                  :lookIObject="lookData"
                  disabled-hover
                  max-height="500"
                  :lookBtn="true"
                  :updateBtn="true"
                  :delBtn="true"
                  @look="tableLook"
                  @update="tableUpdate"
                  @videoUpdateClick="videoUpdate"
                ></my-table>
              </div>
              <div slot="footer">
                <div class="pie-tb-footer">
                  <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 修改弹出框 -->
    <my-modal
      width="30"
      height="60"
      @cancel="cancelUpdate"
      :title="title"
      :resetBtn="false"
      @confirm="confirmUpdate"
      v-model="isUpdate"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span class="text">经典镜头名称</span>
                <Input v-model="announcementName" class="input-style" clearable />
              </div>
              <div class="tb-header-item">
                <span class="text">创建人</span>
                <Input v-model="description" class="input-style" clearable />
              </div>
              <div class="tb-header-item">
                <span class="text">创建时间</span>
                <Input v-model="content" :rows="4" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span class="text">拍摄时间</span>
                <Input v-model="publishTime" class="input-style" clearable />
              </div>
              <div class="tb-header-item">
                <span class="text">目标编号</span>
                <Input v-model="publisher" :rows="4" class="input-style" />
              </div>

              <div class="tb-header-item">
                <span class="text">描述</span>
                <Input v-model="status" type="textarea" :rows="4" class="input-style" />
              </div>
              <div class="tb-header-item uploading" v-if="title == '修改'">
                <new-btn title="上传视频"></new-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>
<script>
import VideoBox from "@/components/video-box/video-box2.vue";
import MyDialog from "@/components/dialog/dialog.vue";
import myModal from "@/components/modals/modal2.vue";
import batchDeleteBtn from "@/components/button/batch-delete-btn.vue";
import exportBtn from "@/components/button/export-btn.vue";
import searchBtn from "@/components/button/search-btn.vue";
import newBtn from "@/components/button/new-btn.vue";
//import deleteBtn from '@/components/button/delete-btn.vue';
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    VideoBox,
    MyDialog,
    myModal,
    batchDeleteBtn,
    exportBtn,
    searchBtn,
    newBtn,
    page,
    myTable,
  },
  data() {
    return {
      keyWord: "", //搜索关键字
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      lensList: "", //镜头选择
      title: "", //弹出框，名称

      isCancelLens: false,
      isLook: false,
      isPlayback: false,
      isLensSelect: false,
      backModal: false,
      isUpdate: false,
      videoSrc: "../../assets/public/video.mp4",
      time: "",
      isClassics: false, //经典镜头管理
      list: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          width: 70,
          key: "number",
          align: "center",
        },
        {
          title: "经典镜头名称",
          key: "announcementName",
          align: "center",
        },
        {
          title: "拍摄时间",
          key: "publishTime",
          align: "center",
          ellipsis: true,
          sortable: true,
        },
        {
          title: "目标编号",
          key: "publisher",
          align: "center",
          ellipsis: true,
        },
        {
          title: "创建时间",
          key: "content",
          align: "center",
          ellipsis: true,
        },
        {
          title: "创建人",
          key: "description",
          align: "center",
          ellipsis: true,
        },
        {
          title: "描述",
          key: "status",
          align: "center",
          ellipsis: true,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                  domProps: {
                    title: params.row.status,
                  },
                },
                params.row.status
              ),
            ]);
          },
        },
        {
          title: "操作",
          slot: "action",
          width: 400,
          align: "center",
        },
      ],
      data: [
        {
          number: 1,
          announcementName: "xxx航天器",
          publishTime: "2016-10-03",
          publisher: "xxx",
          content: "2016-10-4",
          description: "创建人",
          status: "这是一段对经典镜头的描述",
        },
        {
          number: 2,
          announcementName: "xxx航天器",
          publishTime: "2016-10-03",
          publisher: "xxx",
          content: "2016-10-4",
          description: "创建人",
          status: "这是一段对经典镜头的描述",
        },
        {
          number: 3,
          announcementName: "xxx航天器",
          publishTime: "2016-10-03",
          publisher: "xxx",
          content: "2016-10-4",
          description: "创建人",
          status: "这是一段对经典镜头的描述",
        },
        {
          number: 4,
          announcementName: "xxx航天器",
          publishTime: "2016-10-03",
          publisher: "xxx",
          content: "2016-10-4",
          description: "创建人",
          status: "这是一段对经典镜头的描述",
        },
        {
          number: 5,
          announcementName: "xxx航天器",
          publishTime: "2016-10-03",
          publisher: "xxx",
          content: "2016-10-4",
          description: "创建人",
          status: "这是一段对经典镜头的描述",
        },
        {
          number: 6,
          announcementName: "xxx航天器",
          publishTime: "2016-10-03",
          publisher: "xxx",
          content: "2016-10-4",
          description: "创建人",
          status: "这是一段对经典镜头的描述",
        },
      ],
      fileTypeList: [
        {
          value: "0",
          label: "文本",
        },
        {
          value: "1",
          label: "CVS",
        },
      ],
      lookItem: [
        //查看表单
        { title: "经典镜头名称", key: "announcementName" },
        { title: "拍摄时间", key: "publishTime" },
        { title: "目标编号", key: "publisher" },
        { title: "创建时间", key: "content" },
        { title: "创建人", key: "description" },
        { title: "描述", key: "status" },
      ],
      stateList: [
        {
          value: "0",
          label: "未发布",
        },
        {
          value: "1",
          label: "已发布",
        },
      ],
      lookData: {},
      announcementName: "", //公告名称
      content: "", //公告内容
      description: "", //创建人
      publishTime: "", //拍摄时间
      processState: "", //发布状态
      publisher: "", //目标编号
      status: "", //描述
      // ------------------------------------------------------------
      titleList: [
        {
          id: 1,
          title: "实时镜头",
        },
        {
          id: 2,
          title: "历史镜头",
        },
        {
          id: 3,
          title: "经典镜头",
        },
      ],
    };
  },
  methods: {
    videoUpdate() {
      console.log("视频更新");
    },
    //查看
    tableLook(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    //修改弹出框
    tableUpdate(row) {
      (this.title = "修改"), (this.isUpdate = true);
      this.announcementName = row.announcementName;
      this.content = row.content;
      this.publishTime = row.publishTime;
      this.description = row.description;
      this.status = row.status;
      this.publisher = row.publisher;
    },

    //提交
    confirmSubmit(row) { },
    //多选
    multiSelect(selection) {
      this.selectRow = selection;
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
        columns: this.list.filter((col, index) => index > 0 && index < 8),
        data: this.selectRow,
      });
    },
    //经典镜头管理
    classics() {
      this.isClassics = true;
    },
    // 点击新建按钮
    add() {
      (this.title = "新建"), (this.isUpdate = true);
    },
    //经典镜头管理确认
    classicsConfirm() {
      this.isClassics = false;
    },
    cancelUpdate() {
      this.isUpdate = false;
    },
    confirmUpdate() {
      this.isUpdate = false;
    },
    //镜头选择确认按钮
    lensconfirm() {
      console.log(this.lensList);
      this.isLensSelect = false;
    },
    //镜头选择
    lensSelect() {
      this.isLensSelect = true;
    },
    //镜头取消-取消
    cancelDelete() {
      this.isLook = false;
      this.isCancelLens = false;
    },
    //镜头取消-确认
    confirmDelete() {
      this.isLook = false;
      this.isCancelLens = false;
    },

    //控制镜头取消弹出框
    issue() {
      this.isCancelLens = true;
    },
    // 历史回放弹出框
    playback() {
      this.backModal = true;
    },
    //历史回放确认按钮
    backConfirm() {
      this.backModal = false;
    },

    cancel() {
      this.isLensSelect = false;
      this.isClassics = false;
      this.backModal = false;
    },
    reset() {
      this.time = "";
    },
    change(newval, oldVal) {
      this.time = newval;
      console.log(newval, oldVal);
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  .shot-title {
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: @main-font-color;
    padding-left: 10px;
  }
  .shot-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    .shot-item:extend(.border) {
      flex: 1;
      margin: 0 10px;
      .tb-header-item-title {
        height: 150px;
        line-height: 150px;
        font-size: 24px;
        color: @table-text-color;
        text-align: center;
      }

      //   .video-box {
      //     // display: flex;
      //     // justify-content: flex-end;
      //     // flex-wrap: wrap;
      //     margin-top: 20px;
      //     width: 100%;

      //     .video-box-item {
      //       margin-right: 10px;
      //       /deep/ .video-btn {
      //         margin-top: 30%;
      //       }
      //       /deep/ .play-btn {
      //         width: 60px;
      //       }
      //     }
      //     /deep/.template-item-left {
      //       flex-direction: column;
      //       .template-item-img {
      //         width: 400px;
      //         height: 250px;
      //       }
      //       .template-item-btn {
      //         margin-top: 50px;
      //       }
      //     }
      //   }
    }
  }
  //
  // .tb-header-content {
  //   display: flex;
  //   flex-direction: column;
  //   width: inherit;

  //   .tb-header-item {
  //     display: flex;
  //     margin-bottom: 20px;
  //     font-size: 18px;
  //     padding: 0 30px;
  //     // box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
  //     // border: 1px solid @main-border-color;
  //     .text {
  //       width: 33%;
  //     }
  //     .video-box {
  //       display: flex;
  //       justify-content: flex-end;
  //       flex-wrap: wrap;
  //       width: 100%;

  //       .video-box-item {
  //         margin-right: 10px;
  //       }
  //     }

  //     .tb-header-item-title {
  //       width: 20%;
  //       font-size: 24px;
  //       color: @table-text-color;
  //       height: 30px;
  //       margin: auto;
  //       margin-left: 50px;
  //     }
  //   }
  // }
}

// .operate-item {
//   .tb-header-item {
//     color: #fff;
//     border: none !important;
//   }
//   .labelText {
//     width: 120px;
//     line-height: 36px;
//     margin: 0 20px 0 0;
//     font-size: 16px;
//   }
//   .playback-item {
//     margin-bottom: 40px !important;
//   }
//   .radio {
//     line-height: 32px;
//   }
//   .pie-tb-footer {
//     display: flex;
//     justify-content: flex-end;
//   }
// }

// .table {
//   display: flex;
//   align-items: center;
//   white-space: nowrap;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   margin-right: @table-input-space;
//   color: @lable-font-color;

//   .search-btn {
//     margin-left: @search-lable-space;
//   }

//   .input {
//     width: 400px;
//   }

//   span {
//     margin-right: @table-lable-space;
//     font-size: 16px;
//   }
// }

// .btn-content {
//   display: flex;
//   justify-content: flex-end;
//   margin-bottom: 20px;
//   .right-btn-item {
//     margin-left: @table-btn-space;
//   }
// }
// .text {
//   width: 110px;
// }
// /deep/.look-item {
//   color: #fff;
// }
// .uploading {
//   display: flex;
//   justify-content: flex-end;
//   margin: 10px 0;
// }
</style>
