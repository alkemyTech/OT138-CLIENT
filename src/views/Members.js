import React, { useEffect, useState } from 'react';
import { Container, Content } from '../components/Wrappers/Containers';
import Header from '../components/Header/Landing';
import { Footer } from '../components/Footer';
import { Card } from '../components/Members';
import Banner from '../components/Banner';
import { MembersContainer } from '../styles/Members';
import { getMembers } from '../services/requests/members';

function Members () {

    const [state, setState] = useState('loading');
    const [members, setMembers] = useState([]);

    useEffect(()=>{
        getData();
    }, [])

    const getData = async () => {
        setState('loading');
        getMembers().then( async response => {
            if(!response.error){
                console.log(response)
                const data = await response.data.data.map( member => {
                    return {
                        name: member.name,
                        image: member.image
                    }
                });
                setMembers(await data);
            } else {
                setState('error');
            }
        })
    }

    return(
        <Container>
            <Header />
            <Content>
                <Banner
                    title={"Nosotros"}
                    thumbnail={"/members__banner.jpg"}
                />
                <MembersContainer>
                {
                    members.map( member => {
                        return(
                            <Card
                                name = {member.name}
                                image = {member.image}
                            />
                        )
                    })
                }
                </MembersContainer>
            </Content>
            <Footer />
        </Container>
    )

}

export default Members;