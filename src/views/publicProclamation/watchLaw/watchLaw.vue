<template>
  <div class="watch">
    <div class="watch-topic">{{ watchData.topic }}</div>
    <div class="watch-item">
      <div class="watch-items">{{ watchData.createTime }}</div>
      <div class="watch-items">{{ watchData.publisher }}</div>
    </div>
    <div class="watch-content" v-html="watchData.messageContent"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      watchData: {},
    };
  },
  mounted() {
    this.watchData = this.$route.query.watchLaw;
  },
};
</script>

<style lang="less" scoped>
.watch {
  color: #c9e1ff;
  padding: 20px;
  .watch-topic {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .watch-item {
    display: flex;
    justify-content: center;
    .watch-items {
      margin-right: 10px;
    }
  }
  .watch-content {
  }
}
</style>