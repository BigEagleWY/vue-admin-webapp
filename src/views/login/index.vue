<template>
  <div class="login">
    <div class="slideShadow" v-show="showSlide">
      <transition>
        <div class="slideSty animated bounce">
          <slide-verify
            @success="onSuccess"
            @fail="onFail"
            :sliderText="text"
            :w="350"
            :h="175"
            ref="slideDiv"
          ></slide-verify>
          <div class="iconBtn">
            <i class="el-icon-circle-close" @click="showSlide = false"></i
            ><i class="el-icon-refresh" @click="refresh"></i>
          </div>
        </div>
      </transition>
    </div>
    <div class="loginBox">
      <h2 class="loginH2">后台管理系统</h2>
      <div class="loginCon">
        <div class="titleDiv">
          <h3>登录</h3>
          <p>输入您的用户名和密码进行登录</p>
          <i class="el-icon-key"></i>
        </div>
        <el-form ref="loginForm" :rules="rules" :model="ruleForm">
          <el-form-item prop="user">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              v-model="ruleForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="loginBtn"
            @click="loginYz('loginForm')"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SlideVerify from "@/components/SlideVerify";
import { message } from "element-ui";
import { login, getLoginConfig } from "@/api/login";
import { sm2 } from "sm-crypto";
import md5 from "md5";
import func from "@/utils/commonfunc";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      notifyObj: null,
      text: "向右滑动",
      showSlide: false,
      ruleForm: {
        user: "yzceshi",
        password: "123456Az",
      },
      rules: {
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到5个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // this.shopTip()
    // message.info("开始获取API信息");
    getLoginConfig((data) => {
      message.info("获取API信息成功");
      console.log(data);
    });
  },
  methods: {
    onSuccess() {
      this.showSlide = false;
      this._login();
    },
    onFail() {
      this.$message.error("验证失败");
    },
    refresh() {
      this.$refs.slideDiv.reset();
    },
    loginYz(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // this.showSlide = true 不使用滑动验证，直接登录
          this._login();
        } else {
          return;
        }
      });
    },
    _login() {
      const public_key =
        "047214fe3a249b75b6ba92ee494e0a8a68c0a19893a480b3c28bf06cd5b7d621243c7f6704caa3b43ade6be15de11cabd185611a9edfdcf1b11d7a2478c67b4c1c";
      let salt = func.generateCharacter(16);
      let date = func.getCurrentDay();
      let key = "",
        sign = "";
      let account = sm2.doEncrypt(
        this.ruleForm.user.trim() + salt,
        public_key,
        1
      );
      let password = sm2.doEncrypt(
        this.ruleForm.password + salt,
        public_key,
        1
      );
      account = "04" + account;
      password = "04" + password;
      if (salt && date) {
        key = salt + date;
      }
      sign =
        "account=" +
        account +
        "&password=" +
        password +
        "&salt=" +
        salt +
        "&key=" +
        key;

      let parms = {
        account,
        password,
        salt: salt,
        sign: md5(sign),
        languageCode: null,
      };

      login(parms,(data)=>{
        message.info("登录成功");
        console.log(data);
      });
    },
    shopTip() {
      this.notifyObj = this.$notify({
        title: "提示",
        message:
          "目前有两个登陆角色，管理员和普通用户，账号分别为：admin、user,密码都为：123456",
        duration: 0,
        iconClass: "el-icon-s-opportunity",
      });
    },
  },
  components: {
    SlideVerify,
  },
};
</script>
<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  background: url(../../assets/pageBg/loginBg.jpg) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
}
.loginBox {
  height: 455px;
  width: 550px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -287px;
}
.loginH2 {
  font-size: 38px;
  color: #fff;
  text-align: center;
}
.loginCon {
  margin-top: 30px;
  background: #eee;
  border-radius: 4px;
  .titleDiv {
    padding: 0 28px;
    background: #fff;
    position: relative;
    height: 120px;
    border-radius: 4px 4px 0 0;
    h3 {
      font-size: 22px;
      color: #555;
      font-weight: initial;
      padding-top: 23px;
    }
    p {
      font-size: 16px;
      color: #888;
      padding-top: 12px;
    }
    i {
      font-size: 65px;
      color: #ddd;
      position: absolute;
      right: 27px;
      top: 29px;
    }
  }
  .el-form {
    padding: 25px 25px 30px 25px;
    background: #eee;
    border-radius: 0 0 4px 4px;
  }
}
.loginBtn {
  width: 100%;
  background: #19b9e7;
}
.slideShadow {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.slideSty {
  position: absolute;
  width: 380px;
  height: 311px;
  background: #e8e8e8;
  border: 1px solid #dcdcdc;
  left: 50%;
  top: 50%;
  margin-left: -188px;
  margin-top: -176px;
  z-index: 99;
  border-radius: 5px;
}
.iconBtn {
  padding: 9px 0 0 19px;
  color: #5f5f5f;
  border-top: 1px solid #d8d8d8;
  margin-top: 17px;
  i {
    font-size: 22px;
    cursor: pointer;
  }
  i:last-child {
    margin-left: 7px;
  }
}
</style>
<style>
.slideSty .slide-verify {
  margin: 13px auto 0 auto;
  width: 350px !important;
}
.slideSty .slide-verify-slider {
  width: 100% !important;
}
.slideSty .slide-verify-refresh-icon {
  display: none;
}
</style>
