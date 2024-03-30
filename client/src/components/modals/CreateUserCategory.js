import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { createUserCategory } from '../../http/userAPI';

const CreateUserCategory = ({show,onHide}) => {
    const [Name,setName] = useState('')
    const click = async () => {
        try {
            if (Name !== "" || Name !== undefined) {
                createUserCategory(Name);
                onHide()
                alert("Специализация сотрудника была добавлена");
            } else {
                alert("Введите название для специализации")
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
                    Добавить специализацию сотрудника
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    className="m-2"
                        placeholder={"Имя специализации сотрудника"}
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

export default CreateUserCategory;