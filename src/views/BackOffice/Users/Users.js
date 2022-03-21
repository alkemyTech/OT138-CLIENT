import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { getUsers, deleteUser } from "../../../services/requests/users";
import { Button, ButtonGroup } from "../../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Content } from "../../../components/Wrappers/Containers";
import { SectionTitle } from "../../../styles/BackOffice";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [lockedEntryIds, setLockedEntryIds] = useState([]);
    let navigate = useNavigate();

    async function fetchUsers() {
        const { success, data: users, errorMessage } = await getUsers();
        //console.log(JSON.stringify(await getUsers()));

        if (success) {
            setUsers(users);
        } else {
            toast.error(`Error fetching users: ${errorMessage}`);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    function buttonStyles(color) {
        return {
            width: "40px",
            height: "40px",
            background: color,
        };
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function onDelete (id) {
        const result = await Swal.fire({
            title: 'Confirmar eliminación',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            cancelButtonText: 'cancelar',
            confirmButtonColor: 'red',
        });

        if (result.isConfirmed) {
            setLockedEntryIds(state => [...state, id]);
            
            const { data } = await deleteUser(id);

            if (!data.error) {
                fetchUsers();
            } else {
                toast.error(`Error al eliminar usuario: ${data.message}`);
            };

            setLockedEntryIds((state) => state.filter(entryId => entryId !== id));
        };
    };

    function onEdit(id) {
        navigate(`/backoffice/usuarios/editar/${id}`);
    };

    function buttonStyles(color) {
        return {
            width: "40px",
            height: "40px",
            background: color,
        };
    }

    return (
        <>
            <Content>
                <SectionTitle>Usuarios</SectionTitle>
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody style={{overflow: 'scroll'}}>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <ButtonGroup align='center'>
                                                <Button style={buttonStyles("orange")} onClick={() => onEdit(user.id)} >
                                                    <FaEdit />
                                                </Button>
                                                <Button style={buttonStyles("red")} onClick={() => onDelete(user.id)} >
                                                    <FaTrash />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Content>
        </>
    );
}
