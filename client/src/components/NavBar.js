import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, TASKLIST_ROUTE, USERPROFILE_ROUTE, WELCOME_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

export const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const logOut = () => {
        user.setLogOut()
        navigate(WELCOME_ROUTE)

    }
    return (

        <Navbar bg="dark" data-bs-theme="dark" >
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
                        {user.users.userroleUserRoleId === 2 && <Button className={"mb-2 mx-3"} variant={"outline-warning"} style={{width:"auto", height:"65px", color: "white"}}
                                            onClick={() => navigate(ADMIN_ROUTE)}>Админ-панель</Button>}
                        <Dropdown>
                            <Dropdown.Toggle variant={"outline-warning"} style={{color: "white", height:"65px", borderColor: "orange"}}>Меню</Dropdown.Toggle>
                            <Dropdown.Menu className={"dropdown-menu"}> 
                                <Button className={"mb-2 mx-3"} variant={"outline-warning"} style={{width:"132px", color: "white"}}
                                        onClick={() => navigate(USERPROFILE_ROUTE)}>Профиль</Button>
                                <Button className={"mb-2 mx-3"} variant={"outline-warning"} style={{width:"132px", color: "white"}}
                                        onClick={() => logOut()}>Выход</Button>                             
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    :
                    <Nav>
                        <Button variant={"outline-warning"}
                                onClick={() => navigate(LOGIN_ROUTE)} style={{ color: "white"}}>Войти</Button>
                    </Nav>
                }
                

            </Container>
        </Navbar>
    );
});

export default NavBar;