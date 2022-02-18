import React from 'react';
import styled from '@emotion/styled';

function AuthHeader(props){

    const Header = styled.header`
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
    `;

    const Brand = styled.div`
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
    `;

    const Divisor = styled.hr`
        width: 90%;
        border: solid 1px #BBAE93;
    `

    const Subtitle = styled.h2`
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
        color: #17A768;
    `

    return(
        <Header>
            <Brand><img src={props.logoSrc} alt="site logo"/></Brand>
            <Divisor/>
            <Subtitle>{props.subtitle}</Subtitle>
        </Header>
    )
}

export default AuthHeader;