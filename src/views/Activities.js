import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory, useNavigate } from "react-router-dom";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "react-responsive-pagination";
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

export default function Activities() {
  let totalPages;
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;
  const {
    data: activities,
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
    refetch();
  }, [currentPage]);

  totalPages = Math.ceil(activities?.data?.result?.count / limit);
  return (
    <Container>
      <Header />
      <Content>
        <Banner
          title={"Lista de Actividades"}
          thumbnail={"/activities__banner.jpg"}
        />
        <ActivitiesContainer>
          {!isLoading ? (
            !activities?.data?.error && !isError ? (
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
          ) : !isLoading &&
            !isFetching &&
            activities?.data?.error &&
            isError ? (
            <h1>¡No se encontraron Actividades!</h1>
          ) : (
            <Loading />
          )}
        </ActivitiesContainer>
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

export const ActivitiesByID = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const {
    data: activities,
    isLoading,
    isFetching,
    isError,
  } = useQuery(["activities-id", id], () => getActivitiesById(id));
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          activities?.data &&
          activities?.data?.result?.activities?.length <= 0
        )
          return navigate("/actividades");
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [activities?.data]);

  return (
    <Container>
      <Header />
      <Content>
        {activities?.data?.result?.activities?.map((activity) => {
          const { id, name, image, content } = activity;
          return (
            <Article
              key={id}
              id={id}
              title={name}
              content={content}
              thumbnail={image}
            />
          );
        })}
      </Content>
      <Footer />
    </Container>
  );
};
