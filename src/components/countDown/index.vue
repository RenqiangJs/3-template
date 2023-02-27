<template>
  <div class="base-count-down">
    还剩{{ day }}天{{ hours }}:{{ mins }}:{{ seconds }}
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed, reactive } from 'vue'
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
const countDown = () => {
  getTime(duration)
}
let timerInstance = reactive({
  timer: null,
})
const HandMandS = reactive({
  day: '0',
  hours: '00',
  mins: '00',
  seconds: '00',
})
const getTime = (duration) => {
  timerInstance.timer && clearTimeout(timerInstance.timer)
  if (duration < 0) return
  const { dd, hh, mm, ss } = durationFormatter(duration)
  HandMandS.day = dd
  HandMandS.hours = hh
  HandMandS.mins = mm
  HandMandS.seconds = ss
  timerInstance.timer = setTimeout(() => {
    getTime(duration - 1)
  })
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
