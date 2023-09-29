import React, {useContext} from 'react';
import {Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import CategoryItem from "./CategoryItem";
import {Context} from "../index";

const TaskTags = ({task}) => {
    const {tasks} = useContext(Context)
    return (
        <Row className="d-flex">
            {tasks.taskcategories.map(category =>
                <CategoryItem key={task.taskcategoryTaskCategoryId} category={category}/>
            )}
        </Row>
    );
};

export default TaskTags;