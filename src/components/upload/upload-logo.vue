<template>
  <div>
    <div v-for="(item,index) in uploadList" :key="index" class="demo-upload-list">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload v-show="isShow" ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :on-error="handleError" :format="['jpg','jpeg','png']" :max-size="10240" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" type="drag" action="/pub/configure/uploadFile" style="display: inline-block;width:146px;">
      <div style="width: 146px;height:146px;padding-top:50px;">
        <Icon type="ios-camera" size="20"></Icon>
        <br>
        <span style="color:red;">请上传10MB以下的图片</span>
      </div>
    </Upload>
    <Modal v-model="visible" title="图片预览" class="modal-img-view">
      <img :src="imgName" style="width: 100%;">
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  export default {
    props: ["value"],
    data() {
      return {
        defaultList: this.value
          ? [
            {
              url: this.value
            }
          ]
          : [],
        imgName: "",
        isShow: true,
        visible: false,
        uploadList: []
      };
    },
    watch: {
      value: function(newVal, oldVal) {
        let self = this;
        if (newVal !== oldVal) {
          self.uploadList = [
            {
              status: "finished",
              url: newVal
            }
          ];
          self.isShowIcon();
        }
      }
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
      this.isShowIcon();
    },
    methods: {
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      isShowIcon() {
        if (this.uploadList.length === 0) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
      },
      handleRemove(file) {
        this.uploadList = [];
        this.isShowIcon();
      },
      handleSuccess(res, file) {
        // file.url =
        //   "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
        // file.name = "7eb99afb9d5f317c912f08b5212fd69a";
        if (res.result.retCode === 0) {
          file.url = res.data.fileName;
          this.$emit("upload", file.url);
        } else {
          this.$Message.error(res.result.retMessage);
        }
        this.isShowIcon();
      },
      handleError(error, file) {
        this.$Message.error(file.message);
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: "文件格式不正确",
          desc: file.name + "文件格式不正确，请选择JPG或PNG。"
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: "超过文件大小限制",
          desc: "文件  " + file.name + " 太大，不能超过10M。"
        });
      }
    }
  };
</script>
<style>
.modal-img-view .ivu-modal-mask {
  z-index: 11111 !important;
}
.modal-img-view .ivu-modal-wrap {
  z-index: 11111 !important;
}
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
