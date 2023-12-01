import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../../index";
import {Button, Form, ListGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { updateUserRole, getAllUsers,fetchUserCategory,BlackList } from '../../http/userAPI';

function nullCategory(category) {
    if (category === null) {
        return "Отсутствует"
    } else {
        return category.Name
    }
}

const LookUsers = observer(({show,onHide}) => {
const {user} = useContext(Context)
const [Id,setId] = useState('')
useEffect(()=>{
    getAllUsers().then(data => user.setUsersList(data))
    fetchUserCategory().then(data => user.setUserCategory(data))
},[])
console.log(user.userslist)
const click = async (Id,selectedUserRoleId,selectedUserCategoryId) => {
    try {
        console.log(Id,selectedUserRoleId)
        let data;
        if (Id === "" || Id === undefined) {
            alert("Сначала введите Id пользователя");
        } else {
            if (selectedUserRoleId === undefined || selectedUserRoleId === null) {
                alert("Выберете роль для сотрудника")
            } else if (selectedUserCategoryId === undefined || selectedUserCategoryId === null) {
                alert("Выберете категорию для сотрудника")
            } else 
            {
                data = updateUserRole(Id,selectedUserRoleId,selectedUserCategoryId)
                console.log(data)
                onHide()
                alert("Роль пользователя была изменена")  
            }
        }
    } catch (e) {
        alert(e.response.data.message)
    }
}

const clickBan = async (Id) => {
    try {
        console.log(Id)
        let data;
        if (Id === "" || Id === undefined) {
            alert("Сначала введите Id пользователя");
        } else {
            data = BlackList(Id)
            console.log(data)
            onHide()
            alert("Пользователь №" + Id + " был внесен в черный список")  
        }
    } catch (e) {
        alert(e.response.data.message)
    }
}

return (
<Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
        <Modal.Title>
            Просмотр и бан пользоватлей
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Button style={{color:"black"}} variant={"outline-warning"} onClick={()=>clickBan(Id)}>Забанить|Разбанить</Button>
            <Button style={{color:"black"}} variant={"outline-warning"} onClick={() => click(Id,{... user.selecteduserrole}.UserRoleId,{... user.selectedusercategory}.UserCategoryId)}>Обновить роль</Button>
        <Form.Control
                        className="mt-3"
                        placeholder="Введите Id"
                        style={{borderColor:"orange"}}
                        value={Id}
                        onChange={e => setId(e.target.value)}>
                    </Form.Control>
                    <div className="mt-3">
                        Выбирете роль для пользователя
                        </div>
                            <ListGroup horizontal>
                                {user.userroles.map(role =>
                                <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={role.UserRoleId === user.selecteduserrole.UserRoleId}
                                onClick={() => user.setSelectedUserRole(role)}
                                key={role.UserRoleId}>
                                {role.Name}
                                </ListGroup.Item>
                                )}
                            </ListGroup> 
                        <div className="mt-3">
                        Выбирете специализацию для пользователя
                        </div>
                        <ListGroup>
                                {user.usercategory.map(category =>
                                <ListGroup.Item
                                style={{cursor: "pointer",borderColor:"orange"}}
                                active={category.UserCategoryId === user.selectedusercategory.UserCategoryId}
                                onClick={() => user.setselectedusercategory(category)}
                                key={category.UserCategoryId}>
                                {category.Name}
                                </ListGroup.Item>
                                )}
                            </ListGroup>
                            <div>Id | Черный список | Роль Категория | Имя | Email | Дата рождения</div>
            <ListGroup>
                {
                    user.userslist.map(us => 
                        <ListGroup.Item key={us.UserId} us={us}>
                            <div>{us.UserId} | {"" + us.BlackList} | {us.userrole.Name} {nullCategory(us.usercategory)} | {us.UserName} | {us.Email} | {us.Birthday}</div>
                            <div>{us.feedback.Discord} {us.feedback.VK} {us.feedback.Telegram} {us.feedback.OK} {us.feedback.WhatsApp}</div>
                        </ListGroup.Item>)
                }
            </ListGroup>
        </Form>
    </Modal.Body>

</Modal>
);
});

export default LookUsers;