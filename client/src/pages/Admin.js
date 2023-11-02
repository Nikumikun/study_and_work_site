import React, { useContext, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateTaskCategory from "../components/modals/CreateTaskCategory";
import CreateTaskRole from "../components/modals/CreateTaskRole";
import CreateTaskStatus from "../components/modals/CreateTaskStatus";
import CreateUserCategory from "../components/modals/CreateUserCategory";
import AddWorkerOrAdmin from "../components/modals/AddWorkerOrAdmin";
import { Context } from '..';

const Admin = () => {
    const [UserCategoryVisible,setUserCategoryVisible] = useState(false)
    const [TaskStatusVisible,setTaskStatusVisible] = useState(false)
    const [TaskRoleVisible,setTaskRoleVisible] = useState(false)
    const [TaskCategoryVisible,setTaskCategoryVisible] = useState(false)
    const [WorkerOrAdminVisible,setWorkerOrAdminVisible] = useState(false)
    const {user} = useContext(Context)
    console.log(user.isAuth)
    console.log(user.userroles)
    return (
        <Container className="d-flex flex-column mt-5">
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setUserCategoryVisible(true)}>Добавить категорию пользователя</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setTaskRoleVisible(true)}>Добавить роль задания</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setTaskStatusVisible(true)}>Добавить статус задания</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setTaskCategoryVisible(true)}>Добавить категорию задания</Button>
            <Button className="mt-3" variant={"outline-warning"} style={{color:"black"}} onClick={() => setWorkerOrAdminVisible(true)}>Добавить сотрудника/админа</Button>
            <CreateTaskCategory show={TaskCategoryVisible} onHide={() => setTaskCategoryVisible(false)}/>
            <CreateTaskRole show={TaskRoleVisible} onHide={() => setTaskRoleVisible(false)}/>
            <CreateTaskStatus show={TaskStatusVisible} onHide={() => setTaskStatusVisible(false)}/>
            <CreateUserCategory show={UserCategoryVisible} onHide={() => setUserCategoryVisible(false)}/>
            <AddWorkerOrAdmin show={WorkerOrAdminVisible} onHide={() => setWorkerOrAdminVisible(false)}/>
        </Container>
    );
};

export default Admin;