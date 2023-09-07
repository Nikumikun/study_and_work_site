import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, TASKLIST_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


export const NavBar = observer(() => {
    const navigate = useNavigate()
    const btn = () => {
        navigate(ADMIN_ROUTE)
    }
    const btnLogin = () => {
        navigate(LOGIN_ROUTE)
    }
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Container>
                    <Navbar.Brand href={TASKLIST_ROUTE}>
                        <img src="/logo.png"
                             width="160"
                             height="60"
                             className="logo"
                             alt="Logo"
                        />
                    </Navbar.Brand>
                </Container>
                {user.isAuth ?
                    <Nav>
                        {user.user.userroleUserRoleId === 2 && <Button onClick={btn} variant={"outline-warning"}>Админ-панель</Button>}
                        <Dropdown>
                            <Dropdown.Toggle variant={"outline-warning"} style={{color: "white", borderColor: "orange"}}>Меню</Dropdown.Toggle>
                            <Dropdown.Menu className={"dropdown-menu"}>
                                <Button className={"mb-2 mx-3"} variant={"outline-warning"} style={{width:"auto", color: "white"}}>Админ-панель</Button>
                                <Button className={"mb-2 mx-3"} variant={"outline-warning"} style={{width:"132px", color: "white"}}>Профиль</Button>
                                <Button className={"mb-2 mx-3"} variant={"outline-warning"} style={{width:"132px", color: "white"}} onClick={() => user.setIsAuth(false)}>Выход</Button>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    :
                    <Nav>
                        <Button variant={"outline-warning"} onClick={btnLogin} style={{ color: "white"}}>Авторизация</Button>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;