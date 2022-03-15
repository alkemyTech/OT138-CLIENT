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
    data: news,
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
          <h2 className="activities__title">Últimas Novedades</h2>
          <p className="activities__subtitle">
            Enteráte de lo que está pasando en Somos Más
          </p>
          <NewsContent>
            {!isLoading ? (
              !news?.data.error && !isError ? (
                news?.data?.result?.items?.map((item) => {
                  const { id, name, image, content } = item;
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
                <h1>¡En este momento no contamos con Novedades!</h1>
              )
            ) : !isLoading && !isFetching && news?.data?.error ? (
              <h1>¡En este momento no contamos con Novedades!</h1>
            ) : (
              <Loading />
            )}
          </NewsContent>
        </NewsContainer>
      )}
    </>
  );
}
