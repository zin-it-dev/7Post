import { Badge } from 'react-bootstrap';

const Tag = (props: { label: string }) => {
	return (
		<Badge
			bg='light'
			pill
			className='px-3 py-2'>
			#{props.label}
		</Badge>
	);
};

export default Tag;
