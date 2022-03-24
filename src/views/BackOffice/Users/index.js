import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { getUsers, deleteUser } from "../../../services/requests/users";
import { Button, ButtonGroup } from "../../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Content } from "../../../components/Wrappers/Containers";
import { HeaderButtons, SectionTitle } from "../../../styles/BackOffice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createArrayOfObjects } from "../../../helpers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination, { SelectLimit } from "../../../components/Pagination";

export default function Users() {
  const limitOptions = [10, 15, 25, 50];

  const [pageLimit, setPageLimit] = useState(limitOptions[0]);
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [users, setUsers] = useState(createArrayOfObjects(pageLimit));
  const [lockedEntryIds, setLockedEntryIds] = useState([]);
  let navigate = useNavigate();

  async function fetchUsers(page) {
    setTableLoading(true);
    const { success, result, errorMessage } = await getUsers(page, pageLimit);
    if (success) {
      const { items: users, ...pagination } = result;
      setUsers(users);
      setPagination(pagination);
    } else {
      toast.error(`Error fetching users: ${errorMessage}`);
    }
    setTableLoading(false);
  }

  useEffect(() => {
    fetchUsers(1);
  }, [pageLimit]);

  function goToPage(page) {
    fetchUsers(page);
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

  async function onDelete(id) {
    const result = await Swal.fire({
      title: "Confirmar eliminación",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      icon: "warning",
      cancelButtonText: "cancelar",
      confirmButtonColor: "red",
    });

    if (result.isConfirmed) {
      setLockedEntryIds((state) => [...state, id]);

      const { data } = await deleteUser(id);

      if (!data.error) {
        fetchUsers();
      } else {
        toast.error(`Error al eliminar usuario: ${data.message}`);
      }

      setLockedEntryIds((state) => state.filter((entryId) => entryId !== id));
    }
  }

  function onEdit(id) {
    navigate(`/backoffice/usuarios/editar/${id}`);
  }

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
        <SectionTitle
          style={{
            marginBottom: "1rem",
          }}
        >
          Usuarios
        </SectionTitle>
        <HeaderButtons>
          <SelectLimit onSelect={value => setPageLimit(value)} options={limitOptions} />
        </HeaderButtons>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Nombre</th>
              <th style={{ width: "20%" }}>Apellido</th>
              <th style={{ width: "45%" }}>Email</th>
              <th style={{ width: "15%" }}>Acciones</th>
            </tr>
          </thead>
          <tbody style={{ overflow: "scroll" }}>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{tableLoading ? <StyledSkeleton /> : user.firstName}</td>
                  <td>{tableLoading ? <StyledSkeleton /> : user.lastName}</td>
                  <td>{tableLoading ? <StyledSkeleton /> : user.email}</td>
                  <td>
                    {tableLoading ? (
                      <StyledSkeleton />
                    ) : (
                      <ButtonGroup align="center" gap={"8px"}>
                        <Button
                          style={buttonStyles("orange")}
                          onClick={() => onEdit(user.id)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          style={buttonStyles("red")}
                          onClick={() => onDelete(user.id)}
                        >
                          <FaTrash />
                        </Button>
                      </ButtonGroup>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pagination && (
          <Pagination
            onPageChange={goToPage}
            totalPages={pagination.pages || 0}
          />
        )}
      </Content>
    </>
  );
}

function StyledSkeleton() {
  return <Skeleton style={{ margin: "12px 0px" }} />;
}
