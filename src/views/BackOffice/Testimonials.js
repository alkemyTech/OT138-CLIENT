import React, { Fragment, useEffect, useState } from "react";
import Table from "../../components/Table";
import { Button, ContainerModal } from "../../styles/FormTestimonial";
import FormTestimonial from "./FormTestimonial";
import { FaEdit, FaPlusSquare, FaTrash } from "react-icons/fa";
import { deleteTestimony } from "../../services/requests/form_testimonial";
import { toast, Toaster } from "react-hot-toast";
import Header from "../../components/Header/BackOffice";
import Pagination from "../../components/Pagination";
import { useQuery } from "react-query";
import { getTestimonies } from "../../services/requests/testimonials";
import { Container, Content } from "../../components/Wrappers/Containers";
import Loading from "../../components/Loading";
import { Avatar } from "../../components/Inputs/styles";
import {
  AddButton,
  HeaderButtons,
  SectionTitle,
} from "../../styles/BackOffice";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "../../components/Modal";
function Testimonials() {
  const [Id, SetId] = useState(undefined);

  /* */
  const [testimonials, setTestimonials] = useState([]);
  const [pagination, setPagination] = useState({
    pages: 1,
    count: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    ["testimonios", limit, currentPage],
    () => getTestimonies(limit, currentPage),
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (response) {
      if (response.data.error) {
        toast.error("Error al obtener testimonios");
      } else {
        const { items, ...pagination } = response.data.result;
        setTestimonials(items);
        setPagination(pagination);
      }
    }
  }, [response]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  async function goToPage(page) {
    setCurrentPage(page);
  }

  /* */

  //UPDATE TESTIMONY
  async function UpdateTestimony(id) {
    SetId(id);
  }

  async function DeleteTestimony(id) {
    const confirmation = window.confirm("Deseas eliminar este testimonio");
    if (confirmation) {
      const { successMessage, success, errorMessage } = await deleteTestimony(
        id
      );
      if (success) {
        toast.success(successMessage);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        toast.error(errorMessage);
      }
    }
  }
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Header />
      <Toaster />
      <Content>
        {/* <ContainerModal>
          {Id ? <FormTestimonial id={Id} /> : <FormTestimonial />}
        </ContainerModal> */}
        <Modal size="sm" show={show} onClose={() => setShow(false)}>
          <ModalHeader>
            <ModalTitle>
              {/* {formData.instance === null ? "Crear" : "Actualizar"} categoría */}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <FormTestimonial id={Id} />
          </ModalBody>
        </Modal>
        <SectionTitle>Testimonios</SectionTitle>
        <HeaderButtons>
          <AddButton
            style={{ background: "green" }}
            onClick={() => {
              SetId(false);
              setShow(true)}}
          >
            <FaPlusSquare /> <b>Crear</b>
          </AddButton>
        </HeaderButtons>
        <Table>
          <thead>
            <tr>
              <th width="10%">Foto</th>
              <th width="40%">Nombre</th>
              <th width="40%">Testimonio</th>
              <th width="10%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isFetching ? null : testimonials &&
              testimonials.length > 0 ? (
              testimonials.map((testimonial) => {
                const { id, name, image, content } = testimonial;
                return (
                  <tr key={id}>
                    <td>
                      <Avatar src={image} />
                    </td>
                    <td>{name}</td>
                    <td>
                      <div class="parent">
                        <div class="child">{content}</div>
                      </div>
                    </td>

                    <td>
                      <Button
                        style={editButtonStyle}
                        onClick={() => {
                          setShow(true);
                          UpdateTestimony(id);
                        }}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        style={deleteButtonStyle}
                        onClick={() => {
                          setShow(true);
                          DeleteTestimony(id);
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h2>¡En este momento no contamos con Testimonios!</h2>
            )}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}

const editButtonStyle = {
  width: "40px",
  height: "40px",
  background: "orange",
};

const deleteButtonStyle = {
  width: "40px",
  height: "40px",
  background: "red",
};

export default Testimonials;
