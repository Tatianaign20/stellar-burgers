import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '../ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import burgerSlice from '../../services/slices/burgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
	({ ingredient, index, totalItems }) => {
		const dispatch = useDispatch();

		const handleMoveDown = () => {
			if (index < totalItems - 1) {
				dispatch(
					burgerSlice.actions.moveBurgerIngredient({
						currentIndex: index,
						targetIndex: index + 1
					})
				);
			}
		};

		const handleMoveUp = () => {
			if (index > 0) {
				dispatch(
					burgerSlice.actions.moveBurgerIngredient({
						currentIndex: index,
						targetIndex: index - 1
					})
				);
			}
		};

		const handleClose = () => {
			dispatch(burgerSlice.actions.removeBurgerIngredient(ingredient.id));
		};

		return (
			<BurgerConstructorElementUI
				ingredient={ingredient}
				index={index}
				totalItems={totalItems}
				handleMoveUp={handleMoveUp}
				handleMoveDown={handleMoveDown}
				handleClose={handleClose}
			/>
		);
	}
);
