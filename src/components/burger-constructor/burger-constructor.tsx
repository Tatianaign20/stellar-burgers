import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { useSelector, useDispatch } from '../../services/store';
import burgerSlice from '../../services/slices/burgerSlice';
import orderSlice from '../../services/slices/orderSlice';
import userSlice from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { submitOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
	const constructorItemsIngredients = useSelector(
		burgerSlice.selectors.getBurgerIngredientsSelector
	);
	const constructorItemsbun = useSelector(burgerSlice.selectors.getBunSelector);
	const user = useSelector(userSlice.selectors.getUserSelector);
	const isAuthenticated = useSelector(
		userSlice.selectors.getIsAuthenticatedSelector
	);
	const constructorItems = {
		ingredients: constructorItemsIngredients,
		bun: constructorItemsbun
	};
	const orderRequest = useSelector(orderSlice.selectors.getLoadingSelector);
	const orderModalData = useSelector(orderSlice.selectors.getOrderSelector);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onOrderClick = () => {
		if (!user) {
			navigate('/login');
		}
		if (!constructorItems.bun || orderRequest) return;

		const bunId = constructorItems.bun ? constructorItems.bun._id : '';
		const ingredientsOrder: string[] = [
			bunId,
			...constructorItems.ingredients.map(
				(ingredient: TConstructorIngredient) => ingredient._id
			),
			bunId
		];

		dispatch(submitOrder(ingredientsOrder));
	};

	const closeOrderModal = () => {
		dispatch(burgerSlice.actions.clearBurger());
		dispatch(orderSlice.actions.clearBurgerOrder());
	};

	const price = useMemo(
		() =>
			(constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
			constructorItems.ingredients.reduce(
				(s: number, v: TConstructorIngredient) => s + v.price,
				0
			),
		[constructorItems]
	);

	return (
		<BurgerConstructorUI
			price={price}
			orderRequest={orderRequest}
			constructorItems={constructorItems}
			orderModalData={orderModalData}
			onOrderClick={onOrderClick}
			closeOrderModal={closeOrderModal}
		/>
	);
};
