<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
  import Editor from "wangeditor";
  import "wangeditor/release/wangEditor.min.css";
  import { oneOf } from "@/libs/tools";
  export default {
    name: "Editor",
    props: {
      value: {
        type: String,
        default: ""
      },
      /**
       * 绑定的值的类型, enum: ['html', 'text']
       */
      valueType: {
        type: String,
        default: "html",
        validator: val => {
          return oneOf(val, ["html", "text"]);
        }
      },
      /**
       * @description 设置change事件触发时间间隔
       */
      changeInterval: {
        type: Number,
        default: 200
      },
      /**
       * @description 是否开启本地存储
       */
      cache: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      editorId() {
        return `editor${this._uid}`;
      }
    },
    mounted() {
      this.editor = new Editor(`#${this.editorId}`);
      this.editor.customConfig.uploadImgServer =
        "/pub/configure/uploadRichTextFile";
      this.editor.customConfig.uploadImgHooks = {
        customInsert: function(insertImg, result, editor) {
          // console.log(JSON.stringify(result));
          if (result.data && result.data.length > 0) {
            result.data.forEach(x => {
              insertImg(x.fileName);
            });
          }
        }
      // customInsert: function (insertImg, result, editor) {
      //     console.log(result)
      // }
      };
      // editor2.customConfig.uploadImgParams = {
      //     a: 123,
      //     b: 'vvv'
      // }
      // editor2.customConfig.uploadImgParamsWithUrl = true
      // editor2.create();
      this.editor.customConfig.onchange = html => {
        let text = this.editor.txt.text();
        if (this.cache) localStorage.editorCache = html;
        this.$emit("input", this.valueType === "html" ? html : text);
        this.$emit("on-change", html, text);
      };
      this.editor.customConfig.onchangeTimeout = this.changeInterval;
      // create这个方法一定要在所有配置项之后调用
      this.editor.create();
      // 如果本地有存储加载本地存储内容
      let html = this.value || localStorage.editorCache;
      if (html) this.editor.txt.html(html);
    },
    methods: {
      setHtml(val) {
        if (val == null) {
          val = "";
        }
        this.editor.txt.html(val);
      }
    }
  };
</script>

<style>
</style>
