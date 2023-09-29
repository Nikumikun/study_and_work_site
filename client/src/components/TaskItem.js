import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom"
import {TASKPAGE_ROUTE} from "../utils/consts";

const TaskItem = ({task}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return (
        <div className="p-2 align-items-center">
            <Card style={{cursor:'pointer',borderColor:"orange",backgroundColor:"lightyellow"}}
            onClick={() => navigate(TASKPAGE_ROUTE + '/' + task.TaskId)}>
                <div>
                    {task.Name}
                </div>
                <div>
                    {task.Description}
                </div>
                {user.isAuth?
                        <div>{task.Price} руб.</div>
                        :
                    <div></div>
                }
                <div>
                    {task.decisionDecisionId}
                </div>
            </Card>
        </div>

    );
};

export default TaskItem;