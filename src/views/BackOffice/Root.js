import React from "react";
import Loading from "../../components/Loading";

export default function Backoffice() {
    return (
        <>
            <h1 style={{ textAlign: "center", margin: "5px 0" }}>
                Bienvenido/a al BackOffice de Alkemy ONG
            </h1>
            <p style={{ textAlign: "center", margin: "5px 0" }}>
                ¡Sección en Construcción!
            </p>
            <Loading />
        </>
    );
}
