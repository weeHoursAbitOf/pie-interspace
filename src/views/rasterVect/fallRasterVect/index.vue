<template>
  <div class="fall-raster-vect-content">
    <pie-card :slotFooter="false">
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="fall-header">
          <div class="fall-header-content">
            <div class="fall-input">
              <p>目标编号</p>
              <span>
                <Input v-model="objectId" style="width: 200px" placeholder="" />
              </span>
            </div>
            <div class="fall-input">
              <p>Y轴描述信息</p>
              <span>
                <Input v-model="yMsg" style="width: 200px" placeholder="" />
              </span>
            </div>
            <div class="fall-input">
              <p>X轴描述信息</p>
              <span>
                <Input v-model="xMsg" style="width: 200px" placeholder="" />
              </span>
            </div>
          </div>
          <div class="fall-header-content">
            <div class="fall-input">
              <p>开始时间</p>
              <span>
                <DatePicker
                  :value="beginTime"
                  style="width: 200px"
                  type="date"
                  @on-change="onBeginTimeChange"
                ></DatePicker>
              </span>
            </div>
            <div class="fall-input">
              <p>结束时间</p>
              <span>
                <DatePicker
                  :value="endTime"
                  style="width: 200px"
                  type="date"
                  @on-change="onEndTimeChange"
                ></DatePicker>
              </span>
            </div>
            <div class="fall-input">
              <p>红色圆点判断分割值</p>
              <span>
                <InputNumber v-model="splitValue" :min="0"></InputNumber>
              </span>
            </div>
          </div>
          <div class="fall-header-content">
            <div class="fall-input">
              <p>字体大小</p>
              <span>
                <InputNumber v-model="fontSize" :min="0"></InputNumber>
              </span>
            </div>
            <div class="fall-input">
              <p>圆点大小</p>
              <span>
                <InputNumber v-model="plotSize" :min="2"></InputNumber>
              </span>
            </div>
            <div class="fall-input">
              <p>X轴展示时间数量</p>
              <span>
                <InputNumber v-model="Xsize" :min="0"></InputNumber>
              </span>
            </div>
          </div>
          <div class="fall-header-content">
            <div class="fall-input">
              <p>坐标轴颜色</p>
              <span>
                <ColorPicker v-model="colors" recommend />
              </span>
            </div>
            <div class="fall-input">
              <p>高轨圆点颜色</p>
              <span>
                <ColorPicker v-model="greenColor" recommend />
              </span>
            </div>
            <div class="fall-input">
              <p>底轨圆点颜色</p>
              <span>
                <ColorPicker v-model="redColor" recommend />
              </span>
            </div>
          </div>
          <div class="fall-header-content">
            <div class="fall-input">
              <p>Y轴坐标最小值</p>
              <span>
                <InputNumber v-model="Ymin" :min="0"></InputNumber>
              </span>
            </div>
            <div class="fall-input">
              <p>Y轴坐标最大值</p>
              <span>
                <InputNumber v-model="Yman" :min="1"></InputNumber>
              </span>
            </div>
            <div class="fall-input">
              <p></p>
              <span>
                <share-btn
                  title="绘图"
                  callBackName="on-fall-change"
                  @on-fall-change="onFallChange"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="fall-iscontent"></div>
      </div>
    </pie-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objectId: "",
      yMsg: "",
      xMsg: "",
      beginTime: "",
      endTime: "",
      splitValue: 500,
      fontSize: 16,
      plotSize: 10,
      Xsize: 6,
      colors: "#000000",
      greenColor: "#1C86F6",
      redColor: "#ED4014",
      Ymin: 0,
      Yman: 1000,
      image: "",
    };
  },
  methods: {
    // 开始时间
    onBeginTimeChange(time) {
      this.beginTime = time;
    },
    // 结束时间
    onEndTimeChange(time) {
      this.endTime = time;
    },
    onFallChange() {
      if (!this.getVerifyNumber) {
        return false;
      }
      let params = {
        objectId: this.objectId,
        yMsg: this.yMsg,
        xMsg: this.xMsg,
        beginTime: this.beginTime,
        endTime: this.endTime,
        splitValue: this.splitValue,
        fontSize: this.fontSize,
        plotSize: this.plotSize,
        size: this.Xsize,
        color: this.colors,
        red: this.redColor,
        green: this.greenColor,
        min: this.Ymin,
        man: this.Yman,
      };
      this.$api.advanced.getScatterPlot(params).then((res) => {
        const blob = new Blob([res]);
        const imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
        this.image = imageUrl;
      });
    },
    getVerifyNumber() {
      if (this.objectId == "") {
        this.$Notice.warning({
          title: "目标编号不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.beginTime == "") {
        this.$Notice.warning({
          title: "开始时间不能为空！",
          top: 50,
          duration: 5,
        });
      } else if (this.endTime == "") {
        this.$Notice.warning({
          title: "结束时间不能为空！",
          top: 50,
          duration: 5,
        });
      } else {
        return true;
      }
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
  justify-content: space-around;
  .fall-header-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .fall-input {
      display: flex;
      align-items: center;
      margin: 5px 0;
      p {
        width: 150px;
        text-align: right;
        margin: 0 5px;
      }
    }
  }
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
  padding: 0 120px;
  height: 540px;
  background-color: #fff;
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
