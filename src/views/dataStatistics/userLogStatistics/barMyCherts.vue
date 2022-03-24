<template>
  <div ref="test" id="barMyCharts"></div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
    },
  },
  data() {
    return {
      option: {
        // title: {
        //   left: "center",
        //   text: "用户日志统计",
        //   textStyle: {
        //     color: "#c9e1ff",
        //     fontSize: 20,
        //   },
        // },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Rainfall", "Evaporation"],
        },
        toolbox: {
          show: true,
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: false, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true, type: "jpg", name: "柱状图" },
          },
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 80,
            end: 100,
          },
          {
            type: "inside",
            realtime: true,
            start: 30,
            end: 60,
          },
        ],
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "2021/01",
              "2021/02",
              "2021/03",
              "2021/04",
              "2021/05",
              "2021/06",
              "2021/07",
              "2021/08",
              "2021/09",
              "2021/10",
              "2021/11",
              "2021/12",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "登录日志",
            type: "bar",
            showBackground: true,
            data: [
              3432, 6423, 3432, 7234, 2423, 1232, 1430, 2348, 4232, 7523, 4234,
              2134,
            ],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "Max" },
            //     { type: "min", name: "Min" },
            //   ],
            // },
            itemStyle: {
              color: "#AAB4FC",
            },
          },
          {
            name: "注册日志",
            type: "bar",
            showBackground: true,
            data: [
              2443, 3215, 3211, 2130, 4320, 2340, 1024, 3213, 1321, 4215, 3210,
              3212,
            ],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "Max" },
            //     { type: "min", name: "Min" },
            //   ],
            // },
            itemStyle: {
              color: "#386EA7",
            },
          },

          {
            name: "修改日志",
            type: "bar",
            showBackground: true,
            data: [
              2321, 3213, 1432, 324, 3213, 3210, 2310, 4320, 3210, 3210, 2130,
              3420,
            ],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "Max" },
            //     { type: "min", name: "Min" },
            //   ],
            // },
            itemStyle: {
              color: "#0b5db4",
            },
          },

          {
            name: "删除日志",
            type: "bar",
            showBackground: true,
            data: [
              2342, 1432, 2313, 3211, 4320, 4322, 4320, 2340, 4350, 3450, 3450,
              3210,
            ],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "Max" },
            //     { type: "min", name: "Min" },
            //   ],
            // },
            itemStyle: {
              color: "# fe6f6f",
            },
          },
          {
            name: "下载日志",
            type: "bar",
            showBackground: true,
            data: [
              2340, 3245, 1426, 2116, 4322, 1432, 2421, 2313, 1428, 3245, 3243,
              3542,
            ],
            // markPoint: {
            //   data: [
            //     { type: "max", name: "Max" },
            //     { type: "min", name: "Min" },
            //   ],
            // },
            itemStyle: {
              color: "#99A5FF",
            },
          },
        ],
      },
    };
  },
  watch: {
    obj: {
      handler(newName) {
        this.option.xAxis.data = newName.data;
        this.option.series[0].data = newName.login;
        this.option.series[1].data = newName.reqister;
        this.option.series[2].data = newName.updata;
        this.option.series[3].data = newName.delete;
        this.option.series[4].data = newName.download;
        this.getMyCharts();
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.getMyCharts();
  },
  methods: {
    getMyCharts() {
      this.$nextTick(function () {
        let myChart = this.$echarts.init(
          document.getElementById("barMyCharts")
        );
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#barMyCharts {
  width: 1200px;
  height: 580px;
  padding: 10px 0;
}
</style>
