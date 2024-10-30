import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { burgerSliceReducer } from './slices/burgerSlice';
import { ingredientSliceReducer } from './slices/ingredientSlice';
import { feedSliceReducer } from './slices/feedSlice';
import { userSliceReducer } from './slices/userSlice';
import { ordersSliceReducer } from './slices/ordersSlice';
import { orderSliceReducer } from './slices/orderSlice';

import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
	ingredients: ingredientSliceReducer,
	burgers: burgerSliceReducer,
	feed: feedSliceReducer,
	user: userSliceReducer,
	order: orderSliceReducer,
	orders: ordersSliceReducer
});

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
