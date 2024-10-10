import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import ordersSlice from '../../services/slices/ordersSlice';
import { getOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
	/** TODO: взять переменную из стора */
	// const orders: TOrder[] = [];
	const orders: TOrder[] = useSelector(ordersSlice.selectors.getOrdersSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	return <ProfileOrdersUI orders={orders} />;
};
