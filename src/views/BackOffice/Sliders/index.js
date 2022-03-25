import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SliderEditor from "./SliderEditor";
import Swal from "sweetalert2";
import moment from "moment";
import { FaEdit, FaPlusSquare, FaTrash } from "react-icons/fa";
import Table from "../../../components/Table";
import { Container, Content } from "../../../components/Wrappers/Containers";
import { getSlides, deleteSlides } from "../../../services/requests/slides";
import Header from "../../../components/Header/BackOffice";
import { Avatar } from "../../../components/Inputs/styles";
import {
  HeaderButtons,
  AddButton,
  SectionTitle,
} from "../../../styles/BackOffice";
import Modal from "../../../components/Modal";
import Pagination, { SelectLimit } from "../../../components/Pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button, ButtonGroup } from "../../../components/Inputs";

function Sliders() {
  const limitOptions = [10, 15, 25, 50];

  //CREATION OF STATES
  const [pageLimit, setPageLimit] = useState(limitOptions[0]);
  const [sliders, setSlides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ display: false, instance: null });
  const [pagination, setPagination] = useState({});
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    getSlider(1);
  }, [pageLimit]);

  //GET SLIDERS
  async function getSlider(page) {
    setTableLoading(true);
    const {
      success,
      data: slidesData,
      errorMessage,
    } = await getSlides(page, pageLimit);
    if (success) {
      const { items, ...pagination } = slidesData;
      setSlides(items);
      setPagination(pagination);
    } else {
      toast.error("Error al obtener sliders: " + errorMessage);
    }
    setTableLoading(false);
  }

  //PAGINATION
  async function goToPage(page) {
    setCurrentPage(page);
    getSlider(page);
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
    getSlider(currentPage);
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
      const { success } = await deleteSlides(id);
      if (success) {
        getSlider(currentPage);
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
        <SliderEditor
          data={formData.instance}
          onSuccess={() => onUpdated()}
        />
      </Modal>
      <Content>
        <SectionTitle>Sliders</SectionTitle>
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
                <th width="10%">Portada</th>
                <th width="40%">Texto Slider</th>
                <th width="20%">Fecha de Creación</th>
                <th width="20%">Fecha de Actualizacion</th>
                <th width="10%">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sliders.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      {tableLoading ? (
                        <AvatarSkeleton />
                      ) : (
                        <AvatarWithSkeleton
                          src={item.imageURL}
                          onClick={() => showEntryPicture(item.imageURL)}
                        />
                      )}
                    </td>
                    <td onClick={() => showEntryContent(item.text)}>
                      {tableLoading && !item.text ? <Skeleton /> : item.text}
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
  );
}


function buttonStyles(color) {
  return {
    width: "40px",
    height: "40px",
    background: color,
  };
}

function AvatarSkeleton() {
  return <Skeleton circle={true} width="45px" height="45px" />;
}

function AvatarWithSkeleton(props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Avatar
        {...props}
        onLoad={() => setLoaded(true)}
        style={loaded ? {} : { display: "none" }}
      />
      {!loaded && <AvatarSkeleton />}
    </>
  );
}

export default Sliders;
