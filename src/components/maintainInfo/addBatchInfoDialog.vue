<template>
  <div>
    <el-dialog :title="type === 1 ? '添加' : '编辑'" :visible.sync="dialogFormVisibility" width="600px" v-dragDialog>
      <el-form :rules="dialogFormRules" ref="dialogForm" :model="dialogForm" label-position="center" size="small"
        label-width="110px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="批次名称:" prop="batchName">
              <el-input class="filter-item" placeholder="请输入批次名称" v-model="dialogForm.batchName">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select v-model="dialogForm.recordPerson" placeholder="请选择记录员">
                <el-option v-for="item in personList" :key="item.userBasicInfoId" :label="item.name"
                  :value="item.userBasicInfoId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="开始时间:" prop="startDate">
              <el-date-picker v-model="dialogForm.startDate" type="date" placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="生产线:" prop="type">
              <el-select v-model="dialogForm.type" placeholder="请选择生产线">
                <el-option v-for="item in batchType" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibility = false">取消</el-button>
        <el-button type="primary" class="addButton" v-waves @click="type === 1 ? add() : update()">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addBatchInfo, updateBatchInfo } from "@/api/maintainInfo";
import { getAllPerson } from "@/api/system";
export default {
  name: "AddFeedRecordDialog",
  data() {
    return {
      type: 1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
      personList: [],
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
    };
  },
  mounted() {
    this.getPersonList();
  },
  methods: {
    add() {
      console.log(this.dialogForm);
      addBatchInfo(this.dialogForm).then((res) => {
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    update() {
      updateBatchInfo(this.dialogForm).then((res) => {
        console.log("res:", res);
        this.$emit("refresh");
        this.dialogFormVisibility = false;
      });
    },

    getPersonList() {
      getAllPerson().then((res) => {
        console.log("personList:", res);
        this.personList = res.data.data;
      });
    },
  },
  watch: {
    dialogFormVisibility(newValue, oldValue) {
      if (newValue === false) {
        this.dialogForm = {};
      }
    },
  },
};
</script>
<style></style>