import React, {useContext} from 'react';
import {Card, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const TaskPage = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const task = user.selectedTask
    console.log(task)
    return (
            <Card className="m-4" style={{height:window.innerHeight - 60 ,backgroundColor:"lightyellow",borderColor:"orange"}}>
                <Row className="m-2">
                    <div>

                        {task.taskcategoryTaskCategoryId}
                        {task.taskroleTaskRoleId}
                        {task.taskstatusTaskStatusId}
                    </div>
                    <div>
                        {task.UserIdCreateTask}
                        {task.UserIdTakeTask}
                    </div>
                </Row>
                <Row className="m-3">
                    <h1>{task.Name}</h1>
                </Row>
                <Row className="m-2">
                    {task.Description}
                </Row>
                <Row className="m-2 align-self-end">
                    {user.isAuth?
                        <h3>{task.Price} руб.</h3>
                        :
                        <div></div>
                    }

                </Row>
                <Row className="m-2">
                    {task.decisionDecisionId}
                </Row>
            </Card>
    );
});

export default TaskPage;