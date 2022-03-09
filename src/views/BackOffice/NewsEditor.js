import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/BackOffice';
import {Footer} from '../../components/Footer';
import EntryEditor from '../../components/EntryEditor';
import { Container, Content } from '../../components/Wrappers/Containers';
import { getNew, createNew, updateNew } from '../../services/requests/news';
import toast, { Toaster } from 'react-hot-toast';

function NewsEditor(){

    const {id} = useParams();
    const [data, setData] = useState({});

    const [state, setState] = useState('ready');

    useEffect(() => {
        if(id){
            get();
        }
    }, [])

    const get = async () => {
        setState('loading');
        getNew(id).then(response => {
            if(!response.data.error){
                setData(response.data.data)
            } else {
                toast.error("No se pudo cargar los datos")
            }
            setState('ready');
        })
    }

    const save = async (formData) => {
        if(id){
            // If there is an existing ID, then the form has to update the existing data on new
            updateNew(id, formData).then(response => {
                console.log(response)
                if(response.data.error){
                    toast.error("Error al intentar guardar");
                } else{
                    toast.success("Guardado con éxito");
                }
            }).catch(err => {
                toast.error("Error al intentar guardar")
            })
        } else{
            // Else, the form has to create a new new
            createNew(formData).then(response => {
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
        <Container>
            <Header />
            <Toaster/>
            <Content>
                <EntryEditor 
                    id={id}
                    state={state}
                    entryType={"Novededes"}
                    get={get}
                    save={save}
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
                        {
                            name: 'categoryId',
                            title: 'Categoría',
                            type: 'select',
                            defaultValue: 1,
                            options: categoriesOptions
                        }
                    ]}
                />
            </Content>
            <Footer />
        </Container>
    )
}

export default NewsEditor;

const categoriesOptions = [
    {
        value: 1,
        text: "General"
    },
    {
        value: 2,
        text: "Actualidad"
    }
]