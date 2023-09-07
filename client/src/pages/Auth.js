import React from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, useLocation} from "react-router-dom";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 60}}>
            <Card style={{width:600}} className="p-5">
                <h2 className="m-auto"> {isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашу почту"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                    />
                    <Button className="mt-3" style={{color:"black"}} variant={"warning"}>
                        {isLogin ? "Авторизация" : "Регистрация"}
                    </Button>
                    {isLogin ?
                        <div className="mt-3"> Нет аккаунта? <Link to={REGISTRATION_ROUTE}> Зарегистрируйтесь! </Link></div>
                        :
                        <div className="mt-3"> Есть аккаунт? <Link to={LOGIN_ROUTE}> Авторизируйтесь! </Link></div> }
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;