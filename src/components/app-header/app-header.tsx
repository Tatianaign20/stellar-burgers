import { FC } from 'react';
import { AppHeaderUI } from '../ui/app-header';
import userSlice from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
	const user = useSelector(userSlice.selectors.getUserSelector);
	return <AppHeaderUI userName={user?.name} />;
};
