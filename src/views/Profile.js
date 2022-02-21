import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import {
    ProfileContainer,
    Field,
} from "../styles/Profile";
import axios from 'axios';

function Profile(props){

    const [editing, setEditing] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: 'Juan',
        lastName: 'Díaz',
        email: 'juan.diaz@gmail.com',
    })

    function switchMode(){
        editing? setEditing(false) : setEditing(true);
    }

    function save(){
        switchMode();
    }

    useEffect(()=>{
        if(!isDataLoaded){
            getProfileData();
        }
    })

    async function getProfileData(){
        axios.get('https://localhost:4000/profile', {
            params: {
                id: 1 // CHANGE THIS
            }
        })
        .then(function(response){
            console.log(response)
        })
    }

    return(
        <ProfileContainer>
            <h2>Mis datos personales</h2>
            <Field>
                <span>Nombre:</span>
                <input type="text" name="name" value={profileData.firstName} />
            </Field>
            <Field>
                <span>Apellido:</span>
                <input type="text" name="lastname" value={profileData.lastName} />
            </Field>
            <Field>
                <span>Email:</span>
                <input type="text" name="email" value={profileData.email} />
            </Field>
            {
                editing?
                    <button onClick={switchMode}>Guardar</button> :
                    <button onClick={save}>Modificar</button>
            }
            <button>Eliminar cuenta</button>
        </ProfileContainer>

    )
}

export default Profile;