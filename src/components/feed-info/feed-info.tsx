import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeeds } from '../../services/slices/feedSlice';
import feedSlice from '../../services/slices/feedSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
	orders
		.filter((item) => item.status === status)
		.map((item) => item.number)
		.slice(0, 20);

export const FeedInfo: FC = () => {
	/** TODO: взять переменные из стора */
	const orders: TOrder[] = useSelector(
		feedSlice.selectors.getFeedOrdersSelector
	);
	const feed = useSelector(feedSlice.selectors.getFeedSelector);
	// const orders: TOrder[] = [];
	// const feed = '';

	const readyOrders = getOrders(orders, 'done');

	const pendingOrders = getOrders(orders, 'pending');

	return (
		<FeedInfoUI
			readyOrders={readyOrders}
			pendingOrders={pendingOrders}
			feed={feed}
		/>
	);
};
