import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import userSlice from 'src/services/slices/userSlice';
import { registerUser } from '../../services/slices/userSlice';
import { register } from 'module';

export const Register: FC = () => {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		dispatch(registerUser({ name: userName, email, password }));
	};

	return (
		<RegisterUI
			errorText=''
			email={email}
			userName={userName}
			password={password}
			setEmail={setEmail}
			setPassword={setPassword}
			setUserName={setUserName}
			handleSubmit={handleSubmit}
		/>
	);
};
