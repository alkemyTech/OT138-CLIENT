import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getUsers } from "../../services/requests/users";
import { SectionWrapper as UsersContainer } from "../../styles/BackOffice";
import { Button, ButtonGroup } from "../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const { success, data: users, errorMessage } = await getUsers();
    //console.log(JSON.stringify(await getUsers()));

    if (success) {
      setUsers(users);
    } else {
      toast.error(`Error fetching users: ${errorMessage}`);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function buttonStyles(color) {
    return {
      width: "40px",
      height: "40px",
      background: color,
    };
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function buttonStyles(color) {
    return {
      width: "40px",
      height: "40px",
      background: color,
    };
  }

  return (
    <UsersContainer>
      <h2>Usuarios</h2>
      <Table
        headers={["Nombre", "Apellido", "Email", ""]}
        data={users.map((user) => {
          return {
            ...user,
            buttons: (
              <ButtonGroup alignEnd>
                <Button style={buttonStyles("orange")}>
                  <FaEdit />
                </Button>
                <Button style={buttonStyles("red")}>
                  <FaTrash />
                </Button>
              </ButtonGroup>
            ),
          };
        })}
        accessors={[
          {
            name: "firstName",
          },
          {
            name: "lastName",
          },
          {
            name: "email",
          },
          {
            name: "buttons",
          },
        ]}
      />
    </UsersContainer>
  );
}
