import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getActivities } from "../../services/requests/activities";
import { Button, ButtonGroup } from "../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Content } from "../../components/Wrappers/Containers";
import { SectionTitle } from "../../styles/BackOffice";

export default function Activities () {
    const [activities, setActivities] = useState([]);

    async function fetchActivities() {
        const { success, data: activities, errorMessage } = await getActivities();

        if (success) {
            setActivities(activities);
        } else {
            toast.error(`Error fetching activities: ${errorMessage}`);
        }
    }

    useEffect(() => {
        fetchActivities();
    }, []);

    function buttonStyles(color) {
        return {
            width: "40px",
            height: "40px",
            background: color,
        };
    }

    return (
        <Content>
            <SectionTitle>Actividades</SectionTitle>
            <Table>
                <thead>
                    <tr>
                        <th>Actividad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        activities.map((activity, index) => {
                            return (
                                <tr key={index}>
                                    <td>{activity.name}</td>
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
                            )
                        })
                    }
                </tbody>
            </Table>
        </Content>
    )
};