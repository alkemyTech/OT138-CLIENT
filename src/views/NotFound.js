import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Landing';
import { Footer } from '../components/Footer';
import { Container, Content } from '../components/Wrappers/Containers';

function NotFound(){
    return(
        <Container>
            <Header/>
            <Content>
                <h2>¡Lo lamentamos! Parece que esta página no existe</h2>
                <Link to="/">Volver a Home</Link>
            </Content>
            <Footer />
        </Container>
    )
}

export default NotFound;