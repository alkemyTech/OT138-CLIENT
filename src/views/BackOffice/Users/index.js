import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { getUsers, deleteUser } from "../../../services/requests/users";
import { Button, ButtonGroup } from "../../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Content } from "../../../components/Wrappers/Containers";
import { HeaderButtons, SectionTitle } from "../../../styles/BackOffice";
import Swal from "sweetalert2";
import { createArrayOfObjects } from "../../../helpers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Pagination, { SelectLimit } from "../../../components/Pagination";
import UserEditor from "./UserEditor";
import Modal from "../../../components/Modal";

export default function Users() {
  const limitOptions = [10, 15, 25, 50];

  const [pageLimit, setPageLimit] = useState(limitOptions[0]);
  const [tableLoading, setTableLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [users, setUsers] = useState(createArrayOfObjects(pageLimit));
  const [lockedEntryIds, setLockedEntryIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    display: false,
    instance: null,
  });

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
    // Fetch data to get new pagination after page limit change
    fetchUsers(currentPage);
  }, [pageLimit]);

  useEffect(() => {
    // current page is grater than total pages, fetch data of last page
    if (currentPage > pagination.pages) goToPage(pagination.pages);
  }, [pagination.pages]);

  function onEdit(instance) {
    setFormData({
      display: true,
      instance: instance,
    });
  }

  function hideForm() {
    setFormData({
      display: false,
      instance: null,
    });
  }

  function goToPage(page) {
    setCurrentPage(page);
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
    fetchUsers(1);
  }, []);

  function onUpdated() {
    hideForm();
    fetchUsers(currentPage);
  }

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

      const { success, errorMessage } = await deleteUser(id);

      if (success) {
        fetchUsers(currentPage);
        toast.success("Usuario eliminado");
      } else {
        toast.error(`Error al eliminar usuario: ${errorMessage}`);
      }

      setLockedEntryIds((state) => state.filter((entryId) => entryId !== id));
    }
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
      <Modal
        open={formData.display}
        onClose={hideForm}
        center
        closeOnOverlayClick={false}
      >
        <UserEditor
          data={formData.instance}
          onSuccess={(entry) => onUpdated()}
        />
      </Modal>
      <Content>
        <SectionTitle
          style={{
            marginBottom: "1rem",
          }}
        >
          Usuarios
        </SectionTitle>
        <HeaderButtons>
          <SelectLimit
            onSelect={(value) => setPageLimit(value)}
            options={limitOptions}
          />
        </HeaderButtons>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Nombre</th>
              <th style={{ width: "20%" }}>Apellido</th>
              <th style={{ width: "35%" }}>Email</th>
              <th style={{ width: "15%" }}>Rol</th>
              <th style={{ width: "10%" }}>Acciones</th>
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
                    ) : user.roleId === 1 ? (
                      "Administrador"
                    ) : (
                      "Estándar"
                    )}
                  </td>
                  <td>
                    {tableLoading ? (
                      <StyledSkeleton />
                    ) : (
                      <ButtonGroup align="center" gap={"8px"}>
                        <Button
                          style={buttonStyles("orange")}
                          onClick={() => onEdit(user)}
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
            forcePage={currentPage}
          />
        )}
      </Content>
    </>
  );
}

function StyledSkeleton() {
  return <Skeleton style={{ margin: "12px 0px" }} />;
}
