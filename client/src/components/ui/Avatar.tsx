import { Image } from 'react-bootstrap';

import { UserInfo } from '@/types/user.type';

type AvatarProps = UserInfo & {
	size: number;
};

const Avatar = (props: AvatarProps) => {
	return (
		<Image
			alt={props.username}
			src={props.avatar}
			width={props.size}
			height={props.size}
			roundedCircle
		/>
	);
};

export default Avatar;
