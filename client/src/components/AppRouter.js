import React, {useContext} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom'
import {authRoutes, publicRoutes, AdminRoutes} from "../routes";
import {Context} from "../index";
const AppRouter = () => {
    const {user,task} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={Component} exact />
            ))}
            {user.users.userroleUserRoleId === 2 && 
            AdminRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} exact />
            ))}
            {publicRoutes.map(({path, Component}) => (
                <Route key={path} path={path} element={Component} exact />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;