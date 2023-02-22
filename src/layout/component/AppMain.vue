<template>
  <a-layout-content
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
  >
    <router-view v-slot="{ Component }" :key="key">
      <keep-alive>
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </a-layout-content>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
const router = useRoute()
const key = router.path
</script>