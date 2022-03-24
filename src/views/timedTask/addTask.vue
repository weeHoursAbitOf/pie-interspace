<template>
  <div class="add-task-content">
    <ol>
      <li>
        <p>Cron表达式</p>
        <span>
          <Input v-model="cronWhile" class="cron-input"></Input>
        </span>
      </li>
      <li>
        <p>任务名称</p>
        <span>
          <Input v-model="taskName"></Input>
        </span>
      </li>
      <li>
        <p>任务组名称</p>
        <span>
          <Input v-model="taskGroupName"></Input>
        </span>
      </li>
      <li>
        <p>IP地址</p>
        <span>
          <Input v-model="IPsite"></Input>
        </span>
      </li>
      <li>
        <p>请求类型</p>
        <span>
          <Select v-model="requestType">
            <Option
              v-for="(item, index) in requestTypeList"
              :key="index"
              :value="item.value"
              >{{ item.value }}</Option
            >
          </Select>
        </span>
      </li>
      <li>
        <p>JSON参数</p>
        <span>
          <Input
            v-model="JSONParams"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5 }"
          ></Input>
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: "",
      taskGroupName: "",
      cronWhile: "",
      IPsite: "",
      JSONParams: "",
      requestType: "",
      requestTypeList: [
        {
          value: "GET",
          label: "GET",
        },
        {
          value: "POST",
          label: "POST",
        },
        {
          value: "PUT",
          label: "PUT",
        },
        {
          value: "DELETE",
          label: "DELETE",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.add-task-content {
  font-size: @lable-font-size;
  color: @lable-font-color;
}
ol {
  li {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;
    p {
      width: 100px;
      text-align: right;
      margin: 0 5px;
    }
    span {
      flex: 1;
    }
  }
}
</style>
