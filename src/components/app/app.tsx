import { ConstructorPage } from '@pages';
import { Feed } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { Modal } from '@components';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import { BurgerIngredients, BurgerConstructor } from '@components';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect, useState } from 'react';
import {
	Route,
	Routes,
	Link,
	useLocation,
	useNavigate
} from 'react-router-dom';
import { getIngredientsApi } from '@api';
import { fetchIngredients } from '../../services/slices/ingredientSlice';
import { RootState } from '../../services/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getUser } from '../../services/slices/userSlice';
import { TIngredient } from '@utils-types';
import userSlice from 'src/services/slices/userSlice';
import { ProtectedRoute, OnlyUnAuth, OnlyAuth } from '../protected-route';
// import { checkUserAuth } from '../../services/actions';
// import { OnlyAuth, OnlyUnAuth } from '../protected-route';


function App() {
	const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(getUser());
		// dispatch(checkUserAuth());
	}, [dispatch]);

	const location = useLocation();
	const backgroundLocation = location.state && location.state.background;

	const navigate = useNavigate();
	const handleCloseModal = () => navigate(-1);

	return (
		<div className={styles.app}>
			<AppHeader />
			<Routes location={backgroundLocation || location}>
				<Route path='/' element={<ConstructorPage />} />
				<Route path='/feed' element={<Feed />} />
				<Route
					path='/login'
					element={
						<OnlyUnAuth>
							<Login />
						</OnlyUnAuth>
					}
				/>
				<Route
					path='/register'
					element={
						<OnlyUnAuth>
							<Register />
						</OnlyUnAuth>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<OnlyUnAuth>
							<ForgotPassword />
						</OnlyUnAuth>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<OnlyUnAuth>
							<ResetPassword />
						</OnlyUnAuth>
					}
				/>
				<Route
					path='/profile'
					element={
						<OnlyAuth>
							<Profile />
						</OnlyAuth>
					}
				/>
				<Route
					path='/profile/orders'
					element={
						<OnlyAuth>
							<ProfileOrders />
						</OnlyAuth>
					}
				/>
				<Route path='*' element={<NotFound404 />} />
				<Route path='/feed/:number' element={<OrderInfo />} />
				<Route path='/ingredients/:id' element={<IngredientDetails />} />
				<Route path='/profile/orders/:number' element={<OrderInfo />} />
			</Routes>
			{backgroundLocation && (
				<Routes>
					<Route
						path='/feed/:number'
						element={
							<Modal title='Информация о заказе' onClose={handleCloseModal}>
								<OrderInfo />
							</Modal>
						}
					/>
					<Route
						path='/ingredients/:id'
						element={
							<Modal title='Детали ингредиента' onClose={handleCloseModal}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:number'
						element={
							<OnlyAuth>
							<Modal title='Заказ' onClose={handleCloseModal}>
								<OrderInfo />
							</Modal>
							</OnlyAuth>
						}
					/>
				</Routes>
			)}
		</div>
	);
}
export default App;
