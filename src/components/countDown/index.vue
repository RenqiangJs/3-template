<template>
  <div
    class="base-count-down"
  >还剩{{ HandMandS.day }}天{{ HandMandS.hours }}:{{ HandMandS.mins }}:{{ HandMandS.seconds }}</div>
</template>
<script lang="ts" setup>
import { log } from 'console'
import { computed, reactive, onMounted, watch, ref } from 'vue'
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
onMounted(() => {
  countDown()
})
const duration = computed(() => {
  const time = props.isMilliSecond
    ? Math.round(+props.time / 1000)
    : Math.round(+props.time)
  return time
})
const curTime = ref(null)
const countDown = () => {
  //  部分浏览器在进入后台时(或者失去焦点时), 会将 setTimeout 等定时任务暂停 待用户回到浏览器时, 才会重新激活定时任务
  curTime.value = Date.now()
  getTime(duration.value)
}
let timerInstance = reactive({
  timer: null,
})
const HandMandS = reactive({
  day: 0,
  hours: 0,
  mins: 0,
  seconds: 0,
})
const getTime = (duration) => {
  console.log(duration, 41)
  timerInstance.timer && clearTimeout(timerInstance.timer)
  if (duration < 0) return
  const { dd, hh, mm, ss } = durationFormatter(duration)
  HandMandS.day = dd || 0
  HandMandS.hours = hh || 0
  HandMandS.mins = mm || 0
  HandMandS.seconds = ss || 0
  timerInstance.timer = setTimeout(() => {
    const now = Date.now()
    const diffTime = Math.floor((now - curTime.value) / 1000)
    curTime.value = now
    getTime(duration - diffTime)
  }, 1000)
}
const durationFormatter = (time) => {
  if (!time) return { ss: 0 }
  let t = time
  const ss = t % 60
  t = (t - ss) / 60
  if (t < 1) return { ss }
  const mm = t % 60
  t = (t - mm) / 60
  if (t < 1) return { mm, ss }
  const hh = t % 24
  t = (t - hh) / 24
  if (t < 1) return { hh, mm, ss }
  const dd = t
  return { dd, hh, mm, ss }
}
</script>
<style lang="sass" scoped></style>
