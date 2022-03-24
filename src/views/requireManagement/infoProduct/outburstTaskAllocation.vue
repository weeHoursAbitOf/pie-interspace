<template>
  <!-- 推送配置 -->
  <div class="pie-tb-content">
    <pie-card :slotIsContent="false" :slotFooter="false">
      <div slot="header">
        <div class="pie-tb-header">
          <div class="tb-header-content">
            <div class="tb-header-item">
              <span>目标编号</span>
              <Input
                v-model="addtargetNumber"
                placeholder=""
                class="input-style"
                style="width: 250px"
              />
            </div>
            <div class="tb-header-item">
              <span>事件时间（UTC）</span>
              <DatePicker
                type="date"
                :value="addFindTime"
                placeholder=""
                class="input-style"
                style="width: 250px"
                @on-change="onFindTimeChange"
              ></DatePicker>
            </div>
            <div class="tb-header-item">
              <span>时间（UTC）</span>
              <DatePicker
                type="date"
                :value="addFindTime"
                placeholder=""
                class="input-style"
                style="width: 250px"
                @on-change="onFindTimeChange"
              ></DatePicker>
            </div>
            <div class="tb-header-item">
              <span>事件描述</span>
              <Input
                v-model="addEvent"
                placeholder=""
                class="input-style"
                style="width: 250px"
                type="textarea"
                :rows="4"
              />
            </div>
          </div>
        </div>
        <div class="pie-tb-footer">
          <div class="tb-header-button">
            <share-btn class="btn-item" title="重置" />
            <share-btn class="btn-item" title="确定" />
          </div>
        </div>
      </div>
    </pie-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.pie-tb-content {
  height: 100%;
  .public-bg {
    height: 100%;
    /deep/ .pie-card-header {
      height: 100%;
      padding-top: 100px;
    }
  }
  .pie-tb-header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: @lable-font-size;
    color: @lable-font-color;

    .tb-header-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: @table-input-space;
      .tb-header-item {
        display: flex;
        align-items: center;
        margin-bottom: @table-lable-space;
        margin-left: 30%;
        .input-style {
          margin: 0 10px;
        }

        span {
          width: 150px;
          text-align: right;
        }
      }
    }
  }
  .btn-item {
    margin-right: @table-button-space;
  }
  .tb-header-button {
    display: flex;
    justify-content: flex-end;
  }
}
.share-btn {
  margin: 0 10px;
}
.pie-tb-content .ivu-checkbox-wrapper {
  margin-right: 0.1rem !important;
}
</style>
