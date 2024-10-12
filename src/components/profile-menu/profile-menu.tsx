import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser()), navigate('/', { replace: true });
	};

	return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
