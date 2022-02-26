import React from "react";
import { useQuery } from "react-query";
import { getActivities } from "../../services/requests/activities";
import Loading from "../Loading";
import Activity from "./Cards";
import { ActivitiesContainer, ActivitiesContent } from "./styles";

export default function Activities() {
  const limit = 4;
  const currentPage = 1;
  const {
    data: activities,
    isLoading,
    isFetching,
    isError,
  } = useQuery(
    ["activities", limit, currentPage],
    () => getActivities(limit, currentPage),
    {
      retry: false,
    }
  );
  return (
    <>
      {!isError && (
        <ActivitiesContainer>
          <h2 className="activities__title">Nuestras Actividades</h2>
          <p className="activities__subtitle">
            ¿Qué estás esperando, intégrate?
          </p>
          <ActivitiesContent>
            {!isLoading ? (
              !activities?.data.error && !isError ? (
                activities?.data?.result?.activities?.map((activity) => {
                  const { id, name, image, content } = activity;
                  return (
                    <Activity
                      key={id}
                      id={id}
                      name={name}
                      content={content}
                      image={image}
                    />
                  );
                })
              ) : (
                <h1>¡En este momento no contamos con Actividades!</h1>
              )
            ) : !isLoading && !isFetching && activities?.data?.error ? (
              <h1>¡En este momento no contamos con Actividades!</h1>
            ) : (
              <Loading />
            )}
          </ActivitiesContent>
        </ActivitiesContainer>
      )}
    </>
  );
}
