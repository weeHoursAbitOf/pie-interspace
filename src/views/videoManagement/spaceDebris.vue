<template>
  <div>
    <div class="shot-title">空间碎片监测中心（北京）</div>

    <div class="pie-tb-content">
      <div class="tb-header-content">
        <div
          class="tb-header-item"
          v-for="(item, index) in titleList"
          :key="index"
        >
          <div class="tb-header-item-title">{{ item.title }}</div>
          <div class="video-box">
            <template>
              <video-box
                @look="lensSelect"
                @issue="issue"
                @playback="playback"
                @classics="classics"
                class="video-box-item"
                :videoSrc="videoSrc"
                :id="index"
              ></video-box>
            </template>
          </div>
        </div>
      </div>
      <!-- 镜头选择 -->
      <my-modal
        width="20"
        height="30"
        @cancel="cancel"
        @confirm="lensconfirm"
        v-model="isLensSelect"
      >
        <div slot="operateItem" class="shotSelect">
          <div class="modal-content-items">
            <div slot="iscontent">
              <div class="tb-header-content">
                <div>
                  <RadioGroup v-model="lensList" vertical size="large">
                    <!-- <Radio
                    v-for="(item, index) in shotList"
                    :key="index"
                    label="item"
                  >
                    <span>{{ item }}</span>
                  </Radio> -->
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
    </div>
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
      shotList: [], //镜头列表
      title: "",
      lensList: "", //镜头选择
      titleList: [
        {
          id: 1,
          title: "国际交流中心入口",
        },
        {
          id: 2,
          title: "国际交流中心大厅",
        },
        {
          id: 3,
          title: "国际交流中心设备机房",
        },
        {
          id: 4,
          title: "监测中心入口",
        },
        {
          id: 5,
          title: "监测中心工作大厅",
        },
        {
          id: 6,
          title: "监测中心值班室",
        },
        {
          id: 7,
          title: "监测中心设备机房",
        },
        {
          id: 8,
          title: "综合楼入口",
        },
        {
          id: 9,
          title: "综合楼大厅",
        },
        {
          id: 10,
          title: "综合楼值班室",
        },
        {
          id: 11,
          title: "综合楼设备机房",
        },
        {
          id: 12,
          title: "消防泵房",
        },
      ],
      isCancelLens: false,
      isLook: false,
      isPlayback: false,
      isLensSelect: false,
      backModal: false,
      isUpdate: false,
      videoSrc: "../../assets/public/video.mp4",
      time: "",
      isClassics: false, //经典镜头管理
    };
  },
  mounted() {
    for (let i = 401056003; i <= 401056102; i++) {
      this.shotList.push(i);
    }
  },
  methods: {
    //查看
    tableLook(row) {
      this.lookData = row;
      this.$refs.selection.lookOver();
    },
    //修改弹出框
    tableUpdate(row) {
      this.isUpdate = true;
      this.announcementName = row.announcementName;
      this.content = row.content;
      this.description = row.description;
      this.status = row.processState;
      this.publisher = row.publisher;
    },

    //经典镜头管理
    classics() {
      this.isClassics = true;
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
.shot-title {
  font-size: 24px;
  color: @main-font-color;
  margin-bottom: 10px;
}
.pie-tb-content {
  display: flex;
  width: 100%;
  max-height: 700px;
  overflow-y: scroll;
  padding-right: 10px;
  .tb-header-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: inherit;

    .tb-header-item:extend(.border) {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 20px;
      padding: 20px 0;
      margin: 10px 0;
      width: 49%;

      .video-box {
        /deep/.template-item .template-item-left {
          flex-direction: initial !important;
        }
      }

      .tb-header-item-title {
        width: 15%;
        font-size: 24px;
        color: @table-text-color;
      }
    }
  }
}
.operate-item {
  .tb-header-item {
    color: #fff;
    border: none !important;
  }
  .labelText {
    width: 120px;
    line-height: 36px;
    margin: 0 20px 0 0;
    font-size: 16px;
  }
  .playback-item {
    margin-bottom: 40px !important;
  }
  .radio {
    line-height: 32px;
  }
}

.table {
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
  justify-content: flex-end;

  .right-btn-item {
    margin-left: @table-btn-space;
  }
}
.text {
  width: 110px;
}
.pie-tb-content .tb-header-content .tb-header-item .video-box {
  width: auto !important;
}
.pie-tb-content .tb-header-content .tb-header-item .tb-header-item-title {
  width: auto !important;
  margin-left: 0 !important;
}
.shotSelect {
  // height: 200px;
  // overflow-y: scroll;
  // padding: 0 0 40px 0;
  color: @main-font-color;
}
.ivu-radio-large {
  font-size: 18px;
  margin: 20px 0 10px 40px;
}
</style>
