import { IForm } from '@/components/formModel/type';
export const searchFormConfig: IForm = {
	labelWidth: '120px',
	formItems: [
		{
			type: 'input',
			label: '姓名',
			placeholder: '请输入用户姓名',
			field: 'name',
			rules: [{ required: true, message: 'Please input your username!' }],
		},
		{
			type: 'select',
			field: 'status',
			label: '用户状态',
			placeholder: '请选择用户状态',
			options: [
				{ label: '启用', value: 1 },
				{ label: '禁用', value: 0 },
			],
		},
		{
			type: 'datePicker',
			field: 'creatTime',
			label: '请选择时间',
			otherOptions: {
				startPlaceholder: '开始时间',
				endPlaceholder: '结束时间',
				type: 'daterange',
			},
		},
	],
	btnGroup: [
		{
			disabled: false,
			ghost: false,
			icon: 'HomeOutlined',
			loading: false,
			type: 'primary',
			block: true,
			innerText: '提交',
			show: true,
			htmlType: 'submit',
			shape: 'default',
			size: 'large',
			span: 6,
			on: {
				reset: () => {},
				submit: () => {},
			},
		},
		{
			disabled: false,
			ghost: false,
			icon: 'SmileOutlined',
			loading: false,
			type: 'primary',
			block: true,
			innerText: '重置',
			show: true,
			htmlType: 'button',
			shape: 'default',
			size: 'large',
			span: 6,
		},
	],
};
