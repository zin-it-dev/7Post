import { Spinner } from 'react-bootstrap';

const ActivityIndicator = () => {
	return (
		<>
			<Spinner
				as='span'
				animation='border'
				role='status'
				aria-hidden='true'
				className='me-2'
			/>
			Loading...
		</>
	);
};

export default ActivityIndicator;
