import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import feedSlice from '../../services/slices/feedSlice';
import { getFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
	/** TODO: взять переменную из стора */
	// const orders: TOrder[] = [];
	const orders: TOrder[] = useSelector(
		feedSlice.selectors.getFeedOrdersSelector
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFeeds());
	}, [dispatch]);

	if (!orders.length) {
		return <Preloader />;
	}
	return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
