import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createSelector,
	isAction
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '../../utils/burger-api';
import { get } from 'http';

export const getOrders = createAsyncThunk('orders/getOrders', getOrdersApi);

type TUserOrdersState = {
	orders: TOrder[];
	loading: boolean;
	error?: string | null;
};
export const initialState: TUserOrdersState = {
	orders: [],
	loading: false,
	error: ''
};
export const ordersSlice = createSlice({
	name: 'orders',
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getOrders.pending, (state) => {
				state.orders = [];
				state.loading = true;
				state.error = null;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.orders = action.payload;
				state.error = null;
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.orders = [];
				state.loading = false;
				state.error = 'Ошибка';
			});
	},
	selectors: {
		getOrdersSelector: (state) => state.orders,
		getLoadingSelector: (state) => state.loading,
		getErrorSelector: (state) => state.error
	}
});

export const ordersSliceReducer = ordersSlice.reducer;
export default ordersSlice;
