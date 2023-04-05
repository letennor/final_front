<template>
    <div>
        <el-dialog title="分配工作" :visible.sync="arrangeWorkVisibility" width="40%" v-dragDialog>
            <el-form ref="dialogForm" :model="dialogForm" label-position="center" size="small" label-width="110px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="工作类型:" prop="jobType">
                            <el-radio v-model="jobType" label="1">流程</el-radio>
                            <el-radio v-model="jobType" label="2">其他</el-radio>
                        </el-form-item>
                    </el-col>

                    <template v-if="jobType === '1'">
                        <el-col :span="24">
                            <el-form-item label="生产线:" prop="type">
                                <el-select v-model="dialogForm.type" placeholder="请选择生产线">
                                    <el-option v-for="item in batchType" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>

                    <template v-if="jobType === '1' && dialogForm.type === '孵化'">
                        <el-col :span="24">
                            <el-form-item label="批次:" prop="batchId">
                                <el-select v-model="dialogForm.batchId" placeholder="请选择批次">
                                    <el-option v-for="item in fhBatchList" :key="item.batchId" :label="item.batchName"
                                        :value="item.batchId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>

                    <template v-if="jobType === '1' && dialogForm.type === '养殖'">
                        <el-col :span="24">
                            <el-form-item label="批次:" prop="batchId">
                                <el-select v-model="dialogForm.batchId" placeholder="请选择批次">
                                    <el-option v-for="item in yzBatchList" :key="item.batchId" :label="item.batchName"
                                        :value="item.batchId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>

                    <!-- <template v-if="jobType === '1' && dialogForm.type === '孵化'">
                        <el-col :span="24">
                            <el-form-item label="司机:" prop="driver">
                                <el-select v-model="dialogForm.driver" placeholder="请选择司机">
                                    <el-option v-for="item in driverList" :key="item.userBasicInfoId" :label="item.name"
                                        :value="item.userBasicInfoId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template> -->

                    <template v-if="jobType === '2'">
                        <el-col :span="24">
                            <el-form-item label="工作:" prop="driver">
                                <el-select v-model="dialogForm.workItemId" placeholder="请选择工作">
                                    <el-option v-for="item in elseWorkList" :key="item.workItemId" :label="item.workName"
                                        :value="item.workItemId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>


                        <el-col :span="24">
                            <el-form-item label="工作日期:" prop="workDate">
                                <el-date-picker v-model="dialogForm.workDate" type="date" placeholder="选择工作日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                    </template>



                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="arrangeWorkVisibility = false">取消</el-button>
                <el-button type="primary" class="addButton" v-waves @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getTypeBatchInfo } from '@/api/maintainInfo'
import { getAllDriver } from "@/api/system"
import { getAllElseWork, arrangeWork } from "@/api/workArrangement"
import { addMessageInfo } from '@/api/message';

export default {
    name: "ArrangeWorkDialog",
    data() {
        return {
            arrangeWorkVisibility: false,
            jobType: "",
            batchType: [
                {
                    id: "养殖",
                    name: "养殖生产线",
                },
                {
                    id: "孵化",
                    name: "孵化生产线",
                },
            ],
            dialogForm: {},
            yzBatchList: [],
            fhBatchList: [],
            driverList: [],
            elseWorkList: []
        };
    },
    props: {
        workPerson: {
            type: String,
            default: () => ''
        }
    },
    mounted() {

    },
    methods: {
        getYzBatchList() {
            getTypeBatchInfo({ type: "养殖" }).then((res) => {
                this.yzBatchList = res.data.data
            })
        },

        getFhBatchList() {
            getTypeBatchInfo({ type: "孵化" }).then((res) => {
                this.fhBatchList = res.data.data
            })
        },

        getDriverList() {
            getAllDriver().then((res) => {
                this.driverList = res.data.data
            })
        },

        submit() {
            //提交
            this.dialogForm.workPerson = this.workPerson
            console.log('this.jobType', this.jobType)
            this.dialogForm.jobType = this.jobType
            arrangeWork(this.dialogForm).then((res) => {
                console.log('res:', res)
                this.arrangeWorkVisibility = false;

                //发送消息
                let messageObj = {}
                messageObj.isRead = 0;
                messageObj.messageContent = this.$store.state.user.name + "为你分配了工作"
                messageObj.messageSender = this.$store.state.user.userId
                messageObj.messageReceiver = this.dialogForm.workPerson
                messageObj.messageDate = new Date()

                addMessageInfo(messageObj).then((res) => {
                    console.log(res.data.data)
                })

                //刷新
                this.$emit("refresh")
            })

        },

        getAllElseWorkList() {
            getAllElseWork().then((res) => {
                this.elseWorkList = res.data.data
            })

        }
    },
    watch: {
        arrangeWorkVisibility(newValue, oldValue) {
            //关闭了
            if (newValue === false) {
                this.jobType = '',
                    this.dialogForm = {},
                    this.yzBatchList = [],
                    this.fhBatchList = [],
                    this.driverList = []
            }

            //打开
            if (newValue === true) {
                this.getYzBatchList()
                this.getFhBatchList()
                this.getDriverList()
                this.getAllElseWorkList()
                console.log('workPerson', this.workPerson)
            }
        },

    },
};
</script>
  