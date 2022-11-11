<template>
  <div class="app-container mainDiv">
    <my-card title="表单测试">
      <div class="filter-container">
        <!-- 查询表单 -->
        <el-input
          class="filter-item"
          style="width: 200px"
          placeholder="查询"
          v-model="listQuery.params.name"
        >
        </el-input>
        <el-button class="filter-item" v-waves @click="reset">重置</el-button>
        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="search"
          >查询</el-button
        >
        <el-button
          class="filter-item addButton"
          type="primary"
          v-waves
          icon="el-icon-circle-plus-outline"
          @click="add"
          >添加
        </el-button>
      </div>
      <table-list
        :data="list"
        :columns="columns"
        :list-loading="listLoading"
        class="dataTable"
        :total="total"
        :page-size="listQuery.pageSize"
        @currentChange="currentChange"
      ></table-list>
    </my-card>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="1000px"
      v-dragDialog
    >
      <el-form
        :rules="rules"
        ref="Form"
        :model="Form"
        label-position="center"
        size="small"
        label-width="110px"
      >
        <el-row>
          <!-- 修改或新增表单 -->
          <el-col :span="12">
            <el-form-item label="证照名称" prop="name">
              <el-input
                class="filter-item"
                placeholder="请输入证照名称"
                v-model="Form.name"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证照编号" prop="code">
              <el-input
                class="filter-item"
                placeholder="请输入证照编号"
                v-model="Form.code"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="获得日期" prop="obtainedDate">
              <el-date-picker
                placement="bottom-start"
                v-model="Form.obtainedDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效期" prop="validityPeriod">
              <el-date-picker
                placement="bottom-start"
                v-model="Form.validityPeriod"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="timestamp"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发证单位" prop="issueUnit">
              <el-input
                class="filter-item"
                placeholder="请输入发证单位"
                v-model="Form.issueUnit"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="失效提醒时长" prop="invalidDay">
              <el-input
                type="number"
                class="filter-item"
                style="width: 40%"
                placeholder=""
                min="0"
                v-model.number="Form.invalidDay"
              >
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他" prop="description">
              <el-input
                type="textarea"
                v-model="Form.description"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                v-model="Form.remark"
                maxlength="100"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="setUnValid"
          :loading="loading"
          v-waves
          v-if="dialogStatus == 'update'"
          >设置为失效</el-button
        >
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="loading" v-waves
          >提交</el-button
        >
      </div>
    </el-dialog>
    <!-- 查看的表单 -->
    <el-dialog
      title="详情"
      :visible.sync="dialogFormDetailsVisible"
      custom-class="CheckDialog"
      width="1000px"
      v-dragDialog
    >
      <el-row>
        <el-col :span="4" class="text-left"><label>证照名称:</label></el-col>
        <el-col :span="8">{{ detail.name }}</el-col>
        <el-col :span="4" class="text-left"><label>证照编号:</label></el-col>
        <el-col :span="8">{{ detail.code }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="text-left"><label>获得日期:</label></el-col>
        <el-col :span="8">{{
          detail.obtainedDate | parseTime("{y}/{m}/{d}")
        }}</el-col>
        <el-col :span="4" class="text-left"><label>有效期:</label></el-col>
        <el-col :span="8">{{
          detail.validityPeriod | parseTime("{y}/{m}/{d}")
        }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="text-left"><label>发证单位:</label></el-col>
        <el-col :span="8">{{ detail.issueUnit }}</el-col>
        <el-col :span="4" class="text-left"><label>失效提醒时长</label></el-col>
        <el-col :span="8">{{ detail.invalidDay }}天</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="text-left"><label>其他:</label></el-col>
        <el-col :span="8"
          ><span style="white-space: pre-wrap">{{
            detail.description
          }}</span></el-col
        >
        <el-col :span="4" class="text-left"><label>备注:</label></el-col>
        <el-col :span="8">
          <span style="white-space: pre-wrap">
            {{ detail.remark }}
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="text-left"
          ><el-button type="primary" @click="openFileManagement(detail)"
            >证照扫描件</el-button
          ></el-col
        >
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormDetailsVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dragDialog from "@/directive/el-dragDialog";
import tableList from "@/components/table/tableList.vue";
import MyCard from "@/components/MyCard";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
export default {
  name: "Model2-1",
  components: {
    tableList,
    MyCard,
  },
  directives: {
    waves,
    dragDialog,
  },
  data() {
    return {
      propParams: {},
      onlyShowValid: true,
      detail: {},
      dialogFormDetailsVisible: false,
      dialogFormVisible: false, // 弹出框显示判断
      dialogStatus: "create",
      textMap: {
        update: "编辑",
        create: "新建",
      },
      loading: false, // 按钮重复提交判断
      listLoading: false,
      rules: {
        // 表单必填项设置
        name: [{ required: true, message: "请填写证照名称" }],
        code: [{ required: true, message: "请填写证照编号" }],
        obtainedDate: [{ required: true, message: "请选择获取日期" }],
        validityPeriod: [{ required: true, message: "请选择有效期" }],
        issueUnit: [{ required: true, message: "请填写发证单位" }],
        invalidDay: [{ required: true, message: "请填写失效提醒时长" }],
      },
      Form: {},
      columns: [
        // 表头名称和字段
        {
          text: "证照名称",
          value: "name",
        },
        {
          text: "证照编号",
          value: "code",
        },
        {
          text: "获取日期",
          value: "obtainedDate",
          filter: parseTime,
          filterParams: ["{y}/{m}/{d}"],
        },
        {
          text: "有效期",
          value: "validityPeriod",
          filter: parseTime,
          filterParams: ["{y}/{m}/{d}"],
        },
        {
          text: "发证单位",
          value: "issueUnit",
        },
        {
          text: "证照状态",
          // value: 'status',
          render: (...val) => this.dealLicenseStatus(...val),
        },
        {
          text: "备注",
          value: "remark",
        },
        {
          text: "操作",
          type: "iconButton",
          width: 180,
          fixed: "right",
          list: this.operButton,
        },
      ],
      listQuery: {
        pageSize: 15,
        currPage: 1,
        params: {
          status: ["有效", "即将失效"],
          name: "",
        },
      },
      total: 0,
      list: [],
    };
  },
  mounted() {
  },
  methods: {

    // 新增
    add() {
      this.dialogStatus = "create";
      this.Form = {
        invalidDay: 30,
        validityPeriod: 4102329600000,
      };
      this.dialogFormVisible = true;
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
