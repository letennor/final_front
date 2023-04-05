<template>
    <div class="app-container mainDiv">
        <my-card title="员工工作信息">
            <div class="filter-container">
                <span style="margin-right: 10px">角色<strong>:</strong></span>
                <el-select class="filter-item" placeholder="请选择角色"
                    style="
                                                                                                                                    background-color: white;
                                                                                                                                    width: 200px;
                                                                                                                                    margin-right: 20px;
                                                                                                                                    margin-top: 10px;
                                                                                                                                  " v-model="listQuery.params.roleId">
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
                    </el-option>
                </el-select>

                <span style="margin-right: 10px">空闲时间<strong>:</strong></span>
                <el-date-picker placement="bottom-start" style="width: 400px; margin-bottom: 10px"
                    v-model="listQuery.params.freeDate" type="daterange" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>

                <br />

                <el-button class="filter-item" v-waves @click="reset">重置</el-button>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="search">查询</el-button>
            </div>
            <table-list :data="list" :columns="columns" class="dataTable"></table-list>
        </my-card>

        <!-- 添加用户 -->
        <AddUserDialog ref="AddUserDialog" @refresh="refresh()" />
        <!-- 工作详情 -->
        <CurrentWorkDetailDialog ref="CurrentWorkDetailDialog" :currentWorkList="currentWorkList" />
        <!-- 分配工作 -->
        <ArrangeWorkDialog ref="ArrangeWorkDialog" :workPerson="workPerson" @refresh="refresh" />
    </div>
</template>

<script>
import AddUserDialog from "@/components/system/addUserDialog.vue";
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime, genderTransform } from "@/utils";
import { getAllPerson, deleteUserBasicInfo, updateUserBasicInfo } from "@/api/system";
import { getAllPersonWorkFlowCurrentDate } from "@/api/workArrangement"
import CurrentWorkDetailDialog from "./component/currentWorkDetailDialog.vue";
import ArrangeWorkDialog from "./component/arrangeWorkDialog.vue";
import { getAllRole } from "@/api/maintainInfo";
import { getRoleList } from '@/api/system/person';
import { getPersonWorkFlowCurrentDateByCondition } from "@/api/workArrangement"
export default {
    name: "UserInfo",
    components: {
        tableList,
        MyCard,
        AddUserDialog,
        CurrentWorkDetailDialog,
        ArrangeWorkDialog
    },
    directives: {
        waves,
        dragDialog,
    },
    data() {
        return {
            // 表头名称和字段
            columns: [
                {
                    text: "id",
                    value: "userBasicInfoId",
                    width: 200,

                },
                {
                    text: "姓名",
                    value: "name",
                },
                {
                    text: "性别",
                    value: "gender",
                    filter: genderTransform,
                },
                {
                    text: "角色",
                    value: "roleName",
                },
                {
                    text: "今日工作",
                    render: (...val) => this.dealCurrentWorkList(...val)
                },
                {
                    text: "操作",
                    type: "iconButton",
                    width: 180,
                    fixed: "right",
                    list: this.operButton,
                },
            ],
            list: [],
            currentWorkList: [],
            listQuery: {
                pageSize: 15,
                currPage: 1,
                params: {},
            },
            roleList: [],
            workPerson: ''
        };
    },
    mounted() {
        this.getPersonWorkFlowList()
        this.getRoleList()
    },
    methods: {
        getPersonWorkFlowList() {
            getAllPersonWorkFlowCurrentDate().then((res) => {
                console.log("工作流信息：", res.data.data)
                this.list = res.data.data
            })
        },

        // 新增
        add() {
            //清空dialog里面的对象，type设置为1
            this.$refs.AddUserDialog.type = 1
            this.$refs.AddUserDialog.dialogForm = {}
            this.$refs.AddUserDialog.dialogFormVisibility = true;
        },

        // 表格操作按鈕
        operButton(val) {
            const temp = [
                { class: "iconliuchengguanli", value: "分配工作", click: this.arrangeWork },
            ];
            return temp;
        },

        arrangeWork(val) {
            this.workPerson = val.row.userBasicInfoId
            this.$refs.ArrangeWorkDialog.arrangeWorkVisibility = true;
        },

        refresh() {
            this.getPersonWorkFlowList();
        },

        dealCurrentWorkList(h, row) {
            let currentWorkList = row.row.workFlowInfoList
            if (currentWorkList === null) {
                return (
                    <span>无</span>
                )
            }
            let length = currentWorkList.length
            if (length !== 0) {
                return (
                    <span style='color: blue; cursor: pointer;'
                        onClick={() => {
                            this.currentWorkDetail(currentWorkList)
                        }}>
                        {length}
                    </span>
                )
            } else {
                return (
                    <span>无</span>
                )
            }

        },

        currentWorkDetail(currentWorkList) {
            this.currentWorkList = currentWorkList
            //打开进入工作详情
            this.$refs.CurrentWorkDetailDialog.currentWorkDetailVisibility = true
        },

        getRoleList() {
            getAllRole().then((res) => {
                this.roleList = res.data.data
            })
        },

        reset() {
            (this.listQuery.params = {}), this.getPersonWorkFlowList();
        },

        search() {

            if ("freeDate" in this.listQuery.params) {
                this.listQuery.params.beginFreeDate = this.listQuery.params.freeDate[0];
                this.listQuery.params.endFreeDate = this.listQuery.params.freeDate[1];
            }
            console.log("this.listquery:", this.listQuery.params);

            if (!("freeDate" in this.listQuery.params) && !("roleId" in this.listQuery.params)) {
                this.getPersonWorkFlowList()
            }

            getPersonWorkFlowCurrentDateByCondition(this.listQuery.params).then((res) => {
                this.list = res.data.data;
            });
        },
    },
};
</script>
  
<style rel="stylesheet/scss" lang="scss">
.CheckDialog {
    .el-row {
        padding: 10px;
    }
}
</style>
  