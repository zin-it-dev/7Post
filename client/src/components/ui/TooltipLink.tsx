import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router';

type TooltipProps = {
	id: string;
	title: any;
	path: string;
	children: React.ReactNode;
};

const TooltipLink = ({ id, title, path, children }: TooltipProps) => (
	<OverlayTrigger
		overlay={
			<Tooltip
				className='fs-6'
				id={id}>
				{title}
			</Tooltip>
		}>
		<Link
			to={path}
			className='text-decoration-none hover-link'>
			{children}
		</Link>
	</OverlayTrigger>
);

export default TooltipLink;
