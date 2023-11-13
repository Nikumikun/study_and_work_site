import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Button, Container, Form, ListGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { createTask } from '../../http/taskApi';


const AddTask = observer(({show,onHide}) => {
    const {user,task} = useContext(Context)
    const [Name,setName] = useState('')
    const [Description, setDescription] = useState('')
    const [Price,setPrice] = useState('')
    

    const click = async () => {
        try {
            let data;
            if (Name !== "" && Price !== "") {
                const CategoryTask = {... task.selectedtaskcategories}.TaskCategoryId
                const RoleTask = {... task.selectedtaskroles}.TaskRoleId
                const UserCreateTaskId = {... user.users}.UserId
                if (RoleTask !== undefined && CategoryTask !== undefined) {
                    let data;
                    data = createTask(Name,Price,Description,CategoryTask,RoleTask,UserCreateTaskId)
                    console.log(data)
                    onHide()
                } else {
                    alert("Вы забыли выбрать предмет и категорию задания")
                }
            } else
            {
                alert("Обязательно заполните пропущенные поля")
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Добавление нового задания
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Container>
                    <Form.Control
                        className="mt-3"
                        placeholder="Название задания"
                        value={Name}
                        style={{borderColor:"orange"}}
                        onChange={e => setName(e.target.value)}>
                    </Form.Control>

                    <Form.Control
                        className="mt-3"
                        placeholder="Подробное описание задания"
                        value={Description}
                        onChange={e => setDescription(e.target.value)}
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                    <div
                        className="mt-3">
                        Выбирете категорию задания
                    </div>
                    <ListGroup horizontal
                               className="mt-1">
                        {task.taskcategories.map(category =>
                            <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={category.TaskCategoryId === task.selectedtaskcategories.TaskCategoryId}
                                onClick={() => task.setSelectedTaskCategory(category)}
                                key={category.TaskCategoryId}>
                                {category.Name}
                            </ListGroup.Item>)}
                    </ListGroup>
                    <div
                        className="mt-3">
                        Выбирете предмет задания
                    </div>
                    <ListGroup horizontal
                               className="mt-1">
                        {task.taskroles.map(role =>
                            <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={role.TaskRoleId === task.selectedtaskroles.TaskRoleId}
                                onClick={() => task.setSelectedTaskRole(role)}
                                key={role.TaskRoleId}>
                                {role.Name}
                            </ListGroup.Item>)}
                    </ListGroup>
                    <Form.Control
                        className="mt-3"
                        placeholder="Стоимость задания"
                        style={{borderColor:"orange"}}
                        value={Price}
                        onChange={e => setPrice(e.target.value)}>
                    </Form.Control>
                </Container>
            </Form>
        </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={click}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddTask;