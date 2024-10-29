import { expect, test } from '@jest/globals';
import {
	burgerSliceReducer,
	burgerSliceInitialState
} from './slices/burgerSlice';
import {
	ingredientSliceReducer,
	ingredientSliceInitialState
} from './slices/ingredientSlice';
import { feedSliceReducer, feedSliceInitialState } from './slices/feedSlice';
import { userSliceReducer, userSliceInitialState } from './slices/userSlice';
import {
	ordersSliceReducer,
	ordersSliceInitialState
} from './slices/ordersSlice';
import { orderSliceReducer, orderSliceInitialState } from './slices/orderSlice';

describe('тесты проверяют корректность инициализации состояний перед началом работы приложения', () => {
	test('инициализация burgerSlice', () => {
		const initialState = burgerSliceReducer(undefined, {
			type: 'UNKNOWN_ACTION'
		});
		expect(initialState).toEqual(burgerSliceInitialState);
	});

	test('инициализация ingredientSlice', () => {
		const initialState = ingredientSliceReducer(undefined, {
			type: 'UNKNOWN_ACTION'
		});
		expect(initialState).toEqual(ingredientSliceInitialState);
	});

	test('инициализация feedSlice', () => {
		const initialState = feedSliceReducer(undefined, {
			type: 'UNKNOWN_ACTION'
		});
		expect(initialState).toEqual(feedSliceInitialState);
	});

	test('инициализация userSlice', () => {
		const initialState = userSliceReducer(undefined, {
			type: 'UNKNOWN_ACTION'
		});
		expect(initialState).toEqual(userSliceInitialState);
	});

	test('инициализация ordersSlice', () => {
		const initialState = ordersSliceReducer(undefined, {
			type: 'UNKNOWN_ACTION'
		});
		expect(initialState).toEqual(ordersSliceInitialState);
	});

	test('инициализация orderSlice', () => {
		const initialState = orderSliceReducer(undefined, {
			type: 'UNKNOWN_ACTION'
		});
		expect(initialState).toEqual(orderSliceInitialState);
	});
});
