<template>
  <div class="transfer-modals">
    <div class="transfer-modals-content">
      <div class="transfer-modals-header">
        <RadioGroup v-model="info">
          <Radio
            v-for="(item, index) in userInfo"
            :key="index"
            :label="item"
          ></Radio>
        </RadioGroup>
      </div>
      <div class="transfer-modals-section">
        <transfer
          :info="info"
          :defaultInfo="defaultInfo"
          :data="data"
          :obj="obj"
          @on-target-keys-event="onTargetKeysEvent"
        />
      </div>
      <div class="transfer-modals-footer">
        <share-btn
          class="share-btn"
          title="确定"
          callBackName="on-confirm-event"
          @on-confirm-event="onConfirmEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否传入数据
    afferentData: {
      type: Boolean,
      default: false,
    },
    defaultInfo: {
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
    // 数据源
    data: {
      type: Array,
      default: () => {
        return [];
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
  },
  data() {
    return {
      info: "",
    };
  },
  watch: {
    defaultInfo: {
      handler(newName) {
        this.info = newName;
      },
      immediate: true,
      deep: true,
    },
    info: {
      handler(newName) {
        if (!this.afferentData) {
          if (newName == this.defaultInfo) {
            this.getOrganization();
          } else {
            this.getUserData();
          }
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    //   回调数据
    onTargetKeysEvent(obj) {
      this.$emit("on-target-keys-event", obj);
    },
    // 获取机构数据
    getOrganization() {
      this.obj = {
        keys: "id",
        name: "name",
        disabled: false,
      };
      this.data = [
        {
          id: 0,
          name: "天文台",
        },
        {
          id: 1,
          name: "航天宏图",
        },
        {
          id: 2,
          name: "54所",
        },
        {
          id: 3,
          name: "中国科学院",
        },
        {
          id: 4,
          name: "航天启程",
        },
      ];
      // this.$api.userManage.querySelective().then((res) => {
      //   if (res.success == true) {
      //     this.obj = {
      //       keys: "id",
      //       name: "name",
      //       disabled: false,
      //     };
      //     this.data = res.data.dataList;
      //   } else {
      //     this.$Notice.error({
      //       title: res.message,
      //       top: 50,
      //       duration: 5,
      //     });
      //   }
      // });
    },
    // 获取用户数据
    getUserData() {
      this.obj = {
        keys: "id",
        name: "username",
        disabled: false,
      };
      this.data = [
        {
          id: 10,
          username: "test1",
        },
        {
          id: 11,
          username: "test2",
        },
        {
          id: 12,
          username: "test3",
        },
        {
          id: 13,
          username: "test4",
        },
        {
          id: 14,
          username: "test5",
        },
      ];
      // this.$api.userManage.newQueryAllUser().then((res) => {
      //   if (res.success == true) {
      //     this.obj = {
      //       keys: "id",
      //       name: "username",
      //       disabled: false,
      //     };
      //     this.data = res.data.roleList;
      //   } else {
      //     this.$Notice.error({
      //       title: res.message,
      //       top: 50,
      //       duration: 5,
      //     });
      //   }
      // });
    },
    //确定
    onConfirmEvent() {
      this.$emit("on-confirm-event", false);
    },
  },
};
</script>

<style scoped lang="less">
.transfer-modals {
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: @lable-font-color;
  font-size: @lable-font-size;
  .transfer-modals-content {
    background-color: rgba(10, 13, 62, 0.85);
    box-shadow: inset 0px 0px 5px 3px rgba(3, 53, 182, 0.4);
    border: 1px solid @content-border-color;
    border-radius: 10px;
    padding: 10px 20px;
    .transfer-modals-header {
      padding: 10px 0;
    }
    .transfer-modals-section {
    }
    .transfer-modals-footer {
      widows: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 10px 0;
    }
  }
}
.share-btn {
  margin: 0 10px;
}
</style>
