<template>
  <div ref="test" id="myCharts"></div>
</template>
<script>
export default {
  data() {
    return {
      option: {
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
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#c9e1ff",
              width: "1",
            },
          },
        },
        series: [
          {
            name: "line",
            type: "line",
            datasetIndex: 1,
            sybolSize: 0.1,
            symbol: "circle",
            label: {
              show: true,
              fontSize: 16,
            },
            labelLayout: {
              dx: -20,
            },
            encode: {
              label: 2,
              tooltip: 1,
            },
          },
          {
            name: "",
            type: "scatter",
            itemStyle: {
              color: "rgb(255, 41, 41)",
              borderWinth: 0,
              borderColor: "rgb(255, 41, 41)",
            },
            data: [],
          },
        ],
      },
    };
  },

  created() {
    this.getMyCharts();
    let data = [
      {
        data1: 1100.054123,
      },
      {
        data1: 1200.054123,
      },
      {
        data1: 1400.054123,
      },
      {
        data1: 1500.054123,
      },
      {
        data1: 2000.054123,
      },
      {
        data1: 1000.054123,
      },
    ];
    data.forEach((item) => {
      this.option.series[1].data.push(item.data1);
    });
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
