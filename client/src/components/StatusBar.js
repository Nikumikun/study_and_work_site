import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const StatusBar = observer(() =>
{
    const {task} = useContext(Context)
    return (
            <ListGroup horizontal>
                {task.taskstatuses.map(taskstatus =>
                <ListGroup.Item
                    style={{cursor: "pointer",borderColor:"orange"}}
                    active={taskstatus.TaskStatusId === task.selectedtaskstatus.TaskStatusId}
                    onClick={() => task.setselectedtaskstatus(taskstatus)}
                    key={taskstatus.TaskStatusId}>
                    {taskstatus.Name}
                </ListGroup.Item>
                )}
            </ListGroup>
    );

});

export default StatusBar;