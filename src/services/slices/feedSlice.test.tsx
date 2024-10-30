import { getFeeds, feedSliceReducer, feedSliceInitialState } from './feedSlice';

jest.mock('../../utils/burger-api', () => ({
	getFeedsApi: jest.fn()
}));

describe('проверка редьюсера feedSlice', () => {
	it('проверка getFeeds.pending', () => {
		const state = feedSliceReducer(feedSliceInitialState, getFeeds.pending(''));
		expect(state.loading).toEqual(true);
	});

	it('проверка getFeeds.fulfilled', () => {
		const testOrders = {
			success: true,
			orders: [
				{
					_id: '6718c742d829be001c7781cg',
					ingredients: ['643d69a5c3f7b9001cfa093e'],
					number: 57256,
					name: 'Филе Люминесцентного тетраодонтимформа',
					status: 'done',
					createdAt: '2024-10-09T13:31:04.719Z',
					updatedAt: '2024-10-23T09:50:04.687Z'
				},
				{
					_id: '6718c742d829be001c7781cr',
					ingredients: ['643d69a5c3f7b9001cfa093e'],
					number: 57257,
					name: 'Филе Люминесцентного тетраодонтимформа',
					status: 'done',
					createdAt: '2024-10-09T13:35:04.719Z',
					updatedAt: '2024-10-23T09:52:04.687Z'
				},
				{
					_id: '6718c742d829be001c7781co',
					ingredients: ['643d69a5c3f7b9001cfa093e'],
					number: 57258,
					name: 'Филе Люминесцентного тетраодонтимформа',
					status: 'done',
					createdAt: '2024-10-09T13:38:04.719Z',
					updatedAt: '2024-10-23T09:59:04.687Z'
				}
			],
			total: 3,
			totalToday: 1
		};
		const state = feedSliceReducer(
			feedSliceInitialState,
			getFeeds.fulfilled(testOrders, '')
		);
		expect(state.feed).toEqual({
			success: true,
			orders: testOrders.orders,
			total: testOrders.total,
			totalToday: testOrders.totalToday
		});
	});

	it('проверка getFeeds.rejected', () => {
		const state = feedSliceReducer(
			feedSliceInitialState,
			getFeeds.rejected(new Error('Error message'), '')
		);
		expect(state.error).toEqual('Ошибка');
		expect(state.loading).toEqual(false);
		expect(state.feed).toEqual({ orders: [], total: 0, totalToday: 0 });
	});
});

describe('проверка начального состояния для feedSlice', () => {
	it('проверка на соответствие начальному состоянию', () => {
		expect(feedSliceInitialState).toEqual({
			feed: { orders: [], total: 0, totalToday: 0 },
			loading: false,
			error: ''
		});
	});
});
