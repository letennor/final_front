<template>
    <div>
        <el-dialog :visible.sync="selfCenterVisibility" width="60%" v-dragDialog>
            <el-form :rules="dialogFormRules" ref="dialogForm" :model="dialogForm" label-position="center" size="small"
                label-width="110px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="姓名:" prop="name">
                            <el-input class="filter-item" v-model="dialogForm.name">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="性别:" prop="gender">
                            <el-input class="filter-item" placeholder="请输入批次名称" v-model="dialogForm.gender">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="年龄:" prop="age">
                            <el-input class="filter-item" placeholder="请输入批次名称" v-model="dialogForm.age">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="邮箱:" prop="email">
                            <el-input class="filter-item" placeholder="请输入批次名称" v-model="dialogForm.email">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="电话:" prop="phone">
                            <el-input class="filter-item" placeholder="请输入批次名称" v-model="dialogForm.phone">
                            </el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-form-item label="角色:" prop="roleName">
                            <el-input class="filter-item" placeholder="请输入批次名称" v-model="dialogForm.roleName">
                            </el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="selfCenterVisibility = false">取消</el-button>
                <el-button type="primary" class="addButton" v-wave>提交</el-button>
            </div>

        </el-dialog>
    </div>
</template>
<script>
import { getPersonInfoByUserBasicInfoId } from "@/api/system";
export default {
    name: "SelfCenterDialog",
    data() {
        return {
            selfCenterVisibility: false,
            dialogForm: {}
        };
    },
    mounted() {
        this.getPersonInfo()
    },
    methods: {
        getPersonInfo() {
            getPersonInfoByUserBasicInfoId({ userBasicInfoId: this.$store.state.user.userId }).then((res) => {
                console.log("个人信息:", res.data.data)
            })
        }

    },
    watch: {
        selfCenterVisibility(newValue, oldValue) {
            if (newValue === false) {
                this.dialogForm = {};
            }
        },
    },
};
</script>
<style></style>