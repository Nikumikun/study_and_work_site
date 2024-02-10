import React from 'react'
import {Container} from 'react-bootstrap'
import "./style.css";


const Footer = () => {
    return (
		<footer className="footer">
            <Container>
                    Контакты:
                    <div>
                        1-й руководитель: Lovevca@mail.ru
                    </div>
                    <div>
                        2-й руководитель: victor.buchelnikov@yandex.ru 
                    </div>
                    
                    <div>
                        Автор сайта: <a href="https://vk.com/nongari">https://vk.com/nongari</a>
                    </div> 
            </Container>
		</footer>
	);
}

export default Footer;