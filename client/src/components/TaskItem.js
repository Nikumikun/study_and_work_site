import React, {useContext,useState} from 'react';
import {Card} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom"
import {TASKPAGE_ROUTE} from "../utils/consts";

const TaskItem = ({task}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const data = user.setSelectedTask(task)
    const click = async () => {
        navigate(TASKPAGE_ROUTE + '/' + task.TaskId)
    }
    return (
        <div className="p-2 align-items-center">
            <Card style={{cursor:'pointer',borderColor:"orange",backgroundColor:"lightyellow"}}
            onClick={click}>
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
            </Card>
        </div>

    );
};

export default TaskItem;