import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { getActivities, deleteActivity } from "../../../services/requests/activities";
import { Button, ButtonGroup } from "../../../components/Inputs";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Content } from "../../../components/Wrappers/Containers";
import { HeaderButtons, AddButton, SectionTitle } from "../../../styles/BackOffice";
import Modal, {
    ModalBody,
    ModalHeader,
    ModalTitle,
} from '../../../components/Modal';
import ActivityEditor from "./ActivityEditor";
import Swal from 'sweetalert2';
import Pagination from '../../../components/Pagination';
import moment from "moment";

export default function Activities () {
    const [activities, setActivities] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [lockedEntryIds, setLockedEntryIds] = useState([]);
    const [formData, setFormData] = useState({
        display: false,
        instance: null,
    });

    async function fetchActivities(page) {
        const { data } = await getActivities(pageLimit, page);

        if (!data.error) {
            const { items, ...pagination } = data.result;
            setActivities(items);
            setPagination(pagination);
        } else {
            toast.error(`Error fetching activities: ${data.message}`);
        }
    };

    useEffect(() => {
        fetchActivities(currentPage);
    }, []);

    function buttonStyles(color) {
        return {
            width: "40px",
            height: "40px",
            background: color,
        };
    };

    const showButtonStyle = {
        backgroundColor: "#2FA4FF",
        color: "#fff",
        fontWeight: "600",
        height: "35px",
        width: "auto",
    };

    function changePage(page) {
        setCurrentPage(page);
        fetchActivities(page);
    }

    function onEdit(instance) {
        setFormData({
            display: true,
            instance,
        });
    };

    function onCreate() {
        setFormData({
            display: true,
            instance: null,
        });
    };

    function hideForm() {
        setFormData({
            display: false,
            instance: null,
        });
    };

    function onUpdate() {
        hideForm();
        fetchActivities();
    };

    async function onDelete (id) {
        const result = await Swal.fire({
            title: 'Confirmar eliminación',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            icon: 'warning',
            cancelButtonText: 'cancelar',
            confirmButtonColor: 'red',
        });

        if (result.isConfirmed) {
            setLockedEntryIds(state => [...state, id]);
            
            const { success, errorMessage } = await deleteActivity();

            if (success) {
                fetchActivities();
            } else {
                toast.error(`Error al eliminar entrada: ${errorMessage}`);
            };

            setLockedEntryIds((state) => state.filter(entryId => entryId !== id));
        };
    };

    function showActivityContent(content) {
        Swal.fire({
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Cerrar",
            title: 'Contenido',
            text: content,
        });
    }

    function showActivityPicture(url) {
        Swal.fire({
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: "Cerrar",
            imageUrl: url,
            imageAlt: 'Entry image'
        });
    }

    return (
        <>
            <Modal size='sm' show={formData.display} onClose={() => hideForm()}>
                <ModalBody>
                    <ActivityEditor
                        data={formData.instance}
                        onSuccess={(entry) => onUpdate()}
                    />
                </ModalBody>
            </Modal>
            <Content>
                <SectionTitle>Actividades</SectionTitle>
                <HeaderButtons>
                    <AddButton
                        onClick={onCreate}
                        style={{ background: 'green' }}
                    >
                        Agregar
                    </AddButton>
                </HeaderButtons>
                <Table>
                    <thead>
                        <tr>
                            <th>Actividad</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>Creado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activities.map((activity, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{activity.name}</td>
                                        <td><Button style={showButtonStyle} onClick={() => showActivityContent(activity.content)} >Ver</Button></td>
                                        <td><Button style={showButtonStyle} onClick={() => showActivityPicture(activity.image)} >Ver</Button></td>
                                        <td>{activity.createdAt && moment(activity.createdAt).format('DD/MM/YY')}</td>
                                        <td>
                                            <ButtonGroup align="center">
                                                <Button style={buttonStyles("orange")} onClick={() => onEdit(activity)} >
                                                    <FaEdit />
                                                </Button>
                                                <Button style={buttonStyles("red")} onClick={() => onDelete(activity.id)}>
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
                { pagination && (
                    <Pagination onChangePage={changePage} totalPages={pagination.pages || 0} />
                )}
            </Content>
        </>
    );
};