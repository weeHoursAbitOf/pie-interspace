<template>
  <div class="launchForeign-container">
    <div class="launchForeign-content">
      <div class="launchForeign-section">
        <ul>
          <li>
            <p>任务编号</p>
            <span>
              <Input style="width: 300px" />
            </span>
          </li>
          <li>
            <p>对外服务对象：</p>
            <span>
              <share-btn
                class="btn-item"
                title="+"
                callBackName="addServiceTarget"
                @addServiceTarget="addServiceTarget"
              />
            </span>
          </li>
          <li v-show="groupList.length > 0">
            <p>机构ID:</p>
            <div style="width: 20px"></div>
            <template v-for="(member, index) in groupList">
              <div :key="member.id">
                {{ member.name }}
                <label v-if="index < groupList.length - 1">,</label>
              </div>
            </template>
          </li>
          <li v-show="userList.length > 0">
            <p>用户ID:</p>
            <div style="width: 20px"></div>
            <template v-for="(member, index) in userList">
              <div :key="member.id">
                {{ member.username }}
                <label v-if="index < userList.length - 1">,</label>
              </div>
            </template>
          </li>
        </ul>
      </div>
      <div class="launchForeign-footer">
        <share-btn
          title="重置"
          callBackName="reset-event"
          @reset-event="resetevent"
        />
        <div style="width: 20px"></div>
        <share-btn
          title="配置"
          callBackName="configuration-event"
          @configuration-event="configurationevent"
        />
      </div>
    </div>
    <transferModals
      v-show="isShowTransfer"
      @on-target-keys-event="onTargetKeysEvent"
      @on-confirm-event="onConfirmEvent"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowTransfer: false,
      groupList: [], //机构id
      userList: [], //用户ID
    };
  },
  methods: {
    // 添加服务对象
    addServiceTarget() {
      this.isShowTransfer = true;
    },
    // 确定对外服务
    onConfirmEvent(type) {
      this.isShowTransfer = type;
    },
    // 对外服务回调回来的数据
    onTargetKeysEvent(obj) {
      if (obj.name == "机构") {
        this.groupList = obj.data;
      } else {
        this.userList = obj.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.launchForeign-content {
  padding: @table-padding;
  font-size: @lable-font-size;
  color: @main-font-color;
  .launchForeign-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        margin: 10px 0;
        p {
          width: 120px;
          text-align: right;
        }
        span {
          margin-left: @table-padding;
        }
      }
    }
  }
  .launchForeign-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: @table-padding;
  }
}
.group-drag-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
