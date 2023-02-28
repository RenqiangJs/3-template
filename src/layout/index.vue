<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="appSetStore.collapsed"
      :trigger="null"
      collapsible
      width="256px"
      :style="{ marginBottom: '0px' }"
    >
      <div class="logo" />
      <side-bar></side-bar>
    </a-layout-sider>
    <a-layout :style="{ height: '100vh' }">
      <nav-bar />
      <app-main />
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import AppMain from './component/AppMain.vue'
import NavBar from './component/Navbar/index.vue'
import SideBar from './component/Sidebar/index.vue'
import { appSetting } from '@/store/app'
const appSetStore = appSetting()
</script>
<style lang="scss" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
