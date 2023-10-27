import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, TASKLIST_ROUTE} from "../utils/consts";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [Email,setEmail] = useState('')
    const [Password,setPassword] = useState('')
    const [AgainPassword,setAgainPassword] = useState('')
    const [Birthday,setBirthday] = useState('')
    const [UserName,setUserName] = useState('')

    const click = async () =>{
        try {
            let data;
            try {
                if (isLogin)
                {
                    if (Password !== "" && Email !== "")
                    {
                        try {
                            data = await login(Email,Password) 
                        } catch (error) {
                            alert("Проверьте введенные данные")
                        }
                        
                    } else {
                        alert("Введите данные для входа")
                    }
                } else {
                    if (Password === AgainPassword){
                        try {
                            data = await registration(UserName,Birthday,Email,Password)
                        } catch (error) {
                            alert("Проверьте введенные данные")
                        }
                    } else {
                        alert("Не совпадает пароль с подтверждением пароля")
                    }
                }
            } catch (error) {
                alert("Ошибка: " + error)
            }
            if (data !== undefined) {
                user.setUser(data)
                user.setIsAuth(true)
                navigate(TASKLIST_ROUTE)  
            }
        } catch (e) {
            alert("Возникла ошибка, проверьте введённые данные")
        }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 60}}>
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto"> {isLogin ? "Вход" : "Создание аккаунта"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ?
                        <div>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите вашу почту"
                                value={Email}
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль"
                                value={Password}
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        :
                        <div>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваше ФИО"
                                value={UserName}
                                type="text"
                                required
                                onChange={e => setUserName(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите вашу дату рождения"
                                value={Birthday}
                                type="date"
                                required
                                onChange={e => setBirthday(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите вашу почту"
                                value={Email}
                                type="email"
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль"
                                value={Password}
                                type="password"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Подтвердите ваш пароль"
                                value={AgainPassword}
                                type="password"
                                required
                                onChange={e => setAgainPassword(e.target.value)}
                            />
                        </div>
                    }
                    <Button className="mt-3" style={{color:"black"}} variant={"warning"} onClick={click}>
                        {isLogin ? "Войти" : "Создать"}
                    </Button>
                    {isLogin ?
                        <div className="mt-3"> Нет аккаунта? Можете создать <Link to={REGISTRATION_ROUTE}> здесь! </Link></div>
                        :
                        <div className="mt-3"> Есть аккаунт? Войти <Link to={LOGIN_ROUTE}> здесь! </Link></div> }
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;