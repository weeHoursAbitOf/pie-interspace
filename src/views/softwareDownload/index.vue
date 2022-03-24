<template>
  <div class="software-container">
    <pie-card :slotHeader="false" :slotFooter="false">
      <div slot="iscontent">
        <div class="software-nav">
          <div class="software-operation">
            <span class="operation-event">软件名称</span>
            <Input v-model="softwareName" placeholder style="width: 300px" />
          </div>
          <div class="software-operation">
            <share-btn
              class="operation-event"
              title="搜索"
              callBackName="on-searc-event"
              @on-searc-event="onSearcEvent"
            ></share-btn>
            <share-btn
              class="operation-event"
              title="新增软件"
              callBackName="on-add-software-event"
              @on-add-software-event="onAddSoftwareEvent"
            ></share-btn>
            <share-btn
              class="operation-event"
              title="所有版本管理"
              callBackName="on-software-version-event"
              @on-software-version-event="onSoftwareVersionEvent"
            ></share-btn>
          </div>
        </div>
      </div>
    </pie-card>
    <div class="software-content">
      <div class="software-module">
        <template v-for="(item, index) in softwareDataList">
          <use-software
            :key="index"
            :dataItem="item"
            @versions-manage-event="versionsManageEvent"
          />
        </template>
      </div>
      <div class="software-page pie-tb-footer">
        <page
          :total="pageTotal"
          :pageSize="pageSize"
          :current="pageNum"
          @pageChange="changePage"
          @pageSizeChange="handlePageSizeChange"
        />
      </div>
    </div>
    <!-- 新建弹出框 -->
    <my-modal
      width="40"
      :close="false"
      :resetBtn="false"
      :cancelBtn="false"
      :confirmBtn="false"
      v-model="isShowModel"
      :title="softwareTitle"
      zIndex="zIndex"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <new-software
              :id="id"
              :rowVersions="rowVersions"
              :softwareType="softwareType"
              :resetStatus="resetStatus"
              :resetParams="resetParams"
              @on-add-software-confirm="onAddSoftwareConfirm"
              @cancel="cancel"
            />
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 单个版本管理 -->
    <my-modal
      width="50"
      :resetBtn="false"
      :cancelBtn="false"
      :confirmBtn="false"
      v-model="isShowVersionsManage"
      @cancel="versionsCancel"
      title="版本管理"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <use-versions
              :dataItme="dataItme"
              :resetStatus="resetStatus"
              @on-revamp-versions-event="onRevampVersionsEvent"
              @on-addition-versions-event="onAdditionVersionsEvent"
              @on-resetParams-event="onResetParamsEvent"
            />
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 所有版本管理 -->
    <my-modal
      width="70"
      :resetBtn="false"
      :cancelBtn="false"
      :confirmBtn="false"
      v-model="isShowAllVersions"
      @cancel="AllVersionsCancel"
      title="版本管理"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <all-versions
              :resetStatus="resetStatus"
              @on-revamp-versions-event="onRevampVersionsEvent"
              @on-resetParams-event="onResetParamsEvent"
            />
          </div>
        </div>
      </div>
    </my-modal>
  </div>
</template>

