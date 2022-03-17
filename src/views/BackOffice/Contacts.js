import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import moment from "moment";
import { getContacts as getContactsService } from "../../services/requests/contacts";
import toast from "react-hot-toast";
import { SectionTitle } from "../../styles/BackOffice";
import Pagination from "../../components/Pagination";
import { Button } from "../../components/Inputs";
import { Content } from "../../components/Wrappers/Containers";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

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

  function showMessage(sender, message) {
    Swal.fire({
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cerrar",
      cancelButtonColor: "green",
      title: `Mensaje de ${sender}`,
      text: message,
    });
  }

  return (
    <Content>
      <SectionTitle>Contactos</SectionTitle>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => {
            return (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>

                <td>
                  {contact.createdAt &&
                    moment(contact.createdAt).format("DD/MM/YY")}
                </td>
                <td>
                  <Button
                    style={buttonStyle}
                    onClick={() => showMessage(contact.name, contact.message)}
                  >
                    <FaEye />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pagination && (
        <Pagination
          onPageChange={goToPage}
          totalPages={pagination.pages || 0}
        />
      )}
    </Content>
  );
}

const buttonStyle = {
  backgroundColor: "#2FA4FF",
  color: "#fff",
  fontWeight: "600",
  height: "35px",
  width: "auto",
};
