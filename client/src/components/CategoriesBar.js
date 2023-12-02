import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const CategoriesBar = observer(() => {
    const {task} = useContext(Context)
    return (
        <ListGroup>
            {task.taskcategories.map(taskcategory =>
                <ListGroup.Item
                    style={{cursor: "pointer",borderColor:"orange"}}
                    active={taskcategory.TaskCategoryId == task.selectedtaskcategories.TaskCategoryId}
                    onClick={() => task.setSelectedTaskCategory(taskcategory)}
                    key={taskcategory.TaskCategoryId}>
                    {taskcategory.Name}
                </ListGroup.Item>
            )}

        </ListGroup>
    );
});

export default CategoriesBar;