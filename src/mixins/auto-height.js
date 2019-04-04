export default {
  data() {
    return {
      autoHeight: 0,
      refName: 'table',
      tableHeight: 0,
      bottomHeight: 36
    }
  },
  watch: {
    tableData() {
      this.$nextTick(function () {
        let height = window.getComputedStyle(this.$refs[this.refName].$el).height;
        this.tableHeight = height ? parseInt(height) : 0
        this.getAutoHeight();
      })
    }
  },
  beforeDestroy() {
    window.onmousewheel = document.onmousewheel = null;
    window.onresize = document.onresize = null;
  },
  mounted() {
    let self = this;
    window.onmousewheel = document.onmousewheel = self.getAutoHeight;
    window.onresize = document.onresize = self.getAutoHeight;
  },
  methods: {
    getAutoHeight() {
      // table padding-bottom:16 + content margin-bottom:20
      let { tableHeight, bottomHeight, refName } = this;
      let offsetTop = this.$refs[refName].$el.getBoundingClientRect().top;
      let remainingHeight = document.documentElement.clientHeight - offsetTop - bottomHeight;
      this.autoHeight = tableHeight > remainingHeight ? remainingHeight : tableHeight;
    },
  }
}
