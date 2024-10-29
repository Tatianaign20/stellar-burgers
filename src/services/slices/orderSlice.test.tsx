import {
	submitOrder,
	getOrderByNumber,
	orderSliceReducer,
	orderSliceInitialState
} from './orderSlice';
import orderSlice from './orderSlice';

jest.mock('../../utils/burger-api', () => ({
	orderBurgerApi: jest.fn()
}));

jest.mock('../../utils/burger-api', () => ({
	getOrderByNumberApi: jest.fn()
}));

const testOrder = {
	success: true,
	order: {
		_id: '6718c742d829be001c7781cf',
		ingredients: ['643d69a5c3f7b9001cfa093e'],
		number: 57256,
		name: 'Филе Люминесцентного тетраодонтимформа',
		status: 'done',
		createdAt: '2024-10-09T13:35:04.719Z',
		updatedAt: '2024-10-23T09:52:04.687Z'
	},
	name: 'Татьяна'
};

describe('проверки для orderSlice', () => {
	it('проверка submitOrder.pending', () => {
		const newState = orderSliceReducer(undefined, submitOrder.pending('', []));
		expect(newState).toEqual({
			order: null,
			loading: true,
			error: null
		});
	});

	it('проверка submitOrder.fulfilled', () => {
		const newState = orderSliceReducer(
			undefined,
			submitOrder.fulfilled(testOrder, '', [])
		);
		expect(newState.order).toEqual(testOrder.order);
		expect(newState.loading).toEqual(false);
		expect(newState.error).toEqual(null);
	});

	it('проверка submitOrder.rejected', () => {
		const newState = orderSliceReducer(
			undefined,
			submitOrder.rejected(new Error('Error message'), '', [])
		);
		expect(newState.loading).toEqual(false);
		expect(newState.error).toEqual('Ошибка');
	});

	it('проверка getOrderByNumber.pending', () => {
		const newState = orderSliceReducer(
			undefined,
			getOrderByNumber.pending('', 0, 0)
		);
		expect(newState.loading).toEqual(true);
		expect(newState.error).toEqual(null);
	});

	it('проверка getOrderByNumber.fulfilled', () => {
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
					_id: '6718c742d829be001c7781cb',
					ingredients: ['643d69a5c3f7b9001cfa100e'],
					number: 57256,
					name: 'Филе',
					status: 'done',
					createdAt: '2024-10-09T13:38:04.719Z',
					updatedAt: '2024-10-23T09:56:04.687Z'
				}
			]
		};
		const newState = orderSliceReducer(
			undefined,
			getOrderByNumber.fulfilled(testOrders, '', 0)
		);
		expect(newState.order).toEqual(testOrders.orders[0]);
		expect(newState.loading).toEqual(false);
		expect(newState.error).toEqual(null);
	});

	it('проверка getOrderByNumber.rejected', () => {
		const newState = orderSliceReducer(
			undefined,
			getOrderByNumber.rejected(new Error('Error message'), '', 0)
		);
		expect(newState.order).toEqual(null);
		expect(newState.loading).toEqual(false);
		expect(newState.error).toEqual('Ошибка');
	});
});

describe('проверка начального состояния для orderSlice', () => {
	it('проверка на соответствие начальному состоянию', () => {
		expect(orderSliceInitialState).toEqual({
			order: null,
			loading: false,
			error: null
		});
	});
});
