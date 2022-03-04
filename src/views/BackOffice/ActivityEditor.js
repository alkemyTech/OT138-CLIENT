import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/BackOffice';
import {Footer} from '../../components/Footer';
import EntryEditor from '../../components/EntryEditor';
import { createActivity, getActivitiesById, updateActivity } from '../../services/requests/activities';
import toast, { Toaster } from 'react-hot-toast';

function ActivityEditor(){

    const {id} = useParams();
    const [data, setData] = useState({});

    const [state, setState] = useState('ready');

    useEffect(() => {
        if(id){
            getActivity();
        }
    }, [])

    const getActivity = async () => {
        setState('loading');
        getActivitiesById(id).then(response => {
            if(!response.data.error){
                setData(response.data.result.activities[0])
            } else {
                toast.error("No se pudo cargar los datos")
            }
            setState('ready');
        })
    }

    const saveActivity = async (formData) => {
        if(id){
            // If there is an existing ID, then the form has to update the existing data on activity
            updateActivity(id, formData).then(response => {
                if(response.data.error){
                    toast.error("Error al intentar guardar");
                } else{
                    toast.success("Guardado con éxito");
                }
            }).catch(err => {
                toast.error("Error al intentar guardar")
            })
        } else{
            // Else, the form has to create a new activity
            createActivity(formData).then(response => {
                if(response.data.error){
                    toast.error("Error al intentar crear la entrada");
                } else{
                    toast.success("Entrada creada con éxito");
                }
            }).catch(err => {
                toast.error("Error al intentar crear la entrada")
            })
        }
    }

    return(
        <>
        <Header />
            <Toaster/>
            <EntryEditor 
                id={id}
                state={state}
                entryType={"Actividades"}
                getEntry={getActivitiesById}
                save={saveActivity}
                data={data}
                fields={[
                    {
                        name: 'name',
                        title: 'Nombre',
                        type: 'text'
                    },
                    {
                        name: 'image',
                        title: 'Url de imagen',
                        type: 'text'
                    },
                    {
                        name: 'content',
                        title: 'Contenido',
                        type: 'content'
                    },
                ]}
            />
        <Footer />
        </>
    )
}

export default ActivityEditor;