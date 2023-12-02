import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Button, Container, Form, ListGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { createTask, updateTask } from '../../http/taskApi';

const AddTask = observer(({show,onHide}) => {
    const {user,task} = useContext(Context)
    const updatetask = {... user.updatetask}
    const [Name,setName] = useState(updatetask.Name ? updatetask.Name : '')
    const [Description, setDescription] = useState(updatetask.Description ? updatetask.Description : '')
    const [Address,setAddress] = useState(updatetask.Address ? updatetask.Address : '')
    const [Price,setPrice] = useState(updatetask.Price ? updatetask.Price : '')
    const CategoryTask = {... task.selectedtaskcategories}.TaskCategoryId
    const RoleTask = {... task.selectedtaskroles}.TaskRoleId
    const UserIdCreateTask = {... user.users}.UserId
    const StartPrice = {... task.selectedtaskcategories}.StartPrice
    
    const click = async (updatetask) => {
        try {
            let data;
            if (Object.keys(updatetask).length == 0) {
                if (Name !== "" && Price !== "") {              
                    if (RoleTask !== undefined && CategoryTask !== undefined) {
                        if (Price >= StartPrice) {
                        if (!Address) {
                            alert("Не прикрепили ссылку на шаблон/пример выполнения задания")
                            return;
                        } else {
                            data = createTask(Name,Address,Price,Description,CategoryTask,RoleTask,UserIdCreateTask) 
                            onHide()                       
                        }
                        } else {
                            alert("Такая цена не подходит")
                        }
                        
                    } else {
                        alert("Вы забыли выбрать направление и категорию задания")
                    }
                } else
                {
                    alert("Обязательно заполните пропущенные поля")
                }
                
            } else {
                if (Name !== "" && Price !== "") {              
                    if (RoleTask !== undefined && CategoryTask !== undefined) {
                        if (Price >= StartPrice) {
                        if (!Address) {
                            alert("Не прикрепили ссылку на шаблон/пример выполнения задания")
                            return;
                        } else {
                            data = updateTask(updatetask.TaskId,Name,Address,Price,Description,CategoryTask,RoleTask) 
                            onHide()                       
                        }
                        } else {
                            alert("Такая цена не подходит")
                        }
                        
                    } else {
                        alert("Вы забыли выбрать направление и категорию задания")
                    }
                } else
                {
                    alert("Обязательно заполните пропущенные поля")
                }
                
            }         
            
        } catch (error) {
            console.log(error.response.data.message)
        }
    }  
    return (
        <div>
            {
                Object.keys(updatetask).length == 0 ?
                <div>
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
                        value={Name}
                        style={{borderColor:"orange"}}
                        onChange={e => setName(e.target.value)}>
                    </Form.Control>

                    <Form.Control
                        className="mt-3"
                        placeholder="Подробное описание задания"
                        value={Description}
                        onChange={e => setDescription(e.target.value)}
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                    <div
                        className="mt-3">
                        Выберете категорию задания
                    </div>
                    <ListGroup horizontal
                               className="mt-1">
                        {task.taskcategories.map(category =>
                            <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={category.TaskCategoryId == task.selectedtaskcategories.TaskCategoryId}
                                onClick={() => task.setSelectedTaskCategory(category)}
                                key={category.TaskCategoryId}>
                                {category.Name}
                            </ListGroup.Item>)}
                    </ListGroup>
                    <div
                        className="mt-3">
                        Выберете направление задания
                    </div>
                    <ListGroup vertical
                               className="mt-1">
                        {task.taskroles.map(role =>
                            <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={role.TaskRoleId == task.selectedtaskroles.TaskRoleId}
                                onClick={() => task.setSelectedTaskRole(role)}
                                key={role.TaskRoleId}>
                                {role.Name}
                            </ListGroup.Item>)}
                    </ListGroup>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ссылку на гугл/яндекс диск с файлом"
                        value={Address}
                        onChange={e => setAddress(e.target.value)}
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                    <Form.Control
                        className="mt-3"
                        placeholder={StartPrice}
                        style={{borderColor:"orange"}}
                        value={Price}
                        onChange={e => setPrice(e.target.value)}>
                    </Form.Control>
                </Container>
            </Form>
        </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={() => click(updatetask)}>Добавить</Button>
            </Modal.Footer>
        </Modal> 
                </div>
                :
                <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered>
            
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Обновление задания
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Container>
                    <Form.Control
                        className="mt-3"
                        placeholder="Название задания"
                        value={Name}
                        style={{borderColor:"orange"}}
                        onChange={e => setName(e.target.value)}>
                    </Form.Control>

                    <Form.Control
                        className="mt-3"
                        placeholder="Подробное описание задания"
                        value={Description}
                        onChange={e => setDescription(e.target.value)}
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                    <div
                        className="mt-3">
                        Выберете категорию задания
                    </div>
                    <ListGroup horizontal
                               className="mt-1">
                        {task.taskcategories.map(category =>
                            <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={category.TaskCategoryId == task.selectedtaskcategories.TaskCategoryId}
                                onClick={() => task.setSelectedTaskCategory(category)}
                                key={category.TaskCategoryId}>
                                {category.Name}
                            </ListGroup.Item>)}
                    </ListGroup>
                    <div
                        className="mt-3">
                        Выберете предмет задания
                    </div>
                    <ListGroup vertical
                               className="mt-1">
                        {task.taskroles.map(role =>
                            <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={role.TaskRoleId == task.selectedtaskroles.TaskRoleId}
                                onClick={() => task.setSelectedTaskRole(role)}
                                key={role.TaskRoleId}>
                                {role.Name}
                            </ListGroup.Item>)}
                    </ListGroup>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ссылку на гугл/яндекс диск с файлом"
                        value={Address}
                        onChange={e => setAddress(e.target.value)}
                        style={{borderColor:"orange"}}>
                    </Form.Control>
                    <Form.Control
                        className="mt-3"
                        placeholder={StartPrice}
                        style={{borderColor:"orange"}}
                        value={Price}
                        onChange={e => setPrice(e.target.value)}>
                    </Form.Control>
                </Container>
            </Form>
        </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={() => click(updatetask)}>Изменить</Button>
            </Modal.Footer>
        </Modal>
        }
        </div>
        
    );
});

export default AddTask;