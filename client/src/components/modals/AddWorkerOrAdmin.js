import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, FormText, ListGroup, Modal, Tab, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const AddWorkerOrAdmin = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавление сотрудника/админа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container>
                        <Dropdown>
                            <Dropdown.Toggle variant="warning">{user.selecteduser.UserName || "Выберите пользователя"}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.users.map(user1 =>
                                    <Dropdown.Item
                                        onClick={() => user.setSelectedUser(user1)}
                                        key={user1.UserId}
                                    >
                                        {user1.UserName}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div>
                        Выбирете роль для пользователя
                        </div>
                            <ListGroup horizontal>
                                {user.userroles.map(role =>
                                <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={role.UserRoleId === user.selecteduserrole.UserRoleId}
                                onClick={() => user.setSelectedUserRole(role)}
                                key={role.UserRoleId}>
                                    {role.Name}
                                </ListGroup.Item>
                                )}
                                </ListGroup>   
                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={onHide}>Закрыть</Button>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddWorkerOrAdmin;