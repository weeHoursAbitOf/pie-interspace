<template>
  <div class="timed-task-content">
    <Row justify="center">
      <Col
        span="15"
        class="demo-tabs-style1"
        style="background: #e3e8ee; padding: 16px"
      >
        <Tabs type="card">
          <TabPane label="秒">
            <RadioGroup v-model="minute">
              <Radio label="0"> 每秒 允许的通配符 [ - * / ] </Radio>
              <Radio label="1">
                周期从
                <InputNumber :min="0" :max="59"></InputNumber>
                -
                <InputNumber :min="0" :max="59"></InputNumber>
                秒
              </Radio>
              <Radio label="2">
                从
                <InputNumber :min="0" :max="59"></InputNumber>
                秒开始，每
                <InputNumber :min="0" :max="59"></InputNumber>
                秒执行一次
              </Radio>
              <Radio label="3">
                指定
                <CheckboxGroup>
                  <Checkbox label="00"></Checkbox>
                  <Checkbox label="01"></Checkbox>
                  <Checkbox label="02"></Checkbox>
                  <Checkbox label="03"></Checkbox>
                  <Checkbox label="04"></Checkbox>
                  <Checkbox label="05"></Checkbox>
                  <Checkbox label="06"></Checkbox>
                  <Checkbox label="07"></Checkbox>
                  <Checkbox label="08"></Checkbox>
                  <Checkbox label="09"></Checkbox>
                  <Checkbox label="10"></Checkbox>
                  <Checkbox label="11"></Checkbox>
                  <Checkbox label="12"></Checkbox>
                  <Checkbox label="13"></Checkbox>
                  <Checkbox label="14"></Checkbox>
                  <Checkbox label="15"></Checkbox>
                  <Checkbox label="16"></Checkbox>
                  <Checkbox label="17"></Checkbox>
                  <Checkbox label="18"></Checkbox>
                  <Checkbox label="19"></Checkbox>
                  <Checkbox label="20"></Checkbox>
                  <Checkbox label="21"></Checkbox>
                  <Checkbox label="22"></Checkbox>
                  <Checkbox label="23"></Checkbox>
                  <Checkbox label="24"></Checkbox>
                  <Checkbox label="25"></Checkbox>
                  <Checkbox label="26"></Checkbox>
                  <Checkbox label="27"></Checkbox>
                  <Checkbox label="28"></Checkbox>
                  <Checkbox label="29"></Checkbox>
                  <Checkbox label="30"></Checkbox>
                  <Checkbox label="31"></Checkbox>
                  <Checkbox label="32"></Checkbox>
                  <Checkbox label="33"></Checkbox>
                  <Checkbox label="34"></Checkbox>
                  <Checkbox label="35"></Checkbox>
                  <Checkbox label="36"></Checkbox>
                  <Checkbox label="37"></Checkbox>
                  <Checkbox label="38"></Checkbox>
                  <Checkbox label="39"></Checkbox>
                  <Checkbox label="40"></Checkbox>
                  <Checkbox label="41"></Checkbox>
                  <Checkbox label="42"></Checkbox>
                  <Checkbox label="43"></Checkbox>
                  <Checkbox label="44"></Checkbox>
                  <Checkbox label="45"></Checkbox>
                  <Checkbox label="46"></Checkbox>
                  <Checkbox label="47"></Checkbox>
                  <Checkbox label="48"></Checkbox>
                  <Checkbox label="49"></Checkbox>
                  <Checkbox label="50"></Checkbox>
                  <Checkbox label="51"></Checkbox>
                  <Checkbox label="52"></Checkbox>
                  <Checkbox label="53"></Checkbox>
                  <Checkbox label="54"></Checkbox>
                  <Checkbox label="55"></Checkbox>
                  <Checkbox label="56"></Checkbox>
                  <Checkbox label="57"></Checkbox>
                  <Checkbox label="58"></Checkbox>
                  <Checkbox label="59"></Checkbox>
                </CheckboxGroup>
              </Radio>
            </RadioGroup>
          </TabPane>
          <TabPane label="分钟">
            <RadioGroup v-model="minute">
              <Radio label="0"> 分钟 允许的通配符 [ - * / ] </Radio>
              <Radio label="1">
                周期从
                <InputNumber :min="0" :max="59"></InputNumber>
                -
                <InputNumber :min="0" :max="59"></InputNumber>
                分钟
              </Radio>
              <Radio label="2">
                从
                <InputNumber :min="0" :max="59"></InputNumber>
                分钟开始，每
                <InputNumber :min="0" :max="59"></InputNumber>
                分钟执行一次
              </Radio>
              <Radio label="3">
                指定
                <CheckboxGroup>
                  <Checkbox label="00"></Checkbox>
                  <Checkbox label="01"></Checkbox>
                  <Checkbox label="02"></Checkbox>
                  <Checkbox label="03"></Checkbox>
                  <Checkbox label="04"></Checkbox>
                  <Checkbox label="05"></Checkbox>
                  <Checkbox label="06"></Checkbox>
                  <Checkbox label="07"></Checkbox>
                  <Checkbox label="08"></Checkbox>
                  <Checkbox label="09"></Checkbox>
                  <Checkbox label="10"></Checkbox>
                  <Checkbox label="11"></Checkbox>
                  <Checkbox label="12"></Checkbox>
                  <Checkbox label="13"></Checkbox>
                  <Checkbox label="14"></Checkbox>
                  <Checkbox label="15"></Checkbox>
                  <Checkbox label="16"></Checkbox>
                  <Checkbox label="17"></Checkbox>
                  <Checkbox label="18"></Checkbox>
                  <Checkbox label="19"></Checkbox>
                  <Checkbox label="20"></Checkbox>
                  <Checkbox label="21"></Checkbox>
                  <Checkbox label="22"></Checkbox>
                  <Checkbox label="23"></Checkbox>
                  <Checkbox label="24"></Checkbox>
                  <Checkbox label="25"></Checkbox>
                  <Checkbox label="26"></Checkbox>
                  <Checkbox label="27"></Checkbox>
                  <Checkbox label="28"></Checkbox>
                  <Checkbox label="29"></Checkbox>
                  <Checkbox label="30"></Checkbox>
                  <Checkbox label="31"></Checkbox>
                  <Checkbox label="32"></Checkbox>
                  <Checkbox label="33"></Checkbox>
                  <Checkbox label="34"></Checkbox>
                  <Checkbox label="35"></Checkbox>
                  <Checkbox label="36"></Checkbox>
                  <Checkbox label="37"></Checkbox>
                  <Checkbox label="38"></Checkbox>
                  <Checkbox label="39"></Checkbox>
                  <Checkbox label="40"></Checkbox>
                  <Checkbox label="41"></Checkbox>
                  <Checkbox label="42"></Checkbox>
                  <Checkbox label="43"></Checkbox>
                  <Checkbox label="44"></Checkbox>
                  <Checkbox label="45"></Checkbox>
                  <Checkbox label="46"></Checkbox>
                  <Checkbox label="47"></Checkbox>
                  <Checkbox label="48"></Checkbox>
                  <Checkbox label="49"></Checkbox>
                  <Checkbox label="50"></Checkbox>
                  <Checkbox label="51"></Checkbox>
                  <Checkbox label="52"></Checkbox>
                  <Checkbox label="53"></Checkbox>
                  <Checkbox label="54"></Checkbox>
                  <Checkbox label="55"></Checkbox>
                  <Checkbox label="56"></Checkbox>
                  <Checkbox label="57"></Checkbox>
                  <Checkbox label="58"></Checkbox>
                  <Checkbox label="59"></Checkbox>
                </CheckboxGroup>
              </Radio>
            </RadioGroup>
          </TabPane>
          <TabPane label="小时">
            <RadioGroup v-model="hourStatus">
              <Radio label="0"> 小时 允许的通配符 [ - * / ] </Radio>
              <Radio label="1">
                周期从
                <InputNumber :min="0" :max="59"></InputNumber>
                -
                <InputNumber :min="0" :max="59"></InputNumber>
                小时
              </Radio>
              <Radio label="2">
                从
                <InputNumber :min="0" :max="59"></InputNumber>
                小时开始，每
                <InputNumber :min="0" :max="59"></InputNumber>
                小时执行一次
              </Radio>

              <Radio label="3">
                指定
                <div>
                  <CheckboxGroup>
                    <div>AM:</div>
                    <Checkbox label="1"></Checkbox>
                    <Checkbox label="2"></Checkbox>
                    <Checkbox label="3"></Checkbox>
                    <Checkbox label="4"></Checkbox>
                    <Checkbox label="5"></Checkbox>
                    <Checkbox label="6"></Checkbox>
                    <Checkbox label="7"></Checkbox>
                    <Checkbox label="8"></Checkbox>
                    <Checkbox label="9"></Checkbox>
                    <Checkbox label="10"></Checkbox>
                    <Checkbox label="11"></Checkbox>
                    <div>PM:</div>
                    <Checkbox label="12"></Checkbox>
                    <Checkbox label="13"></Checkbox>
                    <Checkbox label="14"></Checkbox>
                    <Checkbox label="15"></Checkbox>
                    <Checkbox label="16"></Checkbox>
                    <Checkbox label="17"></Checkbox>
                    <Checkbox label="18"></Checkbox>
                    <Checkbox label="19"></Checkbox>
                    <Checkbox label="20"></Checkbox>
                    <Checkbox label="21"></Checkbox>
                    <Checkbox label="22"></Checkbox>
                    <Checkbox label="23"></Checkbox>
                  </CheckboxGroup>
                </div>
              </Radio>
            </RadioGroup>
          </TabPane>
          <TabPane label="日">
            <RadioGroup v-model="day">
              <Radio label="0"> 日 允许的通配符 [ - * / L W ] </Radio>
              <Radio label="1"> 不指定 </Radio>
              <Radio label="2">
                周期从
                <InputNumber :min="1" :max="31"></InputNumber>
                -
                <InputNumber :min="1" :max="31"></InputNumber>
                日
              </Radio>
              <Radio label="3">
                从
                <InputNumber :min="1" :max="31"></InputNumber>
                日开始，每
                <InputNumber :min="1" :max="31"></InputNumber>
                天执行一次
              </Radio>
              <Radio label="4">
                每月
                <InputNumber :min="1" :max="31"></InputNumber>
                号最近的那个工作日
              </Radio>
              <Radio label="5">
                指定
                <CheckboxGroup>
                  <Checkbox label="1"></Checkbox>
                  <Checkbox label="2"></Checkbox>
                  <Checkbox label="3"></Checkbox>
                  <Checkbox label="4"></Checkbox>
                  <Checkbox label="5"></Checkbox>
                  <Checkbox label="6"></Checkbox>
                  <Checkbox label="7"></Checkbox>
                  <Checkbox label="8"></Checkbox>
                  <Checkbox label="9"></Checkbox>
                  <Checkbox label="10"></Checkbox>
                  <Checkbox label="11"></Checkbox>
                  <Checkbox label="12"></Checkbox>
                  <Checkbox label="13"></Checkbox>
                  <Checkbox label="14"></Checkbox>
                  <Checkbox label="15"></Checkbox>
                  <Checkbox label="16"></Checkbox>
                  <Checkbox label="17"></Checkbox>
                  <Checkbox label="18"></Checkbox>
                  <Checkbox label="19"></Checkbox>
                  <Checkbox label="20"></Checkbox>
                  <Checkbox label="21"></Checkbox>
                  <Checkbox label="22"></Checkbox>
                  <Checkbox label="23"></Checkbox>
                  <Checkbox label="24"></Checkbox>
                  <Checkbox label="25"></Checkbox>
                  <Checkbox label="26"></Checkbox>
                  <Checkbox label="27"></Checkbox>
                  <Checkbox label="28"></Checkbox>
                  <Checkbox label="29"></Checkbox>
                  <Checkbox label="30"></Checkbox>
                  <Checkbox label="31"></Checkbox>
                </CheckboxGroup>
              </Radio>
            </RadioGroup>
          </TabPane>
          <TabPane label="月">
            <RadioGroup v-model="month">
              <Radio label="0"> 月 允许的通配符 [ - * / ] </Radio>
              <Radio label="1"> 不指定 </Radio>
              <Radio label="2">
                周期从
                <InputNumber :min="1" :max="12"></InputNumber>
                -
                <InputNumber :min="1" :max="12"></InputNumber>
                月
              </Radio>
              <Radio label="3">
                从
                <InputNumber :min="1" :max="12"></InputNumber>
                日开始，每
                <InputNumber :min="1" :max="12"></InputNumber>
                月执行一次
              </Radio>
              <Radio label="4">
                指定
                <CheckboxGroup>
                  <Checkbox label="1"></Checkbox>
                  <Checkbox label="2"></Checkbox>
                  <Checkbox label="3"></Checkbox>
                  <Checkbox label="4"></Checkbox>
                  <Checkbox label="5"></Checkbox>
                  <Checkbox label="6"></Checkbox>
                  <Checkbox label="7"></Checkbox>
                  <Checkbox label="8"></Checkbox>
                  <Checkbox label="9"></Checkbox>
                  <Checkbox label="10"></Checkbox>
                  <Checkbox label="11"></Checkbox>
                  <Checkbox label="12"></Checkbox>
                </CheckboxGroup>
              </Radio>
            </RadioGroup>
          </TabPane>
          <TabPane label="周">
            <RadioGroup v-model="week">
              <Radio label="0"> 周 允许的通配符 [ - * / L #] </Radio>
              <Radio label="1"> 不指定 </Radio>
              <Radio label="2">
                周期从星期
                <InputNumber :min="1" :max="7"></InputNumber>
                -
                <InputNumber :min="1" :max="7"></InputNumber>
              </Radio>
              <Radio label="3">
                第
                <InputNumber :min="1" :max="4"></InputNumber>
                周 的星期
                <InputNumber :min="1" :max="7"></InputNumber>
              </Radio>
              <Radio label="4">
                本月最后一个星期
                <InputNumber :min="1" :max="7"></InputNumber>
              </Radio>
              <Radio label="5">
                指定
                <CheckboxGroup>
                  <Checkbox label="1"></Checkbox>
                  <Checkbox label="2"></Checkbox>
                  <Checkbox label="3"></Checkbox>
                  <Checkbox label="4"></Checkbox>
                  <Checkbox label="5"></Checkbox>
                  <Checkbox label="6"></Checkbox>
                  <Checkbox label="7"></Checkbox>
                </CheckboxGroup>
              </Radio>
            </RadioGroup>
          </TabPane>
          <TabPane label="年">
            <RadioGroup v-model="year">
              <Radio label="0"> 不指定 允许的通配符 [ - * / ] 非必填 </Radio>
              <Radio label="1"> 每年 </Radio>
              <Radio label="2">
                周期 从
                <InputNumber :min="2020"></InputNumber>
                -
                <InputNumber :min="2020"></InputNumber>
              </Radio>
            </RadioGroup>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minute: "",
      hour: "",
      day: "",
      month: "",
      week: "",
      year: "",
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
      // --------------------------
      secondStatus: 0, //秒状态
      secondList: "", //单选秒数据
      minuteStatus: 0, //分钟状态
      minuteList: "", //分钟数据
      hourStatus: 0, //小时状态
      hourList: "", //小时数据
    };
  },
  methods: {
    // 秒状态
    onSecondStatusChange(status) {
      this.secondStatus = String(status);
    },
    // 秒数据
    onSecondChange(data) {
      this.secondList = String(data);
    },
    // 分钟状态
    onMinuteStatusChange(status) {
      this.minuteStatus = String(status);
    },
    // 分钟数据
    onMinuteChange(data) {
      this.minuteList = String(data);
    },
    // 小时状态
    onHourStatusChange(status) {
      this.hourStatus = String(status);
    },
    // 小时数据
    onhourChange(data) {
      this.hourList = String(data);
    },
  },
};
</script>

<style lang="less" scoped>
.timed-task-content {
  margin: 20px;
  padding-top: 30px;
}
/deep/.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  margin-top: -16px;
}
/deep/.demo-tabs-style1
  > .ivu-tabs-card
  > .ivu-tabs-content
  > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

/deep/.demo-tabs-style1
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab {
  border-color: transparent;
}

/deep/.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}

/deep/.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  font-size: @lable-font-size;
}

/deep/.ivu-radio-group {
  display: flex;
  flex-direction: column;
}

/deep/.ivu-radio-wrapper {
  margin: 5px 0;
}
/deep/.ivu-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
}
</style>
