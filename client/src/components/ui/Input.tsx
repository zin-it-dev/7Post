import { Form } from 'react-bootstrap';

type InputType = {
	name: string;
	type: string;
	id?: string;
	value?: string;
	placeholder: string;
};

const Input = ({ name, type, id, value, placeholder }: InputType) => {
	return (
		<Form.Group className='mb-3'>
			<Form.Control
				type={type}
				name={name}
				defaultValue={value}
				placeholder={placeholder}
				id={id}
			/>
		</Form.Group>
	);
};

export default Input;
