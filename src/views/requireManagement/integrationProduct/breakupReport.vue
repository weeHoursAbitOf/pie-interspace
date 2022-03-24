<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <!-- =====【表单选择内容】===== -->
          <div class="tb-header-thermobox">
            <div class="tb-header-content">
              <div class="tb-header-item">
                <span>专报类型</span>
                <Select v-model="reportType" class="input-style" @on-change="isChangeForm">
                  <Option
                    v-for="item in reportTypeList"
                    :value="item.label"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </div>
              <div class="tb-header-item">
                <span>触发方式</span>
                <Select v-model="triggerMode" class="input-style" @on-change="isChangeForm">
                  <Option
                    v-for="item in triggerModeList"
                    :value="item.label"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </div>
            </div>
          </div>
          <!-- =====【专报类型：事前====表单内容】===== -->
          <div class="tb-header-thermobox">
            <!-- 事前触发方式：定时 -->
            <div class="tb-header-content" v-if="triggerModeTimeBox1">
              <div class="tb-header-item">
                <span></span>
                <!-- <Select
                  v-model="taskScan"
                  class="input-style"
                  @on-change="isInputTaskScan"
                >
                  <Option
                    v-for="item in taskScanList"
                    :value="item.label"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>-->
                <DatePicker
                  type="datetime"
                  split-panels
                  placeholder="选择时间"
                  class="input-style"
                  :options="options"
                ></DatePicker>
                <Input v-model="taskScan" class="input-style" v-if="scanInputBox" />
              </div>
              <!-- <div class="tb-header-item" v-if="scanInputBox">
                <span></span>
                <Input v-model="taskScan"  class="input-style"/>
                <switch-btn class="btn-item" :title="'返回'" @click="switchCustomBtn"></switch-btn>
              </div>-->
              <div class="tb-header-item">
                <span>专报名称</span>
                <Input v-model="trackType" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>筛选条件</span>
                <switch-btn class="switch" @click="switchSondition"></switch-btn>
              </div>
              <div class="tb-header-item" v-if="typeOne">
                <span>碰撞概率</span>
                <Select v-model="impactProb" class="input-style" @on-change="isInputImpactProb">
                  <Option
                    v-for="item in impactProbList"
                    :value="item.label"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <Input v-model="impactProb" class="input-style" v-if="impactInputBox" />
              </div>
              <div class="tb-header-item" v-if="typeOne">
                <span>交会距离</span>
                <Select
                  v-model="intersectDistance"
                  class="input-style"
                  @on-change="isInputIntersectDistance"
                >
                  <Option
                    v-for="item in intersectDistanceList"
                    :value="item.label"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <Input v-model="intersectDistance" class="input-style" v-if="intersectInputBox" />
              </div>
              <div class="tb-header-item" v-if="typeElse">
                <span>轨道类型</span>
                <Select v-model="trackType" class="input-style" @on-change="isInputTrackType">
                  <Option
                    v-for="item in trackTypeList"
                    :value="item.label"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <Input v-model="trackType" class="input-style" v-if="trackInputBox" />
              </div>
              <div class="tb-header-item" v-if="typeElse">
                <span>U</span>
                <Input class="short-input-style" />
                <span class="text">M</span>
                <Input class="short-input-style" />
                <span class="text">W</span>
                <Input class="short-input-style" />
              </div>
              <div class="tb-header-item">
                <span>关注目标集</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="上传文件" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="上传文件" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
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
                <span>对外服务对象</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="对外服务" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
            </div>
            <!-- 事前触发方式：立即 -->
            <div class="tb-header-content" v-if="triggerModeImmediatelyBox1">
              <div class="tb-header-item">
                <span>专报名称</span>
                <Input v-model="trackType" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>目标编号</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="添加" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
              <div class="tb-header-item">
                <span>背景编号</span>
                <Input v-model="targetSet" class="input-style" />
                <new-btn title="添加" class="btn-item" @click="addTargetSet"></new-btn>
              </div>
              <div class="tb-header-item">
                <span>交会时间 (北京时)</span>
                <Input v-model="trackType" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>产品生成时间 (北京时)</span>
                <Input v-model="trackType" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="添加" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
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
                <span>对外服务对象</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="对外服务" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
            </div>
          </div>

          <!-- =====【专报类型：事后====表单内容】===== -->
          <div class="tb-header-thermobox">
            <!-- 事后触发方式：定时 -->
            <div class="tb-header-content" v-if="triggerModeTimeBox2">
              <div class="tb-header-item">
                <span></span>
                <Select v-model="taskScan" class="input-style" @on-change="isInputTaskScan">
                  <Option
                    v-for="item in taskScanList"
                    :value="item.label"
                    :key="item.value"
                    v-if="scanSelectBox"
                  >{{ item.label }}</Option>
                </Select>
                <Input v-model="taskScan" class="input-style" v-if="scanInputBox" />
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="导入" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
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
                <span>对外服务对象</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="对外服务" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
            </div>
            <!-- 事后触发方式：立即 -->
            <div class="tb-header-content" v-if="triggerModeImmediatelyBox2">
              <div class="tb-header-item">
                <span>专报名称</span>
                <Input v-model="trackType" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>目标编号</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="添加" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
              <div class="tb-header-item">
                <span>背景编号</span>
                <Input v-model="targetSet" class="input-style" />
                <new-btn title="添加" class="btn-item" @click="addTargetSet"></new-btn>
              </div>
              <div class="tb-header-item">
                <span>交会时间 (北京时)</span>
                <Input v-model="trackType" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>产品生成时间 (北京时)</span>
                <Input v-model="trackType" class="input-style" />
              </div>
              <div class="tb-header-item">
                <span>卫星名称替换文件</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="添加" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
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
                <span>对外服务对象</span>
                <Input v-model="externalServiceTarget" class="input-style" />
                <new-btn title="对外服务" class="btn-item" @click="addServiceTarget"></new-btn>
              </div>
            </div>
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
              <RadioGroup v-model="targetSetGroup">
                <Radio
                  v-for="item in targetSetGroupList"
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
      reportType: "事前", //专报类型
      triggerMode: "定时", //触发方式
      taskScan: "", //任务扫描
      targetSet: "", //关注目标集
      impactProb: "", //碰撞概率
      intersectDistance: "", //交会距离
      trackType: "", //轨道类型
      productTemplate: "2020年模板", //产品模板
      externalServiceTarget: "", //对外服务对象
      // 对外服务
      selectList: [],
      targetList: [],
      callBackTitleType: false,
      titleKey: "name",
      reportTypeList: [
        {
          value: "1",
          label: "事前",
        },
        {
          value: "2",
          label: "事后",
        },
      ],
      triggerModeList: [
        {
          value: "1",
          label: "定时",
        },
        {
          value: "2",
          label: "立即",
        },
      ],
      taskScanList: [
        {
          value: "1",
          label: "每天",
        },
        {
          value: "2",
          label: "每周一",
        },
        {
          value: "3",
          label: "自定义",
        },
      ],
      impactProbList: [
        {
          value: "1",
          label: "大于10-4",
        },
        {
          value: "2",
          label: "自定义",
        },
      ],
      intersectDistanceList: [
        {
          value: "1",
          label: "小于100公里",
        },
        {
          value: "2",
          label: "小于50公里",
        },
        {
          value: "3",
          label: "小于10公里",
        },
        {
          value: "4",
          label: "自定义",
        },
      ],
      trackTypeList: [
        {
          value: "1",
          label: "LEO",
        },
        {
          value: "2",
          label: "MEO",
        },
        {
          value: "3",
          label: "HEO",
        },
        {
          value: "4",
          label: "GEO",
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
      typeOne: true,
      typeElse: false,
      isModal: false,
      serviceModal: false,
      title: "",
      targetSetGroup: "", //选中目标集
      externalServiceTargetGroup: "", //选中对外服务对象
      triggerModeTimeBox1: true, //选中触发方式：定时。进行显示
      triggerModeImmediatelyBox1: false, //选中触发方式：立即。进行显示
      triggerModeTimeBox2: false, //选中触发方式：定时。进行显示
      triggerModeImmediatelyBox2: false, //选中触发方式：立即。进行显示
      scanInputBox: false, //选中
      scanSelectBox: true,
      impactInputBox: false,
      intersectInputBox: false,
      trackInputBox: false,
    };
  },
  methods: {
    //切换按钮:筛选条件
    switchSondition() {
      this.typeOne = this.typeOne == false && true;
      this.typeElse = this.typeElse == false && true;
    },
    //添加关注目标集
    addTargetSet() {
      this.isModal = true;
      this.title = "关注目标集";
    },
    //添加对外服务对象
    addServiceTarget() {
      this.serviceModal = true;
      this.title = "对外服务对象";
    },
    //确认添加
    confirmAdd() {
      this.isModal = false;
      this.serviceModal = false;
      this.targetSet = this.targetSetGroup;
      this.externalServiceTarget = this.externalServiceTargetGroup;
    },
    cancel() {
      this.isModal = false;
      this.serviceModal = false;
    },
    //返回按钮:自定义返回
    // switchCustomBtn(){
    //   this.scanInputBox = false;
    //   this.scanSelectBox = true;
    //   this.taskScan = ""
    // },
    //自定义输入框是否显示
    isInputTaskScan() {
      if (this.taskScan == "自定义") {
        this.scanInputBox = true;
        // this.scanSelectBox = false;
      }
    },
    isInputImpactProb() {
      if (this.impactProb == "自定义") {
        this.impactInputBox = true;
      }
    },
    isInputIntersectDistance() {
      if (this.intersectDistance == "自定义") {
        this.intersectInputBox = true;
      }
    },
    isInputTrackType() {
      if (this.trackType == "自定义") {
        this.trackInputBox = true;
      }
    },
    isChangeForm() {
      this.triggerModeTimeBox1 =
        this.triggerMode == "定时" && this.reportType == "事前" && true;
      this.triggerModeImmediatelyBox1 =
        this.triggerMode == "立即" && this.reportType == "事前" && true;
      this.triggerModeTimeBox2 =
        this.triggerMode == "定时" && this.reportType == "事后" && true;
      this.triggerModeImmediatelyBox2 =
        this.triggerMode == "立即" && this.reportType == "事后" && true;
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
      // margin: 0;
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
    .tb-header-thermobox {
      width: 100%;
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
          margin-left: 25%;
          .input-style {
            margin: auto @table-lable-space;
            width: 300px;
          }
          .short-input-style {
            width: 80px;
            margin: auto @table-lable-space;
          }
          span {
            width: 200px;
            text-align: right;
          }
          .text {
            width: 60px;
            text-align: right;
          }
        }
      }
      .tb-header-content:first-of-type {
        margin-bottom: 0;
        .tb-header-item:last-of-type {
          margin-bottom: 0;
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