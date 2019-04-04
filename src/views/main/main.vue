<template>
  <Layout style="height: 100%" class="main">
    <Sider v-model="collapsed" hide-trigger collapsible :width="256" :collapsed-width="64" class="left-sider"
      :style="{overflow: 'hidden'}">
      <side-menu ref="sideMenu" accordion :active-name="$route.name" :collapsed="collapsed" :menu-list="menuList"
        @on-select="turnToPage">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <span v-show="!collapsed">中高协积分系统运营端</span>
          <!-- <img v-show="!collapsed" :src="maxLogo" key="max-logo" /> -->
          <img v-show="collapsed" key="min-logo" :src="minLogo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user />
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;" />
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <router-view />
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
  import SideMenu from "./components/side-menu";
  import HeaderBar from "./components/header-bar";
  import User from "./components/user";
  import Fullscreen from "./components/fullscreen";
  import { mapMutations, mapActions } from "vuex";
  import minLogo from "@/assets/images/logo-min.jpg";
  import maxLogo from "@/assets/images/logo.jpg";

  import "./main.less";
  export default {
    name: "Main",
    components: {
      SideMenu,
      HeaderBar,
      Fullscreen,
      User
    },
    data() {
      return {
        collapsed: false,
        minLogo,
        maxLogo,
        isFullscreen: false
      };
    },
    computed: {
      userInfo() {
        return this.$store.state.user;
      },
      menuList() {
        return this.$store.getters.menuList;
      }
    },

    watch: {
      $route(newRoute) {
        this.setBreadCrumb(newRoute);
        this.$refs.sideMenu.updateOpenName(newRoute.name);
      }
    },
    mounted() {
      /**
       * @description 初始化设置面包屑导航
       */
      this.setBreadCrumb(this.$route);
    },
    methods: {
      ...mapMutations(["setBreadCrumb"]),
      ...mapActions(["handleLogin"]),
      turnToPage(route) {
        let { name, params, query } = {};
        if (typeof route === "string") name = route;
        else {
          name = route.name;
          params = route.params;
          query = route.query;
        }
        if (name.indexOf("isTurnByHref_") > -1) {
          window.open(name.split("_")[1]);
          return;
        }
        this.$router.push({
          name,
          params,
          query
        });
      },
      handleCollapsedChange(state) {
        this.collapsed = state;
      }
    }

  };
</script>
