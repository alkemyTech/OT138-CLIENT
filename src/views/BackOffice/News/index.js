import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import moment from "moment";
import {
  getAllNews as getAllNewsService,
  deleteEntry as deleteEntryService,
} from "../../../services/requests/news";
import toast from "react-hot-toast";
import { Button, ButtonGroup } from "../../../components/Inputs";
import { Content } from "../../../components/Wrappers/Containers";
import Pagination from "../../../components/Pagination";
import {
  FaEdit,
  FaPencilAlt,
  FaPlus,
  FaPlusSquare,
  FaTrash,
} from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import Modal, {
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "../../../components/Modal";
import {
  HeaderButtons,
  AddButton,
  SectionTitle,
} from "../../../styles/BackOffice";
import NewsEditor from "./NewsEditor";
import { Avatar, TextWrapper } from "../../../components/Inputs/styles";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { createArrayOfObjects } from "../../../helpers";

export default function News() {
  const [resultsLimit, setResultsLimit] = useState(10);
  const [news, setNews] = useState(createArrayOfObjects(resultsLimit));
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [lockedEntryIds, setLockedEntryIds] = useState([]);
  const [formData, setFormData] = useState({
    display: false,
    instance: null,
  });
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    getNews(currentPage);
  }, []);

  async function getNews(page) {
    setTableLoading(true);
    const {
      success,
      data: newsData,
      errorMessage,
    } = await getAllNewsService(page, resultsLimit);

    if (success) {
      const { items, ...pagination } = newsData;
      setNews(items);
      setPagination(pagination);
    } else {
      toast.error("Error al obtener novedades: " + errorMessage);
    }
    setTableLoading(false);
  }

  async function goToPage(page) {
    setCurrentPage(page);
    getNews(page);
  }

  function showEntryContent(content) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      title: "Contenido",
      text: content,
    });
  }

  function showEntryPicture(url) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      imageUrl: url,
      imageAlt: "Entry image",
    });
  }

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
      setLockedEntryIds((state) => [...state, id]);

      const { success, errorMessage } = await deleteEntryService(id);

      if (success) {
        getNews(currentPage);
      } else {
        toast.error("Error al eliminar entrada: ", errorMessage);
      }

      setLockedEntryIds((state) => state.filter((entryId) => entryId !== id));
    }
  }

  function onEdit(instance) {
    setFormData({
      display: true,
      instance: instance,
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

  function onUpdated() {
    hideForm();
    getNews(currentPage);
  }

  return (
    <>
      <Modal size="sm" show={formData.display} onClose={() => hideForm()}>
        <ModalBody>
          <NewsEditor
            data={formData.instance}
            onSuccess={(entry) => onUpdated()}
          />
        </ModalBody>
      </Modal>
      <Content>
        <SectionTitle>Novedades</SectionTitle>
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
              <th width="50%">Contenido</th>
              <th width="15%">Fecha de Creación</th>
              <th width="10%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {news.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>
                    {tableLoading?<AvatarSkeleton/>:<AvatarWithSkeleton
                      src={entry.image}
                      onClick={() => showEntryPicture(entry.image)}
                    />}
                  </td>
                  <td>{tableLoading?<Skeleton/>:entry.name}</td>
                  <td onClick={() => showEntryPicture(entry.image)}>
                    {tableLoading?<Skeleton/>:<div class="parent">
                      <div class="child">{entry.content}</div>
                    </div>}
                  </td>

                  <td>
                    {tableLoading?<Skeleton/>:entry.createdAt &&
                      moment(entry.createdAt).format("DD/MM/yyyy")}
                  </td>
                  <td>
                    {tableLoading?<Skeleton/>:<ButtonGroup align="center" gap={"8px"}>
                      {lockedEntryIds.includes(entry.id) ? (
                        <TailSpin height="40" width="40" color="grey" />
                      ) : (
                        <>
                          <Button
                            style={editButtonStyle}
                            onClick={() => onEdit(entry)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            style={deleteButtonStyle}
                            onClick={() => onDelete(entry.id)}
                          >
                            <FaTrash />
                          </Button>
                        </>
                      )}
                    </ButtonGroup>}
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

function AvatarSkeleton(){
  return(<Skeleton circle={true} width="45px" height="45px"/>)
}

function AvatarWithSkeleton(props){
  const[loaded, setLoaded] = useState(false)
  return(<>
    <Avatar {...props} onLoad={() => setLoaded(true)} style={loaded?{}:{display:"none"}}/>
    {!loaded && <AvatarSkeleton/>}
  </>)
}