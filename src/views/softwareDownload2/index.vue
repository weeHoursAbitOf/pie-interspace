<template>
  <div class="software-container">
    <pie-card :slotHeader="false" :slotFooter="false">
      <div slot="iscontent">
        <div class="software-nav">
          <div class="software-operation">
            <div class="operation-event">
              <RadioGroup
                v-model="publishStatus"
                type="button"
                button-style="solid"
                @on-change="publishStatusChange"
              >
                <!-- <Radio label class="software-btn publish-color-blue">全部</Radio>
                <Radio label="0" class="software-btn publish-color-red">未发布</Radio>
                <Radio label="1" class="software-btn publish-color-yellow">已发布</Radio> -->
                <Radio label class="software-btn">全部</Radio>
                <Radio label="0" class="software-btn">未发布</Radio>
                <Radio label="1" class="software-btn">已发布</Radio>
              </RadioGroup>
            </div>
            <div class="operation-event">
              <span class="operation-event">软件名称</span>
              <Input v-model="softwareName" placeholder style="width: 300px" />
            </div>
          </div>
          <div class="software-operation">
            <share-btn
              class="operation-event"
              title="搜索"
              callBackName="on-searc-event"
              @on-searc-event="onSearcEvent"
            ></share-btn>
            <share-btn
              v-show="publishStatus == 0 || publishStatus == ''"
              class="operation-event"
              title="上线"
              callBackName="on-punlish-event"
              @onPunlishEvent="onPunlishEvent(1)"
            ></share-btn>
            <share-btn
              v-show="publishStatus == 1 || publishStatus == ''"
              class="operation-event"
              title="下线"
              callBackName="on-punlish-event"
              @onPunlishEvent="onPunlishEvent(0)"
            ></share-btn>
            <share-btn
              class="operation-event"
              title="新增软件"
              callBackName="on-add-software-event"
              @on-add-software-event="onAddSoftwareEvent"
            ></share-btn>
          </div>
        </div>
      </div>
    </pie-card>
    <div class="software-content">
      <div class="software-module">
        <!-- <template v-for="(item, index) in softwareDataList">
          <use-software
            :key="index"
            :dataItem="item"
            @versions-manage-event="versionsManageEvent"
          />
        </template> -->
        <RadioGroup v-model="publishName">
          <Radio
            v-for="(item, index) in softwareDataList"
            :key="index"
            :label="item.name"
          >
            <use-software
              :dataItem="item"
              @versions-manage-event="versionsManageEvent"
            />
          </Radio>
        </RadioGroup>
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
            <!-- <addModificationSoftware
              v-show="softwareType == 0"
              :resetName="resetName"
              :dataItem="items"
              :updateDataItme="updateDataItme"
              :resetParams="resetParams"
              :itemId="itemId"
              :softwareType="softwareType"
              @cancel="cancel"
              @on-add-software-confirm="onAddSoftwareConfirm"
              @reset-params="resetParamsEvent"
            /> -->
            <!-- v-show="softwareType != 0" -->
            <new-software
              :resetParams="resetParams"
              :dataItem="items"
              :softwareType="softwareType"
              @cancel="cancel"
              @on-add-software-confirm="onAddSoftwareConfirm"
            />
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 版本管理 -->
    <my-modal
      width="50"
      :resetBtn="false"
      :cancelBtn="false"
      :confirmBtn="false"
      v-model="isShowVersionsManage"
      @cancel="versiomsCancel"
      title="版本管理"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <!-- <versionsManage
              :publishStatus="publishStatus"
              :dataItem="dataItem"
              :resetParams="resetParams"
              @addition-software-event="additionSoftwareEvent"
              @update-software-event="updateSoftwareEvent"
              @reset-params="resetParamsEvent"
              @reset-data-event="resetDataEvent"
            /> -->
            <use-versions
              :systemList="systemList"
              :dataItem="dataItem"
              :resetParams="resetParams"
              @addition-software-event="additionSoftwareEvent"
              @on-reset-data-event="onResetDataEvent"
            />
          </div>
        </div>
      </div>
    </my-modal>

    <my-modal
      width="50"
      :resetBtn="false"
      v-model="isShowPublish"
      @cancel="cancel"
      @confirm="confirmPublish"
      :title="publishTitle"
    >
      <div slot="operateItem">
        <div class="modal-publish-content">
          <p>是否{{ isPublishStatus == 0 ? "下线" : "上线" }}该软件。。。</p>
        </div>
      </div>
    </my-modal>
  </div>
</template>

