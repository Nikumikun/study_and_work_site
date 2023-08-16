import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {TASKLIST_ROUTE} from "../utils/consts";

const NavBar = () => {
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container className="m-auto">
                <NavLink className="m-auto" style={{color:'white'}} to={TASKLIST_ROUTE}> Test </NavLink>
                <Nav className="m-auto" style={{color: 'white'}}>
                    <Button variant={"outline-light"}>Авторизация</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;