<template>
	<formModel v-model:formDataInit="formDataInit" :searchConfig="searchFormConfig" />
</template>
<script lang="ts" setup>
import { searchFormConfig } from './config';
import dayjs, { Dayjs } from 'dayjs';
import { ref } from 'vue';
const dateFormat = 'YYYY-MM-DD';
let formDataInit = ref({
	name: '梁朝伟',
	status: 1,
	creatTime: ref<Dayjs>(dayjs('2015-06-06', dateFormat)),
});
</script>
<style lang="scss" scpoed></style>
