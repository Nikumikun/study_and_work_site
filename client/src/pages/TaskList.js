import React, {useState,useContext, useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import StatusBar from "../components/StatusBar";
import CategoriesBar from "../components/CategoriesBar";
import RoleBar from "../components/RoleBar";
import TasksList from "../components/TasksList";
import {observer} from "mobx-react-lite";
import AddTask from "../components/modals/AddTask";
import { Context } from '..';
import {fetchUserRoles} from '../http/userAPI';
import { fetchTaskCategory, fetchTaskStatus, fetchTasks, fetchTaskRole } from '../http/taskApi';

const TaskList = observer(() => {
    const {task,user} = useContext(Context)
    useEffect(()=>{
        fetchTasks().then(data => task.setTasks(data.rows))
        fetchTaskStatus().then(data => task.setTaskStatus(data))
        fetchTaskCategory().then(data => task.setTaskCategories(data))
        fetchTaskRole().then(data => task.setTaskRoles(data))
        fetchUserRoles().then(data => user.setUserRoles(data))
    },[])
    const [CreateTaskVisible,setCreateTaskVisible] = useState(false)
    return (
        <Container fluid="md">
            <Row className="mt-3">
                <Col md={3}>
                    <div className="d-grid align-items-center">
                        <Button onClick={() => setCreateTaskVisible(true)} type="primary" variant="warning">Создать задание</Button>
                        <AddTask show={CreateTaskVisible} onHide={()=>setCreateTaskVisible(false)}/>
                    </div>
                    <div className="mt-3">
                        Предмет заданий
                        <RoleBar/>
                    </div>
                    <div className="mt-3">
                        Категория заданий
                        <CategoriesBar/>
                    </div>
                </Col>
                <Col md={9}>
                    <div>
                        Статус заданий
                        <StatusBar/>   
                    </div>
                    <TasksList/>
                </Col>
            </Row>
        </Container>
    );
});

export default TaskList;