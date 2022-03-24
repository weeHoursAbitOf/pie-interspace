<template>
  <!-- 相关法规列表组件 -->
  <div class="template-item">
    <div class="template-item-text">
      <div class="text-item">{{ listItem.templateName }}</div>
      <div class="text-item">{{ listItem.createTime }}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    listItem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.template-item {
  display: flex;
  align-items: center;
  color: @table-text-color;
  padding: 20px 50px 0;
  border-bottom: 1px solid @content-border-color;

  &:nth-child(1) {
    padding-top: 0px !important;
  }

  .template-item-text {
    display: flex;
    flex: 1;
    justify-content: center;
    height: inherit;
    margin-left: 30px;
    font-size: @template-font-size;
    font-weight: 400;
    font-style: normal;

    .text-item {
      display: flex;
      padding: 4px 0;
      flex: 1;
      max-width: 600px;
      white-space: nowrap;
      font-size: 16px;
      // color:@table-text-color;
    }
    .text-item:last-child {
      justify-content: flex-end;
    }
  }
}
</style>