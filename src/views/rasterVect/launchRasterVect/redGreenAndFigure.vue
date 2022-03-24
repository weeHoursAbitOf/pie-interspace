<template>
  <div class="red-green-and-figure-content">
    <div class="red-green-and-figure-left">
      <div class="red-green-and-figure-left-top">
        <ul class="red-green-and-figure-searching">
          <li>
            <p>交会距离阀值</p>
            <span>
              <Input v-model="intersectionDistance" style="width: 250px" />
            </span>
          </li>
          <li>
            <p>碰撞概率阀值</p>
            <span>
              <Input v-model="impactProbability" style="width: 250px" />
            </span>
          </li>
          <li>
            <p>时间步长</p>
            <span>
              <Input v-model="timeStep" style="width: 250px" />
            </span>
          </li>
          <li>
            <p>时间刻度</p>
            <span>
              <Input v-model="timeScale" style="width: 250px" />
            </span>
          </li>
          <li>
            <p>边框粗细</p>
            <span>
              <Select v-model="borderSize" style="width: 250px">
                <Option
                  v-for="item in borderSizeList"
                  :value="item.value"
                  :key="item.value"
                  :label="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </span>
          </li>
          <li>
            <p>禁飞时段颜色</p>
            <span>
              <ColorPicker v-model="NoticePeriodColor" />
            </span>
          </li>
          <li>
            <p>允许发射时段颜色</p>
            <span>
              <ColorPicker v-model="LaunchTimeColor" />
            </span>
          </li>
          <li>
            <p>字体大小</p>
            <span>
              <InputNumber :min="1" v-model="NoticePeriodSize"></InputNumber>
            </span>
          </li>
          <li>
            <p>时步间隔高度</p>
            <span>
              <InputNumber :min="1" v-model="spacing"></InputNumber>
            </span>
          </li>
          <li>
            <share-btn
              class="share-btn"
              title="画图"
              callBackName="on-sketch-event"
              @on-sketch-event="onSketchEvent"
            />
          </li>
        </ul>
      </div>
      <div class="red-green-and-figure-image">
        <img v-show="diagram" :src="diagram" alt />
        <h4 v-show="!diagram">暂无数据</h4>
      </div>
    </div>
    <div class="red-green-and-figure-right">
      <div class="red-green-and-figure-right-top">
        <div class="count-cutting">
          <p>切割数量</p>
          <InputNumber v-model="cuttingNum" :min="1" :max="10" />
          <share-btn
            class="share-btn"
            title="剪切"
            callBackName="on-sketch-event"
            @on-sketch-event="onSketchEvent"
          />
        </div>
      </div>
      <div class="red-green-and-figure-right-image">
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox
            class="image"
            v-for="(item, index) in imageDataList"
            :key="index"
            :label="item"
          >
            <div @click="onImageClick(item)">
              <img :src="item.imgPath" alt="" />
            </div>
          </Checkbox>
        </CheckboxGroup>
      </div>
      <div class="red-green-and-figure-right -bottom">
        <div class="download-layout">
          <Checkbox
            :indeterminate="indeterminateAll"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
            >zip压缩文件</Checkbox
          >
        </div>
        <share-btn
          class="share-btn"
          title="下载"
          callBackName="on-download-event"
          @on-download-event="onDownloadEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    taskId: {
      type: String,
    },
    resetParams: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cuttingNum: "1", //切割数量
      downloadLayout: "", //下载格式
      indeterminateAll: true, //全选
      checkAll: false,
      checkAllGroup: [],
      imageDataList: [],
      zipfliePath: {}, //zip压缩文件
      launchTime: "", //发射时间
      intersectionDistance: "", //交会距离阀值
      timeStep: "", //时间步长
      timeScale: "", //时间刻度
      timeStepWidth: "", //时步宽度
      TimeStepHeight: "", //时步高度
      impactProbability: "", //碰撞概率阀值
      borderSize: "", //边框粗细
      borderSizeList: [
        {
          value: "1",
          label: "1倍",
        },
        {
          value: "2",
          label: "2倍",
        },
        {
          value: "3",
          label: "3倍",
        },
      ],
      NoticePeriodColor: "#FF0000", //禁飞时段颜色
      LaunchTimeColor: "#00FF30", //允许发射时段颜色
      NoticePeriodSize: "", //禁飞时段大小
      diagram: "", //红绿图
      spacing: "", //间隔步长
    };
  },
  watch: {
    //监听重置参数
    resetParams() {
      this.resetParameters();
    },
  },
  created() {
    // 默认参数
    this.setDefaultParameters();
  },
  methods: {
    // 默认参数
    setDefaultParameters() {
      this.intersectionDistance = this.$route.query.intersectionDistance; //交互距离
      this.impactProbability = this.$route.query.impactProbability; //碰撞概率
      this.NoticePeriodColor = this.$route.query.fontSize; //字体大小
      this.spacing = this.$route.query.spacing; //间隔步长
      this.borderSize = this.$route.query.pad; //边框粗细
      this.timeStep = this.$route.query.interval; //时间步长
      this.timeScale = this.$route.query.maxTime; //时间刻度
    },
    // 图片点击
    onImageClick(item) {
      this.diagram = item.imgPath;
    },
    // 全选
    handleCheckAll() {
      if (this.indeterminateAll) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminateAll = false;
      if (this.checkAll) {
        this.checkAllGroup = this.imageDataList.map((item) => item.imgPath);
      } else {
        this.checkAllGroup = [];
      }
    },
    // 是否全选
    checkAllGroupChange(data) {
      if (data.length === this.imageDataList.length) {
        this.indeterminateAll = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminateAll = true;
        this.checkAll = false;
      } else {
        this.indeterminateAll = false;
        this.checkAll = false;
      }
    },
    getMkRedGreen() {
      let formData = new FormData();
      formData.append("launchWindowsId", this.taskId); //发射窗口任务ID
      formData.append("impactProbability", this.impactProbability); //碰撞概率阀值
      formData.append("intersectionDistance", this.intersectionDistance); //交会距离阀值
      formData.append("fontSize", this.NoticePeriodSize); //字体大小（单位：px像素点）
      formData.append("green", this.LaunchTimeColor); //允许发射时段颜色（#000000，16进制参数）
      formData.append("red", this.NoticePeriodColor); //禁飞时段颜色（#FFFFF,16进制参数）
      formData.append("pad", this.borderSize); //边框粗细度倍数（1倍，2倍，3倍（最高3倍））
      formData.append("stop", this.timeStep); //时间步长倍数
      formData.append("spacing", this.spacing); //红绿图条形间隔之间的间隔像素值
      formData.append("interval", this.timeScale); //显示时间的间隔步长单位数量
      formData.append("maxTime", ""); //每行几个最大时间
      formData.append("wid", ""); //步长单元宽度
      formData.append("num", this.cuttingNum); //切割几张
      this.$api.common.getMkRedGreen(formData).then((res) => {
        this.zipfliePath = res.data.pop();
        this.diagram = res.data[0].imgPath;
        this.imageDataList = res.data;
      });
    },
    // 发射时间
    onLaunchTimeChange(time) {
      this.launchTime = time;
    },
    // 画图
    onSketchEvent() {
      this.getMkRedGreen();
    },
    // 下载
    onDownloadEvent() {
      if (this.checkAllGroup.length > 0) {
        if (this.checkAll) {
          let params = {
            imgKey: this.zipfliePath.key,
          };
          this.$api.common.getMkRedGreenDownPath(params).then((res) => {
            this.$utils.fileBlobDown(this.zipfliePath.imgPath, res);
          });
        } else {
          this.checkAllGroup.forEach((item) => {
            let params = {
              imgKey: item.key,
            };
            this.$api.common.getMkRedGreenDownPath(params).then((res) => {
              this.$utils.fileBlobDown(item.imgPath, res);
            });
          });
        }
      } else {
        this.$Notice.warning({
          title: "请选择数据。。。",
          top: 50,
          duration: 5,
        });
      }
    },
    //监听重置参数
    resetParameters() {
      this.taskId = "";
      this.launchTime = ""; //发射时间
      this.intersectionDistance = ""; //交会距离阀值
      this.timeStep = ""; //时间步长
      this.timeScale = ""; //时间刻度
      this.timeStepWidth = ""; //时步宽度
      this.TimeStepHeight = ""; //时步高度
      this.impactProbability = ""; //碰撞概率阀值
      this.borderSize = ""; //边框粗细
      this.NoticePeriodColor = "#FF0000"; //禁飞时段颜色
      this.LaunchTimeColor = "#00FF30"; //允许发射时段颜色
      this.NoticePeriodSize = ""; //禁飞时段大小
      this.diagram = ""; //红绿图
      this.spacing = ""; //间隔步长
    },
  },
};
</script>

