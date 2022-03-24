<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
let dataList = [100, 200, 300, 100, 200, 300, 400, 100, 200, 300];
let dataName = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
export default {
  data() {
    return {
      option: {
        xAxis: {
          data: dataName,
          axisLabel: {
            inside: true,
            color: "#fff",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: dataList,
          },
          {
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
            data: dataList,
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
        const zoomSize = 6;
        myChart.on("click", function (params) {
          myChart.dispatchAction({
            type: "dataZoom",
            startValue: dataName[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
              dataName[
                Math.min(params.dataIndex + zoomSize / 2, dataList.length - 1)
              ],
          });
        });
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
