<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>生成时间</span>
              <!-- <Select
                v-model="statisticTime"
                class="input-style"
                @on-change="isInput"
              >
                <Option
                  v-for="item in statisticTimeList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <Input
                v-model="statisticTime"
                class="input-style"
                v-if="startInputBox"
              />-->
              <DatePicker
                type="datetime"
                split-panels
                placeholder="选择时间"
                class="input-style"
                :options="options"
              ></DatePicker>
            </div>
            <!-- <div class="tb-header-item">
                <span>产品生成任务启动</span>
                <Select v-model="taskStart" class="input-style"  @on-change="isInput">
                  <Option v-for="item in taskStartList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input v-model="taskStart"  class="input-style" v-if="startInputBox"/>
            </div>-->
            <div class="tb-header-item">
              <span>产品模板</span>
              <Select v-model="productTemplate" class="input-style">
                <Option
                  v-for="item in productTemplateList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div class="tb-header-item">
              <span>卫星关注目标集</span>
              <Input v-model="targetSet" class="input-style" />
              <new-btn title="上传文件" class="btn-item" @click="addTargetSet"></new-btn>
            </div>
            <div class="tb-header-item">
              <span>卫星顺序文件</span>
              <Input v-model="orderSet" class="input-style" />
              <new-btn title="上传文件" class="btn-item" @click="addOrderSet"></new-btn>
            </div>
            <div class="tb-header-item">
              <span>名称替换文件</span>
              <Input v-model="nameReplaceSet" class="input-style" />
              <new-btn title="上传文件" class="btn-item" @click="addNameReplaceSet"></new-btn>
            </div>
            <div class="tb-header-item">
              <span>月报前言</span>
              <Input v-model="monthlyPreface" type="textarea" :rows="4" class="textarea" />
              <new-btn title="上传文件" class="btn-item" @click="addNameReplaceSet"></new-btn>
            </div>
            <div class="tb-header-item">
              <span>月报备注</span>
              <Input v-model="remark" type="textarea" :rows="4" class="textarea" />
              <new-btn title="上传文件" class="btn-item" @click="addNameReplaceSet"></new-btn>
            </div>
            <div class="tb-header-item">
              <span>编写人（必填）</span>
              <Input v-model="editor" class="input-style" />
            </div>
            <div class="tb-header-item">
              <span>对外服务对象</span>
              <Input v-model="externalServiceTarget" class="input-style" />
              <new-btn title="对外服务" class="btn-item" @click="addServiceTarget"></new-btn>
            </div>
            <!-- <div class="tb-header-item">
                <span>产品发布提醒</span>
                <Select v-model="issueRemind" class="input-style"  @on-change="isInput">
                  <Option v-for="item in issueRemindList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input v-model="issueRemind"  class="input-style" v-if="remindInputBox"/>
            </div>-->
          </div>
        </div>

        <div class="pie-tb-footer">
          <!-- <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page> -->
          <div class="tb-header-button">
            <cancel-btn class="btn-item" onclick="window.history.back()"></cancel-btn>
            <reset-btn class="btn-item"></reset-btn>
            <create-report-btn class="btn-item"></create-report-btn>
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
            <create-report-btn class="btn-item"></create-report-btn>
          </div>
        </div>
      </div>
    </pie-card>
    <!-- 添加关注目标集弹出框 -->
    <my-modal
      width="30"
      height="60"
      v-model="isModal"
      @cancel="cancel"
      :title="title"
      :resetBtn="false"
      @confirm="confirmAdd"
    >
      <div slot="operateItem">
        <div class="modal-content-items">
          <div slot="iscontent">
            <div class="tb-header-content">
              <RadioGroup v-model="targetSetGroup" v-if="this.title == '关注目标集'">
                <Radio
                  v-for="item in targetSetGroupList"
                  :label="item.label"
                  :key="item.value"
                >{{ item.label }}</Radio>
              </RadioGroup>
              <RadioGroup v-model="orderSetGroup" v-if="this.title == '卫星顺序配置'">
                <Radio
                  v-for="item in orderSetGroupList"
                  :label="item.label"
                  :key="item.value"
                >{{ item.label }}</Radio>
              </RadioGroup>
              <RadioGroup v-model="nameReplaceSetGroup" v-if="this.title == '名称替换配置'">
                <Radio
                  v-for="item in nameReplaceSetGroupList"
                  :label="item.label"
                  :key="item.value"
                >{{ item.label }}</Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
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
      statisticTime: "", //统计时间
      productTemplate: "", //产品模板
      targetSet: "", //关注集
      orderSet: "", //顺序配置
      nameReplaceSet: "", //名称替换配置
      externalServiceTarget: "", //对外服务对象
      issueRemind: "", //产品发布提醒
      monthlyPreface: "这是一段对工作月报前言的描述", //产品发布前言
      remark: "这是一段对工作月报备注的描述", //月报备注
      editor: "", //编写人
      // 对外服务
      selectList: [],
      targetList: [],
      callBackTitleType: false,
      titleKey: "name",
      // 不可选择的日期
      options: {
        disabledDate(date) {
          const disabledDay = date.getDate();
          return disabledDay === 29 || disabledDay === 30 || disabledDay === 31;
        },
      },
      statisticTimeList: [
        {
          value: "1",
          label: "一个月",
        },
        {
          value: "2",
          label: "自定义",
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
      issueRemindList: [
        {
          value: "1",
          label: "每月10号",
        },
        {
          value: "2",
          label: "每月9号",
        },
        {
          value: "3",
          label: "自定义",
        },
      ],
      targetSetGroupList: [
        {
          value: "1",
          label: "目标集001号",
        },
        {
          value: "2",
          label: "目标集002号",
        },
        {
          value: "3",
          label: "目标集003号",
        },
        {
          value: "4",
          label: "目标集004号",
        },
        {
          value: "5",
          label: "目标集005号",
        },
        {
          value: "6",
          label: "目标集006号",
        },
        {
          value: "7",
          label: "目标集007号",
        },
        {
          value: "8",
          label: "目标集008号",
        },
        {
          value: "9",
          label: "目标集009号",
        },
        {
          value: "10",
          label: "目标集0010号",
        },
        {
          value: "11",
          label: "目标集0013号",
        },
        {
          value: "12",
          label: "目标集0012号",
        },
        {
          value: "13",
          label: "目标集0013号",
        },
        {
          value: "14",
          label: "目标集0014号",
        },
        {
          value: "15",
          label: "目标集0015号",
        },
        {
          value: "16",
          label: "目标集0016号",
        },
        {
          value: "17",
          label: "目标集0017号",
        },
        {
          value: "18",
          label: "目标集0018号",
        },
      ],
      orderSetGroupList: [
        {
          value: "1",
          label: "卫星顺序001号",
        },
        {
          value: "2",
          label: "卫星顺序002号",
        },
        {
          value: "3",
          label: "卫星顺序003号",
        },
        {
          value: "4",
          label: "卫星顺序004号",
        },
        {
          value: "5",
          label: "卫星顺序005号",
        },
        {
          value: "6",
          label: "卫星顺序006号",
        },
        {
          value: "7",
          label: "卫星顺序007号",
        },
        {
          value: "8",
          label: "卫星顺序008号",
        },
        {
          value: "9",
          label: "卫星顺序009号",
        },
        {
          value: "10",
          label: "卫星顺序0010号",
        },
        {
          value: "11",
          label: "卫星顺序0013号",
        },
        {
          value: "12",
          label: "卫星顺序0012号",
        },
        {
          value: "13",
          label: "卫星顺序0013号",
        },
        {
          value: "14",
          label: "卫星顺序0014号",
        },
        {
          value: "15",
          label: "卫星顺序0015号",
        },
        {
          value: "16",
          label: "卫星顺序0016号",
        },
        {
          value: "17",
          label: "卫星顺序0017号",
        },
        {
          value: "18",
          label: "卫星顺序0018号",
        },
      ],
      nameReplaceSetGroupList: [
        {
          value: "1",
          label: "名称替换001号",
        },
        {
          value: "2",
          label: "名称替换002号",
        },
        {
          value: "3",
          label: "名称替换003号",
        },
        {
          value: "4",
          label: "名称替换004号",
        },
        {
          value: "5",
          label: "名称替换005号",
        },
        {
          value: "6",
          label: "名称替换006号",
        },
        {
          value: "7",
          label: "名称替换007号",
        },
        {
          value: "8",
          label: "名称替换008号",
        },
        {
          value: "9",
          label: "名称替换009号",
        },
        {
          value: "10",
          label: "名称替换0010号",
        },
        {
          value: "11",
          label: "名称替换0013号",
        },
        {
          value: "12",
          label: "名称替换0012号",
        },
        {
          value: "13",
          label: "名称替换0013号",
        },
        {
          value: "14",
          label: "名称替换0014号",
        },
        {
          value: "15",
          label: "名称替换0015号",
        },
      ],
      targetSetGroup: "", //选中目标集
      orderSetGroup: "",
      nameReplaceSetGroup: "",
      serviceModal: false,
      isModal: false,
      title: "",
      productGroup: "", //选中产品
      externalServiceTargetGroup: "", //选中对外服务对象
      startInputBox: false,
      remindInputBox: false,
    };
  },
  methods: {
    //添加关注目标集
    addTargetSet() {
      this.isModal = true;
      this.title = "关注目标集";
    },
    //添加对外服务对象
    addServiceTarget() {
      this.serviceModal = true;
      // console.log(123,this.serviceModal);
      // this.title = "对外服务对象";
    },
    //添加名称替换配置
    addNameReplaceSet() {
      this.isModal = true;
      this.title = "名称替换配置";
    },
    //添加卫星顺序配置
    addOrderSet() {
      this.isModal = true;
      this.title = "卫星顺序配置";
    },
    //确认添加
    confirmAdd() {
      this.isModal = false;
      this.serviceModal = false;
      this.externalServiceTarget = this.externalServiceTargetGroup;
    },
    cancel() {
      this.isModal = false;
      this.serviceModal = false;
    },
    //自定义输入框是否显示
    isInput() {
      if (this.statisticTime == "自定义") {
        this.startInputBox = true;
      } else if (this.issueRemind == "自定义") {
        this.remindInputBox = true;
      }
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
      // padding-top: 100px;
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
        margin-left: 20%;
        .input-style {
          margin: auto @table-lable-space;
          width: 300px;
        }
        .short-input-style {
          width: 80px;
          margin: auto @table-lable-space;
        }
        span {
          width: 180px;
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
/deep/ .ivu-date-picker-cells-cell-disabled {
  background: transparent;
}
/deep/ .ivu-date-picker-cells :hover {
  background: transparent;
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