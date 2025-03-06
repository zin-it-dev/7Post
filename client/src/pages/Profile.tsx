import { Container } from 'react-bootstrap';

import { useAuthStore } from '@/hooks/useAuthStore';
import Avatar from '@/components/ui/Avatar';
import { Link } from 'react-router';

const Profile = () => {
	const { user } = useAuthStore();

	return (
		<Container>
			<section>
				<Avatar
					{...user!}
					size={80}
				/>
				<h1 className='mt-3'>{user?.username}</h1>
				<p>{user?.email}</p>
				{user?.bio && <p>{user?.bio}</p>}
				<Link to={''}>Edit your profile</Link>
			</section>
		</Container>
	);
};

export default Profile;
