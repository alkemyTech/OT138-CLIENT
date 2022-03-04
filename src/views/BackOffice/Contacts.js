import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from 'moment';
import {
    getContacts as getContactsService,
} from '../../services/requests/contacts';
import toast from 'react-hot-toast';
import { SectionWrapper } from '../../styles/BackOffice';

export default function Categories() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        const { success, data: contacts, errorMessage } = await getContactsService();

        if (success) {
            setContacts(contacts);
        } else {
            toast.error('Error fetching categories: ' + errorMessage);
        }
    }

    return (
        <SectionWrapper>
            <h2>Categorías</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Mensaje</th>
                        <th>Actualizado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.updatedAt ? moment(item.updatedAt).format('DD/MM/YY') : ''}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </SectionWrapper>
    )
}