<template>
  <div ref="test" id="pieMyCharts"></div>
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
        tooltip: {
          trigger: "item",
          formatter: "用户：{b}<br/> 回复：{c} 条 ({d}%)",
        },
        series: [
          {
            name: "回复统计",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 3500, name: "登录日志", selected: true },
              { value: 200, name: "注册日志" },
              { value: 2000, name: "修改日志" },
              { value: 1000, name: "删除日志" },
              { value: 1500, name: "下载日志" },
            ],
          },
          {
            name: "回复统计",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
              length: 30,
            },
            label: {
              formatter: "{a|{b}}{abg|}\n{hr|}\n 数量：{c}条 {per|{d}%}  ",
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "#6E7079",
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#8C8D8E",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: "#4C5058",
                  fontSize: 14,
                  fontWeight: "bold",
                  lineHeight: 35,
                },
                per: {
                  color: "#fff",
                  backgroundColor: "#4C5058",
                  padding: [3, 4],
                  borderRadius: 4,
                  lineHeight: 35,
                },
              },
            },
            data: [
              { value: 3000, name: "登录成功" },
              { value: 500, name: "登录警告" },
              { value: 160, name: "注册成功" },
              { value: 40, name: "注册警告" },
              { value: 200, name: "修改资料" },
              { value: 700, name: "修改密码" },
              { value: 300, name: "修改密保" },
              { value: 800, name: "修改数据" },
              { value: 200, name: "删除密保" },
              { value: 800, name: "删除数据" },
              { value: 1500, name: "下载数据" },
            ],
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
          document.getElementById("pieMyCharts")
        );
        myChart.setOption(this.option);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#pieMyCharts {
  width: 1200px;
  height: 580px;
  padding: 10px 0;
}
</style>
