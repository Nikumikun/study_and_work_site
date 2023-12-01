import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { createTaskRole } from '../../http/taskApi';

const CreateTaskRole = ({show,onHide}) => {
    const [Name,setName] = useState('')
    const click = async () => {
        try {
            if (Name !== "" || Name !== undefined) {
                createTaskRole(Name);
                onHide()
                alert("Предмет задания была добавлена");
            } else {
                alert("Введите название для предмета")
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
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить направление задания
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="m-2"
                        placeholder={"Название предмета"} 
                        value={Name} 
                        onChange={e =>setName(e.target.value)}
                        type="text"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={click}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTaskRole;