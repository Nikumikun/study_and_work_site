import React from "react";
import Admin from "./pages/Admin";
import UserProfile from "./pages/UserProfile";
import TaskPage from "./pages/TaskPage";
import Auth from "./pages/Auth";
import TaskList from "./pages/TaskList";
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    TASKLIST_ROUTE,
    TASKPAGE_ROUTE,
    USERPROFILE_ROUTE,
    WELCOME_ROUTE
} from "./utils/consts";
import Welcome from "./pages/Welcome";
export const AdminRoutes = [
    {
      path: ADMIN_ROUTE,
      Component: <Admin />
    },
  ]
export const publicRoutes = [
    {
        path: USERPROFILE_ROUTE,
        Component: <UserProfile />
    },
    
    {
        path: WELCOME_ROUTE,
        Component: <Welcome/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
    {
        path: TASKPAGE_ROUTE + '/:TaskId',
        Component: <TaskPage />
    },
    {
        path: TASKLIST_ROUTE,
        Component: <TaskList />
    },
]