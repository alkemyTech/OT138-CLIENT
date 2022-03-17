import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory, useNavigate } from "react-router-dom";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import Activity from "../components/Activities/Cards";
import Article from "../components/Article";
import { Footer } from "../components/Footer";
import Header from "../components/Header/Landing";
import Loading from "../components/Loading";
import { Container, Content } from "../components/Wrappers/Containers";
import {
  getActivities,
  getActivitiesById,
} from "../services/requests/activities";
import { ActivitiesContainer } from "../styles/Activities";
import Banner from "../components/Banner";
import toast from "react-hot-toast";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [pagination, setPagination] = useState({
    pages: 1,
    count: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery(
    ["activities", limit, currentPage],
    () => getActivities(limit, currentPage),
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (response) {
      if (response.data.error) {
        toast.error("Error al obtener actividades");
      } else {
        const { items, ...pagination } = response.data.result;
        setActivities(items);
        setPagination(pagination);
      }
    }
  }, [response]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  async function goToPage(page) {
    setCurrentPage(page);
  }

  return (
    <Container>
      <Header />
      <Content>
        <Banner title={"Actividades"} thumbnail={"/activities__banner.jpg"} />
        <ActivitiesContainer>
          {isLoading || isFetching ? (
            <Loading />
          ) : activities && activities.length > 0 ? (
            activities.map((activity) => {
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
            <h2>¡En este momento no contamos con Actividades!</h2>
          )}
        </ActivitiesContainer>
        <div className="divider">
          {pagination && (
            <Pagination onPageChange={goToPage} totalPages={pagination.pages} />
          )}
        </div>
      </Content>
      <Footer />
    </Container>
  );
}

export const ActivitiesByID = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useQuery(["activities-id", id], () => getActivitiesById(id));

  return (
    <Container>
      <Header />
      <Content>
        {isLoading || isFetching ? (
          <Loading />
        ) : !isError && !response.data.error ? (
          <Article
            key={response?.data?.result.id}
            id={response?.data?.result.id}
            title={response?.data?.result.title}
            content={response?.data?.result.content}
            thumbnail={response?.data?.result.image}
          />
        ) : (
          <h3>Actividad no encontrada</h3>
        )}
      </Content>
      <Footer />
    </Container>
  );
};
