<template>
  <div class="tabs">
    <template v-for="(item, index) in dataList">
      <div class="tabs-item" :class="{ selected: currIndex == index }" :key="item.id" @click="clickTabs(item, index)">
        <span class="tabs-item-title">{{ item.title }}</span>
      </div>
    </template>
    <!-- <span class="tabs-item">系统状态产品</span> -->
  </div>
</template>
<script>
  export default {
    props: {
      dataList: {
        type: Array,
        default: []
      },
    },
    data() {
      return {
        currIndex: 0
      }
    },
    methods: {
      clickTabs(item, index) {
        this.currIndex = index;
        this.$emit("clickTabs", item)
      }
    },

  }
</script>
<style lang="less" scoped>
  .tabs {
    display: flex;
    border-bottom: 2px solid @content-border-color;
    padding: 0 20px 20px 20px;

    .tabs-item {
      display: flex;
      justify-content: center;
      flex-grow: 0;
      color: @menu-fontcolor;
      margin-right: 20px;
      // background: url('../../assets/public/tabs_bg.png');
      background: @menu-item-bg;
      background-repeat: no-repeat;
      -moz-background-size: 100%;
      -webkit-background-size: 100%;
      -o-background-size: 100%;
      min-width: 170px;
      white-space: nowrap;
      flex-wrap: nowrap;
      height: 34px;
      line-height: 34px;

      .tabs-item-title {
        padding: 0 20px;
        font-size: 18px;
      }
    }

    .selected {
      color: @menu-selected;
      // background: url('../../assets/public/tabs_bgac.png');
      background: @menu-item-bg-ac;
      background-repeat: no-repeat;
      -moz-background-size: 100%;
      -webkit-background-size: 100%;
      -o-background-size: 100%;
    }
  }
</style>