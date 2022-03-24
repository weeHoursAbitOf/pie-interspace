<template>
  <Transfer
    filterable
    :data="data"
    :list-style="listStyle"
    :target-keys="targetKeys"
    :selected-keys="selectedKeys"
    :filter-method="filterMethod"
    @on-change="handleChange"
  />
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: "机构",
    },
    // 传入的信息
    userInfo: {
      type: Array,
      default: () => {
        return ["机构", "用户"];
      },
    },
    // 传入字符
    obj: {
      type: Object,
      default: () => {
        return {
          keys: "id",
          name: "name",
          disabled: false,
        };
      },
    },
    // 数据源
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 设置哪些被选中
    selectedKeys: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 设置样式
    listStyle: {
      type: Object,
      default: () => {
        return {
          width: "350px",
          height: "500px",
        };
      },
    },
  },
  data() {
    return {
      targetKeys: [], //设置右侧数据集
    };
  },
  watch: {
    // 监听数据来源
    data: {
      handler(newName) {
        return newName.forEach((item) => {
          item.key = item[this.obj.keys];
          item.label = item[this.obj.name];
          item.disabled = false;
        });
      },
      immediate: true,
      deep: true,
    },
    // 设置右侧数据集合
    targetKeys: {
      handler(newName) {
        let dataList = [];
        this.data.forEach((item) => {
          newName.map((its) => {
            if (item[this.obj.keys] == its) {
              dataList.push(item);
            }
          });
        });
        this.userInfo.forEach((item) => {
          if (this.info == item) {
            let obj = {
              name: item,
              data: dataList,
            };
            this.$emit("on-target-keys-event", obj);
          }
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 搜索当前的名称
    filerMethod(data, query) {
      return data.label.indexOf(query) > -1;
    },
    // 右侧已选keys
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.ivu-transfer {
  text-align: center;
}
/deep/.ivu-transfer-list-header {
  color: @lable-font-color;
  font-size: @lable-font-size;
  background: none;
  border: 0.005208rem solid @content-border-color;
  border-bottom: 00.005208rem solid @content-border-color;
  box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 04);
}
/deep/.ivu-transfer-list-body {
  border: 0.005208rem solid @content-border-color;
  box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 04);
  border-top: none;
}
/deep/.ivu-icon-ios-search:before {
  content: "\f2a7";
  font-size: 20px;
  position: relative;
  top: 5px;
  right: 5px;
}
/deep/.ivu-icon-ios-close-circle:before {
  content: "\f177";
  font-size: 20px;
  position: relative;
  top: 5px;
  right: 5px;
}
/deep/.ivu-transfer-list-body-search-wrapper {
  padding: 0 !important;
}
/deep/.ivu-transfer-list-content-item {
  display: flex;
  align-items: center;
  font-synthesis: @lable-font-size;
  color: @lable-font-color;
}
// 隐藏滚动条
/deep/::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
</style>
