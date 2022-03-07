import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import {
  getCategories as getCategoriesService,
  deleteCategory as deleteCategoryService,
  updateCategory,
  createCategory,
} from "../../services/requests/categories";
import toast from "react-hot-toast";
import { Button, ButtonGroup, Input, Label } from "../../components/Inputs";
import { Content } from "../../components/Wrappers/Containers";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import Modal, { ModalBody, ModalHeader } from "../../components/Modal";
import Form from "../../components/Form";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [lockedCategoryIds, setLockedCategoryIds] = useState([]);
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
      toast.error("Error fetching categories: " + errorMessage);
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
        toast.error("Error deleting category: " + errorMessage);
      }

      setLockedCategoryIds((state) =>
        state.filter((categoryId) => categoryId !== id)
      );
    }
  }

  function onEditCategory(category) {
    setFormData({
      display: true,
      instance: category,
    });
  }

  function onCreateCategory() {
    setFormData({
      display: true,
      instance: null,
    });
  }

  function onHideForm() {
    setFormData({
      display: false,
      instance: null,
    });
  }

  function onCategoryUpdated(instance) {
    onHideForm();
    const categoriesCopy = [...categories];
    const index = categoriesCopy.findIndex(
      (category) => category.id === instance.id
    );
    if (index >= 0) {
      categoriesCopy[index] = instance;
    } else {
      categoriesCopy.push(instance);
    }
    setCategories(categoriesCopy);
  }

  return (
    <Content>
      <Modal show={formData.display} onClose={() => onHideForm()}>
        <ModalHeader>
          <h3>
            {formData.instance === null ? "Crear" : "Actualizar"} categoría
          </h3>
        </ModalHeader>
        <ModalBody>
          <CategoryForm
            instance={formData.instance}
            onSuccess={(instance) => onCategoryUpdated(instance)}
            onCancel={() => onHideForm()}
          />
        </ModalBody>
      </Modal>
      <h2>Categorías</h2>
      <Button onClick={onCreateCategory}>Nueva</Button>
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
                      onClick={() => onEditCategory(category)}
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
  async function handleSubmit(values) {
    if (instance !== null) {
      const { success, data, errorMessage } = await updateCategory(
        instance.id,
        values
      );
      if (success) {
        if (onSuccess) onSuccess(data);
      } else {
        toast.error("Error al actualizar categoría: " + errorMessage);
      }
    } else {
      const { success, data, errorMessage } = await createCategory(values);
      if (success) {
        if (onSuccess) onSuccess(data);
      } else {
        toast.error("Error al crear categoría: " + errorMessage);
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
