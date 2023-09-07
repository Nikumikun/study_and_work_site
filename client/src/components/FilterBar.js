import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const FilterBar = observer(() =>
{
    const {task} = useContext(Context)
    return (
            <ListGroup horizontal>
                {task.taskstatuses.map(status =>
                <ListGroup.Item
                    active={status.id === task.setSelectedTaskStatus.id}
                    onClick={() => task.selectedTaskStatus(status)}
                    key={status.id}>
                    {status.name}
                </ListGroup.Item>
                )}
            </ListGroup>
    );
});

export default FilterBar;