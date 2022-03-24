<template>
    <div class="pie-container">
        <div class="left-menu">
            <Menu :active-name="activeName" :open-names="openNames" accordion>
                <MenuItem name="dailyWorkReport" to="dailyWorkReport" replace>
                    <div class="menu-title-container">
                        <span class="iconfont icon-kongjian"></span>
                        <span>工作日报</span>
                    </div>
                </MenuItem>
                <MenuItem name="weeklyWorkReport" to="weeklyWorkReport" replace>
                    <div class="menu-title-container">
                        <span class="iconfont icon-kongjian"></span>
                        <span>工作周报</span>
                    </div>
                </MenuItem>
                 <MenuItem name="timedTask" to="timedTask" replace>
                    <div class="menu-title-container">
                        <span class="iconfont icon-kongjian"></span>
                        <span>定时任务</span>
                    </div>
                </MenuItem>
            </Menu>
        </div>
        <div class="right-content">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: "",
            openNames: [],
        };
    },
    created() {
        this.activeName = this.$route.name;
        this.openNames[0] = this.$route.name;
    },
};
</script>
<style lang="less" scoped>
.menu-item-class {
    margin-left: 18px !important;
}
</style>
