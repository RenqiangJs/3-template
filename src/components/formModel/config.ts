import { IForm } from './type';
export const searchFormConfig: IForm = {
	formItems: [
		{
			type: 'input',
			label: '用户id',
			placeholder: '请输入用户id',
		},
		{
			type: 'input',
			label: '用户名',
			placeholder: '请输入用户名',
		},
		{
			type: 'input',
			label: '真实姓名',
			placeholder: '请输入真实姓名',
		},
		{
			type: 'input',
			label: '电话号码',
			placeholder: '请输入电话号码',
		},
		{
			type: 'select',
			label: '用户状态',
			placeholder: '请选择用户状态',
			options: [
				{ label: '启用', value: 1 },
				{ label: '禁用', value: 0 },
			],
		},
		{
			type: 'datepicker',
			label: '创建时间',
			otherOptions: {
				startPlaceholder: '开始时间',
				endPlaceholder: '结束时间',
				type: 'daterange',
			},
		},
	],
	labelWidth: '120px',
	itemColLayout: {
		span: 8,
	},
	itemStyle: {
		padding: '10px 20px',
	},
};
