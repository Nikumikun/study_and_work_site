import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import UserTaskList from "./context/UserTaskList";
import TaskTaskList from "./context/TaskTaskList";

export const Context = createContext(null)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <Context.Provider value={{
        user: new UserTaskList(),
        task: new TaskTaskList()
    }}>
        <App />
    </Context.Provider>
);
