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
          width: "80",
          align: "center",
        },
        {
          title: "字段名称",
          key: "filedsName",
          width: "200",
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
          width: "200",
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
          key: "dataType",
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
                params.row.dataType
              ),
            ]);
          },
        },
        {
          title: "示例",
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
                params.row.csvLinq.csvLinq1
              ),
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.csvLinq.csvLinq2
              ),
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.csvLinq.csvLinq3
              ),
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.csvLinq.csvLinq4
              ),
              h(
                "div",
                {
                  style: {
                    textAlign: "left",
                  },
                },
                params.row.csvLinq.csvLinq
              ),
            ]);
          },
        },
      ],
      data: [
        {
          filedsName: "OMM Header",
          fieldsMeaning: "",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "CCSDS_OMM_VERS",
          fieldsMeaning: "格式版本号",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "2.0",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "CREATION_DATE",
          fieldsMeaning: "消息创建时间（UTC）",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "2001-11-06T11:17:33",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "ORIGINATOR",
          fieldsMeaning: "所有者/运营商",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "CNSA",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "OMM Metadata",
          fieldsMeaning: "",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "OBJECT_NAME",
          fieldsMeaning: "编目名称",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "TELCOM 2",
            csvLinq2: "SPACEWAY 2",
            csvLinq3: "INMARSAT 4-F2",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "OBJECT_ID",
          fieldsMeaning: "卫星发射年份及顺序",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "2005-046B",
            csvLinq2: "2005-046A",
            csvLinq3: "2003-022A",
            csvLinq4: "2005-044A",
            csvLinq5: "",
          },
        },
        {
          filedsName: "CENTER_NAME",
          fieldsMeaning: "参考框架中心",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "EARTH",
            csvLinq2: "MARS",
            csvLinq3: "MOON",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "REF_FRAME",
          fieldsMeaning: "参考框架",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "TEME",
            csvLinq2: "EME2000",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "TIME_SYSTEM",
          fieldsMeaning: "时间系统",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "UTC",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "MEAN_ELEMENT_THEORY",
          fieldsMeaning: "定轨方法",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "SGP4",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "OMM Data（1）",
          fieldsMeaning: "",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "EPOCH",
          fieldsMeaning: "历元",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "MEAN_MOTION",
          fieldsMeaning: "半长轴或每天环绕地球的圈数",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "15.48949833",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "ECCENTRICITY",
          fieldsMeaning: "偏心率",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "0.00044140",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "INCLINATION",
          fieldsMeaning: "倾角",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "51.6415",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "RA_OF_ASC_NoDE",
          fieldsMeaning: "升交点赤经",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "193.9729",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "ARG_OF_PERICENTER",
          fieldsMeaning: "近地点幅角",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "287.4837",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "MEAN_ANoMALY",
          fieldsMeaning: "平近点角",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "253.6360",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "用户自定义参数",
          fieldsMeaning: "",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "SEMIMAJOR_AXIS",
          fieldsMeaning: "半长轴",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "PERIOD",
          fieldsMeaning: "周期",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "APOAPSIS",
          fieldsMeaning: "远地点",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
        {
          filedsName: "PERIAPSIS",
          fieldsMeaning: "近地点",
          dataType: "",
          columnOrdinal: {
            whichRow: "",
            linage: "",
          },
          eleLinq: "",
          csvLinq: {
            csvLinq1: "",
            csvLinq2: "",
            csvLinq3: "",
            csvLinq4: "",
            csvLinq5: "",
          },
        },
      ],
    };
  },
  methods: {
    handleSpan({ rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 1) {
        return [1, 4];
      } else if (rowIndex === 4 && columnIndex === 1) {
        return [1, 4];
      } else if (rowIndex === 11 && columnIndex === 1) {
        return [1, 4];
      } else if (rowIndex === 19 && columnIndex === 1) {
        return [1, 4];
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
