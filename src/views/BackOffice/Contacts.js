import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import { getContacts as getContactsService } from "../../services/requests/contacts";
import toast from "react-hot-toast";
import { SectionTitle } from "../../styles/BackOffice";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import { Content } from "../../components/Wrappers/Containers";
import Alert from "../../components/Alert";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [popUpMessage, setPopUpMessage] = useState({ message: "", show: false});

  useEffect(() => {
    getContacts(currentPage);
  }, []);

  async function getContacts(page) {
    const {
      success,
      data: contactsData,
      errorMessage,
    } = await getContactsService(page);

    if (success) {
      const { items, ...pagination } = contactsData;
      setContacts(items);
      setPagination(pagination);
    } else {
      toast.error("Error fetching contacts: " + errorMessage);
    }
  }

  async function goToPage(page) {
    setCurrentPage(page);
    getContacts(page);
  }

  return (
    <Content>
      <Alert 
        show={popUpMessage.show} 
        onConfirm={() => setPopUpMessage(state => ({...state, show: false}))} 
        description={popUpMessage.message}
        confirmButtonText="Cerrar" 
    />
      <SectionTitle>Contactos</SectionTitle>
      <Table
        headers={["Nombre", "Teléfono", "Email", "Mensaje", "Actualizado"]}
        data={contacts.map((item) => {
          return {
            ...item,
            message: (
              <Link to="#" onClick={() => setPopUpMessage({show: true, message: item.message})}>
                Ver mensaje
              </Link>
            ),
          };
        })}
        accessors={[
          {
            name: "name",
          },
          {
            name: "phone",
          },
          {
            name: "email",
          },
          {
            name: "message",
          },
          {
            name: "updatedAt",
            applyFunction: (item) => moment(item).format("DD/MM/YY"),
          },
        ]}
      />
      {pagination && (
        <Pagination onPageChange={goToPage} totalPages={pagination.pages} />
      )}
    </Content>
  );
}
