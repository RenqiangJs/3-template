<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
      v-if="appSetStore.collapsed"
      class="trigger"
      @click="() => appSetStore.setCollapsed(false)"
    />
    <menu-fold-outlined v-else class="trigger" @click="() => appSetStore.setCollapsed(true)" />
  </a-layout-header>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { appSetting } from '@/store/app'
const appSetStore = appSetting()
</script>
<style lang="scss" scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger AppMain:hover {
  color: #1890ff;
}
</style>