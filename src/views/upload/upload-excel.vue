<template>
  <Upload ref="upload" type="drag" action="/pub/configure/uploadFile" :on-success="handleSuccess" :on-error="handleError" :format="['xls','xlsx']" :max-size="51200" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize">
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
      <p>上传EXCEL文件</p>
    </div>
  </Upload>
</template>
<script>
  export default {
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
.demo-upload-list {
  display: inline-block;
  height: 146px;
  text-align: center;
  line-height: 146px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  height: 146px;
  width: 146px;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
