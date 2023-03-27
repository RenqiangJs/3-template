type IFormType = 'input' | 'password' | 'select' | 'datePicker';
interface IFormOption {
	label: string;
	value: string | number;
}
export interface IFormItem {
	field: string;
	type: IFormType; //输入框类型
	label: string; //输入框标题
	placeholder?: any; //输入框默认显示内容 // 针对select
	options?: IFormOption[]; //选择器的可选子选项 // 针对特殊属性
	otherOptions?: any;
	rules?: any[];
}
export interface BTNGroup {
	span: 6;
	disabled?: boolean;
	ghost?: boolean;
	icon?: string;
	loading?: boolean;
	shape?: 'default' | 'circle' | 'round';
	size?: 'large' | 'middle' | 'small';
	type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
	block?: boolean;
	innerText?: string;
	htmlType?: string;
	show?: boolean;
	on?: { reset?: () => unknown; submit?: () => void };
}
export interface IForm {
	formItems: IFormItem[];
	labelWidth?: string;
	itemStyle?: any;
	itemColLayout?: any;
	btnGroup?: BTNGroup[];
}
