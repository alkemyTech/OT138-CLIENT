import React from "react";
import { useQuery } from "react-query";
import { getNews } from "../../services/requests/news";
import Loading from "../Loading";
import New from "./Cards";
import { NewsContainer, NewsContent } from "./styles";

export default function News() {
  const limit = 4;
  const currentPage = 1;
  const {
    data: activities,
    isLoading,
    isFetching,
    isError,
  } = useQuery(
    ["novedades", limit, currentPage],
    () => getNews(limit, currentPage),
    {
      retry: false,
    }
  );
  return (
    <>
      {!isError && (
        <NewsContainer>
          <h2 className="activities__title">Nuestras Actividades</h2>
          <p className="activities__subtitle">
            ¿Qué estás esperando, intégrate?
          </p>
          <NewsContent>
            {!isLoading ? (
              !activities?.data.error && !isError ? (
                activities?.data?.result?.activities?.map((activity) => {
                  const { id, name, image, content } = activity;
                  return (
                    <New
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
          </NewsContent>
        </NewsContainer>
      )}
    </>
  );
}
