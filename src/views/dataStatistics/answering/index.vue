<template>
  <div class="user-suggestion-container">
    <pie-card :slotHeader="false" :slotFooter="false">
      <div slot="iscontent">
        <div class="subassembly-content">
          <ul class="date-time">
            <li>
              <p>机构：</p>
              <span>
                <Select
                  @on-change="onOrganChange"
                  multiple
                  style="width: 300px"
                  placeholder="机构检索用户意见"
                >
                  <Option
                    v-for="item in organDataList"
                    :value="item.name"
                    :key="item.id"
                    >{{ item.name }}</Option
                  >
                </Select>
              </span>
            </li>
            <li>
              <p>日期：</p>
              <span>
                <DatePicker
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm:ss"
                  placeholder="时间检索用户意见"
                  style="width: 300px"
                  @on-change="onDateTimeChange"
                ></DatePicker>
              </span>
            </li>
          </ul>
          <subassembly :dataList="dataList" />
        </div>
      </div>
    </pie-card>
  </div>
</template>

<script>
import subassembly from "./subassembly.vue";
export default {
  data() {
    return {
      organ: "",
      organDataList: [],
      dateTime: [],
      dataList: [],
    };
  },
  components: {
    subassembly,
  },
  methods: {
    // 获取机构数据列表
    getOrganData() {
      this.$api.userManage.qureySelective().then((res) => {
        if (res.success == true) {
          this.organDataList = res.data.dataList;
        }
      });
    },
    // 多选机构
    onOrganChange(val) {
      this.organ = String(val);
      this.getData();
    },
    // 日期
    onDateTimeChange(time) {
      this.dateTime = time;
      this.getData();
    },
    // 获取数据
    getData() {
      let params = {
        title: this.organ,
        startTime: this.dateTime[0],
        endTime: this.dateTime[1],
      };
      this.$api.common.replyList(params).then((res) => {
        let dataList = [];
        res.data.forEach((item) => {
          dataList.push({
            title: item.title,
            value: item.counts,
            name: item.item.userName,
          });
        });
        this.dataList = dataList;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user-suggestion-container {
  width: 100%;
  height: 100%;
  .subassembly-content {
    width: 100%;
    height: 700px;
    padding: 60px 20px 20px 20px;
    position: relative;
    font-size: 20px;
    color: @main-font-color;
    .date-time {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        margin: 10px 0;
      }
    }
  }
}
</style>
