<template>
  <el-menu class="navbar">
    <div class="Img">
      <img src="../../assets/logo4-temp.png" alt="" style="width:100%;height:100%; padding: 0">
    </div>
    <div class="flex breadcrumbAndhamburger">
      <hamburger id="hamburger-container" class="hamburger-container" :toggle-click="toggleSideBar"
                 :is-active="sidebar.opened"></hamburger>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
    </div>
    <div class="right-menu">

      <el-dropdown class="avatar-container right-menu-item"
                   trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar"
               :src="fileUrl+'img/'+avatar+'?size=80x80'"
               v-if="avatar&&avatar != ''&&fileUrl != ''">
          <img class="user-avatar"
               :src="defaultHead"
               v-else>
          <span style="color: #fff">您好！{{ name }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="imagecropperShow = true"
                  style="display:block;">头像</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="passwordFormVisible = true"
                  style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="changeFontSize"
                  style="display:block;">更改字体</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout"
                  style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <image-cropper :width="300"
                     :height="300"
                     url="/rest/user/uploadPhoto"
                     @close="close"
                     @crop-upload-success="cropSuccess"
                     field="attach"
                     :key="imagecropperKey"
                     v-show="imagecropperShow"></image-cropper>
      <!-- 打开收藏夹或消息队列 -->
      <div class="Icon">
        <el-badge :hidden="isHidden" :value="UnlookedMessage" :max="99" style="top:-2.5px;margin-right:20px;">
          <i class="el-icon-bell" @click="showMessageList()" title="消息"></i>
        </el-badge>
        <i class="el-icon-shopping-cart-1" @click="showCollection()" title="收藏夹"></i>
      </div>
      <transition name="fade">
        <!--  消息列表 -->
        <div class="messageList" v-if="messageListShow">
          <div v-if="messageList.length === 0" style="text-align:center;">
            暂无消息
          </div>
          <div v-if="messageList.length !== 0">
            <div class="List" v-for="items in messageList" :key="items.id">
              <div class="item" @click="handleClick(items)">
                <el-badge is-dot :hidden="items.sight">
                  <span style="font-size:14px;">{{ items.title }}</span>
                </el-badge>
                <div class="right-area">
                  <!-- <div style="font-size:12px;height:25px;line-height:25px;">{{ items.sight?'已读':'未读' }}</div> -->
                  <div style="font-size:12px;height:50px;line-height:50px;">{{ items.recordCreateDate | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <el-dialog title="消息详情"
                 :visible.sync="showMessageDetail" width="600px">
        <div class="title-container">
          <span style="float:left;">标题：{{ currentMessageInfo.title }}</span>
          <span style="float:right;margin-right:20px;">时间：{{ currentMessageInfo.recordCreateDate | parseTime("{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </div>
        <span style="padding: 0 5px;">内容：</span>
        <div class="text-container">
          <span>{{ currentMessageInfo.text }}</span>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="handleClose(currentMessageInfo)">关闭</el-button>
        </div>
      </el-dialog>
      <CollectionDialog class="collectionDialog" ref="CollectionDialog" />
      <el-dialog title="修改密码"
                 :visible.sync="passwordFormVisible">
        <el-form :rules="passwordRules"
                 ref="passwordForm"
                 :model="passwordForm"
                 label-position="center"
                 size="small"
                 label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="旧密码"
                            prop="password">
                <el-input type="password"
                          class="filter-item"
                          placeholder="请输入旧密码"
                          v-model="passwordForm.password">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="新密码"
                            prop="newPassword">
                <el-input type="password"
                          class="filter-item"
                          placeholder="请输入新密码"
                          v-model="passwordForm.newPassword">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="确认密码"
                            prop="newPasswordPre">
                <el-input type="password"
                          class="filter-item"
                          placeholder="请输入确认密码"
                          v-model="passwordForm.newPasswordPre">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="passwordFormVisible = false">取消</el-button>
          <el-button type="primary"
                     @click="passwordResetSubimt"
                     :loading="loading"
                     v-waves>
            提交
          </el-button>
        </div>
      </el-dialog>
    </div>
  </el-menu>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Hamburger from '@/components/Hamburger'
  import { removeToken } from '@/utils/auth'
  import ImageCropper from '@/components/ImageCropper'
  import defaultHead from '@/assets/dashboard/defaultHead.png'
  import waves from '@/directive/waves'
  import { updatePassword } from '@/api/system/person'
  import Breadcrumb from '@/components/Breadcrumb'
  import CollectionDialog from '@/components/CollectionDialog/index'
  import { getMessageList, refreshMessageStatus } from '@/api/message.js'
  export default {
    components: {
      Hamburger,
      ImageCropper,
      Breadcrumb,
      CollectionDialog
    },
    directives: {
      waves
    },
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else if (value === '') {
          callback(new Error('请输入确认密码'))
        } else {
          callback()
        }
      }
      return {
        currentMessageInfo: {},
        showMessageDetail: false,
        messageListShow: false,
        isHidden: true,
        messageList: [],
        UnlookedMessage: 0,
        projectName: '申铁工程管理',
        defaultHead,
        imagecropperShow: false,
        imagecropperKey: 0,
        passwordFormVisible: false,
        collectionVisible: false,
        passwordForm: {
          password: '',
          newPassword: '',
          newPasswordPre: ''
        },
        loading: false,
        passwordRules: { // 属性校验
          password: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          newPasswordPre: [
            { required: true, validator: validatePassword, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'fileUrl',
        'messageNum',
        'isProject',
        'bigSize'
      ])
    },
    watch: {
      messageList(newValue, oldValue) {
        this.UnlookedMessage = newValue.filter((item) => item.sight === false).length
      },
      UnlookedMessage(newValue, oldValue) {
        if (newValue === 0) {
          this.isHidden = true
        } else {
          this.isHidden = false
        }
      }
    },
    mounted() {
      this.getMessageList()
      if (this.$storage.getStorage('project')) {
        this.projectName = JSON.parse(this.$storage.getStorage('project')).name
      }
    },
    methods: {
      ...mapMutations([
        'SET_AVATAR'
      ]),
      passwordResetSubimt() {
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            updatePassword({
              originPassword: this.passwordForm.password,
              currentPassword: this.passwordForm.newPassword
            }).then((response) => {
              if (response.success) {
                this.$message.success(response.message)
                this.$refs['passwordForm'].resetFields()
                this.passwordFormVisible = false
              }
              this.loading = false
            })
          }
        })
      },
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          removeToken()
          this.$storage.setStorage('isLose', 1)
          this.$storage.removeStorage('project')
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      },
      cropSuccess(resData) {
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey + 1
        this.SET_AVATAR(resData.result)
      },
      close() {
        this.imagecropperShow = false
      },
      goMessage() {
        this.$router.push({ path: '/system/message' })
      },
      goSystem() {
        if (this.isProject) {
          this.$storage.removeStorage('project')
          location.reload()
        }
      },
      changeFontSize() {
        this.$store.dispatch('setBigSize', !this.bigSize)
      },
      showCollection() {
        this.$refs.CollectionDialog.collectionVisible = true
      },
      getMessageList() {
        const param = {
          pageSize: 1000,
          currPage: 1,
          params: {
            sendUserId: this.$store.getters.userId
          }
        }
        getMessageList(param).then((res) => {
          if (res.success) {
            console.log(res.result)
            this.messageList = res.result.list
          }
        })
      },
      showMessageList() {
        this.messageListShow = !this.messageListShow
        this.getMessageList()
      },
      handleClick(val) {
        this.currentMessageInfo = val
        this.showMessageDetail = true
      },
      handleClose(val) {
        if (!val.sight) {
          refreshMessageStatus({ id: val.id }).then((res) => {
          this.getMessageList()
          this.showMessageDetail = false
        })
        } else {
          this.showMessageDetail = false
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  ::-webkit-scrollbar {display:none}
  .text-container {
    padding:0 5px;
    max-height: 200px;
  }
  .title-container {
    // background: red;
    width:100%;
    height:40px;
    line-height:40px;
    padding:0 5px;
  }
  .messageList {
    position:absolute;
    right:120px;
    top: 80px;
    background: white;
    width:15vw;
    max-height: 25vh;
    z-index: 999;
    border-radius:6px;
    overflow-y: scroll;
    padding: 10px 0;
    scrollbar-width:none;
    box-shadow: 0px 1px 6px #ddd;
    .item:hover {
      background: #F5F7FA;
    }
    .item {
      height: 50px;
      width:100%;
      line-height: 50px;
      padding: 0 10px;
      cursor:pointer;
      .right-area {
        float: right;
        height:50px;
      }
    }
  }
  ::v-deep .el-badge__content {
    top:20px;
    margin-right:0px !important;
  }
  .item {
    ::v-deep .el-badge__content {
    top:10px;
    margin-right:-5px !important;
  }
  }
  .navbar {
    height: 66px;
    line-height: 66px;
    background: rgba(1, 50, 99, 1) !important;
    width: 100% !important;
    /*background-color: rgba(93, 109, 195, 1);*/
    border-radius: 0px !important;
    // overflow: hidden;
    .Img{
      width:14%;
      height:100%;
      position:absolute;
      // padding: 14px 20px;
    }
    .breadcrumbAndhamburger {
      padding: 7px 10px 0px 0px;
      margin-left: 14.8%;
      position: absolute;
      align-items: center;
      width: 100%;
    }

    .hamburger-container {
      text-align: right;
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      padding-right: 40px;
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }

      .screenfull {
        height: 20px;
      }

      .international {
        vertical-align: top;
      }
      .Icon{
        font-size: 26px;
        color:white;
        cursor: pointer;
        height:100%;
        margin-right:15px;
        position:relative;
        float:right;
        // background:red;
        i{
          display: inline-block;
          align-items: center;
          justify-content: center;
          height: 100%;
          margin-right:10px;
        }
      }

      .collectionDialog{
        float: right;
        line-height: 31px!important;
      }

      .theme-switch {
        vertical-align: 15px;
      }

      .avatar-container {
        height: 50px;
        margin-right: 30px;
        float:right;
        .avatar-wrapper {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #BFD9FF;
          .user-avatar {
            width: 30px;
            height: 30px;
            border-radius: 10px;
            margin-right: 10px;
          }

          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
