import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from 'moment';
import { getCategories } from '../../services/requests/categories';
import toast from 'react-hot-toast';
import { Button, ButtonGroup } from "../../components/Inputs";
import { CategoriesContainer } from '../../styles/Categories';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const { success, data: categories, errorMessage } = await getCategories();
        const result = await getCategories();
        window.alert(JSON.stringify(result));

        if (success) {
            setCategories(categories);
        } else {
            toast.error('Error fetching categories: ' + errorMessage);
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