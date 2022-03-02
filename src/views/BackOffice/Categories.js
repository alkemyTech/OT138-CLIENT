import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getCategories } from '../../services/requests/categories';
import toast from 'react-hot-toast';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const {success, data: categories, errorMessage} = await getCategories();
        
        if(success) {
            setCategories(categories);
        } else {
            toast.error('Error fetching categories: ' + errorMessage);
        }
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Fecha creación</th>
                        <th>Fecha actualización</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}