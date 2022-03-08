import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Pagination from "react-responsive-pagination";
import { useNavigate, useParams } from "react-router-dom";
import Article from "../components/Article";
import Banner from "../components/Banner";
import { Footer } from "../components/Footer";
import Header from "../components/Header/Landing";
import Loading from "../components/Loading";
import New from "../components/News/Cards";
import { Container, Content } from "../components/Wrappers/Containers";
import { getNews, getNewsById } from "../services/requests/news";
import { NewsContainer } from "../styles/News";

export default function News() {
  let totalPages;
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const {
    data: news,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    ["novedades", limit, currentPage],
    () => getNews(limit, currentPage),
    {
      retry: false,
    }
  );
  useEffect(() => {
    refetch();
  }, [currentPage]);

  totalPages = Math.ceil(news?.data?.result?.count / limit);
  return (
    <Container>
      <Header />
      <Banner title={"Listado de Novedades"} thumbnail={"/news__banner.jpg"} />
      <Content>
        <NewsContainer>
          {!isLoading ? (
            !news?.data?.error && !isError ? (
              news?.data?.result?.items?.map((news_item) => {
                const { id, name, image, content } = news_item;
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
          ) : !isLoading && !isFetching && news?.data?.error && isError ? (
            <h1>¡No se encontraron Novedades!</h1>
          ) : (
            <Loading />
          )}
        </NewsContainer>
        {!isLoading && (
          <div className="divider">
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={setCurrentPage}
              style={{ justifySelf: "end" }}
            />
          </div>
        )}
      </Content>
      <Footer />
    </Container>
  );
}

export const NewsByID = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const {
    data: news,
    isLoading,
    isFetching,
    isError,
  } = useQuery(["news-id", id], () => getNewsById(id));
  useEffect(() => {
    const fetchData = async () => {
      try {
        if ((news?.data && news?.data?.result?.length) <= 0 || isError)
          return navigate("/novedades");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [news?.data]);

  return (
    <Container>
      <Header />
      <Content>
        <Article
          key={id}
          id={id}
          title={news?.data?.result?.name}
          content={news?.data?.result?.content}
          thumbnail={news?.data?.result?.image}
        />
      </Content>
      <Footer />
    </Container>
  );
};
