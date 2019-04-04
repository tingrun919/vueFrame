<template>
  <div>
    <Row class="clearfix" :gutter="32">
      <Col span="12" class="card">
      <Card>
        <p slot="title">
          欢迎回来!
        </p>
        <p class="admin">
          {{ userName }}
        </p>
        <p class="date">
          {{ currentdate }}
        </p>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  // 赛事管理
  export default {
    data() {
      return {
        loading: true,
        userName: this.$store.state.user.userName,
        currentdate: this.$moment().format("YYYY-MM-DD")
      };
    }
  };
</script>


