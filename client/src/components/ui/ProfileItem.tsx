import { UserInfo } from '@/types/user.type';
import Avatar from './Avatar';
import { formatFullName } from '@/utils/formats';

const ProfileItem = (props: UserInfo) => {
	return (
		<div className='text-center'>
			<Avatar
				width={30}
				heigth={30}
				{...props}
			/>
			<span className='ms-2 fs-6 text-light'>
				{formatFullName(props.first_name, props.last_name)}
			</span>
		</div>
	);
};

export default ProfileItem;
