<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>触发方式</span>
              <Select
                v-model="triggerMode"
                class="input-style"
                @on-change="isChangeForm"
              >
                <Option
                  v-for="item in triggerModeList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
          <!-- =====【触发方式：定时====表单】===== -->
          <div class="tb-header-content" v-if="triggerModeTimeBox">
            <div class="tb-header-item">
              <span></span>
              <Select
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
              </Select>
              <Input
                v-model="taskScan"
                class="input-style"
                v-if="scanInputBox"
              />
            </div>
            <div class="tb-header-item">
              <span>关注目标集</span>
              <Input v-model="targetSet" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addTargetSet"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>筛选条件</span>
              <switch-btn class="switch" @click="switchSondition"></switch-btn>
            </div>
            <div class="tb-header-item" v-if="typeOne">
              <span>碰撞概率</span>
              <Select
                v-model="impactProb"
                class="input-style"
                @on-change="isInputImpactProb"
              >
                <Option
                  v-for="item in impactProbList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <Input
                v-model="impactProb"
                class="input-style"
                v-if="impactInputBox"
              />
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
                  >{{ item.label }}</Option
                >
              </Select>
              <Input
                v-model="intersectDistance"
                class="input-style"
                v-if="intersectInputBox"
              />
            </div>
            <div class="tb-header-item" v-if="typeElse">
              <span>轨道类型</span>
              <Select
                v-model="trackType"
                class="input-style"
                @on-change="isInputTrackType"
              >
                <Option
                  v-for="item in trackTypeList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <Input
                v-model="trackType"
                class="input-style"
                v-if="trackInputBox"
              />
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
              <span>卫星名称替换文件</span>
              <Input v-model="externalServiceTarget" class="input-style" />
              <new-btn
                title="导入"
                class="btn-item"
                @click="addServiceTarget"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>产品模板</span>
              <Select v-model="productTemplate" class="input-style">
                <Option
                  v-for="item in productTemplateList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>对外服务对象</span>
              <Input v-model="externalServiceTarget" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addServiceTarget"
              ></new-btn>
            </div>
          </div>
          <!-- =====【触发方式：立即====表单】===== -->
          <div class="tb-header-content" v-if="triggerModeImmediatelyBox">
            <div class="tb-header-item">
              <span>目标编号</span>
              <Input v-model="externalServiceTarget" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addServiceTarget"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>背景编号</span>
              <Input v-model="targetSet" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addTargetSet"
              ></new-btn>
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
              <new-btn
                title="导入"
                class="btn-item"
                @click="addServiceTarget"
              ></new-btn>
            </div>
            <div class="tb-header-item">
              <span>产品模板</span>
              <Select v-model="productTemplate" class="input-style">
                <Option
                  v-for="item in productTemplateList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div class="tb-header-item">
              <span>对外服务对象</span>
              <Input v-model="externalServiceTarget" class="input-style" />
              <new-btn
                title="添加"
                class="btn-item"
                @click="addServiceTarget"
              ></new-btn>
            </div>
          </div>
        </div>

        <div class="pie-tb-footer">
          <!-- <page :total="pageTotal" :pageSize="pageSize" :current="pageNum"></page> -->
          <div class="tb-header-button">
            <cancel-btn
              class="btn-item"
              onclick="window.history.back()"
            ></cancel-btn>
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
            <cancel-btn
              class="btn-item"
              onclick="window.history.back()"
            ></cancel-btn>
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
                  >{{ item.label }}</Radio
                >
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </my-modal>
    <!-- 添加对外服务对象弹出框 -->
    <my-modal
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
    </my-modal>
  </div>
</template>
<script>
import pieCard from "@/components/pie-card/pie-card.vue";
import page from "@/components/page/page.vue";
import switchBtn from "@/components/button/switch-btn.vue";

export default {
  components: {
    pieCard,
    page,
    switchBtn,
  },
  data() {
    return {
      pageTotal: 10, //数据总数
      pageNum: 1, //初始页
      pageSize: 10, //每页条数
      triggerMode: "定时",
      taskScan: "", //任务扫描
      targetSet: "", //关注目标集
      impactProb: "", //碰撞概率
      intersectDistance: "", //交会距离
      trackType: "", //轨道类型
      productTemplate: "2020年模板", //产品模板
      externalServiceTarget: "", //对外服务对象
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
      triggerModeTimeBox: true, //触发方式输入框：定时
      triggerModeImmediatelyBox: false, //触发方式输入框：立即
      scanInputBox: false, // 触发方式:定时 ==> 点击自定义显示输入框
      impactInputBox: false, // 碰撞概率 ==> 点击自定义显示输入框
      intersectInputBox: false, // 交会距离 ==> 点击自定义显示输入框
      trackInputBox: false, // 轨道类型 ==> 点击自定义显示输入框
    };
  },
  methods: {
    //切换按钮
    switchSondition() {
      if (this.typeOne == false) {
        this.typeOne = true;
      } else {
        this.typeOne = false;
      }
      if (this.typeElse == false) {
        this.typeElse = true;
      } else {
        this.typeElse = false;
      }
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
    //自定义输入框是否显示
    isInputTaskScan() {
      if (this.taskScan == "自定义") {
        this.scanInputBox = true;
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
      this.triggerModeTimeBox = (this.triggerMode == "定时" && true) || false;
      this.triggerModeImmediatelyBox =
        (this.triggerMode == "立即" && true) || false;
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
  }
  .tb-header-content:first-of-type {
    margin-bottom: 0;
    .tb-header-item {
      margin-bottom: 0;
    }
  }

  .btn-item {
    margin-right: @table-button-space;
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
  .tb-header-item-cut {
    .tb-header-item {
      display: flex;
      margin-bottom: @table-lable-space;
      width: 100%;
      margin-left: 30%;
      .input-style {
        margin: auto @table-lable-space;
        width: 300px;
      }
      .short-input-style {
        width: 80px;
        margin: auto @table-lable-space;
      }
      span {
        width: 130px;
        text-align: right;
      }
      .text {
        width: 60px;
        text-align: right;
      }
    }
  }
}
</style>