<script>
// import publicSoftware from "@/components/softwareDownload/publicSoftware.vue";
// import versionsManage from "./versionsManage.vue";
import useSoftware from "@/components/softwareDownload/useSoftware.vue";
import useVersions from "./useVersions.vue";
import myModal from "@/components/modals/modal.vue";
// import addModificationSoftware from "./addModificationSoftware.vue";
import page from "@/components/page/page.vue";
import newSoftware from "./newSoftware.vue";
export default {
  data() {
    return {
      publishStatus: "", //发布状态
      softwareName: "", //软件名称
      pageTotal: 10, //总条数
      pageSize: 10, //条数
      pageNum: 1, //页数
      softwareDataList: [
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
          isPublish: 0,
          system: "linux",
          versionStatus: "",
          createTime: "2021-02-03 00:00:00",
        },
        {
          sid: 0,
          name: "系统能力linu2x",
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
      softwareTitle: "新增软件",
      softwareType: 0,
      isShowModel: false,
      isShowVersionsManage: false,
      dataItem: {},
      items: {},
      updateDataItme: {},
      resetParams: false,
      itemId: undefined,
      resetName: false,
      systemList: [], //软件系统
      publishName: "",
      isShowPublish: false, //上线，下线弹框
      publishTitle: "上线",
      isPublishStatus: "0", //发布状态
    };
  },
  components: {
    // publicSoftware,
    // versionsManage,
    // addModificationSoftware,
    useSoftware,
    useVersions,
    myModal,
    page,
    newSoftware,
  },
  created() {
    this.getPublishList();
    this.getSearchSystemField();
  },
  methods: {
    // 获取软件系统
    getSearchSystemField() {
      this.$api.software.getSearchSystemField().then((res) => {
        this.systemList = res.data;
      });
    },
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
    // 筛选状态
    publishStatusChange(val) {
      this.publishStatus = val;
      this.getPublishList();
    },
    // 添加软件
    onAddSoftwareEvent() {
      this.isShowModel = true;
      this.softwareTitle = "新增软件";
      this.softwareType = 1;
      this.resetName = !this.resetName;
    },

    // 版本管理
    versionsManageEvent(item) {
      // if (item.windows != undefined) {
      //   this.dataItem = item.windows;
      // } else {
      //   this.dataItem = item.linux;
      // }
      this.dataItem = item;
      this.isShowVersionsManage = true;
    },
    // 添加版本
    additionSoftwareEvent(row) {
      this.items = row;
      this.isShowModel = true;
      this.softwareTitle = "添加版本";
      this.softwareType = 2;
    },

    // 更新软件
    updateSoftwareEvent(row) {
      this.updateDataItme = row;
      this.isShowModel = true;
      this.softwareTitle = "修改软件";
      this.softwareType = 0;
      this.itemId = row.sid;
    },
    //新增-添加-修改接口调用
    onAddSoftwareConfirm(formData) {
      if (this.softwareType == 1 || this.softwareType == 2) {
        // 新增-添加软件接口
        this.$api.software.addSoftware(formData).then((res) => {
          if (res.success == true) {
            this.getPublishList();
            this.cancel();
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
      } else {
        // 修改更新接口
        this.$api.software.updateSoftware(formData).then((res) => {
          if (res.success == true) {
            this.getPublishList();
            this.cancel();
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
      }
    },
    // 上线 下线
    onPunlishEvent(val) {
      if (this.publishName) {
        if (val == 0) {
          this.publishTitle = "下线";
        } else {
          this.publishTitle = "上线";
        }
        this.isPublishStatus = val;
        this.isShowPublish = true;
      } else {
        this.$Notice.error({
          title: "请选择一条数据。。。",
          top: 50,
          duration: 5,
        });
      }
    },
    confirmPublish() {
      let formData = new FormData();
      formData.append("isPublish", this.isPublishStatus);
      formData.append("name", this.publishName);
      this.$api.software.getIsPublish(formData).then((res) => {
        if (res.code == 200) {
          this.$Notice.success({
            title: res.message,
            top: 50,
            duration: 5,
          });
          this.getPublishList();
          this.cancel();
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
    cancel() {
      this.isShowModel = false;
      this.isShowPublish = false;
      this.resetParams = !this.resetParams;
      this.publishName = "";
    },
    // 版本取消
    versiomsCancel() {
      this.dataItem = {};
    },
    // 编辑完成之后刷新数据列表
    onResetDataEvent() {
      this.getPublishList();
      this.cancel();
      this.isShowVersionsManage = false;
    },
    // // 重置状态
    // resetParamsEvent() {
    //   this.resetParams = false;
    // },
    // // 上线-下线-删除重置数据
    // resetDataEvent() {
    //   this.getPublishList();
    // },
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
