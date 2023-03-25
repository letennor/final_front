<template>
    <div>
        <el-dialog title="员工今日工作详细信息" :visible.sync="currentWorkDetailVisibility" width="80%" v-dragDialog>

            <el-steps v-for="item in batchWorkFlowList" :key="item.currentworitemid" :active="item.count" align-center>
                <span>{{ item.batchName }}</span>
                <el-step v-for="workItem in item.batchWorkFlow" :key="workItem.workItemId" :title="workItem.workName"
                    :description="workItem.workDescription"></el-step>
            </el-steps>



            <el-tag effect="dark" v-for="item in elseWorkList" :key="item.workflowId"
                style="margin-right: 20px; margin-top: 20px;">{{ item.workName }}</el-tag>

            <div slot="footer" class="dialog-footer">
                <el-button @click="currentWorkDetailVisibility = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getBatchWorkFlow } from "@/api/maintainInfo";

export default {
    name: "CurrentWorkDetailDialog",
    data() {
        return {
            currentWorkDetailVisibility: false,
            batchWorkList: [],
            elseWorkList: [],
            batchCurrentWorkItemIdList: [],
            batchWorkFlowList: [],
            stepShow: false

        };
    },
    props: {
        currentWorkList: {
            type: Array,
            default: () => []
        }
    },
    mounted() {

    },
    methods: {},
    watch: {
        currentWorkDetailVisibility(newValue, oldValue) {
            //如果打开了，则调用接口
            if (newValue === true) {
                this.batchWorkList = [],
                    this.elseWorkList = [],
                    this.batchCurrentWorkItemIdList = [],
                    this.batchWorkFlowList = []


                this.currentWorkList.forEach((item) => {
                    if (item.workBatch !== null) {
                        this.batchWorkList.push(item)
                    } else {
                        this.elseWorkList.push(item)
                    }
                })
                //遍历batchWorkList，然后循环调用接口
                this.batchWorkList.forEach((item) => {
                    let tempObj = {}
                    this.batchCurrentWorkItemIdList.push(item.workItemId)
                    getBatchWorkFlow({ batchId: item.workBatch }).then((res) => {
                        //得到count
                        let count = 0
                        for (let i = 0; i < res.data.data.batchWorkFlow.length; i++) {
                            if (
                                res.data.data.batchWorkFlow[i].workItemId != item.workItemId
                            ) {
                                count = count + 1;
                            } else {
                                break;
                            }
                        }
                        //塞进对象里
                        tempObj["currentWorkItemId"] = item.workItemId;
                        tempObj["batchWorkFlow"] = res.data.data.batchWorkFlow
                        tempObj["count"] = count
                        tempObj["batchName"] = item.batchName
                        this.batchWorkFlowList.push(tempObj)

                    })
                })

                console.log("其他工作:", this.elseWorkList)

            }
        },
    },
};
</script>
  