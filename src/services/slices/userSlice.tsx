import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createSelector,
	isAction
} from '@reduxjs/toolkit';

import { TUser } from '../../utils/types';
import {
	getUserApi,
	updateUserApi,
	logoutApi,
	registerUserApi,
	loginUserApi,
	TRegisterData,
	TLoginData
} from '../../utils/burger-api';

import { setCookie, deleteCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk(
	'user/get',
	async (_, { rejectWithValue }) => {
		try {
			const reply = await getUserApi();
			if (!reply.success) {
				return rejectWithValue(reply);
			}
			return reply;
		} catch (error) {
			return rejectWithValue('Ошибка');
		}
	}
);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const loginUser = createAsyncThunk(
	'user/login',
	async (data: TLoginData, { rejectWithValue }) => {
		try {
			const reply = await loginUserApi(data);
			if (!reply.success) {
				return rejectWithValue(data);
			}
			setCookie('accessToken', reply.accessToken);
			localStorage.setItem('refreshToken', reply.refreshToken);
			return reply.user;
		} catch (error) {
			console.error(error);
			return rejectWithValue('Ошибка');
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		const reply = await logoutApi();
		if (!reply.success) {
			return rejectWithValue(reply);
		}
		deleteCookie('accessToken');
	}
);

export const registerUser = createAsyncThunk(
	'user/register',
	async (data: TRegisterData, { rejectWithValue }) => {
		try {
			const reply = await registerUserApi(data);
			if (!reply.success) {
				return rejectWithValue(data);
			}
			setCookie('accessToken', reply.accessToken);
			localStorage.setItem('refreshToken', reply.refreshToken);
			return reply;
		} catch (error) {
			return rejectWithValue('Ошибка');
		}
	}
);

type TUserState = {
	user: TUser;
	isAuthenticated: boolean;
	loading: boolean;
	error?: string | null;
};

const initialState: TUserState = {
	user: {
		email: '',
		name: ''
	},
	isAuthenticated: false,
	loading: false,
	error: ''
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUser.pending, (state) => {
				state.isAuthenticated = false;
				state.loading = true;
				state.error = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(getUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = 'Ошибка при получении данных пользователя';
			})
			.addCase(updateUser.pending, (state) => {
				state.isAuthenticated = false;
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.loading = false;
				state.error = null;
			})
			.addCase(updateUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = 'Ошибка при обновлении данных пользователя';
			})
			.addCase(loginUser.pending, (state) => {
				state.isAuthenticated = false;
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(loginUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = 'Неверные данные пользователя';
			})
			.addCase(registerUser.pending, (state) => {
				state.isAuthenticated = false;
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.loading = false;
				state.error = null;
			})
			.addCase(registerUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.loading = false;
				state.error = 'Неверные данные пользователя';
			})
			.addCase(logoutUser.pending, (state) => {
				state.isAuthenticated = true;
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = {
					email: '',
					name: ''
				};
				state.loading = false;
				state.error = null;
			})
			.addCase(logoutUser.rejected, (state) => {
				state.isAuthenticated = true;
				state.loading = false;
				state.error = 'Ошибка при выходе из аккаунта';
			});
	},
	selectors: {
		getIsAuthenticatedSelector: (state) => state.isAuthenticated,
		getUserSelector: (state) => state.user,
		getLoadingSelector: (state) => state.loading,
		getErrorSelector: (state) => state.error
	}
});

export const userSliceReducer = userSlice.reducer;
export default userSlice;
