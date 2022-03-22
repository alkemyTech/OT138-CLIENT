import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import {
  getActivities,
  deleteActivity,
} from "../../../services/requests/activities";
import { Button, ButtonGroup } from "../../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaPlusSquare, FaTrash } from "react-icons/fa";
import { Content } from "../../../components/Wrappers/Containers";
import {
  HeaderButtons,
  AddButton,
  SectionTitle,
} from "../../../styles/BackOffice";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "../../../components/Modal";
import ActivityEditor from "./ActivityEditor";
import Swal from "sweetalert2";
import Pagination from "../../../components/Pagination";
import moment from "moment";
import { Avatar } from "../../../components/Inputs/styles";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [lockedEntryIds, setLockedEntryIds] = useState([]);
  const [formData, setFormData] = useState({
    display: false,
    instance: null,
  });

  async function fetchActivities(page) {
    const { data } = await getActivities(pageLimit, page);

    if (!data.error) {
      const { items, ...pagination } = data.result;
      setActivities(items);
      console.log({ activities });
      setPagination(pagination);
    } else {
      toast.error(`Error fetching activities: ${data.message}`);
    }
  }

  useEffect(() => {
    fetchActivities(currentPage);
  }, []);

  function buttonStyles(color) {
    return {
      width: "40px",
      height: "40px",
      background: color,
    };
  }

  const showButtonStyle = {
    backgroundColor: "#2FA4FF",
    color: "#fff",
    fontWeight: "600",
    height: "35px",
    width: "auto",
  };

  function changePage(page) {
    setCurrentPage(page);
    fetchActivities(page);
  }

  function onEdit(instance) {
    setFormData({
      display: true,
      instance,
    });
  }

  function onCreate() {
    setFormData({
      display: true,
      instance: null,
    });
  }

  function hideForm() {
    setFormData({
      display: false,
      instance: null,
    });
  }

  function onUpdate() {
    hideForm();
    fetchActivities(currentPage);
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

      const { data } = await deleteActivity(id);

      if (!data.error) {
        fetchActivities(currentPage);
      } else {
        toast.error(`Error al eliminar entrada: ${data.message}`);
      }

      setLockedEntryIds((state) => state.filter((entryId) => entryId !== id));
    }
  }

  function showActivityContent(content) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      title: "Contenido",
      text: content,
    });
  }

  function showActivityPicture(url) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      imageUrl: url,
      imageAlt: "Entry image",
    });
  }

  return (
    <>
      <Modal size="sm" show={formData.display} onClose={() => hideForm()}>
        <ModalBody>
          <ActivityEditor
            data={formData.instance}
            onSuccess={(entry) => onUpdate()}
          />
        </ModalBody>
      </Modal>
      <Content>
        <SectionTitle>Actividades</SectionTitle>
        <HeaderButtons>
          <AddButton onClick={onCreate} style={{ background: "green" }}>
            <FaPlusSquare /> <b>Crear</b>
          </AddButton>
        </HeaderButtons>
        <Table>
          <thead>
            <tr>
              <th width="10%">Portada</th>
              <th width="15%">Nombre</th>
              <th width="50%">Descripción</th>
              <th width="15%">Fecha de Creación</th>
              <th width="10%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Avatar
                      src={activity.image}
                      onClick={() => showActivityPicture(activity.image)}
                    />
                  </td>
                  <td>{activity.name}</td>
                  <td onClick={() => showActivityContent(activity.content)}>
                    <div class="parent">
                      <div class="child">{activity.content}</div>
                    </div>
                  </td>
                  <td>
                    {activity.createdAt &&
                      moment(activity.createdAt).format("DD/MM/YY")}
                  </td>
                  <td>
                    <ButtonGroup align="center" gap="8px">
                      <Button
                        style={buttonStyles("orange")}
                        onClick={() => onEdit(activity)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        style={buttonStyles("red")}
                        onClick={() => onDelete(activity.id)}
                      >
                        <FaTrash />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pagination && (
          <Pagination
            onChangePage={changePage}
            totalPages={pagination.pages || 0}
          />
        )}
      </Content>
    </>
  );
}
