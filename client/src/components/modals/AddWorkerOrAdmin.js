import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, ListGroup, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { updateUserRole } from '../../http/userAPI';

const AddWorkerOrAdmin = observer(({show, onHide}) => {
    const {user} = useContext(Context) 
    const [FullName,setFullName] = useState('')
    const selectedUserRoleId = {}
    const click = async () => {
        try {
            let data;
            if (FullName === "" || FullName === undefined) {
                alert("Сначала введите полное имя");
            } else {
                if (selectedUserRoleId === undefined || selectedUserRoleId === null) {
                    alert("Выбирете роль для сотрудника")
                } else {
                    data = updateUserRole(FullName,selectedUserRoleId)
                    onHide()
                    alert("Роль пользователя была изменена")  
                }
            }
        } catch (e) {
            alert(e.response.data.message)
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
                    Добавление сотрудника/админа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container>
                        <Form.Control
                        placeholder="Введите полное имя сотрудника (без ошибок)"
                        value={FullName}
                        type="text"
                        onChange={e => setFullName(e.target.value)}/>
                        <div className="mt-3">
                        Выбирете роль для пользователя
                        </div>
                            <ListGroup horizontal>
                                {user.userroles.map(role =>
                                <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={role.UserRoleId === user.selecteduserrole.UserRoleId}
                                onClick={() => user.setSelectedUserRole(role)}
                                key={role.UserRoleId}
                                value={selectedUserRoleId}>
                                {role.Name}
                                </ListGroup.Item>
                                )}
                            </ListGroup>   
                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={click}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddWorkerOrAdmin;