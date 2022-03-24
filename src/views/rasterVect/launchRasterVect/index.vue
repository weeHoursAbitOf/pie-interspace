<template>
  <div class="launch-container">
    <pie-card>
      <!-- 筛选条件 -->
      <div slot="header">
        <div class="launch-header-content">
          <div class="launch-header-left">交会距离分量阀值</div>
          <div class="launch-header-checkbox">
            <Checkbox v-model="ruleValidate.dandohName">
              <div class="checkbox-content">
                <p>弹道名称</p>
                <span>
                  <Input
                    v-model="ruleValidate.trajectoryName"
                    style="width: 150px"
                  />
                </span>
                <p>
                  <share-btn title="查询弹道" />
                </p>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.collisionProbability">
              <div class="checkbox-content">
                <p>碰撞概率阀值</p>
                <span>
                  <Input
                    v-model="ruleValidate.impactProbability"
                    style="width: 120px"
                  />
                </span>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.debrisNumber">
              <div class="checkbox-content">
                <p>碎片编号</p>
                <span>
                  <Input
                    v-model="ruleValidate.fragmentNumber"
                    style="width: 150px"
                  />
                </span>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.withoutCollisionProbability">
              <div class="checkbox-content">
                <p>包括无碰撞概率结果</p>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.UNNWDistance">
              <div class="checkbox-content">
                <p>显示UNNW距离</p>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.distanceThreshold">
              <div class="checkbox-content">
                <p>交会距离阀值</p>
                <span>
                  <Input
                    v-model="ruleValidate.intersectionDistance"
                    style="width: 125px"
                  />
                </span>
                <p>千米</p>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.R">
              <div class="checkbox-content">
                <p>R：</p>
                <span>
                  <Input
                    v-model="ruleValidate.Rkilometer"
                    style="width: auto"
                  />
                </span>
                <p>千米</p>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.T">
              <div class="checkbox-content">
                <p>T：</p>
                <span>
                  <Input
                    v-model="ruleValidate.Tkilometer"
                    style="width: auto"
                  />
                </span>
                <p>千米</p>
              </div>
            </Checkbox>
            <Checkbox v-model="ruleValidate.N">
              <div class="checkbox-content">
                <p>N：</p>
                <span>
                  <Input
                    v-model="ruleValidate.Nkilometer"
                    style="width: auto"
                  />
                </span>
                <p>千米</p>
              </div>
            </Checkbox>
          </div>
          <div class="launch-header-right">
            <share-btn class="share-btn" title="查询" />
            <share-btn
              class="share-btn"
              title="任务列表"
              :iconShow="true"
              iconType="md-share"
            />
            <share-btn
              class="share-btn"
              title="生成安全时段设置"
              callBackName="on-produce-period-event"
              @on-produce-period-event="onProducePeriodEvent"
            />
            <share-btn
              class="share-btn"
              title="生成碰撞概率设置"
              callBackName="on-collision-probability-event"
              @on-collision-probability-event="onCollisionProbabilityEvent"
            />
          </div>
        </div>
      </div>
      <!-- 表体 -->
      <div slot="iscontent">
        <div class="launch-iscontent">
          <my-table
            border
            ref="tables"
            :columns="columns"
            :data="data"
            disabled-hover
            width="1565"
            max-height="410"
          ></my-table>
        </div>
      </div>
      <!-- 分页 -->
      <div slot="footer">
        <div class="pie-tb-footer">
          <page
            :total="pageTotal"
            :pageSize="pageSize"
            :current="pageNum"
            @pageChange="pageChange"
            @pageSizeChange="pageSizeChange"
          ></page>
        </div>
      </div>
    </pie-card>
    <!-- 发射窗口 -->
    <my-modal
      width="65"
      v-model="isShowLanudchWindos"
      title="发射窗口"
      confirmText="下一步"
      :resetBtn="false"
      @cancel="cancel"
      @confirm="lanudchConfirm"
    >
      <div slot="operateItem">
        <lanudch-windos
          @on-launch-windows-id-event="onLaunchWindowsIdEvent"
          :resetParams="resetParams"
        />
      </div>
    </my-modal>
    <!-- 红绿弹框 -->
    <!-- <my-modal
      width="80"
      v-model="isShowPeriod"
      title="红绿图"
      confirmText="确定"
      :resetBtn="false"
      :confirmBtn="false"
      @cancel="cancel"
    >
      <div slot="operateItem">
        <red-green-and-figure :taskId="taskId" :resetParams="resetParams" />
      </div>
    </my-modal> -->
    <my-modal
      width="65"
      v-model="isShowbar"
      title="柱状图"
      confirmText="确定"
      :resetBtn="false"
      :confirmBtn="false"
      @cancel="cancel"
    >
      <div slot="operateItem">
        <div class="lanuch-bar-content">
          <lanuch-bar-module />
        </div>
      </div>
    </my-modal>
  </div>
