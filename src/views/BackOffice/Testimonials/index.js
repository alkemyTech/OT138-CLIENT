import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import moment from "moment";
import { FaEdit, FaPlusSquare, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table";
import { Container, Content } from "../../../components/Wrappers/Containers";
import { getTestimonies, deleteTestimonies } from "../../../services/requests/testimonials";
import Header from "../../../components/Header/BackOffice";
import {
  HeaderButtons,
  AddButton,
  SectionTitle,
} from "../../../styles/BackOffice";
import Modal from "../../../components/Modal";
import Pagination, { SelectLimit } from "../../../components/Pagination";
import Skeleton from "react-loading-skeleton";
import { AvatarSkeleton, AvatarWithSkeleton } from "../../../components/Skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, ButtonGroup } from "../../../components/Inputs";
import TestimonyEditor from "./TestimonyEditor";
import { createArrayOfObjects, removeTags } from "../../../helpers";


function Testimonials() {
  const limitOptions = [10, 15, 25, 50];

  const [pageLimit, setPageLimit] = useState(limitOptions[0]);
  const [testimonials, setTestimonials] = useState(createArrayOfObjects(pageLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ display: false, instance: null });
  const [pagination, setPagination] = useState({});
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
    getTestomony(1);
  }, [pageLimit]);

  async function getTestomony(page) {
    setTableLoading(true);
    const {
      success,
      data: testimoniosData,
      errorMessage,
    } = await getTestimonies(page, pageLimit);
    if (success) {
      const { items, ...pagination } = testimoniosData;

      setTestimonials(items);
      setPagination(pagination);
    } else {
      toast.error("Error al obtener testimonios: " + errorMessage);
    }
    setTableLoading(false);
  }

  //PAGINATION
  async function goToPage(page) {
    setCurrentPage(page);
    getTestomony(page);
  }

  //SHOW COVER
  function showEntryPicture(url) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      imageUrl: url,
      imageAlt: "Entry image",
    });
  }

  //SHOW TEXT
  function showEntryContent(content) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      title: "Texto slider",
      text: content,
    });
  }

  //CREATE SLIDER
  function onCreate() {
    setFormData({
      display: true,
      instance: null,
    });
  }

  //UPDATE SLIDER
  function onEdit(instance) {
    setFormData({
      display: true,
      instance: instance,
    });
  }

  //HIDE MODE
  function hideForm() {
    setFormData({
      display: false,
      instance: null,
    });
  }

  //CHANGE PAGE
  function onUpdated() {
    hideForm();
    getTestomony(currentPage);
  }

  //DELETE SLIDER
  async function onDelete(id) {
    const result = await Swal.fire({
      title: "Confirmar eliminación",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      icon: "warning",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "red",
    });

    if (result.isConfirmed) {
      const { success } = await deleteTestimonies(id);
      if (success) {
        getTestomony(currentPage);
      } else {
        toast.error("Error al eliminar Sliders");
      }
    }
  }



  return (

    <Container>
      <Toaster />
      <Header />
      <Modal
        open={formData.display}
        onClose={hideForm}
        center
        closeOnOverlayClick={false}
      >
        <TestimonyEditor
          data={formData.instance}
          onSuccess={() => onUpdated()}
        />
      </Modal>
      <Content>
        <SectionTitle>Testimonios</SectionTitle>
        <HeaderButtons>
          <SelectLimit onSelect={value => setPageLimit(value)} options={limitOptions} />
          <AddButton
            onClick={() => {
              onCreate();
            }}
            style={{ background: "green" }}
          >
            <FaPlusSquare /> <b>Crear</b>
          </AddButton>
        </HeaderButtons>
        <>
          <Table>
            <thead>
              <tr>
                <th width="10%">Imagen</th>
                <th width="20%">Nombre</th>
                <th width="40%">Content</th>
                <th width="10%">Fecha de Creación</th>
                <th width="10%">Fecha de Actualizacion</th>
                <th width="10%">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {tableLoading ? (
                        <AvatarSkeleton />
                      ) : (
                        <AvatarWithSkeleton
                          src={item.image}
                          onClick={() => showEntryPicture(item.image)}
                        />
                      )}
                    </td>
                    <td>
                      {tableLoading && !item.name ? <Skeleton /> : item.name}
                    </td>

                    <td onClick={() => showEntryContent(item.content)} className="clickable">
                      {tableLoading && !item.content ? <Skeleton /> : <div className="parent">
                        <div className="child">{removeTags(item.content)}</div>
                      </div>}

                    </td>
                    <td>
                      {tableLoading && !item.createdAt ? (
                        <Skeleton />
                      ) : (
                        moment(item.createdAt).format("DD/MM/yyyy")
                      )}
                    </td>
                    <td>
                      {tableLoading && !item.createdAt ? (
                        <Skeleton />
                      ) : (
                        moment(item.updatedAt).format("DD/MM/yyyy")
                      )}
                    </td>
                    <td>
                      <ButtonGroup align="center" gap="8px">
                        <Button
                          style={buttonStyles("orange")}
                          onClick={() => onEdit(item)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          style={buttonStyles("red")}
                          onClick={() => onDelete(item.id)}
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
              onPageChange={goToPage}
              totalPages={pagination.pages || 0}
            />
          )}
        </>
      </Content>
    </Container>

  )

}

function buttonStyles(color) {
  return {
    width: "40px",
    height: "40px",
    background: color,
  };
}

export default Testimonials;