import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Form, ListGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const AddTask = observer(({show,onHide,message}) => {
    const {task} = useContext(Context)
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
                        style={{borderColor:"orange"}}>
                    </Form.Control>

                    <Form.Control
                        className="mt-3"
                        placeholder="Подробное описание задания"
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                    <div
                        className="mt-3">
                        Выбирете тему задания
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
                        Выбирете категорию задания
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
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                </Container>
            </Form>
        </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddTask;