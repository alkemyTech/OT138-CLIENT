import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import {
  getCategories as getCategoriesService,
  deleteCategory as deleteCategoryService,
} from "../../services/requests/categories";
import toast from "react-hot-toast";
import { Button, ButtonGroup } from "../../components/Inputs";
import { Content } from "../../components/Wrappers/Containers";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [lockedCategoryIds, setLockedCategoryIds] = useState([]);

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
    if (window.confirm('Confirmar eliminación')) {
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
