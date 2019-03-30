<template>
  <div class="demo-spin-col">
    <Spin size="large" fix>
      <div class="loader">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading...</div>
      </div>
    </Spin>
  </div>
</template>

<script>
export default {
  name: "spin-temp"
};
</script>

<style>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col .ivu-spin-fix { 
  left: 256px;
  z-index: 999999;
  position: fixed;
}
.demo-spin-col .ivu-spin-fix .ivu-spin-main {
  left: 44%;
}
</style>
