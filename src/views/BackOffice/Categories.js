import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import {
  getCategories as getCategoriesService,
  deleteCategory as deleteCategoryService,
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
  const [showForm, setShowForm] = useState(true);

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

  async function deleteCategory(id) {
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

  return (
    <Content>
      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <ModalHeader>
          <h3>Crear categoría</h3>
        </ModalHeader>
        <ModalBody>
          <CategoryForm onCancel={() => setShowForm(false)} />
        </ModalBody>
      </Modal>
      <h2>Categorías</h2>
      <Table
        headers={["Nombre", "Descripción", "Actualizado", ""]}
        data={categories.map((c) => {
          return {
            ...c,
            buttons: (
              <ButtonGroup align="center">
                {lockedCategoryIds.includes(c.id) ? (
                  <TailSpin height="40" width="40" color="grey" />
                ) : (
                  <>
                    <Button style={editButtonStyle}>
                      <FaEdit />
                    </Button>
                    <Button
                      style={deleteButtonStyle}
                      onClick={() => deleteCategory(c.id)}
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

function CategoryForm({ instance = {}, onCancel }) {
  function handleSubmit(values) {
    console.log(values);
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
