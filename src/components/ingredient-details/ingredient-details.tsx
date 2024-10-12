// import { FC } from 'react';
// import { Preloader } from '../ui/preloader';
// import { IngredientDetailsUI } from '../ui/ingredient-details';
// import { getIngredientsSelector } from '../../services/slices/ingredientSlice';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { TIngredient } from '@utils-types';

// export const IngredientDetails: FC = () => {
//   /** TODO: взять переменную из стора */

// const ingredientData = null;
//   // const location = useLocation();
//   // const ingredients = useSelector(getIngredientsSelector);
//   // const ingredientToFind = location.pathname.replace('/ingredients/', '');

//   // const ingredientData: TIngredient = ingredients.find(
//   //   (ingredient) => ingredient._id === ingredientToFind
//   // )!;

//   if (!ingredientData) {
//     return <Preloader />;
//   }

//   return <IngredientDetailsUI ingredientData={ingredientData} />;
// };

import React, { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import ingredientSlice from '../../services/slices/ingredientSlice';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
	const location = useLocation();
	const ingredients = useSelector(
		ingredientSlice.selectors.getIngredientsSelector
	);
	const ingredientId = location.pathname.split('/').pop();
	const ingredientData = ingredients.find(
		(ingredient: TIngredient) => ingredient._id === ingredientId
	);

	if (!ingredientData) {
		return <Preloader />;
	}

	return <IngredientDetailsUI ingredientData={ingredientData} />;
};
