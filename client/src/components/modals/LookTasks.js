import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../../index";
import {Button, Form, ListGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { fetchAllTask, completeTask} from '../../http/taskApi';



const LookTasks = observer(({show,onHide}) => {
const {task} = useContext(Context)
const [Id,setId] = useState('')

useEffect(()=>{
    fetchAllTask().then(data => task.setLookTasks(data))
},[])

const click = async (Id) => {
    try {
        if (Id == "" || Id == undefined) {
            alert("Заполните Id")
        } else {
            completeTask(Id)
            onHide()
        }
    } catch (e) {
        alert(e.response.data.message)
    }
}

return (
<Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
        <Modal.Title>
            Просмотр заданий
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
        <Button style={{color:"black"}} variant={"outline-warning"} onClick={() => click(Id)}>Проверить задание</Button>
        <Form.Control
            className="mt-3"
            placeholder="Введите Id"
            style={{borderColor:"orange"}}
            value={Id}
            onChange={e => setId(e.target.value)}>
        </Form.Control>
        <div>
            Id | Название | Цена | Статус проверки | Владелец | Автор | Статус выполнения | Категория | Предмет
        </div>
        <ListGroup>
            {
                task.looktasks.map(ts => 
									<ListGroup.Item key={ts.TaskId} ts={ts}>
									{ts.TaskId} | {ts.Name} | {ts.Price} | {ts.taskchecker != null? <nobr>{ts.taskchecker.Name}</nobr>: <nobr>Пусто</nobr>} | {ts.UserCreateTask != null? <nobr>{ts.UserCreateTask.UserName}</nobr>: <nobr>Пусто</nobr>} | {ts.UserTakeTask != null? <nobr>{ts.UserTakeTask.UserName}</nobr>: <nobr>Пусто</nobr>} | {ts.taskstatus.Name}| {ts.taskcategory.Name} | {ts.taskrole.Name}
								</ListGroup.Item>)
            }
        </ListGroup>
    </Form>
</Modal.Body>

</Modal>
);
});

export default LookTasks;