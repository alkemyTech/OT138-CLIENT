import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from 'moment';
import {
    getCategories as getCategoriesService,
    deleteCategory as deleteCategoryService
} from '../../services/requests/categories';
import toast from 'react-hot-toast';
import { Button, ButtonGroup } from "../../components/Inputs";
import { CategoriesContainer } from '../../styles/Categories';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        const { success, data: categories, errorMessage } = await getCategoriesService();

        if (success) {
            setCategories(categories);
        } else {
            toast.error('Error fetching categories: ' + errorMessage);
        }
    }

    async function deleteCategory(id) {
        const { success, errorMessage } = await deleteCategoryService();

        if (success) {
            setCategories(state => state.filter(category => category.id !== id)); // Remove deleted category from categories array.
        } else {
            toast.error('Error deleting category: ' + errorMessage);
        }
    }

    return (
        <CategoriesContainer>
            <h2>Categorías</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Actualizada</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.updatedAt ? moment(item.updatedAt).format('DD/MM/YY') : ''}</td>
                                    <td>
                                        <ButtonGroup alignEnd>
                                            <Button style={editButtonStyle}>{<FaEdit />}</Button>
                                            <Button style={deleteButtonStyle}><FaTrash /></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </CategoriesContainer>
    )
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