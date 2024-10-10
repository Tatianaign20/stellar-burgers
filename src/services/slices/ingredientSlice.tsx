import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createSelector
} from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientState = {
	ingredients: Array<TIngredient>;
	loading: boolean;
	error?: string | null;
};

const initialState: TIngredientState = {
	ingredients: [],
	loading: false,
	error: ''
};
export const fetchIngredients = createAsyncThunk<TIngredient[]>(
	'ingredients/getAll',
	getIngredientsApi
);
const ingredientSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(
				fetchIngredients.fulfilled,
				(state, action: PayloadAction<TIngredient[]>) => {
					state.loading = false;
					state.ingredients = action.payload;
				}
			);
	},
	selectors: {
		getIngredientsSelector: (state) => state.ingredients,
		getLoadingSelector: (state) => state.loading,
		getErrorSelector: (state) => state.error
	}
});
export const ingredientSliceReducer = ingredientSlice.reducer;

export default ingredientSlice;
