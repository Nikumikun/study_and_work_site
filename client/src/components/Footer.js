import React from 'react'
import {Container} from 'react-bootstrap'
import "./style.css";


const Footer = () => {
    return (
		<footer className="footer">
            <Container>
                    Контакты:
                    <div>
                        1-й руководитель: 
                    </div>
                    <div>
                        2-й руководитель: 
                    </div>
                    <div>
                        Автор сайта: <a href="https://vk.com/nongari">https://vk.com/nongari</a>
                    </div> 
            </Container>
		</footer>
	);
}

export default Footer;