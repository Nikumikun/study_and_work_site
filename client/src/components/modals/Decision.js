import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { addDecision } from '../../http/taskApi';

const Decision = ({show,onHide,Task}) => {
    const [Description,setDescription] = useState('')
    const [Address,setAddress] = useState('')
    const click = async () => {
        try {
            if (Description !== "" || Description !== undefined) {
                if (Address !== "" || Address !== undefined) {
                    addDecision(Task,Description,Address)
                    onHide()
                    alert("Решение прикреплено к заданию");
                } else {
                    alert("Введите ссылку на файл с решением")
                }
            } else {
                alert("Введите описание для решения")
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
                    Добавление решения задачи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="m-2"
                        placeholder={"Описание решения"} 
                        value={Description} 
                        onChange={e =>setDescription(e.target.value)}
                        type="text"
                    />
                    <Form.Control
                        className="m-2"
                        placeholder={"Ссылка на файл с решением"} 
                        value={Address} 
                        onChange={e =>setAddress(e.target.value)}
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

export default Decision;