</template>

<script>
import myModal from "@/components/modals/modal.vue";
import myTable from "@/components/table/my-table.vue";
import page from "@/components/page/page.vue";
import redGreenAndFigure from "./redGreenAndFigure";
import lanuchBarModule from "./lanuchBarModule";
import lanudchWindos from "./lanudchWindos.vue";
export default {
  data() {
    return {
      launchWindowsId: "", //发射窗口id
      // -----------------------------------
      pageTotal: 0,
      pageSize: 10,
      pageNum: 1,
      ruleValidate: {
        dandohName: true, //弹道名称（状态）
        collisionProbability: false, //碰撞概率阀值（状态）
        debrisNumber: false, //碎片编号（状态）
        withoutCollisionProbability: true, //无碰撞概率阀值（状态）
        UNNWDistance: false, //显示UNNW距离（状态）
        distanceThreshold: false, //交会距离阀值（状态）
        R: true, //R （状态）
        T: true, //T （状态）
        N: true, //N （状态）
        trajectoryName: "", //弹道名称（值）
        impactProbability: "", //碰撞概率阀值（值）
        fragmentNumber: "", //碎片编号（值）
        intersectionDistance: "", //交会距离阀值（值）
        Rkilometer: "", //R 千米（值）
        Tkilometer: "", //T 千米（值）
        Nkilometer: "", //N 千米（值）
      },
      columns: [
        {
          type: "selection",
          width: 80,
          align: "center",
        },
        {
          title: "序号",
          width: 100,
          type: "index",
          align: "center",
        },
        {
          title: "发射时间",
          width: 250,
          key: "launchTime",
          align: "center",
        },
        {
          title: "轨道段",
          width: 150,
          key: "orbitalPeriod",
          align: "center",
        },
        {
          title: "碎片编号",
          width: 150,
          key: "debrisNumber",
          align: "center",
        },
        {
          title: "交会时间",
          width: 250,
          key: "intersectionTime",
          align: "center",
        },
        {
          title: "交会距离（km）",
          width: 150,
          key: "intersectionDistance",
          align: "center",
        },
        {
          title: "碰撞概率",
          width: 150,
          key: "collisionProbability",
          align: "center",
        },
        {
          title: "相对速度（km/·）",
          width: 150,
          key: "relativeSpeed",
          align: "center",
        },
        {
          title: "交会角（*）",
          width: 150,
          key: "IntersectionAngle",
          align: "center",
        },
        {
          title: "交会距离矢量U",
          width: 150,
          key: "IntersectionDistanceU",
          align: "center",
        },
        {
          title: "交会距离矢量W",
          width: 150,
          key: "IntersectionDistanceW",
          align: "center",
        },
        {
          title: "交会距离矢量R",
          width: 150,
          key: "IntersectionDistanceR",
          align: "center",
        },
        {
          title: "交会距离矢量T",
          width: 150,
          key: "IntersectionDistanceT",
          align: "center",
        },
        {
          title: "交会距离矢量N",
          width: 150,
          key: "IntersectionDistanceN",
          align: "center",
        },
        {
          title: "卫星X",
          width: 150,
          key: "satelliteX",
          align: "center",
        },
        {
          title: "卫星Y",
          width: 150,
          key: "satelliteY",
          align: "center",
        },
        {
          title: "卫星Z",
          width: 150,
          key: "satelliteZ",
          align: "center",
        },
        {
          title: "碎片X",
          width: 150,
          key: "fragmentX",
          align: "center",
        },
        {
          title: "碎片Y",
          width: 150,
          key: "fragmentY",
          align: "center",
        },
        {
          title: "碎片Z",
          width: 150,
          key: "fragmentZ",
          align: "center",
        },
        {
          title: "卫星XV",
          width: 150,
          key: "satelliteXV",
          align: "center",
        },
        {
          title: "卫星YV",
          width: 150,
          key: "satelliteYV",
          align: "center",
        },
        {
          title: "卫星ZV",
          width: 150,
          key: "satelliteZV",
          align: "center",
        },
        {
          title: "碎片XV",
          width: 150,
          key: "fragmentXV",
          align: "center",
        },
        {
          title: "碎片ZV",
          width: 150,
          key: "fragmentZV",
          align: "center",
        },
        {
          title: "背景目标数据类型",
          width: 150,
          key: "backTargetDataType",
          align: "center",
        },
        {
          title: "入库时间",
          width: 250,
          key: "storageTime",
          align: "center",
        },
        // {
        //     title: "操作",
        //     slot: "action",
        //     width: 400,
        //     align: "center",
        // },
      ],
      data: [
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
        {
          launchTime: "2021-10-01 10:03:00",
          orbitalPeriod: "1983.28",
          debrisNumber: "832.321",
          intersectionTime: "2021-11-03 12:00:00",
          intersectionDistance: "1923.3219.000",
          collisionProbability: "0",
          relativeSpeed: "100",
          IntersectionAngle: "3.21",
          IntersectionDistanceU: "3",
          IntersectionDistanceW: "2.5",
          IntersectionDistanceR: "2.5",
          IntersectionDistanceT: "3.1",
          IntersectionDistanceN: "1.8",
          satelliteX: "10423",
          satelliteY: "10321",
          satelliteZ: "10321",
          fragmentX: "2134",
          fragmentY: "2120",
          fragmentZ: "2123",
          satelliteXV: "321",
          satelliteYV: "12034",
          satelliteZV: "10234",
          fragmentXV: "3123",
          fragmentZV: "213",
          backTargetDataType: "发射卫星交会",
          storageTime: "2021-01-01 00:00:00",
        },
      ],
      isShowPeriod: false,
      isShowbar: false,
      isShowLanudchWindos: false,
      resetParams: false,
    };
  },
  components: {
    myModal,
    myTable,
    page,
    redGreenAndFigure,
    lanuchBarModule,
    lanudchWindos,
  },
  methods: {
    //  回调任务编号ID
    onLaunchWindowsIdEvent(val) {
      this.launchWindowsId = val;
    },
    // 发射确定弹窗
    lanudchConfirm() {
      if (this.launchWindowsId) {
        let params = {
          launchWindowsId: this.launchWindowsId,
        };
        this.$api.common.getJudgeMsg(params).then((res) => {
          if (res.success == true) {
            this.$router.push({
              name: "redGreenAndFigure",
              path: "/redGreenAndFigure",
              query: res.data,
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
        this.$Notice.warning({
          title: "请选择发射时间。。。",
          top: 50,
          duration: 5,
        });
      }
    },
    // ------------------------------------------
    //   页数
    pageChange() {},
    //   条数
    pageSizeChange() {},
    // 生成安全时段设置
    onProducePeriodEvent() {
      this.isShowLanudchWindos = true;
    },
    // 生成碰撞概率设置
    onCollisionProbabilityEvent() {
      this.isShowbar = true;
    },
    // 取消
    cancel() {
      this.resetParams = !this.resetParams;
      this.isShowLanudchWindos = false;
      this.isShowPeriod = false;
      // this.isShowbar = false;
    },
  },
};
</script>

<style lang="less" scoped>
.launch-container {
  width: 100%;
  height: 100%;
  font-size: @lable-font-size;
  color: @lable-font-color;
  .launch-header-content {
    display: flex;
    align-items: center;
    .launch-header-left,
    .launch-header-right {
      width: 20%;
    }
    .launch-header-checkbox {
      display: flex;
      flex-wrap: wrap;
      /deep/.ivu-checkbox-wrapper {
        width: 33%;
        display: flex;
        align-items: center;
        margin: 5px 0;
        .checkbox-content {
          display: flex;
          align-items: center;
          margin: 0 5px;
          span {
            margin: 0 5px;
          }
        }
      }
    }
  }
  .lanuch-bar-content {
    width: 100%;
    height: 100%;
  }
}
.share-btn {
  margin: 10px;
}
</style>
