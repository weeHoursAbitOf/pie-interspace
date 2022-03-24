<template>
  <my-table
    border
    :span-method="handleSpan"
    ref="selection"
    :columns="columns"
    :data="data"
  >
  </my-table>
</template>

<script>
import myTable from "@/components/table/my-table.vue";
export default {
  components: {
    myTable,
  },
  data() {
    return {
      columns: [
        {
          title: "序号",
          type: "index",
          width: "100",
          align: "center",
        },
        {
          title: "字段名称",
          key: "filedsName",
          width: "250",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.filedsName
              ),
            ]);
          },
        },
        {
          title: "字段含义",
          width: "300",
          key: "fieldsMeaning",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.fieldsMeaning
              ),
            ]);
          },
        },
        {
          title: "数据类型",
          width: "150",
          key: "dataType",
          align: "center",
        },
        // {
        //   title: "列序数",
        //   width: "100",
        //   key: "columnOrdinal",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "div",
        //         {
        //           style: {
        //             textAlign: "left",
        //           },
        //         },
        //         params.row.columnOrdinal.whichRow
        //       ),
        //       h(
        //         "div",
        //         {
        //           style: {
        //             textAlign: "left",
        //           },
        //         },
        //         params.row.columnOrdinal.linage
        //       ),
        //     ]);
        //   },
        // },
        // {
        //   title: "ELE示例",
        //   width: "100",
        //   key: "eleLinq",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "div",
        //         {
        //           style: {
        //             textAlign: "left",
        //           },
        //         },
        //         params.row.eleLinq
        //       ),
        //     ]);
        //   },
        // },
        {
          title: "CSV示例",
          key: "csvLinq",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.csvLinq.linqTime
              ),
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.csvLinq.linqBmp
              ),
            ]);
          },
        },
      ],
      data: [
        {
          filedsName: "EPOCH_CALENDAR",
          fieldsMeaning: "ELE历时(UTC)",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "1-24",
          },
          eleLinq: "2020 11 19 20 31 01.0000",
          csvLinq: {
            linqTime: "2020-11-19 20:31:01.0000",
            linqBmp: "",
          },
        },
        {
          filedsName: "EPOCH_YYDDD",
          fieldsMeaning: "ELE历时",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "3-4,26-39",
          },
          eleLinq: "20019.8548726852",
          csvLinq: {
            linqTime: "20019.8548726852",
            linqBmp: "",
          },
        },
        {
          filedsName: "NORAD_CAT_ID",
          fieldsMeaning: "目标编号",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "41-46",
          },
          eleLinq: "802868",
          csvLinq: {
            linqTime: "802868",
            linqBmp: "",
          },
        },
        {
          filedsName: "MEAN_MOTION_DDOT",
          fieldsMeaning: "平均运行角速度的二阶变化率",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "48-60",
          },
          eleLinq: "+0.0000000000",
          csvLinq: {
            linqTime: "+0.0000000000",
            linqBmp: "",
          },
        },
        {
          filedsName: "DA",
          fieldsMeaning: "轨道半长轴",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "1-14",
          },
          eleLinq: "39906540.00583",
          csvLinq: {
            linqTime: "39906540.00583",
            linqBmp: "",
          },
        },
        {
          filedsName: "DE",
          fieldsMeaning: "轨道偏心率",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "16-24",
          },
          eleLinq: "0.0073239",
          csvLinq: {
            linqTime: "0.0073239",
            linqBmp: "",
          },
        },
        {
          filedsName: "INCLINATION",
          fieldsMeaning: "轨道倾角",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "26-33",
          },
          eleLinq: "002.6555",
          csvLinq: {
            linqTime: "002.6555",
            linqBmp: "",
          },
        },
        {
          filedsName: "RA_OF_ASC_NODE",
          fieldsMeaning: "升交点赤经",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "35-42",
          },
          eleLinq: "273.4008",
          csvLinq: {
            linqTime: "273.4008",
            linqBmp: "",
          },
        },
        {
          filedsName: "ARG_OF_PERICENTER",
          fieldsMeaning: "近地点幅角",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "44-51",
          },
          eleLinq: "314.8632",
          csvLinq: {
            linqTime: "314.8632",
            linqBmp: "",
          },
        },
        {
          filedsName: "MEAN_ANOMALY",
          fieldsMeaning: "平近点角",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "53-60",
          },
          eleLinq: "196.7468",
          csvLinq: {
            linqTime: "196.7468",
            linqBmp: "",
          },
        },
        {
          filedsName: "MEAN_MOTION_DOT",
          fieldsMeaning: "平均运行角速度的一阶变化率",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "1-13",
          },
          eleLinq: "+0.0000000000",
          csvLinq: {
            linqTime: "+0.0000000000",
            linqBmp: "",
          },
        },
        {
          filedsName: "a_amr",
          fieldsMeaning: "大气阻力等效面质比",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "15-25",
          },
          eleLinq: "+000.027800",
          csvLinq: {
            linqTime: "+000.027800",
            linqBmp: "",
          },
        },
        {
          filedsName: "CD",
          fieldsMeaning: "大气阻尼系数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "27-29",
          },
          eleLinq: "2.2",
          csvLinq: {
            linqTime: "2.2",
            linqBmp: "",
          },
        },
        {
          filedsName: "l_amr",
          fieldsMeaning: "太阳光压等效面质比",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "31-41",
          },
          eleLinq: "+000.005000",
          csvLinq: {
            linqTime: "+000.005000",
            linqBmp: "",
          },
        },
        {
          filedsName: "ref",
          fieldsMeaning: "反射系数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "43-46",
          },
          eleLinq: "1.44",
          csvLinq: {
            linqTime: "1.44",
            linqBmp: "",
          },
        },
        {
          filedsName: "F10.7",
          fieldsMeaning: "F10.7太阳辐射流量",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "48-50",
          },
          eleLinq: "072",
          csvLinq: {
            linqTime: "072",
            linqBmp: "",
          },
        },
        {
          filedsName: "ap",
          fieldsMeaning: "AP地磁指数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "52-54",
          },
          eleLinq: "010",
          csvLinq: {
            linqTime: "010",
            linqBmp: "",
          },
        },
        {
          filedsName: "method",
          fieldsMeaning: "定轨方法",
          dataType: "",
          columnOrdinal: {
            whichRow: "第三行",
            linage: "56",
          },
          eleLinq: "1",
          csvLinq: {
            linqTime: "1",
            linqBmp: "",
          },
        },
      ],
    };
  },
  methods: {
    handleSpan({ rowIndex, columnIndex }) {
      // if (rowIndex === 0 && columnIndex === 1) {
      //   return [1, 4];
      // } else if (rowIndex === 15 && columnIndex === 1) {
      //   return [1, 4];
      // }
    },
  },
};
</script>

<style scoped lang="less"></style>
