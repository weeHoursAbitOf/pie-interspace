<template>
  <div class="fall-raster-vect-content">
    <pie-card :slotFooter="false">
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="fall-header">
          <div class="fall-header-content">
            <share-btn
              class="share-btn"
              title="工具栏"
              callBackName="on-work-box-event"
              @on-work-box-event="onWorkBoxEvent"
            />
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="fall-iscontent">
          <my-charts />
        </div>
      </div>
    </pie-card>
    <scatterPlotWorkBox :isShowWorkBox="isShowWorkBox" @on-close="onClose" />
  </div>
</template>

<script>
import myCharts from "./myCharts";
import scatterPlotWorkBox from "@/components/workBox/scatterPlotWorkBox.vue";
export default {
  components: {
    myCharts,
    scatterPlotWorkBox,
  },
  data() {
    return {
      numberRange: "", //编号范围
      isShowWorkBox: false,
    };
  },
  methods: {
    // 工具栏
    onWorkBoxEvent() {
      this.isShowWorkBox = true;
    },
    // 取消工具栏
    onClose() {
      this.isShowWorkBox = false;
    },
    // 浏览文件
    uploadFileEvent(res) {
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.fall-raster-vect-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
}
.fall-header {
  display: flex;
  justify-content: flex-end;
  // .fall-header-content {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-around;
  //   .fall-input {
  //     display: flex;
  //     align-items: center;
  //     p {
  //       width: 80px;
  //       text-align: right;
  //       margin: 0 5px;
  //     }
  //   }
  // }
}
.fall-number {
  display: flex;
  align-items: center;
}
.upload-file {
  margin: 0 5px;
}
/deep/.ivu-radio-group {
  display: flex;
  flex-direction: column;
}
/deep/.ivu-radio-wrapper {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.fall-iscontent {
  padding: 0 150px;
  // background-color: #fff;
}
</style>
