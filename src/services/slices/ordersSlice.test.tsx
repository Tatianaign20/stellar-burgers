import {
	getOrders,
	ordersSliceReducer,
	ordersSliceInitialState
} from './ordersSlice';
import ordersSlice from './ordersSlice';

jest.mock('../../utils/burger-api', () => ({
	getOrdersApi: jest.fn()
}));

describe('проверки для ordersSlice', () => {
	it('проверка fgetOrders.pending', () => {
		const newstate = ordersSliceReducer(undefined, getOrders.pending(''));
		expect(newstate.loading).toBe(true);
		expect(newstate.orders).toEqual([]);
		expect(newstate.error).toBeNull();
	});

	it('проверка getOrders.fulfilled', () => {
		const testOrders = {
			success: true,
			orders: [
				{
					_id: '6718c742d829be001c7781cf',
					ingredients: ['643d69a5c3f7b9001cfa093e'],
					number: 57256,
					name: 'Филе Люминесцентного тетраодонтимформа',
					status: 'done',
					createdAt: '2024-10-09T13:35:04.719Z',
					updatedAt: '2024-10-23T09:52:04.687Z'
				},
				{
					_id: '6718c742d829be001c7781ca',
					ingredients: ['643d69a5c3f7b9001cfa093e'],
					number: 57257,
					name: 'Филе Люминесцентного тетраодонтимформа',
					status: 'done',
					createdAt: '2024-10-09T13:37:04.719Z',
					updatedAt: '2024-10-23T09:59:04.687Z'
				}
			]
		};
		const newState = ordersSliceReducer(
			undefined,
			getOrders.fulfilled(testOrders.orders, '')
		);
		expect(newState.loading).toBe(false);
		expect(newState.orders).toEqual(testOrders.orders);
		expect(newState.error).toBeNull();
	});

	it('проверка getOrders.rejected', () => {
		const newState = ordersSliceReducer(
			undefined,
			getOrders.rejected(new Error('Error message'), '')
		);
		expect(newState.loading).toBe(false);
		expect(newState.orders).toEqual([]);
		expect(newState.error).toBe('Ошибка');
	});
});

describe('проверка начального состояния для ordersSlice', () => {
	it('проверка на соответствие начальному состоянию', () => {
		expect(ordersSliceInitialState).toEqual({
			orders: [],
			loading: false,
			error: ''
		});
	});
});
