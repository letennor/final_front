<template>
    <div class="app-container mainDiv">
        <my-card title="员工工作信息">
            <div class="filter-container">
            </div>
            <table-list :data="list" :columns="columns" class="dataTable"></table-list>
        </my-card>

        <!-- 添加用户 -->
        <AddUserDialog ref="AddUserDialog" @refresh="refresh()" />
        <CurrentWorkDetailDialog ref="CurrentWorkDetailDialog" :currentWorkList="currentWorkList" />
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
export default {
    name: "UserInfo",
    components: {
        tableList,
        MyCard,
        AddUserDialog,
        CurrentWorkDetailDialog
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
                // {
                //     text: "入职时间",
                //     value: "entryTime",
                //     filter: parseTime,
                //     filterParams: ["{y}/{m}/{d}"],
                // },
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
            currentWorkList: []
        };
    },
    mounted() {
        this.getList();
        this.getPersonWorkFlowList()
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

        arrangeWork() {
            console.log('分配工作')
        },

        getList() {
            getAllPerson().then((res) => {
                this.list = res.data.data;
                console.log("userInfo-list:", this.list);
            });
        },

        refresh() {
            this.getList();
        },

        dealCurrentWorkList(h, row) {
            let currentWorkList = row.row.workflowInfoList
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
        }
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
  