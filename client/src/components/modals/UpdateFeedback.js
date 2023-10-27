import React, {useContext, useState,useEffect} from 'react';
import {Button,Modal,Form,Container} from "react-bootstrap"
import {observer} from "mobx-react-lite";
import { Context } from '../../index';
import { updateFeedback } from '../../http/userAPI';

const UpdateFeedback = observer(({show,onHide,Feedback}) => {
    const {user} = useContext(Context)
    const [VK,setVK] = useState('')
    const [WhatsApp,setWhatsApp] = useState('')
    const [Discord,setDiscord] = useState('')
    const [OK,setOK] = useState('')
    const [Telegram,setTelegram] = useState('')
    const click = async () => {
        try {
            let data;
            if (Feedback.FeedbackId != undefined) {
                data = updateFeedback(Feedback.FeedbackId,VK,WhatsApp,
                    Discord,OK,Telegram)
                    onHide()
                alert("Ссылки обновлены обновите страницу")
            } else {
                alert("Ошибка");
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновление ссылок
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                  <Container>
                    <div>VK:</div>
                    <Form.Control className="m-2" placeholder="Введите айди ВК профиля" value={VK} type="text"
                    onChange={e => setVK(e.target.value)}/>
                    <div >WhatsApp:</div>
                    <Form.Control className="m-2" placeholder="Введите номер телефона аккаунта" value={WhatsApp} type="text"
                    onChange={e => setWhatsApp(e.target.value)}/>
                    <div >Viber:</div>
                    <Form.Control className="m-2" placeholder="Введите номер телефона аккаунта" value={Discord} type="text"
                    onChange={e => setDiscord(e.target.value)}/>
                    <div  >OK:</div>
                    <Form.Control className="m-2" placeholder="Введите айди ОК профиля" value={OK} type="text"
                    onChange={e => setOK(e.target.value)}/>
                    <div >Telegram:</div>
                    <Form.Control className="m-2" placeholder="Введите айди (имя профиля)" value={Telegram} type="text"
                    onChange={e => setTelegram(e.target.value)}/>
                    </Container>  
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{color:"black"}} variant={"outline-warning"} onClick={click}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    )
 });

 export default UpdateFeedback;