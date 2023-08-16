import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import UserTaskList from "./task-list/UserTaskList";
import TaskTaskList from "./task-list/TaskTaskList";
export const Context = createContext(null)

const root = createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserTaskList(),
        task: new TaskTaskList()
    }}>
        <App />
    </Context.Provider>
);