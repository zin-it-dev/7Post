import { useController, UseControllerProps } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import { FormValues, IFormInput } from '@/types/form.type';

const Input = (props: UseControllerProps<IFormInput> & FormValues) => {
	const { field, fieldState } = useController(props);

	return (
		<Form.Group
			className='mb-3 fs-6'
			controlId={`form-group-${props.name}`}>
			<Form.Label className='fw-bold'>{props.label}</Form.Label>
			<Form.Control
				{...field}
				size={props.size}
				className='fs-6'
				type={props.type}
				placeholder={props.placeholder}
				isInvalid={!!fieldState.error}
			/>
			<Form.Control.Feedback
				type='invalid'
				className='fs-6'>
				{fieldState.error?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
};

export default Input;
