import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import {
  getCategories as getCategoriesService,
  deleteCategory as deleteCategoryService,
  updateCategory,
  createCategory,
} from "../../services/requests/categories";
import toast from "react-hot-toast";
import { Button, ButtonGroup } from "../../components/Inputs";
import { Content } from "../../components/Wrappers/Containers";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import Modal, { ModalBody, ModalHeader } from "../../components/Modal";
import Form from "../../components/Form";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [lockedCategoryIds, setLockedCategoryIds] = useState([]);

  // CategoryForm metadata
  const [formData, setFormData] = useState({
    display: false,
    instance: null,
  });

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const {
      success,
      data: categories,
      errorMessage,
    } = await getCategoriesService();

    if (success) {
      setCategories(categories);
    } else {
      toast.error("Error al obtener categorías");
    }
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
        // Remove deleted category from categories array.
        setCategories((state) =>
          state.filter((category) => category.id !== id)
        );
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
  function onCategoryUpdated(instance) {
    hideForm();
    const categoriesCopy = [...categories];
    const index = categoriesCopy.findIndex(
      (category) => category.id === instance.id
    );
    if (index >= 0) {
      // Category was updated
      categoriesCopy[index] = instance;
    } else {
      // Category was created
      categoriesCopy.push(instance);
    }
    setCategories(categoriesCopy);
  }

  return (
    <>
      <Modal show={formData.display} onClose={() => hideForm()}>
        <ModalHeader>
          <h3>
            {formData.instance === null ? "Crear" : "Actualizar"} categoría
          </h3>
        </ModalHeader>
        <ModalBody>
          <CategoryForm
            instance={formData.instance}
            onSuccess={(instance) => onCategoryUpdated(instance)}
            onCancel={() => hideForm()}
          />
        </ModalBody>
      </Modal>
      <Content>
        <h2>Categorías</h2>
        <Button onClick={onCreateCategoryClick}>Nueva</Button>
        <Table
          headers={["Nombre", "Descripción", "Actualizado", ""]}
          data={categories.map((category) => {
            return {
              ...category,
              buttons: (
                <ButtonGroup align="center">
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
                </ButtonGroup>
              ),
            };
          })}
          accessors={[
            {
              name: "name",
            },
            {
              name: "description",
            },
            {
              name: "updatedAt",
              applyFunction: (item) => moment(item).format("DD/MM/YY"),
            },
            {
              name: "buttons",
            },
          ]}
        />
      </Content>
    </>
  );
}

/**
 * Form component to create or update a category.
 * @param {*} props Receives:
 *      - instance: (optional) existing category. If null, the component will render a form to create a category
 *      - onCancel: (required) Callback function to run after clicking the cancel button
 *      - onSuccess: (optional) Callback function to run after a successful update or create.
 *          Sends the new or updated instance as the first argument of the function.
 */
function CategoryForm({ instance, onCancel, onSuccess }) {
  const [errors, setErrors] = useState({});

  async function handleSubmit(values) {
    if (instance !== null) {
      const { success, data, errorMessage, errorFields } = await updateCategory(
        instance.id,
        values
      );
      if (success) {
        if (onSuccess) onSuccess(data);
      } else {
        toast.error("Error al actualizar categoría: " + errorMessage);
        setErrors(errorFields);
      }
    } else {
      const { success, data, errorMessage, errorFields } = await createCategory(
        values
      );
      if (success) {
        if (onSuccess) onSuccess(data);
      } else {
        toast.error("Error al crear categoría: " + errorMessage);
        setErrors(errorFields);
      }
    }
  }

  return (
    <Form
      fields={[
        {
          name: "name",
          type: "text",
          placeholder: "Nombre",
          label: "Nombre",
        },
        {
          name: "description",
          type: "textarea",
          placeholder: "Descripción",
          label: "Descripción",
        },
      ]}
      instance={instance}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      errors={errors}
    />
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
