<template>
  <div class="systemHome-content">
    <div
      class="track-content"
      v-for="(item, index) in systemList"
      :key="index"
      @click="trackDetails(index)"
    >
      <span class="track-back">
        <p class="icon-system">{{ item.title }}</p>
      </span>
      <ul>
        <li>
          <p>{{ item.templateName }}：</p>
          <span>{{ item.templateNameContent }}</span>
        </li>
        <li>
          <p>{{ item.creationTime }}：</p>
          <span>{{ item.creationTimeContent }}</span>
        </li>
        <li>
          <p>{{ item.templateIntroduce }}：</p>
          <span>{{ item.templateIntroduceContent }}</span>
        </li>
        <li>
          <p>{{ item.templateScope }}：</p>
          <span>{{ item.templateScopeContent }}</span>
        </li>
      </ul>
    </div>
    <!-- 轨道格式 -->
    <my-modal
      width="23"
      :title="bmpTitle"
      v-model="isShowBmpType"
      :resetBtn="false"
      :close="false"
      @cancel="bmpCancel"
      @confirm="bmpConfirm"
    >
      <div slot="operateItem">
        <div class="bmp-type-content">
          <RadioGroup v-model="bmpType">
            <Radio label="三行根数" v-show="trackIndex == 0"></Radio>
            <Radio label="两行根数" v-show="trackIndex != 0"></Radio>
            <Radio label="CSV"></Radio>
            <Radio label="XML"></Radio>
          </RadioGroup>
        </div>
      </div>
    </my-modal>
    <!-- ELE轨道根数格式 -->
    <my-modal
      width="60"
      title="ELE轨道根数格式"
      v-model="isShowELEBMP"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <ELEBMP />
      </div>
    </my-modal>
    <!-- ELE-CSV -->
    <my-modal
      width="60"
      title="ELE-CSV"
      v-model="isShowELESCVBMP"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <ELECSVBMPVue />
      </div>
    </my-modal>
    <!-- ELE-XML -->
    <my-modal
      width="60"
      title="ELE-XML"
      v-model="isShowELEXMLBMP"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <ELEXMLBMPVue />
      </div>
    </my-modal>
    <!-- TLE轨道根数格式 -->
    <my-modal
      width="60"
      title="TLE轨道根数格式"
      v-model="isShowTLEBMP"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <TLEBMP />
      </div>
    </my-modal>
    <!-- TLE-CSV -->
    <my-modal
      width="60"
      title="TLE-CSV"
      v-model="isShowTLESCVBMP"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <TLECSVBMPVue />
      </div>
    </my-modal>
    <!-- TLE-XML -->
    <my-modal
      width="60"
      title="TLE-XML"
      v-model="isShowTLEXMLBMP"
      :resetBtn="false"
      :close="false"
      :cancelBtn="false"
      @cancel="cancel"
      @confirm="confirm"
    >
      <div slot="operateItem">
        <TLEXMLBMPVue />
      </div>
    </my-modal>
  </div>
</template>