<style lang="less" scoped>
.red-green-and-figure-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
  height: 970px;
  display: flex;
  padding: 10px;
  .red-green-and-figure-left {
    flex: 1;
    height: 100%;
    margin-right: 10px;
    .red-green-and-figure-left-top:extend(.border) {
      width: 100%;
      height: 150px;
      margin-bottom: 10px;
      padding: 10px;
      .red-green-and-figure-searching {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        li {
          display: flex;
          align-items: center;
          margin: 0 10px;
          p {
            margin-right: 10px;
          }
        }
      }
    }
    .red-green-and-figure-image:extend(.border) {
      width: 100%;
      height: 790px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .red-green-and-figure-right {
    width: 450px;
    height: 100%;
    .red-green-and-figure-right-image {
      width: 100%;
      height: 780px;
      overflow: auto;
      .image:extend(.border) {
        width: 47%;
        height: 138px;
        border-radius: 5px;
        position: relative;
        /deep/.ivu-checkbox {
          position: absolute !important;
          top: 0px;
          left: 5px;
          z-index: 1;
        }
        img {
          display: block;
          width: 100%;
          height: 138px;
        }
      }
      /deep/.ivu-checkbox-wrapper {
        margin-right: 0 !important;
        margin: 5px !important;
      }
    }
    .red-green-and-figure-right-top:extend(.border) {
      width: 100%;
      height: 80px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .count-cutting {
        display: flex;
        align-items: center;
        p {
          margin: 0 10px;
        }
      }
    }
    .red-green-and-figure-right-bottom:extend(.border) {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
.share-btn {
  margin: 0 10px;
}
</style>
