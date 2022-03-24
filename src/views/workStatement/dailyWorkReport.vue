<template>
    <div>
        <pie-card>
            <!-- 筛选条件 -->
            <div slot="header">
                <div class="pie-tb-header">
                    <div class="tb-header-content">
                        <div class="tb-header-item">
                            <span>日报名称</span>
                            <Input
                                v-model="reportName"
                                placeholder="请输入用户名称"
                                class="input-style"
                                clearable
                            />
                        </div>
                        <div class="tb-header-item">
                            <span>操作时间</span>
                            <DatePicker
                                v-model="startTime"
                                type="date"
                                placeholder="开始时间"
                                class="start-time"
                                @on-change="startTimeSelect"
                            ></DatePicker>
                            <span style="margin: 0 10px">至</span>
                            <DatePicker
                                type="date"
                                placeholder="结束时间"
                                v-model="endTime"
                                @on-change="endTimeSelect"
                            ></DatePicker>
                        </div>
                        <div class="tb-header-item">
                            <search-btn class="button-item" @click="search"></search-btn>
                            <export-btn class="button-item" @click="exportExcel()"></export-btn>
                            <batch-delete-btn class="button-item" @click="batchDelete"></batch-delete-btn>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 表体 -->
            <div slot="iscontent">
                <div class="pie-tb-iscontent">
                    <my-table
                        border
                        ref="selection"
                        disabled-hover
                        max-height="500"
                        :columns="list"
                        :data="data"
                        :delBtn="true"
                        :lookBtn="true"
                        :downloadBtn="true"
                        @download="download"
                        @look="look"
                        @confirmDelete="confirmDelete"
                    ></my-table>
                </div>
            </div>
            <!-- 分页 -->
            <div slot="footer">
                <div class="pie-tb-footer">
                    <page
                        :total="pageTotal"
                        :pageSize="pageSize"
                        :current="pageNum"
                        @pageChange="pageChange"
                        @pageSizeChange="pageSizeChange"
                    ></page>
                </div>
            </div>
        </pie-card>
    </div>
</template>
<script>
import page from "@/components/page/page.vue";
import myTable from "@/components/table/my-table.vue";

export default {
    components: {
        page,
        myTable,
    },
    data() {
        return {
            pageTotal: 0, //数据总数
            pageNum: 1, //初始页
            pageSize: 10, //每页条数
            reportName: "",//报告名称
            startTime: "",//开始时间
            endTime: "",//结束时间
            list: [
                {
                    type: "selection",
                    width: 80,
                    align: "center",
                },
                {
                    title: "序号",
                    type: "index",
                    align: "center",
                    width: 100,
                },
                {
                    title: "日报名称",
                    key: "reportName",
                    width: 250,
                    ellipsis: true,
                    align: "center",
                },
                {
                    title: "开始时间",
                    key: "startTime",
                    width: 300,
                    ellipsis: true,
                    align: "center",
                },
                {
                    title: "结束时间",
                    key: "endTime",
                    width: 300,
                    ellipsis: true,
                    align: "center",
                },
                {
                    title: "操作",
                    key: "operation",
                    slot: "action",
                    align: "center",
                },
            ],
            data: [
                {
                    id: 0,
                    reportName: "变轨报告",
                    startTime: "2021/11/04 12:01:00",
                    endTime: "2021/11/05 03:03:00",
                },
                {
                    id: 1,
                    reportName: "离轨报告",
                    startTime: "2021/11/04 12:01:00",
                    endTime: "2021/11/05 03:03:00",
                },
            ],
            lookItem: [
                { title: "日报名称", key: "reportName" },
                { title: "开始时间", key: "startTime" },
                { title: "结束时间", key: "endTime" },
            ],
            lookData: {},
            selectRow: [], //选中的行

        };
    },
    methods: {
        // 开始时间
        startTimeSelect(time) {
            this.startTime = time;
        },
        // 结束时间
        endTimeSelect(time) {
            this.endTime = time;
        },
        // 页数
        pageChange(num) {
            this.pageNum = num;
        },
        // 条数
        pageSizeChange(size) {
            this.pageSize = size;
        },
        // 搜索
        search() {

        },
        // 导出列表
        exportExcel() {

        },
        // 批量删除
        batchDelete() {

        },
        // 下载
        download() {

        },
        // 查看
        look() {

        },
        // 删除
        confirmDelete(){

        }
    }
};
</script>
<style lang="less" scoped>
.pie-tb-header {
    display: flex;
    font-size: @lable-font-size;

    .tb-header-content {
        display: flex;
    }
    .tb-header-item {
        display: flex;
        align-items: center;
        white-space: nowrap;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-right: 40px;
        color: @lable-font-color;

        .input-style {
          width: 300px;
        }

        .start-time {
            margin-left: @table-lable-space;
        }
    }
    .button-item {
        margin: 0 10px;
    }
}

.pie-tb-iscontent {
    max-width: 100%;

    .tb-style {
        max-width: 100%;
    }
}

.log-statistic {
    border-width: 0px;
    width: 96px;
    height: 36px;
    font-style: normal;
    color: #ffffff;
    font-size: @btn-font-size;
    background-color: @btn-bg-color;
    cursor: pointer;
}
</style>