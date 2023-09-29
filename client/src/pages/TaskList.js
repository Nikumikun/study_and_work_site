import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import StatusBar from "../components/StatusBar";
import CategoriesBar from "../components/CategoriesBar";
import RoleBar from "../components/RoleBar";
import TasksList from "../components/TasksList";
import {observer} from "mobx-react-lite";
import AddTask from "../components/modals/AddTask";

const TaskList = observer(() => {
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
                        <RoleBar/>
                    </div>
                    <div className="mt-3">
                        <CategoriesBar/>
                    </div>
                </Col>
                <Col md={9}>
                    <StatusBar/>
                    <TasksList/>
                </Col>
            </Row>
        </Container>
    );
});

export default TaskList;