<template>
  <div>
    <el-dialog
      :title="type === 1 ? '添加' : '编辑'"
      :visible.sync="dialogFormVisibility"
      width="600px"
      v-dragDialog
    >
      <el-form
        :rules="dialogFormRules"
        ref="dialogForm"
        :model="dialogForm"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="批次名称:" prop="batchName">
              <el-input
                class="filter-item"
                placeholder="请输入用料名称"
                v-model="dialogForm.batchName"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="记录员:" prop="recordPerson">
              <el-select
                v-model="dialogForm.recordPerson"
                placeholder="请选择记录员"
              >
                <el-option
                  v-for="item in personList"
                  :key="item.userBasicInfoId"
                  :label="item.name"
                  :value="item.userBasicInfoId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibility = false">取消</el-button>
        <el-button
          type="primary"
          class="addButton"
          v-waves
          @click="type === 1? add() : update()"
          >提交</el-button
        >
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
      type:1,
      dialogForm: {},
      dialogFormVisibility: false,
      dialogFormRules: {},
      personList: [],
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
    
    update(){
      updateBatchInfo(this.dialogForm).then((res)=>{
        console.log("res:", res)
        this.$emit("refresh")
        this.dialogFormVisibility = false
      })
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
<style>
</style>