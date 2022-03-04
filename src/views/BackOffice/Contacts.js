import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from 'moment';
import {
    getContacts as getContactsService,
} from '../../services/requests/contacts';
import toast from 'react-hot-toast';
import { SectionWrapper, SectionTitle } from '../../styles/BackOffice';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        getContacts();
    }, []);

    async function getContacts() {
        const { success, data: contactsData, errorMessage } = await getContactsService();

        if (success) {
            const { items, ...pagination } = contactsData;
            setContacts(items);
            setPagination(pagination);
        } else {
            toast.error('Error fetching contacts: ' + errorMessage);
        }
    }

    return (
        <SectionWrapper>
            <SectionTitle>Contactos</SectionTitle>
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
                                    <td>{item.message}</td>
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