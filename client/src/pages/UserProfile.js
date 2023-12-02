import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom"
import {Card, ListGroup, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { fetchSelectedUserRoles, fetchSelectedFeedback,fetchSelectedUserCategory} from '../http/userAPI';
import {fetchTaskStatus, fetchTaskHistory} from '../http/taskApi';
import {TASKPAGE_ROUTE} from "../utils/consts";
import UpdateFeedback from "../components/modals/UpdateFeedback"

function getAge(date) {
    const birthday = new Date(date)
    const dateNow = new Date();
    const age = dateNow.getFullYear() - birthday.getFullYear()
    return `${age} год/лет`
}
function setStatusInList(status,UserIdCreateTask,UserIdTakeTask,context){
    if (UserIdCreateTask == context.users.UserId) {
        status = "Владелец"
        return status
    } if (UserIdTakeTask == context.users.UserId) {
        status = "Автор"
        return status
    } else {
        status = "Не задано"
        return status
    }
}
const UserProfile = observer(() => {
    const {user,task} = useContext(Context)
    const navigate = useNavigate()
    const CreateOrTakeTask = ""
    useEffect(()=>{
        if({... user.users}.usercategoryUserCategoryId !== null){
            fetchSelectedUserCategory({... user.users}.usercategoryUserCategoryId).then(data => user.setselectedusercategory(data))
        }
        fetchSelectedUserRoles({... user.users}.userroleUserRoleId).then(data => user.setSelectedUserRole(data))
        fetchSelectedFeedback({... user.users}.feedbackFeedbackId).then(data => user.setSelectedFeedback(data))
        fetchTaskHistory().then(data => task.setHistory(data))
        fetchTaskStatus().then(data => task.setTaskStatus(data))
    },[])
    const [UpdateFeedbackVisible,setUpdateFeedbackVisible] = useState(false)
    let roleName = { ... user.selecteduserrole}.Name
    let feedback = { ... user.selectedfeedback}
    let category = {... user.selectedusercategory}.Name

    const click = async (Id) => {
        localStorage.setItem('TaskId',Id)
        navigate(TASKPAGE_ROUTE + '/' + Id)
    }
    return (
        <Card
            className="m-3" style={{backgroundColor:"lightyellow",borderColor:"orange"}}>
            <Card.Body>
                <Card.Title>
                    <h2>Профиль пользователя</h2>
                </Card.Title>
                <Card.Text>
                    <h4>ФИО: {user.users.UserName} </h4>
                    <h4>Дата рождения: {user.users.Birthday} ({getAge(user.users.Birthday)})</h4>
                    <h4>Email: {user.users.Email} </h4>
                    <h4>{user.users.userroleUserRoleId !== 2 ?
                    <div>Ваша роль: {roleName} </div>
                    :
                    <div></div>}</h4>
                    {user.users.userroleUserRoleId !== 2?
                    <h4>Ваша специализируемая категория: {category}</h4>
                    :
                    <div></div>
                    }
                    <Button className="p-3" variant={"outline-warning"} style={{color:"black"}} onClick={()=> setUpdateFeedbackVisible(true)} 
                    >Изменить ссылки</Button>
                    <UpdateFeedback show={UpdateFeedbackVisible} onHide={()=>setUpdateFeedbackVisible(false)}/>
                    <h4>Связь:</h4>
                    <ListGroup>
                        <ListGroup.Item >{"VK: "}{feedback.VK? 
                        <a href={feedback.VK}>{""+feedback.VK}</a>
                        :
                        <div>Отсутствует</div>}</ListGroup.Item>
                        <ListGroup.Item >{"WhatsApp: "}{feedback.WhatsApp?
                        <div>{""+feedback.WhatsApp}</div>
                        :
                        <div>Отсутствует</div>}</ListGroup.Item>
                        <ListGroup.Item >{"Discord: "}{feedback.Discord? 
                        <div>{"@"+feedback.Discord}</div>
                        :
                        <div>Отсутствует</div>}</ListGroup.Item>
                        <ListGroup.Item >{"OK: "}{feedback.OK?
                        <a href={feedback.OK}>{""+feedback.OK}</a>
                        :
                        <div>Отсутствует</div>}</ListGroup.Item> 
                        <ListGroup.Item > {"Telegram: "}{feedback.Telegram? 
                        <div>{"@"+feedback.Telegram}</div>
                        :
                        <div>Отсутствует</div>}</ListGroup.Item>
                    </ListGroup>
                    <h4>История заданий:</h4> 
                    <ListGroup>
                        <div>Название | Цена | Статус | Ваша роль в задании</div>
                        {
                            task.historytask.map(history =>
                            <div>
                            { history.UserIdCreateTask == user.users.UserId || history.UserIdTakeTask == user.users.UserId ?
                                <ListGroup.Item key={history.TaskId} history={history}>
                                    {history.Name} {history.Price} руб. {{... task.taskstatuses[history.taskstatusTaskStatusId - 1]}.Name} {setStatusInList(CreateOrTakeTask,history.UserIdCreateTask,history.UserIdTakeTask,user)} <Button variant="warning"
                                     onClick={(()=>(click(history.TaskId)))}>Перейти</Button>
                                </ListGroup.Item>
                                :
                                <div></div>
                            }    
                            </div>      
                        )}
                    </ListGroup> 
                    <h4>Архив выполненных заданий:</h4> 
                    <ListGroup>
                        <div>Название | Цена | Статус | Ваша роль в задании</div>
                        {
                            task.historytask.map(history =>
                            <div>
                                { history.taskstatus.Name == "Выполнено" ?
                                    <div>
                                { history.UserIdCreateTask == user.users.UserId || history.UserIdTakeTask == user.users.UserId ?
                                <ListGroup.Item key={history.TaskId} history={history}>
                                    {history.Name} {history.Price} руб. {{... task.taskstatuses[history.taskstatusTaskStatusId - 1]}.Name} {setStatusInList(CreateOrTakeTask,history.UserIdCreateTask,history.UserIdTakeTask,user)} <Button variant="warning"
                                     onClick={(()=>(click(history.TaskId)))}>Перейти</Button>
                                </ListGroup.Item>
                                :
                                <div></div>} 
                                </div> 
                                    :
                                    <div></div>
                                }
                            </div>    
                        )}
                    </ListGroup>
                </Card.Text>
            </Card.Body>
        </Card>
    );
});

export default UserProfile;