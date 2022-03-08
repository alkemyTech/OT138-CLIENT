import React, { useEffect, useState } from 'react';
import { updateCategory, createCategory } from '../../../services/requests/categories';
import Form from '../../../components/Form';
import toast from 'react-hot-toast';
import { SubmitButton, CancelButton, InputFeedback } from '../../../components/Form/styles';
import { useFormik } from 'formik';
import { Input, ButtonGroup, Label } from '../../../components/Inputs';
import * as Yup from 'yup';

/**
 * Form component to create or update a category.
 * @param {*} props Receives:
 *      - instance: (optional) existing category. If null, the component will render a form to create a category
 *      - onCancel: (required) Callback function to run after clicking the cancel button
 *      - onSuccess: (optional) Callback function to run after a successful update or create.
 *          Sends the new or updated instance as the first argument of the function.
 */
export default function ({ instance, onCancel, onSuccess }) {
    const [backendValidationErrors, setBackendValidationErrors] = useState({});

    async function submit(values) {
        if (instance !== null) {
            const { success, data, errorMessage, errorFields } = await updateCategory(
                instance.id,
                values
            );
            if (success) {
                if (onSuccess) onSuccess(data);
            } else {
                toast.error('Error al actualizar categoría: ' + errorMessage);
                setBackendValidationErrors(errorFields);
            }
        } else {
            const { success, data, errorMessage, errorFields } = await createCategory(
                values
            );
            if (success) {
                if (onSuccess) onSuccess(data);
            } else {
                toast.error('Error al crear categoría: ' + errorMessage);
                setBackendValidationErrors(errorFields);
            }
        }
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .max(255, 'No debe superar los 255 caracteres')
            .required('Campo requerido'),
        description: Yup.string()
            .max(255, 'No debe superar los 255 caracteres')
            .required('Campo requerido'),
    });

    const formik = useFormik({
        initialValues: {
            name: instance?.name ?? '',
            description: instance?.description ?? ''
        },
        validationSchema,
        onSubmit: (values) => { submit(values) }
    });

    useEffect(() => {
        formik.setValues({
            name: instance?.name ?? '',
            description: instance?.description ?? ''
        })
    }, [instance]);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Label>Nombre</Label>
            <Input
                name='name'
                placeholder='Nombre'
                type='text'
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            {
                backendValidationErrors.name &&
                <InputFeedback type='error'>{backendValidationErrors.name}</InputFeedback>
            }
            {
                backendValidationErrors.description &&
                <InputFeedback type='error'>{backendValidationErrors.description}</InputFeedback>
            }

            <Label>Descripción</Label>
            <Input
                name='description'
                type='text'
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder='Descripción'
            />
            {
                formik.touched.description && formik.errors.description &&
                <InputFeedback type='error'>{formik.errors.description}</InputFeedback>
            }

            <ButtonGroup align='center' gap='5px'>
                <SubmitButton type='submit'>
                    {instance ? 'Actualizar' : 'Enviar'}
                </SubmitButton>
                <CancelButton type='button' onClick={onCancel}>
                    Cerrar
                </CancelButton>
            </ButtonGroup>
        </Form>
    );
}