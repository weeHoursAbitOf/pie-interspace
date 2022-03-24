<template>
  <div class="check-information">
    <ol>
      <li>
        <p>用户名称 :</p>
        <span>{{ dataItem.userName }}</span>
      </li>
      <li>
        <p>角色 :</p>
        <span>{{ dataItem.userName }}</span>
      </li>
      <li>
        <p>用户类型 :</p>
        <span>{{
          dataItem.userType == 0
            ? "基础"
            : dataItem.userType == 1
            ? "高级"
            : "定向"
        }}</span>
      </li>
      <li>
        <p>单位名称 :</p>
        <span>{{ dataItem.userEnterprise }}</span>
      </li>
      <li>
        <p>产品类型 :</p>
        <span>{{ dataItem.productType }}</span>
      </li>
      <li>
        <p>需求编号 :</p>
        <span>{{ dataItem.userDemandNumber }}</span>
      </li>
      <li>
        <p>需求类型 :</p>
        <span>{{ dataItem.userDemandType }}</span>
      </li>
      <li>
        <p>申请时间 :</p>
        <span>{{ dataItem.create_time }}</span>
      </li>
      <li>
        <p>受理状态 :</p>
        <span>{{ dataItem.acceptanceStatusMsg }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    dataItem: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.check-information {
  color: @product-title-color;
  font-size: @lable-font-size;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ol {
    li {
      display: flex;
      margin: 10px 0;
      p {
        width: 80px;
        text-align: right;
        margin-right: 10px;
      }
    }
  }
}
</style>