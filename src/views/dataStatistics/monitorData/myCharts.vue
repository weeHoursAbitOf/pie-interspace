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
        grid: {
          left: 100,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
            },
          },
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: [
            "山大威海站",
            "阿里站",
            "库尔勒站",
            "南山观测站",
            "KIAM测站",
            "ISON测站",
            "智利站",
          ],
          margin: 20,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
              // width: "1",
            },
          },
        },
        series: [
          {
            name: "风速",
            type: "bar",
            data: [312, 435, 123, 546, 345, 213, 563],
            label: {
              show: true,
            },
          },
          {
            name: "风向",
            type: "bar",
            data: [324, 546, 324, 564, 234, 546, 234],
            label: {
              show: true,
            },
          },
          {
            name: "测风",
            type: "bar",
            data: [324, 432, 654, 245, 352, 546, 213],
            label: {
              show: true,
            },
          },
          {
            name: "气流",
            type: "bar",
            data: [546, 546, 324, 546, 324, 456, 213],
            label: {
              show: true,
            },
          },
          {
            name: "湿度",
            type: "bar",
            data: [423, 656, 423, 657, 123, 563, 321],
            label: {
              show: true,
            },
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
