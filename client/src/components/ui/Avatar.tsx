import { Image } from 'react-bootstrap';

import { FullName } from '@/types/base.type';
import { formatFullName } from '@/utils/formats';

type AvatarProps = FullName & {
	avatar: string;
	width: number;
	heigth: number;
};

const Avatar = (props: AvatarProps) => {
	return (
		<Image
			alt={formatFullName(props.first_name, props.last_name)}
			src={props.avatar}
			width={props.width}
			height={props.heigth}
			roundedCircle
		/>
	);
};

export default Avatar;
