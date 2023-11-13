import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Card, ListGroup, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { fetchSelectedUserRoles, fetchSelectedFeedback} from '../http/userAPI';
import { fetchTaskHistory} from '../http/taskApi';
import UpdateFeedback from "../components/modals/UpdateFeedback"

function getAge(date) {
    const birthday = new Date(date)
    const dateNow = new Date();
    const age = dateNow.getFullYear() - birthday.getFullYear()
    return `${age} год/лет`
}
function lookCategory(Category) {
    switch (Category) {
        default: return "Нету"
    }
}
const UserProfile = observer(() => {
    const {user,task} = useContext(Context)
    useEffect(()=>{
        fetchSelectedUserRoles(user.users.userroleUserRoleId).then(data => user.setSelectedUserRole(data))
        fetchSelectedFeedback(user.users.feedbackFeedbackId).then(data => user.setSelectedFeedback(data))
        fetchTaskHistory(user.users.UserId).then(data => task.setHistory(data))
    },[])
    const [UpdateFeedbackVisible,setUpdateFeedbackVisible] = useState(false)
    let roleName = { ... user.selecteduserrole}.Name
    let feedback = { ... user.selectedfeedback}
    console.log(user.userroles)
    return (
        <Card
             className="m-3" style={{height:window.innerHeight,
            width: window.innerWidth - 30,backgroundColor:"lightyellow",borderColor:"orange"}}>
            <Card.Body>
                <Card.Title>
                    <h2>Профиль пользователя</h2>
                </Card.Title>
                <Card.Text>
                    <h4>ФИО: {user.users.UserName} </h4>
                    <h4>День рождения: {user.users.Birthday} ({getAge(user.users.Birthday)})</h4>
                    <h4>Email: {user.users.Email} </h4>
                    <h4>Ваша роль: {roleName} </h4>
                    <h4>Ваша специализируемая категория: {lookCategory(user.users.usercategoryUserCategoryId)}</h4>
                    <Button className="p-3" variant={"outline-warning"} style={{color:"black"}} onClick={()=> setUpdateFeedbackVisible(true)} 
                    >Изменить ссылки</Button>
                    <UpdateFeedback show={UpdateFeedbackVisible} onHide={()=>setUpdateFeedbackVisible(false)} Feedback={feedback}/>
                    <h4>Связь:</h4>
                    <ListGroup>
                        <ListGroup.Item >{"VK: "}{feedback.VK? 
                        <a href={"https://vk.com/"+feedback.VK}>https://vk.com/{""+feedback.VK}</a>
                        :
                        <div>Нету</div>}</ListGroup.Item>
                        <ListGroup.Item >{"WhatsApp: "}{feedback.WhatsApp?
                        <div>{""+feedback.WhatsApp}</div>
                        :
                        <div>Нету</div>}</ListGroup.Item>
                        <ListGroup.Item >{"Discord: "}{feedback.Discord? 
                        <div>{"@"+feedback.Discord}</div>
                        :
                        <div>Нету</div>}</ListGroup.Item>
                        <ListGroup.Item >{"OK: "}{feedback.OK?
                        <a href={"https://ok.ru/profile/"+feedback.VK}>https://ok.ru/profile/{""+feedback.VK}</a>
                        :
                        <div>Нету</div>}</ListGroup.Item> 
                        <ListGroup.Item > {"Telegram: "}{feedback.Telegram? 
                        <div>{"@"+feedback.Telegram}</div>
                        :
                        <div>Нету</div>}</ListGroup.Item>
                    </ListGroup>
                    <h4>История заданий:</h4> 
                    <ListGroup>
                        {
                            task.historytask.map(history =>
                                <ListGroup.Item key={history.TaskId} history={history} />    
                        )}
                    </ListGroup> 
                </Card.Text>
            </Card.Body>
        </Card>
    );
});

export default UserProfile;