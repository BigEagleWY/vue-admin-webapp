<template>
  <div id="app">
    <div class="login-success" v-if="loginStatus">
      <router-view></router-view>
    </div>
    <div class="login-loading" v-if="!loginStatus">
      加载中....
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      loginStatus: false,
    };
  },
  mounted() {
    console.log("初始化");
    setTimeout(()=>{
      this.loginStatus = true;
    },3000);
  },
};
</script>

<style lang="less">
.login-success {
  width: 100%;
  height: 100%;
}
</style>
