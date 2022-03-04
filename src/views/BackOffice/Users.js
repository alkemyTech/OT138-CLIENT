import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getUsers } from "../../services/requests/users";
import { CategoriesContainer as UsersContainer } from "../../styles/Categories";
import { Button, ButtonGroup } from "../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const { success, data: users, errorMessage } = await getUsers();
    console.log(JSON.stringify(await getUsers()));

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

  return (
    <UsersContainer>
      <h2>Usuarios</h2>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0
            ? users.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <ButtonGroup alignEnd>
                        <Button style={buttonStyles("orange")}>
                          <FaEdit />
                        </Button>
                        <Button style={buttonStyles("red")}>
                          <FaTrash />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </UsersContainer>
  );
}
