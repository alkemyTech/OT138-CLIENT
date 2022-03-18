import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getUsers } from "../../services/requests/users";
import { Button, ButtonGroup } from "../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Content } from "../../components/Wrappers/Containers";
import { SectionTitle } from "../../styles/BackOffice";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { createArrayOfObjects } from "../../helpers";

export default function Users() {
    const [limit, setLimit] = useState(10);
    const [users, setUsers] = useState(createArrayOfObjects(limit));
    const [tableLoading, setTableLoading] = useState(true);

    async function fetchUsers() {
        setTableLoading(true);
        const { success, data: users, errorMessage } = await getUsers();

        if (success) {
            setUsers(users);
        } else {
            toast.error(`Error fetching users: ${errorMessage}`);
        }
        setTableLoading(false);
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
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{tableLoading?<StyledSkeleton/>:user.firstName}</td>
                                    <td>{tableLoading?<StyledSkeleton/>:user.lastName}</td>
                                    <td>{tableLoading?<StyledSkeleton/>:user.email}</td>
                                    <td>
                                        {tableLoading?<StyledSkeleton/>:<ButtonGroup align='center' gap={"8px"}>
                                            <Button style={buttonStyles("orange")}>
                                                <FaEdit />
                                            </Button>
                                            <Button style={buttonStyles("red")}>
                                                <FaTrash />
                                            </Button>
                                        </ButtonGroup>}
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

function StyledSkeleton() {
    return (
      <Skeleton style={{margin: "10px 0px"}}/>
    )
  }