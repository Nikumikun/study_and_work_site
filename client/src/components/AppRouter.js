import React, {useContext} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom'
import {authRoutes, publicRoutes, AdminRoutes} from "../routes";
import {Context} from "../index";
const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.users.userroleUserRoleId == 1 && 
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