
<template>
  <Select v-if="['AG_OUT','AG_IN','ZGX_SSDJ','JSGZ'].includes(code)" v-model="key" filterable placeholder="请选择" clearable style="width: 130px" @on-change="getVal">
    <Option v-for="(_item,index) in dictData" :key="index" :value="_item.code">
{{ _item.name }}
</Option>
  </Select>
  <Select v-else v-model="key" placeholder="请选择" clearable style="width: 130px" @on-change="getVal">
    <Option v-for="(_item,index) in dictData" :key="index" :value="_item.code">
{{ _item.name }}
</Option>
  </Select>
</template>

<script>
  import { getDict } from "@/api/configure";
  import _ from "lodash";
  export default {
    name: "Dict",
    props: ["code", "data", "parentCode", "model", "value"],
    data() {
      return {
        dictData: [],
        source: this.data == null ? [] : this.data,
        key: this.value
      };
    },
    watch: {
      parentCode: function(newVal, oldVal) {
        let self = this;
        if (
          ["AG_IN", "ZGX_SSDJ", "ZGX_BSJB"].includes(self.code) &&
          newVal !== oldVal
        ) {
          self.getDataStart();
          self.key = null;
        }
      },
      value: function(newVal, oldVal) {
        let self = this;
        if (newVal !== oldVal) {
          self.key = newVal;
        }
      }
    },
    mounted() {
      this.getDataStart();
    },
    methods: {
      getVal(val) {
        let self = this;
        if (val != null) {
          self.$emit("click", `self.${self.model}='${val}'`);
        } else {
          self.$emit("click", `self.${self.model}=null`);
        }
        if (self.code === "AG_OUT") {
          self.$emit("getCode", { code: self.code, val: val });
        }
      },
      getData() {
        let self = this;
        if (_.head(self.source)) {
          return Promise.resolve(self.source);
        }
        let dataJson = localStorage.getItem(self.$config.DICT_PREFIX + self.code);
        if (dataJson != null) {
          let data = JSON.parse(dataJson);
          return Promise.resolve(data);
        }
        return getDict({
          code: self.code,
          kindCode: self.parentCode,
          value: self.value
        })
          .then(data => {
            return data;
          })
          .catch(error => {
            return Promise.reject(error);
          });
      },
      getDataStart() {
        let self = this;
        let { code } = self;
        self.getData().then(data => {
          if (code === "AG_OUT") {
            self.dictData = data.filter(x => x.hasChildren === "0");
          }
          // 计算规则
          else if ("JSGZ" === code) {
            self.dictData = data.map(x => ({
              name: x.ruleName,
              code: x.ruleId
            }));
            self.$emit("data", { code, data });
          }
          // 承办单位
          else if ("CBDW" === self.code) {
            self.dictData = data.map(x => ({
              name: x.teamName,
              code: x.teamId
            }));
          }
          // 比赛等级
          else if ("ZGX_BSJB" === self.code) {
            self.dictData = data.map(x => ({
              name: x.grandName,
              code: x.grandCode
            }));
          }
          // 普通字典
          else {
            if (self.parentCode != null) {
              self.dictData = data.filter(x => x.parentCode === self.parentCode);
            } else {
              self.dictData = data.filter(x => _.isEmpty(x.parentCode));
            }
          }
        });
      }
    }
  };
</script>

<style scoped>
</style>
