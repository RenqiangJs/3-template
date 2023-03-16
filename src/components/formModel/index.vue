<template>
	<div>
		<a-form :model="innerFormData" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" :layout="searchConfig.layout" @finish="onFinish">
			<template v-for="item in searchConfig.formItems" :key="item.label">
				<a-form-item :label="item.label" :name="item.field" :rules="item.rules">
					<a-input v-if="item.type === 'input'" v-model:value="innerFormData[item.field]" :placeholder="item.placeholder" />
					<a-input-number v-else-if="item.type === 'inputNumber'" v-model:value="innerFormData[item.field]" />
					<a-checkbox-group v-else-if="item.type === 'checkboxGroup'" v-model:value="innerFormData[item.field]">
						<a-checkbox v-for="checkboxItem in item.options" :value="checkboxItem.value" :name="checkboxItem.name">{{ checkboxItem.label }}</a-checkbox>
					</a-checkbox-group>
					<a-radio-group v-else-if="item.type === 'radioGroup'" v-model:value="innerFormData[item.field]">
						<a-radio v-for="radioItem in item.options" :value="radioItem.value">{{ radioItem.label }}</a-radio>
					</a-radio-group>
					<a-textarea v-else-if="item.type === 'textArea'" v-model:value="innerFormData[item.field]" />
					<a-date-picker v-else-if="item.type === 'datePicker'" :value-format="item.valueFormat" :show-time="item.showTime" :format="item.format" :picker="item.picker" :placeholder="item.placeholder" :allowClear="item.allowClear" :disabledTime="item.disabledTime" v-model:value="innerFormData[item.field]" />
					<a-upload v-else-if="item.upload" :action="item.action" list-type="picture" :multiple="item.multiple" :headers="item.headers" v-model:fileList="formState.upload">
						<a-button>
							<template #icon>
								<UploadOutlined />
							</template>
							Click to upload
						</a-button>
					</a-upload>
					<a-select v-else-if="item.type === 'select'" :placeholder="item.placeholder" v-model:value="innerFormData[item.field]">
						<a-select-option v-for="selectItem in item.options" :value="selectItem.value">{{ selectItem.label }}</a-select-option>
					</a-select>
				</a-form-item>
			</template>
			<a-form-item :wrapper-col="{ offset: 8, span: 16 }" v-if="searchConfig.btnGroup">
				<a-row :gutter="[16, 16]">
					<a-col :span="6" v-for="item in searchConfig.btnGroup">
						<a-button :type="item.type" :html-type="item.htmlType" :size="item.size" :shape="item.shape" block>
							<template #icon>
								<icon :icon="item.icon"></icon>
							</template>
							{{ item.innerText }}
						</a-button>
					</a-col>
				</a-row>
			</a-form-item>
		</a-form>
	</div>
</template>
<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue';
import { log } from 'console';
import { reactive, watch } from 'vue';
const props = defineProps({
	searchConfig: {
		type: Object,
		default: () => {},
	},
	formDataInit: {
		type: Object,
		default: () => {},
	},
});
const innerFormData = reactive({});
const onFinish = (values: any) => {
	console.log('Success:', values);
};
watch(
	() => props.formDataInit,
	value => {
		Object.keys(value).forEach(key => {
			innerFormData[key] = value[key];
		});
	},
	{ immediate: true }
);
const emit = defineEmits<{
	(e: 'update:modelValue', value: any): void;
}>();
const valueChange = (value: any, field: string) => {
	emit('update:modelValue', { innerFormData, [field]: value });
};
</script>
