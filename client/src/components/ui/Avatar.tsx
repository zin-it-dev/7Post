import { Image } from 'react-bootstrap';

import { FullName } from '@/types/base.type';
import { formatFullName } from '@/utils/formats';

type AvatarProps = FullName & {
	avatar: string;
	size: number;
};

const Avatar = (props: AvatarProps) => {
	return (
		<Image
			alt={formatFullName(props.first_name, props.last_name)}
			src={props.avatar}
			width={props.size}
			height={props.size}
			roundedCircle
		/>
	);
};

export default Avatar;
