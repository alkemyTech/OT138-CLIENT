import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import {
    ProfileContainer,
    ProfileContent,
    Message,
    Image,
    TextFields,
    Field,
    Button,
} from "../styles/Profile";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getProfileData } from '../actions/authActions';


function Profile(props){

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [dataState, setDataState] = useState('loading');

    const [profileData, setProfileData] = useState({
        image: '',
        firstName: '',
        lastName: '',
        email: '',
    })

    function switchMode(){
        editing? setEditing(false) : setEditing(true);
    }

    useEffect(()=>{
        getProfileData();
    }, [])

    const getProfileData = async () => {
        let data = await props.getProfileData();
        if(data.payload.success){
            let {image, firstName, lastName, email} = data.payload.user;
            setProfileData({
                image: image,
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            setDataState('loaded');
        }
        else{
            setDataState('error');
        }
    }

    async function save(){
        setSaving(true);
        // saving login
        setTimeout(() => { // this emulate the saving lapse - delete after implement the actual saving
            setSaving(false);
            switchMode();

        }, 2000);
    }

    return(
        <ProfileContainer>
            <Header/>
            {
                dataState === 'loading' &&
                    <ProfileContent>Cargando...</ProfileContent>
            }
            {
                dataState === 'loaded' &&
                    <ProfileContent>
                        <Image>
                            <img src={profileData.image}/>
                        </Image>
                        <TextFields>
                            <h2>Mis datos personales</h2>
                            <Field>
                                <span>Nombre:</span>
                                <input type="text" name="name" value={profileData.firstName} disabled={!editing}/>
                            </Field>
                            <Field>
                                <span>Apellido:</span>
                                <input type="text" name="lastname" value={profileData.lastName} disabled={!editing} />
                            </Field>
                            <Field>
                                <span>Email:</span>
                                <input type="text" name="email" value={profileData.email} disabled={!editing} />
                            </Field>
                            {
                                editing?
                                    <Button onClick={save}>{
                                        saving? 
                                            "Guardando..." :
                                            "Guardar"
                                        }</Button> :
                                    <Button onClick={switchMode}>Modificar</Button>
                            }
                            <Button>Eliminar cuenta</Button>
                        </TextFields>
                    </ProfileContent>
            }
            {
                dataState === 'error' &&
                    <ProfileContent>
                        <Message>Error al cargar los datos</Message>
                        <Button onClick={getProfileData}>Reintentar</Button>
                    </ProfileContent>
            }
        </ProfileContainer>

    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProfileData
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Profile);