import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import SliderEditor from "./SliderEditor"
import Swal from "sweetalert2";
import moment from "moment";
import {Button} from "../../../styles/EditForm";
import {FaPlusSquare} from "react-icons/fa";
import Table from "../../../components/Table";
import { Container,Content } from "../../../components/Wrappers/Containers";
import { getSlides, deleteSlides } from "../../../services/requests/slides";
import Header from "../../../components/Header/BackOffice";
import { Avatar } from "../../../components/Inputs/styles";
import {HeaderButtons,AddButton,SectionTitle} from "../../../styles/BackOffice";
import Modal, {ModalBody} from "../../../components/Modal";
import Pagination from "../../../components/Pagination";


function EditForm() {


  //CREATION OF STATES
  const [sliders, setSlides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({display: false,instance: null,});
  const [pagination, setPagination] = useState({});
  const resultsLimit = 10;





  useEffect(() => {
    getSlider(currentPage);
  }, [currentPage]);





 //GET SLIDERS
  async function getSlider(page) {
  const {success,data: slidesData,errorMessage,} = await getSlides(page, resultsLimit);
  if(success) {
  const { items, ...pagination } = slidesData;
  setSlides(items);
  setPagination(pagination);
  }else{
  toast.error("Error al obtener sliders: " + errorMessage);
  }}




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
  if (success) {getSlider(currentPage)} 
  else {
  toast.error("Error al eliminar Sliders");
  }}}






  return (
      <Container>
      <Toaster/>
      <Header/>
      <Modal size="sm" show={formData.display} onClose={() => hideForm()}>
      <ModalBody>
      <SliderEditor
      data={formData.instance}
      onSuccess={() => onUpdated()}
      />
      </ModalBody>
      </Modal>
      <Content>
      <SectionTitle>Sliders</SectionTitle>
      <HeaderButtons>
      <AddButton onClick={()=>{onCreate()}} style={{ background: "green" }}>
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
      <Avatar
      src={item.imageURL}
      onClick={() => showEntryPicture(item.imageURL)}
      />
      </td>
      <td>{item.text}</td>
      <td>{item.createdAt && moment(item.createdAt).format("DD/MM/yyyy")}</td>
      <td>{item.updatedAt && moment(item.updatedAt).format("DD/MM/yyyy")}</td>
      <td>
      <Button type="button" style={editButtonStyle} onClick={()=>{onEdit(item)}}>
      <FiEdit />
      </Button>
      <Button type="button" style={deleteButtonStyle} onClick={()=>{onDelete(item.id)}}>
      <FiTrash2 />
      </Button>
      </td>
      </tr>
      );
      })}
      </tbody>
      </Table>
      {pagination &&
      <Pagination
      onPageChange={goToPage}
      totalPages={pagination.pages || 0}/>}
      </>
            
      </Content>
      </Container>
  );
}

const editButtonStyle = {
  width: '40px',
  height: '40px',
  background: 'orange'
}

const deleteButtonStyle = {
  width: '40px',
  height: '40px',
  background: 'red'
}



export default EditForm;