import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import TaskItem from "./TaskItem";

const TasksList = observer(() => {
    const {task} = useContext(Context)
    return (
        <Row className="d-flex">
            {task.tasks.map(task =>
                <TaskItem key={task.TaskId} task={task}/>
            )}
        </Row>
    );
});

export default TasksList;