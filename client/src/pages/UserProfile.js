import React, {useContext} from 'react';
import {Context} from "../index";
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

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
    const {user} = useContext(Context)
    return (
        <Card
             className="m-3" style={{height:window.innerHeight - 100,
            width: window.innerWidth - 50,backgroundColor:"lightyellow",borderColor:"orange"}}>
            <Card.Body>
                <Card.Title>
                    <h2>Профиль пользователя</h2>
                </Card.Title>
                <Card.Text>
                    <h4>ФИО: {user.users.UserName}</h4>
                    <h4>День рождения: {user.users.Birthday} ({getAge(user.users.Birthday)})</h4>
                    <h4>Email: {user.users.Email}</h4>
                    <h4>Ваша роль:

                    </h4>
                    <h4>Ваша специализируемая категория: {lookCategory(user.users.usercategoryUserCategoryId)}</h4>
                    <h4>Связь: {user.users.feedbackFeedbackId}</h4>
                    <Card>
                    </Card>
                    <h4>История заданий:</h4>
                    <Card>
                    </Card>
                </Card.Text>

            </Card.Body>
        </Card>
    );
});

export default UserProfile;