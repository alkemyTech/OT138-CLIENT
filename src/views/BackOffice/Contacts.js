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
      title: `Mesaje de ${sender}:`,
      text: message,
    });
  }

  return (
    <Content>
      <SectionTitle>Contactos</SectionTitle>
      <Table
        headers={["Nombre", "Teléfono", "Email", "Mensaje", "Actualizado"]}
        data={contacts.map((item) => {
          return {
            ...item,
            message: (
              <Button
                style={buttonStyle}
                onClick={() => showMessage(item.name, item.message)}
              >
                Mostrar
              </Button>
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

const buttonStyle = {
  backgroundColor: "#2FA4FF",
  color: "#fff",
  fontWeight: "600",
  height: "35px",
  width: "auto",
};
