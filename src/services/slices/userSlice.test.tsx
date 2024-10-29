import {
	getUser,
	updateUser,
	loginUser,
	logoutUser,
	registerUser,
	setIsAuthChecked,
	userSliceReducer,
	userSliceInitialState
} from './userSlice';

jest.mock('../../utils/burger-api', () => ({
	getUserApi: jest.fn(),
	updateUserApi: jest.fn(),
	logoutApi: jest.fn(),
	registerUserApi: jest.fn(),
	loginUserApi: jest.fn()
}));
describe('проверки для userSlice', () => {
	it('проверка getUser', () => {
		const state = userSliceReducer(userSliceInitialState, getUser.pending(''));
		expect(state.loading).toEqual(true);
		const userData = {
			success: true,
			user: { name: 'Таня', email: 'tania@ya.ru' }
		};
		const stateWithData = userSliceReducer(
			userSliceInitialState,
			getUser.fulfilled(userData, '')
		);
		expect(stateWithData.loading).toEqual(false);
		expect(stateWithData.user).toEqual(userData.user);
		expect(stateWithData.isAuthenticated).toEqual(true);
		expect(stateWithData.isAuthChecked).toEqual(true);
		expect(stateWithData.error).toEqual(null);

		const newstate = userSliceReducer(
			userSliceInitialState,
			getUser.rejected(new Error('Error message'), '')
		);
		expect(newstate.loading).toEqual(false);
		expect(newstate.user).toEqual(null);
		expect(newstate.isAuthenticated).toEqual(false);
		expect(newstate.isAuthChecked).toEqual(true);
		expect(newstate.error).toEqual('Ошибка при получении данных пользователя');
	});

	it('проверка updateUser', () => {
		const state = userSliceReducer(
			userSliceInitialState,
			updateUser.pending('', {})
		);
		expect(state.loading).toEqual(true);
		const updatedUserData = {
			success: true,
			user: { name: 'Таня', email: 'tania_update@ya.ru' }
		};
		const stateWithData = userSliceReducer(
			userSliceInitialState,
			updateUser.fulfilled(updatedUserData, '', {})
		);
		expect(stateWithData.loading).toEqual(false);
		expect(stateWithData.user).toEqual(updatedUserData.user);
		expect(stateWithData.isAuthenticated).toEqual(true);
		expect(stateWithData.isAuthChecked).toEqual(true);
		expect(stateWithData.error).toEqual(null);
	});

	it('проверка loginUser', () => {
		const loginData = { email: 'tania_update@ya.ru', password: 'password' };

		const state = userSliceReducer(
			userSliceInitialState,
			loginUser.pending('', { email: '', password: '' })
		);
		expect(state.loading).toEqual(true);

		const user = { name: 'Таня', email: 'tania@ya.ru' };
		const stateWithData = userSliceReducer(
			userSliceInitialState,
			loginUser.fulfilled(user, '', loginData)
		);
		expect(stateWithData.loading).toEqual(false);
		expect(stateWithData.user).toEqual(user);
		expect(stateWithData.isAuthenticated).toEqual(true);
		expect(stateWithData.isAuthChecked).toEqual(true);
		expect(stateWithData.error).toEqual(null);

		const newstate = userSliceReducer(
			userSliceInitialState,
			loginUser.rejected(new Error('Error message'), '', loginData)
		);
		expect(newstate.loading).toEqual(false);
		expect(newstate.user).toEqual(null);
		expect(newstate.isAuthenticated).toEqual(false);
		expect(newstate.isAuthChecked).toEqual(true);
		expect(newstate.error).toEqual('Неверные данные пользователя');
	});

	it('проверка logoutUser', () => {
		const state = userSliceReducer(
			userSliceInitialState,
			logoutUser.pending('')
		);
		expect(state.loading).toEqual(true);
		const testUser = { email: '', name: '' };
		const stateWithData = userSliceReducer(
			userSliceInitialState,
			logoutUser.fulfilled(undefined, '')
		);
		expect(stateWithData.loading).toEqual(false);
		expect(stateWithData.user).toEqual(testUser);
		expect(stateWithData.isAuthenticated).toEqual(false);
		expect(stateWithData.isAuthChecked).toEqual(true);
		expect(stateWithData.error).toEqual(null);

		const newstate = userSliceReducer(
			userSliceInitialState,
			logoutUser.rejected(new Error('Error message'), '')
		);
		expect(newstate.loading).toEqual(false);
		expect(newstate.user).toEqual(null);
		expect(newstate.isAuthenticated).toEqual(true);
		expect(newstate.isAuthChecked).toEqual(true);
		expect(newstate.error).toEqual('Ошибка при выходе из аккаунта');
	});

	it('проверка registerUser', () => {
		const registerData = {
			email: 'tania@ya.ru',
			password: 'password',
			name: 'Таня'
		};

		const state = userSliceReducer(
			userSliceInitialState,
			registerUser.pending('', { email: '', password: '', name: '' })
		);
		expect(state.loading).toEqual(true);
		const testUser = {
			success: true,
			refreshToken:
				'8817d3690480aad65ee0f4326729ac194b2dfcadec4851147214eb293ab8cd7a606352bf837f9942',
			accessToken:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWEzMWU1ZDgyOWJlMDAxYzc3ODVmYSIsImlhdCI6MTcyOTc2OTk1NywiZXhwIjoxNzI5NzcxMTU3fQ.iSiv2AshZm0KQstpaQmEn8JrBajRtfr38XJgDuwUJUg',
			user: {
				email: 'tania@ya.ru',
				name: 'Таня'
			}
		};
		const stateWithData = userSliceReducer(
			userSliceInitialState,
			registerUser.fulfilled(testUser, '', registerData)
		);
		expect(stateWithData.loading).toEqual(false);
		expect(stateWithData.user).toEqual(testUser.user);
		expect(stateWithData.isAuthenticated).toEqual(true);
		expect(stateWithData.isAuthChecked).toEqual(true);
		expect(stateWithData.error).toEqual(null);

		const newstate = userSliceReducer(
			userSliceInitialState,
			registerUser.rejected(new Error('Error message'), '', registerData)
		);
		expect(newstate.loading).toEqual(false);
		expect(newstate.user).toEqual(null);
		expect(newstate.isAuthenticated).toEqual(false);
		expect(newstate.isAuthChecked).toEqual(true);
		expect(newstate.error).toEqual('Неверные данные пользователя');
	});

	it('проверка setisAuthChecked', () => {
		const state = userSliceReducer(
			userSliceInitialState,
			setIsAuthChecked(true)
		);
		expect(state.isAuthChecked).toEqual(true);
	});
});

describe('проверка начального состояния для userSlice', () => {
	it('проверка на соответствие начальному состоянию', () => {
		expect(userSliceInitialState).toEqual({
			user: null,
			isAuthenticated: false,
			isAuthChecked: false,
			loading: false,
			error: ''
		});
	});
});
