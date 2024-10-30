import burgerSlice from './burgerSlice';
import { TBurgerState } from './burgerSlice';

import { burgerSliceReducer, burgerSliceInitialState } from './burgerSlice';

const testIngredient = {
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
};

describe('проверка burgerSliceReducer', () => {
	let state: TBurgerState;
	beforeEach(() => {
		state = burgerSliceInitialState;
	});

	it('проверка добавления ингредиента в бургер', () => {
		const newState = burgerSliceReducer(burgerSliceInitialState, {
			type: 'burgers/addBurgerIngredient',
			payload: testIngredient
		});

		expect(newState.burgerIngredients).toHaveLength(1);
		expect(newState.burgerIngredients[0]).toEqual(testIngredient);
	});

	it('проверка удаления ингредиента', () => {
		const actionBefore =
			burgerSlice.actions.addBurgerIngredient(testIngredient);
		state = burgerSliceReducer(state, actionBefore);

		const action = {
			type: 'burgers/removeBurgerIngredient',
			payload: testIngredient._id
		};
		const newState = burgerSliceReducer(state, action);

		expect(newState.burgerIngredients).toHaveLength(1);
		expect(
			newState.burgerIngredients.map((ingredient) => ingredient.id)
		).not.toContain('testIngredient._id');
	});

	it('проверка перемещения ингредиента', () => {
		const testIngredientAnother = {
			_id: '643d69a5c3f7b9001cfa093f',
			name: 'Мясо бессмертных моллюсков Protostomia',
			type: 'main',
			proteins: 433,
			fat: 244,
			carbohydrates: 33,
			calories: 420,
			price: 1337,
			image: 'https://code.s3.yandex.net/react/code/meat-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
		};
		const actionBefore =
			burgerSlice.actions.addBurgerIngredient(testIngredient);
		state = burgerSliceReducer(state, actionBefore);
		const actionBefore2 = burgerSlice.actions.addBurgerIngredient(
			testIngredientAnother
		);
		state = burgerSliceReducer(state, actionBefore2);
		const action = {
			type: 'burgers/moveBurgerIngredient',
			payload: { currentIndex: 0, targetIndex: 1 }
		};
		const newState = burgerSliceReducer(state, action);

		expect(newState.burgerIngredients[0]._id).toBe(testIngredientAnother._id);
		expect(newState.burgerIngredients[1]._id).toBe(testIngredient._id);
	});
});
