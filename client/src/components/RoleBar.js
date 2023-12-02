import React, {useContext} from 'react';
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const RoleBar = observer(() => {
    const {task} = useContext(Context)
    return (
        <ListGroup>
            {task.taskroles.map(taskrole =>
                <ListGroup.Item
                    style={{cursor: "pointer",borderColor:"orange"}}
                    active={taskrole.TaskRoleId == task.selectedtaskroles.TaskRoleId}
                    onClick={() => task.setSelectedTaskRole(taskrole)}
                    key={taskrole.TaskRoleId}>
                    {taskrole.Name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default RoleBar;