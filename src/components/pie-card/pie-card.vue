<template>
  <div class="public-bg">
    <div class="pie-card-header" v-if="slotHeader">
      <slot name="header"></slot>
    </div>
    <div class="pie-card-content" v-if="slotIsContent">
      <slot name="iscontent"></slot>
    </div>
    <div class="pie-card-footer" v-if="slotFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    slotHeader: {
      type: Boolean,
      default: true,
    },
    slotIsContent: {
      type: Boolean,
      default: true,
    },
    slotFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="less">
.pie-card-header {
  padding: 20px;
  box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
  border: 1px solid @content-border-color;
}

.pie-card-content {
  box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
  border: 1px solid @content-border-color;
  color: @main-font-color;
  margin-top: 10px;
}
.pie-card-footer {
  box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
  border: 1px solid @content-border-color;
  margin-top: 10px;
  padding: 10px;
}
</style>