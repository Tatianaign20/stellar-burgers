import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '../ui/burger-ingredient';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import burgerSlice from '../../services/slices/burgerSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
	({ ingredient, count }) => {
		const location = useLocation();

		const dispatch = useDispatch();

		const handleAdd = () => {
			dispatch(burgerSlice.actions.addBurgerIngredient(ingredient));
		};

		return (
			<BurgerIngredientUI
				ingredient={ingredient}
				count={count}
				locationState={{ background: location }}
				handleAdd={handleAdd}
			/>
		);
	}
);
