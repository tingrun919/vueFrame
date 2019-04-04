
<template>
  <span :style="{color:color}" v-text="label"></span>
</template>


<script>
  import { getDict } from "@/api/configure";
  import _ from "lodash";
  export default {
    name: "Dict",
    props: ["code", "data", "value", "color", "parentCode"],
    data() {
      return {
        label: "",
        source: this.data == null ? [] : this.data
      };
    },
    watch: {
      value: function(newVal, oldVal) {
        let self = this;
        if (newVal !== oldVal) {
          self.key = newVal;
          self.getDataStart();
        }
      }
    },
    mounted() {
      this.getDataStart();
    },
    methods: {
      getData() {
        let self = this;
        if (_.head(self.source)) {
          return Promise.resolve(self.source);
        }
        let { code, value, parentCode } = self;
        let dataJson = localStorage.getItem(self.$config.DICT_PREFIX + code);
        if (dataJson != null) {
          let data = JSON.parse(dataJson);
          return Promise.resolve(data);
        }
        return getDict({ code, value, kindCode: parentCode })
          .then(data => {
            return data;
          })
          .catch(error => {
            return Promise.reject(error);
          });
      },
      getDataStart() {
        let self = this;
        let { code, value, label } = self;
        if (value == null || value === "") {
          return;
        }
        self
          .getData()
          .then(data => {
            // 计算规则
            if (code === "JSGZ") {
              let row = data.find(x => x.ruleId == value);
              label = row == null ? value : row.ruleName;
            }
            // 承办单位
            else if ("CBDW" === self.code) {
              let row = data.find(x => x.teamId == value);
              label = row == null ? value : row.teamName;
            }
            // 比赛等级
            else if ("ZGX_BSJB" === self.code) {
              let row = data.find(x => x.grandCode == value);
              label = row == null ? value : row.grandName;
            }
            // 普通字典
            else {
              let row = data.find(x => x.code == value);
              label = row == null ? value : row.name;
            }
            self.label = label;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
</script>

<style scoped>
</style>
