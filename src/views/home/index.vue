<template>
	<formModel v-model:formDataInit="formDataInit" :searchConfig="searchFormConfig" />
</template>
<script lang="ts" setup>
import { searchFormConfig } from './config';
import { ref } from 'vue';
let formDataInit = ref({});
</script>
<style lang="scss" scpoed></style>
