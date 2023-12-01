import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { createTaskStatus } from '../../http/taskApi';

const CreateTaskStatus = ({show,onHide}) => {
    const [Name,setName] = useState('')

    const click = async () => {
        try {
            if (Name !== "" || Name !== undefined) {
                createTaskStatus(Name);
                onHide()
                alert("Статус задания был добавлен");
            } else {
                alert("Введите имя для статуса")
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
                    Добавить статус задания
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="m-2"
                        placeholder={"Имя статуса"} 
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

export default CreateTaskStatus;