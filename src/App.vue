<template>
  <div id="app">
    <div class="login-success" v-if="loginStatus">
      <router-view></router-view>
    </div>
    <div class="login-loading" v-if="!loginStatus">加载中....</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router, { resetRouter } from "@/router";

export default {
  name: "app",
  data() {
    return {
      loginStatus: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    console.log("初始化", this.user);
    if (this.user.token) {
      setTimeout(() => {
        this.loginStatus = true;
      }, 1000);
    } else {
      setTimeout(() => {
        this.loginStatus = true;
      }, 3000);
      resetRouter();
      router.replace({
        path: "/login",
        query: {
          redirect: "/",
        },
      });
    }
    setTimeout(() => {
      this.loginStatus = true;
    }, 1000);
  },
};
</script>

<style lang="less">
.login-success {
  width: 100%;
  height: 100%;
}
</style>
