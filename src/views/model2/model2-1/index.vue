<template>
  <div class="app-container mainDiv">
    <my-card title="表单测试">
      <div class="filter-container">
        <!-- 查询表单 -->
        <el-input
          class="filter-item"
          style="width: 200px; background-color: white"
          placeholder="查询"
          v-model="listQuery.params.name"
        >
        </el-input>
        <el-button
          class="filter-item"
          type="primary"
          v-waves
          icon="el-icon-search"
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
        <el-button type="primary" :loading="loading" v-waves>提交</el-button>
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
    this.list = [
      {
        code: "（沪）JZ安许证字[2021]021333",
        id: 20,
        invalidDay: 15,
        issueUnit: "上海市住房和城乡建设管理委员会",
        name: "安全生产许可证",
        obtainedDate: 1650470400000,
        recordCreateDate: 1666084058274,
        recordUpdateDate: 1668566903697,
        remark: "xxx",
        status: "即将失效",
        validityPeriod: 1669651200000,
      },
      {
        code: "91310115MA1K46CCXP",
        description:
          "类型：有限责任公司（国有控股）\n法定代表人：沈国红\n成立日期：2018年08月27日\n营业期限：2018年08月27日至不约定期限\n住所：中国（上海）自由贸易试验区张衡路200号2幢3层\n\n经营范围：许可项目：建设工程设计；各类工程建设活动；建筑智能化工程施工，工程造价咨询业务。\n一般项目：信息科技、智能科技、建筑工程技术领域内的技术开发、技术服务、技术转让、技术咨询，企业管理咨询，商务信息咨询，计算机软硬件及辅助设备、电子产品、通信设备、机电产品、仪器仪表的设计、研发、销售，数据处理服务，自主基础软件服务，应用软件开发，计算机系统服务，会务服务，系统集成，自有设备租赁，货物进出口，技术进出口，五金产品、金属制品、机械设备、建筑材料、金属结构的销售。",
        id: 21,
        invalidDay: 30,
        issueUnit: "中国（上海）自由贸易试验区市场监督管理局",
        name: "营业执照副本2",
        obtainedDate: 1636992000000,
        recordCreateDate: 1666852976044,
        recordUpdateDate: 1666927236442,
        remark: "1、测试换行\n2、测试换行\n3、测试换行\n4、测试换行",
        status: "有效",
        validityPeriod: 4102329600000,
      },
      {
        code: "91310115MA1K46CCXP",
        description:
          "类型：有限责任公司（国有控股）\n法定代表人：沈国红\n成立日期：2018年08月27日\n营业期限：2018年08月27日至不约定期限\n住所：中国（上海）自由贸易试验区张衡路200号2幢3层\n\n经营范围：许可项目：建设工程设计；各类工程建设活动；建筑智能化工程施工，工程造价咨询业务。\n一般项目：信息科技、智能科技、建筑工程技术领域内的技术开发、技术服务、技术转让、技术咨询，企业管理咨询，商务信息咨询，计算机软硬件及辅助设备、电子产品、通信设备、机电产品、仪器仪表的设计、研发、销售，数据处理服务，自主基础软件服务，应用软件开发，计算机系统服务，会务服务，系统集成，自有设备租赁，货物进出口，技术进出口，五金产品、金属制品、机械设备、建筑材料、金属结构的销售。",
        id: 22,
        invalidDay: 30,
        issueUnit: "中国（上海）自由贸易试验区市场监督管理局",
        name: "营业执照副本2",
        obtainedDate: 1636992000000,
        recordCreateDate: 1666852976044,
        recordUpdateDate: 1666927236442,
        remark: "1、测试换行\n2、测试换行\n3、测试换行\n4、测试换行",
        status: "失效",
        validityPeriod: 4102329600000,
      },
    ];
  },
  methods: {
    collection(){
      console.log('点击收藏')
    },

    getDetail(){
      console.log('点击详情')
    },

    delete(){
      console.log('点击删除')
    },

    update(){
      console.log('点击编辑')
    },

    openFileManagement(){
      console.log('点击打开证件扫描件')
    },

    // 新增
    add() {
      this.dialogStatus = "create";
      this.Form = {
        invalidDay: 30,
        validityPeriod: 4102329600000,
      };
      this.dialogFormVisible = true;
    },

    // 处理证书状态根据不同状态样式改变
    dealLicenseStatus(h, row) { 
      const divStyle = 'text-align:center'
      let type = ''
      if (row.row.status === '有效') {
        type = 'success'
      } else if (row.row.status === '即将失效') {
        type = 'warning'
      } else {
        type = 'danger'
      }
      return (
        <div style={divStyle}>
          <el-tag type={type} effect={'plain'}>
            {row.row.status}
          </el-tag>
        </div>
      )
    },
    
    // 表格操作按鈕
    operButton(val) {
      const temp = [
        { class: 'iconshuxing', value: '收藏', click: this.collection },
        {
          class: 'icondoc',
          value: '征照扫描件',
          click: this.openFileManagement
        },
        { class: 'iconyanjing', value: '详情', click: this.getDetail }
      ]
      if (val.status !== '失效') {
        temp.push({
          class: 'iconliuchengpeizhi',
          value: '编辑',
          click: this.update
        })
      } else {
        temp.push({
          class: 'iconshanchu',
          value: '删除',
          click: this.delete
        })
      }
      return temp
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