<script>
import page from "@/components/page/page.vue";
import useSoftware from "@/components/softwareDownload/useSoftware.vue";
import newSoftware from "./newSoftware.vue";
import useVersions from "./useVersions.vue";
import allVersions from "./allVersions.vue";
export default {
  components: {
    page,
    useSoftware,
    newSoftware,
    useVersions,
    allVersions,
  },
  data() {
    return {
      pageTotal: 0, //总条数
      pageSize: 10, //条数
      pageNum: 1, //页数
      softwareName: "", //软件名称
      softwareDataList: [], //数据列表
      isShowModel: false, //创建，修改，添加软件弹框
      isShowVersionsManage: false, //单个软件版本
      isShowAllVersions: false, //所有版本
      dataItme: {},
      softwareType: 1,
      softwareTitle: "新增软件",
      rowVersions: {},
      id: "",
      resetStatus: false,
      resetParams: false,
    };
  },
  created() {
    this.getPublishList();
  },
  methods: {
    // 获取软件数据列表
    getPublishList() {
      let params = {
        pageNum: this.pageNum, //页数
        pageSize: this.pageSize, //条数
        isPublish: this.publishStatus, //发布状态
        name: this.softwareName,
      };
      this.$api.software.showIsPublishList(params).then((res) => {
        if (res.success == true) {
          this.pageTotal = res.data.total;
          this.softwareDataList = res.data.list;
        }
      });
    },
    // 页数
    changePage(num) {
      this.pageNum = num;
      this.getPublishList();
    },
    // 条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getPublishList();
    },
    //搜索
    onSearcEvent() {
      this.getPublishList();
    },
    // 新增软件
    onAddSoftwareEvent() {
      this.isShowModel = true;
      this.softwareType = 1;
      this.softwareTitle = "新增软件";
      this.rowVersions = {};
    },
    // 修改软件
    onRevampVersionsEvent(row) {
      this.isShowModel = true;
      this.softwareType = 0;
      this.softwareTitle = "修改版本";
      this.rowVersions = row;
      this.id = row.id;
    },
    // 添加版本
    onAdditionVersionsEvent(row) {
      this.isShowModel = true;
      this.softwareType = 2;
      this.softwareTitle = "添加版本";
      this.rowVersions = row;
    },
    //新增-添加-修改接口调用
    onAddSoftwareConfirm(formData) {
      if (this.softwareType == 1 || this.softwareType == 2) {
        // 新增-添加软件接口
        this.$api.software.addSoftware(formData).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getPublishList();
            this.cancel();
            this.resetStatus = !this.resetStatus;
          } else {
            this.$Notice.error({
              title: res.message,
              top: 50,
              duration: 5,
            });
          }
        });
      } else {
        // 修改更新接口
        this.$api.software.updateSoftware(formData).then((res) => {
          if (res.success == true) {
            this.$Notice.success({
              title: res.message,
              top: 50,
              duration: 5,
            });
            this.getPublishList();
            this.cancel();
            this.isShowVersionsManage = false;
            this.resetStatus = !this.resetStatus;
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
    // 所有版本管理
    onSoftwareVersionEvent() {
      this.isShowAllVersions = true;
    },
    // 版本管理
    versionsManageEvent(item) {
      this.dataItme = item;
      this.isShowVersionsManage = true;
    },
    // 删除
    onResetParamsEvent() {
      this.getPublishList();
      this.isShowVersionsManage = false;
      this.resetStatus = !this.resetStatus;
    },
    // 取消弹框
    cancel() {
      this.isShowModel = false;
      this.resetParams = !this.resetParams;
    },
    versionsCancel() {
      this.isShowVersionsManage = false;
      this.dataItme = {};
      this.resetStatus = !this.resetStatus;
    },
    AllVersionsCancel() {
      this.isShowAllVersions = false;
    },
  },
};
</script>

<style lang="less" scoped>
.software-container {
  font-size: @lable-font-size;
  color: @lable-font-color;
}
.software-nav {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .software-operation {
    display: flex;
    .operation-event {
      margin-right: 20px;
    }
  }
}
.software-content {
  display: flex;
  flex-direction: column;
  .software-module {
    width: 100%;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: auto;
    /deep/.ivu-radio-group {
      .ivu-radio {
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 1;
      }
    }
    /deep/.ivu-radio-wrapper:extend(.border) {
      width: 337px;
      height: 400px;
      margin: 20px 0 0 20px;
    }
  }
  .software-page:extend(.border) {
    margin-top: 10px;
  }
}
.software-btn {
  border: 1px solid @content-border-color;
  background-color: #151e23;
  color: @lable-font-color;
  height: 0.1875rem;
  outline: none;
}
.operation-event {
  /deep/.ivu-radio-group {
    label {
      border: 0.005208rem solid #1d3870 !important;
    }
  }
}

/deep/.ivu-radio-wrapper:after,
/deep/.ivu-radio-wrapper:before {
  width: 0 !important;
}
/deep/.ivu-radio-wrapper {
  white-space: normal !important;
}
.publish-color-red {
  color: #ed4014;
}
.publish-color-yellow {
  color: #19be6d;
}
.publish-color-blue {
  color: #2d8cf0;
}
.modal-publish-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}
</style>
