import React, {useContext,useEffect,useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { createTaskStatus } from '../../http/taskApi';
import {Context} from '../..';

const CreateTaskStatus = ({show,onHide}) => {
    const {task} = useContext(Context)
    const [Name,setName] = useState('')
    const [Description,setDescription] = useState('')

    const click = async () => {
        try {
            let data;
            if (Name !== "" || Name !== undefined) {
                data = createTaskStatus(Name,Description);
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
                    <Form.Control
                        className="m-2"
                        placeholder={"Описание статуса"} 
                        value={Description} 
                        onChange={e =>setDescription(e.target.value)}
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