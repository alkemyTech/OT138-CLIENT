import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getUsers } from "../../services/requests/users";
import { Button, ButtonGroup } from "../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Content } from "../../components/Wrappers/Containers";

export default function Users() {
    const [users, setUsers] = useState([]);

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

    function buttonStyles(color) {
        return {
            width: "40px",
            height: "40px",
            background: color,
        };
    }

    return (
        <Content>
            <h2>Usuarios</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <ButtonGroup alignEnd>
                                            <Button style={buttonStyles("orange")}>
                                                <FaEdit />
                                            </Button>
                                            <Button style={buttonStyles("red")}>
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
    );
}
