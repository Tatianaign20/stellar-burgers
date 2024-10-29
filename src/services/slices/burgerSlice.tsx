import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TBurgerState = {
	burgerIngredients: TConstructorIngredient[];
	bun: TConstructorIngredient | null;
};

const initialState: TBurgerState = {
	burgerIngredients: [],
	bun: null
};

const burgerSlice = createSlice({
	name: 'burgers',
	initialState,
	reducers: {
		addBurgerIngredient: {
			reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
				if (action.payload.type === 'bun') {
					state.bun = action.payload;
				} else {
					state.burgerIngredients.push(action.payload);
				}
				console.log(action.payload._id);
			},
			prepare: (ingredient: TIngredient) => {
				const id = nanoid();
				return { payload: { ...ingredient, id } };
			}
		},

		removeBurgerIngredient: (state, action: PayloadAction<string>) => {
			state.burgerIngredients = state.burgerIngredients.filter(
				(ingredient) => ingredient.id !== action.payload
			);
		},

		moveBurgerIngredient: (
			state,
			action: PayloadAction<{ currentIndex: number; targetIndex: number }>
		) => {
			const { currentIndex, targetIndex } = action.payload;
			const ingredientToMove = state.burgerIngredients[currentIndex];
			state.burgerIngredients.splice(currentIndex, 1);
			state.burgerIngredients.splice(targetIndex, 0, ingredientToMove);
		},
		clearBurger: (state) => {
			state.burgerIngredients = [];
			state.bun = null;
		}
	},
	selectors: {
		getBurgerIngredientsSelector: (state) => state.burgerIngredients,
		getBunSelector: (state) => state.bun
	}
});

export const burgerSliceReducer = burgerSlice.reducer;
export const { getBurgerIngredientsSelector, getBunSelector } =
	burgerSlice.selectors;
export default burgerSlice;
export const burgerSliceInitialState = initialState;
