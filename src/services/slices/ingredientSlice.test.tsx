import {
	ingredientSliceReducer,
	fetchIngredients,
	ingredientSliceInitialState
} from './ingredientSlice';

jest.mock('../../utils/burger-api', () => ({
	getIngredientsApi: jest.fn()
}));

describe('проверки для ingredientSlice', () => {
	it('проверка fetchIngredients.pending', () => {
		const newState = ingredientSliceReducer(
			undefined,
			fetchIngredients.pending('')
		);
		expect(newState.loading).toEqual(true);
		expect(newState.error).toBeNull();
	});

	it('проверка fetchIngredients.fulfilled', () => {
		const ingredients = [
			{
				_id: '643d69a5c3f7b9001cfa0940',
				name: 'Говяжий метеорит (отбивная)',
				type: 'main',
				proteins: 800,
				fat: 800,
				carbohydrates: 300,
				calories: 2674,
				price: 300,
				image: 'https://code.s3.yandex.net/react/code/meat-04.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png'
			},
			{
				_id: '643d69a5c3f7b9001cfa093f',
				name: 'Мясо бессмертных моллюсков Protostomia',
				type: 'main',
				proteins: 433,
				fat: 244,
				carbohydrates: 33,
				calories: 420,
				price: 1337,
				image: 'https://code.s3.yandex.net/react/code/meat-02.png',
				image_mobile:
					'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
			}
		];
		const newState = ingredientSliceReducer(
			undefined,
			fetchIngredients.fulfilled(ingredients, '')
		);
		expect(newState.loading).toEqual(false);
		expect(newState.ingredients).toEqual(ingredients);
	});

	it('проверка fetchIngredients.rejected', () => {
		const error = new Error('Error message');
		const newState = ingredientSliceReducer(
			undefined,
			fetchIngredients.rejected(error, '')
		);
		expect(newState.loading).toEqual(false);
		expect(newState.error).toEqual(error.message);
	});
});

describe('проверка начального состояния для ingredientSlice', () => {
	it('проверка на соответствие начальному состоянию', () => {
		expect(ingredientSliceInitialState).toEqual({
			ingredients: [],
			loading: false,
			error: ''
		});
	});
});
