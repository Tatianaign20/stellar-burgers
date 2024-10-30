import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createSelector,
	isAction
} from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';

export const submitOrder = createAsyncThunk(
	'order/submitOrder',
	async (ingredients: string[], { rejectWithValue }) => {
		try {
			const reply = await orderBurgerApi(ingredients);
			if (!reply.success) {
				return rejectWithValue(reply);
			}
			return reply;
		} catch (error) {
			return rejectWithValue('Ошибка');
		}
	}
);

export const getOrderByNumber = createAsyncThunk(
	'order/getOrderByNumber',
	async (number: number) => getOrderByNumberApi(number)
);

type TOrderState = {
	order: TOrder | null;
	orderGetByNumber: TOrder | null;
	loading: boolean;
	error?: string | null;
};

const initialState: TOrderState = {
	order: null,
	orderGetByNumber: null,
	loading: false,
	error: null
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearBurgerOrder: (state) => {
			state.order = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitOrder.pending, (state) => {
				state.order = null;
				state.loading = true;
				state.error = null;
			})
			.addCase(submitOrder.fulfilled, (state, action) => {
				state.order = action.payload.order;
				state.loading = false;
				state.error = null;
			})
			.addCase(submitOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = 'Ошибка';
			})
			.addCase(getOrderByNumber.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getOrderByNumber.fulfilled, (state, action) => {
				state.loading = false;
				state.orderGetByNumber = action.payload.orders[0];
				state.error = null;
			})
			.addCase(getOrderByNumber.rejected, (state, action) => {
				state.order = null;
				state.loading = false;
				state.error = 'Ошибка';
			});
	},
	selectors: {
		getOrderSelector: (state) => state.order,
		getLoadingSelector: (state) => state.loading,
		getOrderByNumberSelector: (state) => state.orderGetByNumber,
		getErrorSelector: (state) => state.error
	}
});

export const orderSliceReducer = orderSlice.reducer;
export default orderSlice;
export const orderSliceInitialState = initialState;
