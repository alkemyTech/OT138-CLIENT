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
import { createArrayOfObjects } from "../../../helpers";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Pagination from "../../../components/Pagination";

export default function Users() {
    const [limit, setLimit] = useState(10);
    const [tableLoading, setTableLoading] = useState(false)
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [users, setUsers] = useState(createArrayOfObjects(limit));
    const [lockedEntryIds, setLockedEntryIds] = useState([]);
    let navigate = useNavigate();

    async function fetchUsers(page) {
        setTableLoading(true);
        const { success, result, errorMessage } = await getUsers(page, limit);
        //console.log(JSON.stringify(await getUsers()));

        if (success) {
            const {items: users, ...pagination} = result;
            setUsers(users);
            setPagination(pagination);
        } else {
            toast.error(`Error fetching users: ${errorMessage}`);
        }
        setTableLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    function goToPage(page){
        fetchUsers(page)
    }
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
                                        <td>{tableLoading?<StyledSkeleton/>:user.firstName}</td>
                                        <td>{tableLoading?<StyledSkeleton/>:user.lastName}</td>
                                        <td>{tableLoading?<StyledSkeleton/>:user.email}</td>
                                        <td>
                                            {tableLoading?<StyledSkeleton/>:<ButtonGroup align='center'>
                                                <Button style={buttonStyles("orange")} onClick={() => onEdit(user.id)} >
                                                    <FaEdit />
                                                </Button>
                                                <Button style={buttonStyles("red")} onClick={() => onDelete(user.id)} >
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
                {pagination && (
                <Pagination
                onPageChange={goToPage}
                totalPages={pagination.pages || 0}/>
                )}
            </Content>
        </>
    );
}

function StyledSkeleton() {
    return (
      <Skeleton style={{margin: "10px 0px"}}/>
    )
  }