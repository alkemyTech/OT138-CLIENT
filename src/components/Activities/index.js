import React from "react";
import Activity from "./Cards";
import { ActivitiesContainer, ActivitiesContent } from "./styles";

export default function Activities() {
  return (
    <ActivitiesContainer>
      <h2 className="activities__title">Nuestras Actividades</h2>
      <p className="activities__subtitle">¿Qué estás esperando, intégrate?</p>
      <ActivitiesContent>
        <Activity />
        <Activity />
        <Activity />
        <Activity />
      </ActivitiesContent>
    </ActivitiesContainer>
  );
}
