<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {
              type: "jpg",
              name: "图形",
              show: true,
            },
          },
        },
        xAxis: {
          type: "category",
          name: "空间碎片监测与应用服务系统已生成空间碎片轨道信息和特征信息",
          nameLocation: "middle",
          nameGap: 40,
          nameTextStyle: {
            fontSize: 15,
          },
          show: true,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
        },
        yAxis: {
          type: "value",
          show: true,
          axisLine: {
            show: true,
            onZero: false,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
          boundaryGap: false,
        },
        series: [
          {
            name: "轨道信息",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            radius: "50%",
            showBackground: true,
            lineStyle: {
              width: 2,
              type: "solid",
            },
            data: [100000, 200000, 3000000, 400000, 500000, 600000, 800000],
          },
          {
            name: "特征信息",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            radius: "50%",
            showBackground: true,
            lineStyle: {
              width: 2,
              type: "solid",
            },
            data: [10000, 20000, 300000, 40000, 50000, 60000, 80000],
          },
        ],
      },
    };
  },

  created() {
    this.getMyCharts();
  },
  methods: {
    getMyCharts() {
      this.$nextTick(function () {
        let myChart = this.$echarts.init(document.getElementById("myCharts"));
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#myCharts {
  width: 100%;
  height: 650px;
}
</style>
