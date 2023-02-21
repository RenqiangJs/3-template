<template>
  <div class="base-count-down"></div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  time: {
    type: [Number, String],
    default: 0,
  },
  isMilliSecond: {
    type: Boolean,
    default: false,
  },
})
const duration = computed(() => {
  const time = props.isMilliSecond
    ? Math.round(+props.time / 1000)
    : Math.round(+props.time)
  return time
})
</script>
<style lang="sass" scoped>
</style>