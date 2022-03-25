import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import moment from "moment";
import {
  getCategories as getCategoriesService,
  deleteCategory as deleteCategoryService,
} from "../../../services/requests/categories";
import toast from "react-hot-toast";
import { Button, ButtonGroup } from "../../../components/Inputs";
import { Content } from "../../../components/Wrappers/Containers";
import { SectionTitle } from "../../../styles/BackOffice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { FaPlusSquare } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from '../../../components/Modal';
import { HeaderButtons, AddButton } from "../../../styles/BackOffice";
import CategoryForm from "./CategoryForm";
import Pagination, { SelectLimit } from "../../../components/Pagination";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { createArrayOfObjects } from "../../../helpers";

export default function Categories() {
  const limitOptions = [10, 15, 25, 50];

  const [pageLimit, setPageLimit] = useState(limitOptions[0]);
  const [categories, setCategories] = useState(createArrayOfObjects(pageLimit));
  const [lockedCategoryIds, setLockedCategoryIds] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLoading, setTableLoading] = useState(true);

  async function goToPage(page) {
    setCurrentPage(page);
    getCategories(page);
  }
  // CategoryForm metadata
  const [formData, setFormData] = useState({
    display: false,
    instance: null,
  });

  useEffect(() => {
    setCurrentPage(1);
    getCategories(1);
  }, [pageLimit]);

  async function getCategories(page) {
    setTableLoading(true);
    const {
      success,
      data: categories,
      errorMessage,
    } = await getCategoriesService(page, pageLimit);

    if (success) {
      const { items, ...pagination } = categories;
      setCategories(items);
      setPagination(pagination)
    } else {
      toast.error('Error al obtener categorías');
    }
    setTableLoading(false);
  }

  async function onDeleteCategory(id) {
    const result = await Swal.fire({
      title: "Confirmar eliminación",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      icon: "warning",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "red",
    });

    if (result.isConfirmed) {
      setLockedCategoryIds((state) => [...state, id]);

      const { success, errorMessage } = await deleteCategoryService(id);

      if (success) {
        getCategories();
      } else {
        toast.error("Error al eliminar categoría");
      }

      setLockedCategoryIds((state) =>
        state.filter((categoryId) => categoryId !== id)
      );
    }
  }

  function onEditCategoryClick(category) {
    setFormData({
      display: true,
      instance: category,
    });
  }

  function onCreateCategoryClick() {
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

  // Update categories array after CategoryForm's onSuccess callback is triggered.
  function onCategoryUpdated() {
    hideForm();
    getCategories();
  }

  return (
    <>
      <Modal
        open={formData.display}
        onClose={hideForm}
        center
        closeOnOverlayClick={false}
      >
        {formData.instance === null ? "Crear" : "Actualizar"} categoría
        <CategoryForm
          instance={formData.instance}
          onSuccess={(instance) => onCategoryUpdated()}
          onCancel={() => hideForm()}
        />
      </Modal>
      <Content>
        <SectionTitle>Categorías</SectionTitle>
        <HeaderButtons>
          <SelectLimit onSelect={value => setPageLimit(value)} options={limitOptions} />
          <AddButton
            onClick={onCreateCategoryClick}
            style={{ background: "green" }}
          >
            <FaPlusSquare /> <b>Crear</b>
          </AddButton>
        </HeaderButtons>
        <Table>
          <thead>
            <tr>
              <th width="20%">Nombre</th>
              <th width="50%">Descripción</th>
              <th width="20%">Actualizado</th>
              <th width="10%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{tableLoading ? <StyledSkeleton /> : category.name}</td>
                  <td>{tableLoading ? <StyledSkeleton /> : category.description}</td>
                  <td>
                    {tableLoading ? <StyledSkeleton /> : category.updatedAt &&
                      moment(category.updatedAt).format("DD/MM/YY")}
                  </td>
                  <td>
                    {tableLoading ? <StyledSkeleton /> : <ButtonGroup align="center" gap="8px">
                      {lockedCategoryIds.includes(category.id) ? (
                        <TailSpin height="40" width="40" color="grey" />
                      ) : (
                        <>
                          <Button
                            style={editButtonStyle}
                            onClick={() => onEditCategoryClick(category)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            style={deleteButtonStyle}
                            onClick={() => onDeleteCategory(category.id)}
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

function StyledSkeleton() {
  return (
    <Skeleton style={{ margin: "10px 0px" }} />
  )
}