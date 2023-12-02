import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
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
                <Container>
                  <Button variant={"outline-warning"} style={{width:"auto", height:"65px", color: "white"}} onClick={() => navigate(WELCOME_ROUTE)}>Welcome</Button>  
                </Container>
                
                {user.isAuth ?
                    <Nav> 
                        {user.users.userroleUserRoleId == 1? 
                        <ButtonGroup >
                        <Button variant={"outline-warning"} style={{width:"auto", height:"65px", color: "white"}}
                                             onClick={() => navigate(ADMIN_ROUTE)}>Админ-панель</Button>
                        <DropdownButton as={ButtonGroup}  title="Меню" id="bg-nested-dropdown"  variant={"warning"} >
                        <Dropdown.Item>
                        <Button variant={"outline-warning"} style={{width:"132px", color: "white"}}
                                         onClick={() => navigate(USERPROFILE_ROUTE)}>Профиль</Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                        <Button variant={"outline-warning"} style={{width:"132px", color: "white"}}
                                         onClick={() => logOut()}>Выход</Button>
                        </Dropdown.Item>                           
                         </DropdownButton> 
                        </ButtonGroup>
                    :
                    <div>
                       <DropdownButton as={ButtonGroup}  title="Меню" id="bg-nested-dropdown"  variant={"warning"} >
                        <Dropdown.Item>
                        <Button variant={"outline-warning"} style={{width:"132px", color: "white"}}
                                         onClick={() => navigate(USERPROFILE_ROUTE)}>Профиль</Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                        <Button variant={"outline-warning"} style={{width:"132px", color: "white"}}
                                         onClick={() => logOut()}>Выход</Button>
                        </Dropdown.Item>                           
                         </DropdownButton>  
                    </div>
                    }
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