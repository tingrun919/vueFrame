<template>
  <Upload ref="upload" class="upload-button" :show-upload-list="false" action="/pub/configure/uploadFile" :on-success="handleSuccess" :on-error="handleError" :format="['xls','xlsx']" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize">
    <Button :type="type">
{{ text }}
</Button>
  </Upload>
</template>
<script>
  export default {
    props: ["text", "type"],
    data() {
      return {
        uploadList: []
      };
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
      handleSuccess(res, file) {
        if (res.result.retCode === 0) {
          this.$emit("upload", res.data.fileName);
        } else {
          this.$Message.error(res.result.retMessage);
        }
      },
      handleError(error, file) {
        this.$Message.error(file.message);
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: file.name + "文件格式不正确，请选择XLS或XLSX。"
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "超过文件大小限制",
          desc: "文件  " + file.name + " 太大，不能超过50M。"
        });
      }
    }
  };
</script>
<style>
.upload-button {
  display: inline-block;
}
.upload-button .ivu-upload-drag {
  display: inline;
}
/* .upload-button .ivu-upload-list {
  display: none;
} */
</style>

