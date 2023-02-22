<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="appSetStore.collapsed"
      :trigger="null"
      collapsible
      :style="{ marginBottom: '0px' }"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
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
import { appSetting } from '@/store/app'
const appSetStore = appSetting()
const selectedKeys = ref<string[]>(['1'])
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
