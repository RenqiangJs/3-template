<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleClick"
    theme="dark"
  >
    <menu-item />
  </a-menu>
</template>
<script lang="ts" setup>
import { defineComponent, ref, watch } from 'vue'
import {
  MailOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import MenuItem from './components/MenuItem.vue'
const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
}
const titleClick = (e: Event) => {
  console.log('titleClick', e)
}
watch(
  () => openKeys,
  (val) => {
    console.log('openKeys', val)
  }
)
// export default defineComponent({
//   components: {
//     MailOutlined,
//     QqOutlined,
//     AppstoreOutlined,
//     SettingOutlined,
//   },
//   setup() {

//     return {
//       selectedKeys,
//       openKeys,

//       handleClick,
//       titleClick,
//     }
//   },
// })
</script>

