import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Container, Content } from '../components/Wrappers/Containers';

function NotFound(){
    return(
        <Container>
            <Content>
                <h2>¡Lo lamentamos! Parece que esta página no existe</h2>
                <Link to="/">Volver a Inicio</Link>
            </Content>
            <Footer />
        </Container>
    )
}

export default NotFound;