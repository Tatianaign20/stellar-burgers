import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	nanoid
} from '@reduxjs/toolkit';
import { TOrdersData } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';
import { get } from 'http';

export const getFeeds = createAsyncThunk('feed/getAllData', getFeedsApi);
type TFeedState = {
	feed: TOrdersData;
	loading: boolean;
	error?: string | null;
};
export const initialState: TFeedState = {
	feed: { orders: [], total: 0, totalToday: 0 },
	loading: false,
	error: ''
};
export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFeeds.pending, (state) => {
				state.feed = { orders: [], total: 0, totalToday: 0 };
				state.loading = true;
				state.error = null;
			})
			.addCase(getFeeds.fulfilled, (state, action) => {
				state.feed = action.payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(getFeeds.rejected, (state) => {
				state.feed = { orders: [], total: 0, totalToday: 0 };
				state.loading = false;
				state.error = 'Ошибка';
			});
	},
	selectors: {
		getFeedOrdersSelector: (state) => state.feed.orders,
		getFeedTotalSelector: (state) => state.feed.total,
		getFeedTotalTodaySelector: (state) => state.feed.totalToday,
		getFeedSelector: (state) => state.feed,
		getLoadingSelector: (state) => state.loading,
		getErrorSelector: (state) => state.error
	}
});

export const feedSliceReducer = feedSlice.reducer;
export default feedSlice;
