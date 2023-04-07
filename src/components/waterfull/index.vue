<template>
  <div>
    <div class="waterfull-box">
      <div class="waterfall-left">123</div>
      <div class="waterfall-right">456</div>
    </div>
    <div class="loading-txt">{{}}</div>
  </div>
</template>
<script lang="ts" setup>
import waterfullItem from './waterfullItem.vue'
import { ajaxType } from './type'
import { reactive } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  clickItem: {
    type: Function,
    default: () => {},
  },
})
const ajax = reactive<ajaxType>({
  // 是否可以加载
  load: true,
  // 加载中提示文字
  loadTxt: '',
  // 每页的请求条件
  rows: 10,
  // 页码
  page: 1,
})
</script>
<style lang="scss" scpoed>
.waterfull-box {
  display: flex;
}
</style>
