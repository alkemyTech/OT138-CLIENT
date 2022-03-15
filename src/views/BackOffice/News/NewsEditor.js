import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/BackOffice';
import { Footer } from '../../../components/Footer';
import EntryEditor from '../../../components/EntryEditor';
import { Container, Content } from '../../../components/Wrappers/Containers';
import { createNewsEntry, updateEntry } from '../../../services/requests/news';
import toast, { Toaster } from 'react-hot-toast';

function NewsEditor({ data, onSuccess }) {

    const save = async (formData) => {
        console.log(formData)
        if (data) {
            // If there is an existing ID, then the form has to update the existing data on new
            const { success, data: updatedEntry, errorMessage } = await updateEntry(data.id, formData);

            if (success) {
                toast.success("Guardado con éxito");
                onSuccess(updatedEntry);
            } else {
                toast.error("Error al actualizar: " + errorMessage);
            }
        } else {
            // Else, the form has to create a new new
            const { success, data: createdEntry, errorMessage } = await createNewsEntry(formData);

            if (success) {
                toast.success("Entrada creada con éxito");
                onSuccess(createdEntry);
            } else {
                toast.error("Error al crear entrada: " + errorMessage);
            }
        }
    }

    return (
        <EntryEditor
            id={data?.id ?? null}
            state={"ready"}
            entryType={"Novededes"}
            get={() => { }}
            save={save}
            data={data ?? {}}
            fields={[
                {
                    name: 'name',
                    title: 'Nombre',
                    type: 'text'
                },
                {
                    name: 'image',
                    title: 'Url de imagen',
                    type: 'text'
                },
                {
                    name: 'content',
                    title: 'Contenido',
                    type: 'content'
                },
                {
                    name: 'categoryId',
                    title: 'Categoría',
                    type: 'select',
                    defaultValue: 1,
                    options: categoriesOptions
                }
            ]}
        />
    )
}

export default NewsEditor;

const categoriesOptions = [
    {
        value: 1,
        text: "General"
    },
    {
        value: 2,
        text: "Actualidad"
    }
]