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
          filedsName: "NORAD_CAT_ID",
          fieldsMeaning: "目标编号",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "03-07",
          },
          eleLinq: "25544",
          csvLinq: {
            linqTime: "25544",
            linqBmp: "",
          },
        },
        {
          filedsName: "CLASSIFICATION_TYPE",
          fieldsMeaning: "目标类别",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "08",
          },
          eleLinq: "U",
          csvLinq: {
            linqTime: "U",
            linqBmp: "",
          },
        },
        {
          filedsName: "OBJECT_ID",
          fieldsMeaning: "卫星发射年份及顺序",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "10-17",
          },
          eleLinq: "98067A",
          csvLinq: {
            linqTime: "1998-067A",
            linqBmp: "",
          },
        },
        {
          filedsName: "EPOCH_YYDDD",
          fieldsMeaning: "TLE历时",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "19-32",
          },
          eleLinq: "21343.88482639",
          csvLinq: {
            linqTime: "21343.88482639",
            linqBmp: "",
          },
        },
        {
          filedsName: "EPOCH_CALENDAR",
          fieldsMeaning: "TLE历时(UTC)",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "19-32",
          },
          eleLinq: "21343.88482639",
          csvLinq: {
            linqTime: "2021-12-09 21:14:09.000096",
            linqBmp: "",
          },
        },
        {
          filedsName: "MEAN_MOTION_DOT",
          fieldsMeaning: "平均运动的一阶时间导数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "34-43",
          },
          eleLinq: "0.00000143",
          csvLinq: {
            linqTime: "0.00000143",
            linqBmp: "",
          },
        },
        {
          filedsName: "MEAN_MOTION_DDOT",
          fieldsMeaning: "平均运动的二阶时间导数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "45-52",
          },
          eleLinq: "00000-0",
          csvLinq: {
            linqTime: "0.0000000000000",
            linqBmp: "",
          },
        },
        {
          filedsName: "BSTAR",
          fieldsMeaning: "BSTAR拖调制系数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "54-61",
          },
          eleLinq: "10791-4",
          csvLinq: {
            linqTime: "0.00001079100000",
            linqBmp: "",
          },
        },
        {
          filedsName: "EPHEMERIS_TYPE",
          fieldsMeaning: "星历表类型",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "62",
          },
          eleLinq: "0",
          csvLinq: {
            linqTime: "0",
            linqBmp: "",
          },
        },
        {
          filedsName: "EPHEMERIS_ID",
          fieldsMeaning: "星历编号",
          dataType: "",
          columnOrdinal: {
            whichRow: "第一行",
            linage: "65-68",
          },
          eleLinq: "999",
          csvLinq: {
            linqTime: "999",
            linqBmp: "",
          },
        },
        {
          filedsName: "INCLINATION",
          fieldsMeaning: "倾角",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "09-16",
          },
          eleLinq: "51.6415",
          csvLinq: {
            linqTime: "51.6415",
            linqBmp: "",
          },
        },
        {
          filedsName: "RA_OF_ASC_NODE",
          fieldsMeaning: "升交点赤经",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "18-25",
          },
          eleLinq: "193.9729",
          csvLinq: {
            linqTime: "193.9729",
            linqBmp: "",
          },
        },
        {
          filedsName: "ECCENTRICITY",
          fieldsMeaning: "偏心率",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "27-33",
          },
          eleLinq: "0004414",
          csvLinq: {
            linqTime: "0.00044140",
            linqBmp: "",
          },
        },
        {
          filedsName: "ARG_OF_PERICENTER",
          fieldsMeaning: "近地点幅角",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "35-42",
          },
          eleLinq: "287.4837",
          csvLinq: {
            linqTime: "287.4837",
            linqBmp: "",
          },
        },
        {
          filedsName: "MEAN_ANOMALY",
          fieldsMeaning: "平近点角",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "44-51",
          },
          eleLinq: "253.6360",
          csvLinq: {
            linqTime: "253.6360",
            linqBmp: "",
          },
        },
        {
          filedsName: "MEAN_MOTION",
          fieldsMeaning: "每天环绕地球的圈数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "53-63",
          },
          eleLinq: "15.48949833",
          csvLinq: {
            linqTime: "15.48949833",
            linqBmp: "",
          },
        },
        {
          filedsName: "REV_AT_EPOCH",
          fieldsMeaning: "发射以来飞行的圈数",
          dataType: "",
          columnOrdinal: {
            whichRow: "第二行",
            linage: "64-68",
          },
          eleLinq: "31582",
          csvLinq: {
            linqTime: "31582",
            linqBmp: "",
          },
        },
      ],
    };
  },
  methods: {
    handleSpan({rowIndex, columnIndex}) {
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
