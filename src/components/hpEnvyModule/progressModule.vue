<template>
  <div class="progress-container">
    <!-- 待处理-已受理-已上报-已下发-已完成-已处理-待生成-已生成-已审核-已发布    ？？10-不受理-->
    <Steps :current="scheduleStatus">
      <Step
        v-for="(item, index) in stepsDataList"
        :key="index"
        :title="title"
        icon="ios-flag"
      >
        <div slot="title" class="schedule">
          <p>{{ item.des }}</p>
          <span>{{ item.label }}</span>
        </div>
      </Step>
    </Steps>
  </div>
</template>

<script>
export default {
  props: {
    stepsDataList: {
      type: Array,
    },
    scheduleStatus: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      title: "",
    };
  },
};
</script>

<style lang="less" scoped>
// 进度条样式
/deep/.schedule {
  position: relative;
  p {
    width: 250px;
    position: absolute;
    top: -25px;
    left: 0px;
    z-index: 1;
  }
}
/deep/.ivu-icon-ios-flag:before {
  title: "\f1c7";
  font-size: 30px;
}
/deep/.ivu-steps .ivu-steps-head-inner > .ivu-steps-icon.ivu-icon {
  top: -5px;
  left: -5px;
}
/deep/.ivu-steps-title {
  background: none;
}
/deep/.ivu-steps-head {
  background: none;
}
/deep/.ivu-steps .ivu-steps-tail {
  width: 70%;
  height: 1px;
  margin: 0 0.052083rem;
  position: absolute;
  top: 15px;
  left: 70px;
  background: @lable-font-color;
}

/deep/.ivu-steps-item {
  width: 130px;
  height: 100px;
  line-height: 100px;
}
/deep/.ivu-steps .ivu-steps-tail {
  top: 53px !important;
}
/deep/.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span,
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner > .ivu-steps-icon,
/deep/.ivu-steps-item.ivu-steps-custom.ivu-steps-status-process
  .ivu-steps-head-inner
  > .ivu-steps-icon {
  color: red;
}
/deep/.ivu-steps-item:nth-of-type(1).ivu-steps-status-finish
  .ivu-steps-head-inner
  span,
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner > .ivu-steps-icon,
/deep/.ivu-steps-item:nth-of-type(1).ivu-steps-custom.ivu-steps-status-process
  .ivu-steps-head-inner
  > .ivu-steps-icon {
  color: rgb(5, 253, 129);
}

/deep/.ivu-steps-item:nth-of-type(7).ivu-steps-status-finish
  .ivu-steps-head-inner
  span,
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner > .ivu-steps-icon,
/deep/.ivu-steps-item:nth-of-type(7).ivu-steps-custom.ivu-steps-status-process
  .ivu-steps-head-inner
  > .ivu-steps-icon {
  color: rgb(5, 253, 129);
}

/deep/.ivu-steps-item.ivu-steps-status-finish .ivu-steps-title,
/deep/.ivu-steps-item.ivu-steps-status-process .ivu-steps-title {
  color: @lable-font-color;
}
/deep/.ivu-steps-item:nth-of-type(1).ivu-steps-status-finish .ivu-steps-title,
/deep/.ivu-steps-item:nth-of-type(1).ivu-steps-status-process .ivu-steps-title {
  color: rgb(5, 253, 129);
}
/deep/.ivu-steps-item:nth-of-type(7).ivu-steps-status-finish .ivu-steps-title,
/deep/.ivu-steps-item:nth-of-type(7).ivu-steps-status-process .ivu-steps-title {
  color: rgb(5, 253, 129);
}
/deep/.ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail > i:after {
  width: 100%;
  background: @lable-font-color;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  opacity: 1;
}
</style>