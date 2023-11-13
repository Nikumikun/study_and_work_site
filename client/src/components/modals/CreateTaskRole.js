import React, {useContext,useState,useEffect} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { Context } from '../..';
import { createTaskRole } from '../../http/taskApi';

const CreateTaskRole = ({show,onHide}) => {
    const {task} = useContext(Context)
    const [Name,setName] = useState('')
    const [Description,setDescription] = useState('')
    const click = async () => {
        try {
            let data;
            if (Name !== "" || Name !== undefined) {
                data = createTaskRole(Name,Description);
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
                    Добавить предмет задания
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
                    <Form.Control
                        className="m-2"
                        placeholder={"Описание предмета"} 
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

export default CreateTaskRole;