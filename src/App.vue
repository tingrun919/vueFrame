<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        userInfo: {}
      };
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        //请求'/user/userinfo'接口
        this.axios.get("/user/userinfo").then(({ data }) => {
          //打印mock data
          console.log(data);
          if (data.error === 0) {
            this.userInfo = data.data;
          } else {
            this.userInfo = {};
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped>
  main {
    background-origin: padding-box;
  }
</style>
