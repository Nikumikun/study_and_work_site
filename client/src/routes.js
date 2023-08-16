import Admin from "./pages/Admin";
import UserProfile from "./pages/UserProfile";
import TaskPage from "./pages/TaskPage";
import Decision from "./pages/Decision";
import Auth from "./pages/Auth";
import TaskList from "./pages/TaskList";
import {
    ADMIN_ROUTE,
    DECISION_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE, TASKLIST_ROUTE,
    TASKPAGE_ROUTE,
    USERPROFILE_ROUTE
} from "./utils/consts";
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin />
    },
    {
        path: USERPROFILE_ROUTE + '/:UserId',
        Component: <UserProfile />
    },
    {
        path: TASKPAGE_ROUTE + '/:TaskId',
        Component: <TaskPage />
    },
    {
        path: DECISION_ROUTE + '/:DecisionId',
        Component: <Decision />
    },
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
    {
        path: TASKLIST_ROUTE,
        Component: <TaskList />
    },
]