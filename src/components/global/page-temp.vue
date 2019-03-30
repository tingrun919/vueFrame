<template>
  <Page v-if="pages>1" show-total class-name="right" :page-size="size" :total="total" :current="current" @on-change="changePage"></Page>
</template>
<script>
export default {
  name:'page-temp',
  props: ["total", "size", "current"],
  data() {
    return {
      pages: 0
    };
  },
  watch: {
    total: {
      handler(newVal) {
        this.pages = Math.ceil(this.total / (this.size * 1.0));
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {
    let self = this;
  },
  methods: {
    changePage(pageNum) {
      this.$emit("changePage", pageNum);
    }
  }
};
</script>



