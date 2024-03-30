import React, {useState,useContext, useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import TasksList from "../components/TasksList";
import {observer} from "mobx-react-lite";
import AddTask from "../components/modals/AddTask";
import { Context } from '..';
import {fetchUserRoles} from '../http/userAPI';
import { fetchTaskCategory, fetchTaskStatus, fetchTasks, fetchTaskRole } from '../http/taskApi';
import PageCounter from '../components/PageCounter';
import Footer from '../components/Footer';

const TaskList = observer(() => {
    const {task,user} = useContext(Context)
    useEffect(()=>{
        fetchTasks(null,null,1,4).then(data => {
            task.setTasks(data.rows)
            task.setTotalCount(data.count)})
        fetchTaskStatus().then(data => task.setTaskStatus(data))
        fetchTaskCategory().then(data => task.setTaskCategories(data))
        fetchTaskRole().then(data => task.setTaskRoles(data))
        fetchUserRoles().then(data => user.setUserRoles(data))
    },[])
    useEffect(() => {
        fetchTasks(task.selectedtaskstatus.TaskStatusId, task.selectedtaskcategories.TaskCategoryId, task.selectedtaskroles.TaskRoleId, task.page, 4).then(data => {
            task.setTasks(data.rows)
            task.setTotalCount(data.count)
        })
    }, [task.page, task.selectedtaskstatus, task.selectedtaskcategories,task.selectedtaskroles, ])
    const [CreateTaskVisible,setCreateTaskVisible] = useState(false)
    return (
        <div>
<Container fluid="md">
            <Row className="mt-3">
                <Col>
                    <div style={{fontSize:"40px", textAlign:"center"}}>
                        Список заданий
                    </div>
                    { user.isAuth ? 
                    <div className="d-grid align-items-center">
                        <Button onClick={() => setCreateTaskVisible(true)} type="primary" variant="warning">Создать задание</Button>
                        <AddTask show={CreateTaskVisible} onHide={()=>setCreateTaskVisible(false)}/>
                    </div>
                    :
                    <div></div>
                    }
                    <TasksList/>
                    <PageCounter />
                </Col>
                 
            </Row>
            
        </Container>
        <Footer/>
        </div>
    );
});

export default TaskList;