<template>
  <div class="login-container">
    <div class="centerDiv">
      <el-form
        class="login-form"
        auto-complete="off"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div v-show="loginType == 1">
          <div class="titleDiv">
            <span class="titleSpan">欢迎登录您的账号</span>
          </div>
          <el-form-item
            prop="username"
            style="margin-top: 60px; margin-bottom: 40px"
          >
            <span class="svg-container svg-container_login">
              <i
                class="icon iconfont"
                style="font-size: 30px; margin-left: -5px"
                >&#xe603;</i
              >
            </span>
            <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              auto-complete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container"
              ><i class="icon iconfont iconmima1"></i
            ></span>
            <el-input
              name="password"
              :type="passwordType"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="请输入密码"
            ></el-input>
            <span class="show-pwd" @click="showPwd"
              ><i class="icon iconfont iconyanjing"></i
            ></span>
          </el-form-item>
          <el-checkbox v-model="checkedPsd" v-show="loginType == 1">
            记住密码
          </el-checkbox>
          <div class="flex flex-center">
            <el-button
              type="primary"
              class="loginButton"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >
              登录
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      myValue: null,
      timeOut: null,
      // isExpire: false,
      checkedPsd: false,
      loginType: 1,
    };
  },
  create() {
    if (window.localStorage.getItem("isCheckPsw") === "1") {
      this.checkedPsd = true;
    } else {
      this.checkedPsd = false;
    }
  },
  mounted() {
    // this.goQrcode()
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    close() {
      this.showDialog = false;
      clearTimeout(this.timeOut);
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then((resove) => {
              //这个then里面如果有参数的话，是resovle

              this.loading = false;
              if (resove === 1) {
                if (this.checkedPsd) {
                  // 如果勾选记住密码，则将信息存入localstorage中
                  window.localStorage.setItem(
                    "userName",
                    this.loginForm.username
                  );
                  window.localStorage.setItem("psd", this.loginForm.password);
                  window.localStorage.setItem("isCheckPsw", 1);
                }

                this.$router.push({ path: "/" });
              } else {
                this.loginForm = {
                  username: "",
                  password: "",
                };
                this.$message("账号密码错误，请重试！");
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 切换登录方式
    changeLoginType() {
      this.loginType = this.loginType === 1 ? 2 : 1;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 40px;
    width: 82%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 40px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(240, 242, 245, 1);
    border-radius: 5px;
    color: #000;

    .el-form-item__content {
      display: flex;
      align-items: center;
    }
  }
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/mixin";

$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;
$centerColor: rgb(6, 193, 250);

.login-container {
  background: url("../../assets/login_background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  height: 100%;
  width: 100%;
  .loginType {
    cursor: pointer;
    font-size: 14px;
    color: blue;
    float: right;
  }

  .iconyanjing {
    font-size: 22px;
  }

  // background-color: $bg;
  .centerDiv {
    display: flex;
    // display: flex;
    // justify-content: flex-end;
    // margin-right: 100px;
    // background: $centerColor;
    // right: 10%;
    width: 25rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15%;
    /*padding-left: 800px;*/
    // margin-top: 200px;

    .login-form {
      /*-webkit-box-shadow: 0px 0px 15px #fff;*/
      /*-moz-box-shadow: 0px 0px 15px #fff;*/
      /*box-shadow: 0px 0px 15px #fff;*/
      width: 25rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 38px rgba(105, 146, 202, 0.3);
      opacity: 1;
      border-radius: 10px;
      padding: 92px 55px 55px 55px;

      .titleDiv {
        text-align: center;
        margin-bottom: 20px;

        .titleSpan {
          font-size: 30px;
          color: rgba(24, 144, 255, 1);
        }
      }

      /*<!--.titleDiv {-->*/
      /*<!--height: 75px;-->*/
      /*<!--.titleSpan {-->*/
      /*<!--@include tranformTitleSpan(-35px, -11px);-->*/
      /*<!--}-->*/
      /*<!--.titleImg {-->*/
      /*<!--@include tranformTitleImg(-61px, -46px);-->*/
      /*<!--}-->*/
      /*<!--}-->*/
      .el-button {
        width: 100%;
        margin-bottom: 20px;
      }

      .loginButton {
        background: #1890ff;
        border: 0px;
        margin-top: 30px;
        /*width: 257px;*/
        height: 55px;
        font-size: 16px;
        border-radius: 50px;
        /*margin-top: 15px;*/
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: white;
    vertical-align: middle;
    width: 45px;
    display: flex;
    align-items: center;

    .icon {
      font-size: 24px;
      color: #1890ff;
    }

    &_login {
      font-size: 20px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