<script>
import myModal from "@/components/modals/modal.vue";
import ELEBMP from "@/components/trackTemplate/ELEBMP.vue";
import ELECSVBMPVue from "@/components/trackTemplate/ELECSVBMP.vue";
import ELEXMLBMPVue from "@/components/trackTemplate/ELEXMLBMP.vue";
import TLEBMP from "@/components/trackTemplate/TLEBMP.vue";
import TLECSVBMPVue from "@/components/trackTemplate/TLECSVBMP.vue";
import TLEXMLBMPVue from "@/components/trackTemplate/TLEXMLBMP.vue";
export default {
  components: {
    myModal,
    ELEBMP,
    ELECSVBMPVue,
    ELEXMLBMPVue,
    TLEBMP,
    TLECSVBMPVue,
    TLEXMLBMPVue,
  },
  data() {
    return {
      systemList: [
        {
          id: 0,
          icon: "ios-paper",
          title: "ELE",
          templateName: "模板名称",
          templateIntroduce: "模板介绍",
          templateScope: "适用范围",
          creationTime: "创建时间",
          creationTimeContent: "2021-12-28",
          templateNameContent: "轨道模板",
          templateIntroduceContent: "适用于轨道模板",
          templateScopeContent: "关于轨道模板一的介绍",
        },
        {
          id: 1,
          icon: "md-paper",
          title: "TLE",
          templateName: "模板名称",
          templateIntroduce: "模板介绍",
          templateScope: "适用范围",
          creationTime: "创建时间",
          creationTimeContent: "2021-12-28",
          templateNameContent: "轨道模板",
          templateIntroduceContent: "适用于轨道模板",
          templateScopeContent: "关于轨道模板二的介绍",
        },
      ],
      bmpTitle: "", //格式标题
      isShowBmpType: false, //格式弹框状态
      bmpType: "两行根数", //格式类型
      trackIndex: "", //
      // ELE
      isShowELEBMP: false,
      isShowELESCVBMP: false,
      isShowELEXMLBMP: false,
      // TLE
      isShowTLEBMP: false,
      isShowTLESCVBMP: false,
      isShowTLEXMLBMP: false,
    };
  },
  methods: {
    trackDetails(index) {
      if (index == 0) {
        this.bmpTitle = "ELE轨道根数格式";
      } else {
        this.bmpTitle = "TLE轨道根数格式";
      }
      this.trackIndex = index;
      this.isShowBmpType = true;
    },
    // 格式类型确定
    bmpConfirm() {
      if (this.trackIndex == 0) {
        if (this.bmpType == "三行根数") {
          this.isShowELEBMP = true;
        } else if (this.bmpType == "CSV") {
          this.isShowELESCVBMP = true;
        } else {
          this.isShowELEXMLBMP = true;
        }
      } else {
        if (this.bmpType == "两行根数") {
          this.isShowTLEBMP = true;
        } else if (this.bmpType == "CSV") {
          this.isShowTLESCVBMP = true;
        } else {
          this.isShowTLEXMLBMP = true;
        }
      }
    },
    // 格式类型取消
    bmpCancel() {
      this.trackIndex = "";
      this.bmpTitle = "";
      this.isShowBmpType = false;
    },
    // 确定
    confirm() {
      // ELE
      this.isShowELEBMP = false;
      this.isShowELESCVBMP = false;
      this.isShowELEXMLBMP = false;
      // TLE
      this.isShowTLEBMP = false;
      this.isShowTLESCVBMP = false;
      this.isShowTLEXMLBMP = false;
    },
  },
};
</script>

<style lang="less" scoped>
.systemHome-content {
  height: 730px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: @table-padding;
  overflow: auto;
  .track-content:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  .track-content:extend(.border) {
    padding: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .track-back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 260px;
      height: 260px;
      background-image: url("../../assets/public/semicircle.png");
      background-size: 110% 110%;
      background-position: -11px -13px;
      .icon-system {
        font-size: 40px;
        color: @main-font-color;
      }
    }
    p {
      font-size: @template-font-size;
      color: @main-font-color;
    }
  }
}
ul {
  li {
    list-style: none;
    display: flex;
    margin-top: 10px;
    span {
      // width: 100%;
      display: block;
      // text-align: center;
      margin-left: 10px;
      font-size: @template-font-size;
      color: @main-font-color;
    }
  }
}
/deep/ .my-modal .operate-item {
  margin-bottom: 90px;
}
/deep/ .my-modal .header {
  margin-top: 20px;
}
.bmp-type-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: @template-font-size;
  color: @main-font-color;
}
/deep/.ivu-radio-wrapper {
  font-size: @template-font-size !important;
  color: @main-font-color !important;
}
/deep/.ivu-radio-inner {
  position: relative;
  top: -2px;
  left: 0;
}
</style>
