<template>
  <div
    class="drag-list-wrapper"
    :style="{ width: width + 'vw', height: height + 'vh' }"
  >
    <div class="drag-list-title">
      <div class="title-list">
        <template v-for="item in titleList">
          <div
            class="title-list-item"
            :class="{ dragTitle: selectedId == item.value }"
            :key="item.value"
            @click="changeType(item)"
          >
            <span class="list-title">{{ item.lable }}</span>
          </div>
        </template>
        <!-- <div class="drag-list-top">
          <Input
            v-model="searchGroup"
            placeholder="搜索关键字"
            style="width: 240px"
          />
          <share-btn
            class="share-btn"
            title="搜索"
            :callBackName="callBackName"
            @call-back-search="callBackSearch(callBackTitleType)"
            >搜索</share-btn
          >
        </div> -->
      </div>
      <div class="title-list">已选</div>
      <!-- <h3>Draggable 1</h3>

      <h3>Draggable 1</h3> -->
    </div>
    <div class="drag-list-content">
      <!-- 左框 -->
      <div class="drag-list-con">
        <draggable
          class="list-group"
          :list="list1"
          group="people"
          @change="leftLog"
        >
          <div
            class="list-group-item"
            v-for="(element, index) in list1"
            :key="element.name"
          >
            <span class="iconfont icon-yonghu" v-if="selectedId == 1"></span>
            <span class="iconfont icon-jigou1" v-else> </span>
            {{ element[titleKey] }}
          </div>
        </draggable>
      </div>
      <!-- 中心切换图表 -->
      <div class="indicate">
        <span class="iconfont icon-yidong"></span>
      </div>
      <!-- 右框 -->
      <div class="drag-list-con">
        <draggable
          class="list-group"
          :list="list2"
          group="people"
          @change="rightLog"
        >
          <div
            class="list-group-item"
            v-for="(element, index) in list2"
            :key="element.name"
          >
            <span class="iconfont icon-yonghu" v-if="selectedId == 1"></span>
            <span class="iconfont icon-jigou1" v-else> </span>
            {{ element[titleKey] }}
          </div>
        </draggable>
      </div>
    </div>
    <div class="drag-cancel" @click="cancel">取消</div>
    <div class="drag-affirm" @click="affirm">确定</div>
    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" />
    <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "dragModal",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
  },
  props: {
    //标题列表，可以多个或者一个
    titleList: {
      type: Array,
      default: () => {
        return [
          { lable: "机构", value: 0 },
          { lable: "用户", value: 1 },
        ];
      },
    },
    //源数据
    selectList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    targetList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //右侧目标标题
    targetTitle: {
      type: String,
      default: "已选",
    },
    width: {
      type: String,
      default: "50",
    },
    height: {
      type: String,
      default: "80",
    },
    //key值 用于不同类型列表显示
    titleKey: {
      type: String,
      default: "username",
    },
    callBackTitleType: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list1: [],
      list2: [],
      selectedId: this.titleList[0].value,
      callBackName: "call-back-search",
      searchGroup: "",
      group: [],
      user: [],
    };
  },
  mounted() {
    if (this.callBackTitleType) {
      this.changeType(this.titleList[0]);
      this.selectedId = 0;
    } else {
      this.changeType(this.titleList[1]);
    }
    this.list1 = this.selectList;
  },
  watch: {
    selectList(newVal) {
      this.list1 = newVal;
      // deep: true;
    },
    targetList(newVal) {
      this.list2 = newVal;
      // deep: true;
    },
  },
  methods: {
    // add: function () {
    //   this.list.push({ name: "Juan" });
    // },
    // replace: function () {
    //   this.list = [{ name: "Edgard" }];
    // },
    // clone: function (el) {
    //   return {
    //     name: el.name + " cloned",
    //   };
    // },
    leftLog(evt) {
      // console.log(evt);
    },
    rightLog(evt) {
      if (this.selectedId == 0) {
        this.group.push(evt.added.element);
      } else {
        this.user.push(evt.added.element);
      }
      // window.console.log(evt);
    },
    //切换类型
    changeType(item) {
      this.selectedId = item.value;
      this.$emit("changeType", item);
    },
    // 确定
    affirm() {
      // { list1: this.list1, list2: this.list2 }
      this.$emit("affirm", { group: this.group, user: this.user });
    },
    // 取消
    cancel() {
      this.$emit("cancel");
    },
    // 搜索
    callBackSearch(type) {
      this.$emit("search-group", this.searchGroup, type);
      this.searchGroup = "";
    },
  },
};
</script>
<style lang="less">
.drag-list-wrapper {
  display: flex;
  position: relative;
  background: @modals-bg-color;
  .drag-cancel {
    background: #1077f5;
    position: absolute;
    font-size: 18px;
    padding: 6px 12px;
    border-radius: 6px;
    color: #ffffff;
    bottom: 20px;
    right: 100px;
  }

  .drag-affirm {
    background: #1077f5;
    position: absolute;
    font-size: 18px;
    padding: 6px 12px;
    border-radius: 6px;
    color: #ffffff;
    bottom: 20px;
    right: 20px;
  }
}

.drag-list-title {
  padding-left: 10px;
  display: flex;
  position: absolute;
  font-size: 20px;
  color: #ffffff;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid @modals-border-color;

  .dragTitle {
    color: #1077f5;
    font-size: 20px;
  }

  .title-list {
    display: flex;
    flex: 1;

    .title-list-item {
      margin-right: 20px;
    }
  }
  .drag-list-top {
    display: flex;
    align-items: center;
    margin-left: 130px;
    .share-btn {
      margin-left: 10px;
    }
  }
}

.drag-list-content {
  display: flex;
  overflow-y: scroll;
  margin-top: 60px;
  flex: 1;
}

.list-group {
  flex: 1;
}

.list-group-item {
  flex: 1;

  color: #ffffff;
  padding: 5px 20px;
  border: 1px solid @modals-border-color;
  font-size: 18px;
}

.indicate {
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 0 10px;
}

.drag-list-con {
  width: 50%;
  min-width: 140px;
  border: 1px solid @modals-border-color;
  flex: 1;
}

.list-group {
  min-height: 500px;
}

.iconfont {
  font-size: 18px;
}
</style>