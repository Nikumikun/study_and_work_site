import React, { useContext, useState, useEffect} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateTaskCategory from "../components/modals/CreateTaskCategory";
import CreateTaskRole from "../components/modals/CreateTaskRole";
import CreateTaskStatus from "../components/modals/CreateTaskStatus";
import CreateUserCategory from "../components/modals/CreateUserCategory";
import LookUsers from '../components/modals/LookUsers';
import LookTasks from '../components/modals/LookTasks';
import {observer} from "mobx-react-lite";
import { Context } from '..';
import {fetchUserRoles} from '../http/userAPI';

const Admin = observer(() => {
    useEffect(()=>{
        fetchUserRoles().then(data => user.setUserRoles(data))
    },[])
    const [UserCategoryVisible,setUserCategoryVisible] = useState(false)
    const [LookUsersVisible,setLookUsersVisible] = useState(false)
    const [TaskStatusVisible,setTaskStatusVisible] = useState(false)
    const [TaskRoleVisible,setTaskRoleVisible] = useState(false)
    const [TaskCategoryVisible,setTaskCategoryVisible] = useState(false)
    const [LookTasksVisible,setLookTasksVisible] = useState(false)
    const {user} = useContext(Context)
    return (
        <Container className="d-flex flex-column mt-5">
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setUserCategoryVisible(true)}>Добавить категорию пользователя</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setTaskRoleVisible(true)}>Добавить направление задания</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setTaskStatusVisible(true)}>Добавить статус задания</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setTaskCategoryVisible(true)}>Добавить тип задания</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setLookUsersVisible(true)}>Просмотр и бан пользователей</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setLookTasksVisible(true)}>Просмотр всех заданий</Button>
            <CreateTaskCategory show={TaskCategoryVisible} onHide={() => setTaskCategoryVisible(false)}/>
            <CreateTaskRole show={TaskRoleVisible} onHide={() => setTaskRoleVisible(false)}/>
            <CreateTaskStatus show={TaskStatusVisible} onHide={() => setTaskStatusVisible(false)}/>
            <CreateUserCategory show={UserCategoryVisible} onHide={() => setUserCategoryVisible(false)}/>
            <LookUsers show={LookUsersVisible} onHide={() => setLookUsersVisible(false)}></LookUsers>
            <LookTasks show={LookTasksVisible} onHide={() => setLookTasksVisible(false)}></LookTasks>
        </Container>
    );
});

export default Admin;