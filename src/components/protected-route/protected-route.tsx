
import React from 'react';
import { useSelector } from '../../services/store';
import userSlice from '../../services/slices/userSlice';
import {Navigate, useLocation} from "react-router-dom";
import { Preloader } from '@ui';
type ProtectedProps = {
    onlyUnAuth?: boolean;
    children: React.JSX.Element;
}
export const ProtectedRoute = ({onlyUnAuth = false, children}: ProtectedProps): React.JSX.Element => {
  const isAuthChecked = useSelector(userSlice.selectors.getIsAuthCheckedSelector);
  const user = useSelector(userSlice.selectors.getUserSelector);
  const location = useLocation();

    if (!isAuthChecked) {
        Preloader
    }

    if (!onlyUnAuth && !user) {
        // для авторизованных, но неавторизован
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (onlyUnAuth && user) {
        // для неавторизованных, но авторизован
        const { from } = location.state ?? { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    return children;
}
export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({children}: { children: React.JSX.Element}): React.JSX.Element => (
    <ProtectedRoute onlyUnAuth={true} children={children} />
);
