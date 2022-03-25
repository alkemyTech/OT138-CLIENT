import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryEditor from "../../../components/EntryEditor";
import { Footer } from "../../../components/Footer";
import { getProfileByAdmin, saveProfileData, updateProfileByAdmin } from "../../../services/requests/profile";
import { Container, Content } from "../../../components/Wrappers/Containers";
import toast, { Toaster } from "react-hot-toast";

function UserEditor(){

    const [data, setData] = useState({});
    const [state, setState] = useState("ready");

    const { id } = useParams();

    useEffect(() => {
        if (id) {
          getData();
        }
    }, []);

    const getData = async () => {
        setState("loading");
        getProfileByAdmin(id).then( response => {
            if(!response.data.error){
                const { id, firstName, lastName, roleId } = response.data.result; 
                setData({
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    roleId: roleId
                });
                setState("ready");
            } else {
                setState("error");
            }
        })
        .catch(err => {
            console.log(err);
            setState("error");
        })
    }

    const saveData = async (data) => {
        const factorizeData = {...data}
        factorizeData.id = id;
        updateProfileByAdmin(factorizeData).then(response => {
            if(!response.data.error){
                toast.success("Los datos fueron guardados con éxito");
            } else{
                toast.error("Error al intentar guardar");
            }
        }).catch(err => {
            console.log(err);
            toast.error("Error al intentar guardar");
        })
    }

    return(
        <Container>
            <Content>
                <Toaster/>
                <EntryEditor 
                    id = {id}
                    state = {state}
                    entryType = {"User"}
                    get = {getData}
                    save = {saveData}
                    data = {data}
                    fields={[
                        {
                        name: "firstName",
                        title: "Nombre",
                        type: "text",
                        },
                        {
                        name: "lastName",
                        title: "Apellido",
                        type: "text",
                        },
                        {
                            name: "roleId",
                            title: "Rol",
                            type: "select",
                            options: [
                                {
                                    value: 2,
                                    text: "Usuario común"
                                },
                                {
                                    value: 1,
                                    text: "Administrador"
                                }
                            ]
                        }
                    ]}
                />
            </Content>
            <Footer/>
        </Container>
    )

}

export default UserEditor;