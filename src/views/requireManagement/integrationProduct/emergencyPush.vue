<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>标题</span>
              <Input v-model="caption" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>目标编号</span>
              <Input v-model="targetNumber" class="input-style" />
              <create-report-btn title="数据上传" class="data-upload"></create-report-btn>
            </div>
            <div class="tb-header-item">
              <span>突发事件情况</span>
              <Input v-model="emergencySituation" type="textarea" :rows="4" class="textarea" />
              <create-report-btn title="上传文件" class="data-upload"></create-report-btn>
            </div>
            <div class="tb-header-item">
              <span>产品模板</span>
              <Select v-model="productTemplate" class="input-style">
                <Option
                  v-for="item in productTemplateList"
                  :value="item.value"
                  :key="item.valve"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div class="tb-header-item">
              <span>对外服务对象</span>
              <Input v-model="externalServiceTarget" class="input-style" />
              <new-btn title="对外服务" class="btn-item" @click="addServiceTarget"></new-btn>
            </div>
          </div>
        </div>

        <div class="pie-tb-footer">
          <!-- <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page> -->
          <div class="tb-header-button">
            <cancel-btn class="btn-item" onclick="window.history.back()"></cancel-btn>
            <reset-btn class="btn-item"></reset-btn>
            <create-report-btn class="btn-item" title="专报生成"></create-report-btn>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <!-- <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page> -->
          <div class="tb-header-button">
            <cancel-btn class="btn-item" onclick="window.history.back()"></cancel-btn>
            <reset-btn class="btn-item"></reset-btn>
            <create-report-btn class="btn-item" title="专报生成"></create-report-btn>
          </div>
        </div>
      </div>
    </pie-card>
    <!-- 添加对外服务对象弹出框 -->
    <div class="group-drag-modal" v-if="serviceModal">
      <drag-modal
        width="60"
        height="80"
        :selectList="selectList"
        :titleKey="titleKey"
        :targetList="targetList"
        :callBackTitleType="callBackTitleType"
        @changeType="changeType"
        @affirm="createAffirm"
        @search-group="searchGroupUser"
        @cancel="cancelGroupUser"
      ></drag-modal>
    </div>
    <!-- <my-modal
      width="30"
      height="60"
      v-model="serviceModal"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      @confirm="confirmAdd"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <RadioGroup v-model="externalServiceTargetGroup">
                <Radio
                  v-for="item in externalServiceTargetList"
                  :label="item.label"
                  :key="item.value"
                  >{{ item.label }}</Radio
                >
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </my-modal>-->
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import page from "@/components/page/page.vue";
import switchBtn from "@/components/button/switch-btn.vue";
import dragModal from "@/components/drag-list/drag-modals.vue";

export default {
  components: {
    pieCard,
    page,
    switchBtn,
    dragModal
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      caption: "", //标题
      targetNumber: "", //目标编号
      emergencySituation: "", //突发事件情况
      productTemplate: "2020年模板", //产品模板
      externalServiceTarget: "", //对外服务对象
      // 对外服务
      selectList: [],
      targetList: [],
      callBackTitleType: false,
      titleKey: "name",

      productTemplateList: [
        {
          value: "1",
          label: "2020年模板",
        },
        {
          value: "2",
          label: "2021年模板",
        },
      ],
      externalServiceTargetList: [
        {
          value: "1",
          label: "高级用户",
        },
        {
          value: "2",
          label: "普通用户",
        },
        {
          value: "3",
          label: "政府人员",
        },
        {
          value: "4",
          label: "管理员",
        },
      ],
      serviceModal: false,
      title: "",
      externalServiceTargetGroup: "", //选中对外服务对象
    };
  },
  methods: {
    //添加对外服务对象
    addServiceTarget() {
      this.serviceModal = true;
      this.title = "对外服务对象";
    },
    //确认添加
    confirmAdd() {
      this.serviceModal = false;
      this.externalServiceTarget = this.externalServiceTargetGroup;
    },
    cancel() {
      this.serviceModal = false;
    },
    //对外服务弹窗
    //获得用户
    getUserData() {
      let params = {
        endTime: "",
        enterpriseName: "",
        roleId: [],
        roleName: "",
        startTime: "",
        username: this.username,
      };
      console.log(params, "获得用户");
      this.$api.userManage.newQueryAllUser(params).then((res) => {
        console.log(res, "获得用户");
        if (res.success == true) {
          this.titleKey = "username";
          this.selectList = res.data.roleList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    //获取机构数据
    getOrganization() {
      let params = {
        name: this.name,
      };
      console.log(params, "获取机构数据");
      this.$api.userManage.querySelective(params).then((res) => {
        console.log(res, "获取机构数据");
        if (res.success == true) {
          // this.organizationList = res.data.dataList;
          // this.selectList = res.data.dataList;
          this.titleKey = "name";
          this.selectList = res.data.dataList;
        } else {
          this.$Notice.error({
            title: res.message,
            top: 50,
            duration: 5,
          });
        }
      });
    },
    // 新增类型切换
    changeType(item) {
      if (item.value == 0) {
        //机构
        this.getOrganization();
        this.callBackTitleType = true;
      } else if (item.value == 1) {
        //用户
        this.getUserData();
        this.callBackTitleType = false;
      }
    },
    //选中成员结果
    createAffirm(item) {
      console.log(item);
      this.getGroupList = item.group;
      this.getUserList = item.user;
      // this.targetList = item.list2;
      this.serviceModal = false;
    },
    // 新增搜索
    searchGroupUser(val, type) {
      console.log(val, type);
      if (type) {
        // 机构
        this.name = val;
        this.getOrganization();
      } else {
        // 用户
        this.username = val;
        this.getUserData();
      }
    },
    // 取消新增群组
    cancelGroupUser() {
      this.serviceModal = false;
    },
  },
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  height: 100%;
  .public-bg {
    height: 100%;
    /deep/ .pie-card-header {
      height: 100%;
      padding-top: 80px;
      // width: 100%;
      // display: flex;
      // align-items: center;
    }
  }
  .pie-tb-header {
    display: flex;
    justify-content: space-between;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;

    .tb-header-content {
      display: flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      margin: @table-input-space;
      color: @lable-font-color;
      width: 100%;
      .tb-header-item {
        display: flex;
        margin-bottom: @table-lable-space;
        width: 100%;
        margin-left: 30%;
        .input-style {
          margin: auto @table-lable-space;
          width: 300px;
        }
        span {
          width: 120px;
          text-align: right;
        }
        .textarea {
          margin: auto @table-lable-space;
          width: 500px;
        }
      }
    }
  }
  .btn-item {
    margin-right: @table-button-space;
  }
  /deep/ .del-btn {
    width: 100px;
    border-radius: 5px;
  }
  /deep/ .reset-btn {
    width: 100px;
    border-radius: 5px;
  }
  .tb-header-button {
    display: flex;
    justify-content: flex-end;
    // margin-top: @table-lable-space;
    margin: 10px 0;
  }
  .switch {
    margin-left: @table-lable-space;
  }
  //弹出框样式
  .modal-content-items {
    display: flex;
    padding: 0 @table-padding @table-padding @table-padding;
    font-size: @lable-font-size;
    flex-wrap: wrap;
    color: @lable-font-color;
    .ivu-radio-wrapper {
      display: flex;
      align-items: center;
      font-size: @lable-font-size;
      margin-bottom: @table-lable-space;
    }
    .ivu-radio-group {
      width: 500px;
      height: 480px;
      overflow: scroll;
    }
  }
}
// 对外服务弹出框样式
.group-drag-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>