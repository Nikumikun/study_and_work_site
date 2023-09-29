import React from 'react';
import {Card} from "react-bootstrap";

const CategoryItem = ({category}) => {
    return (
        <Card style={{width:200,height:20,borderColor:"orange"}}>
            <div>
                {category.Name}
            </div>
        </Card>
    );
};

export default CategoryItem;