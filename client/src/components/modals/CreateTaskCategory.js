import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { createTaskCategory } from '../../http/taskApi';

const CreateTaskCategory = ({show, onHide}) => {
    const [Name,setName] = useState('')
    const [StartPrice,setStartPrice] = useState('')

    const click = async () => {
        try {
            if (Name !== "" || Name !== undefined) {
                createTaskCategory(Name,StartPrice)
                onHide()
                alert("Категория задания был добавлен")
            } else {
                alert("Введите название для категории")
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
                    Добавить категорию задания
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="m-2"
                        placeholder={"Название категории"} 
                        value={Name} 
                        onChange={e =>setName(e.target.value)}
                        type="text"
                    />
                    <Form.Control
                        className="m-2"
                        placeholder={"Описание категории"} 
                        value={StartPrice} 
                        onChange={e =>setStartPrice(e.target.value)}
                        type="real"
                />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={click}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTaskCategory;