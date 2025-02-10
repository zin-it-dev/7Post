export type FormValues = {
	label: string;
	type: string;
	placeholder: string;
	size?: 'sm' | 'lg';
};

export interface IFormInput {
	email: string;
	password: string;
}
