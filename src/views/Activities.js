import React from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory, useNavigate } from "react-router-dom";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

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
import { ActivitiesContainer, TitleBanner } from "../styles/Activities";

export default function Activities() {
  const {
    data: activities,
    isLoading,
    isFetching,
    isError,
  } = useQuery(["activities"], () => getActivities(), {
    retry: false,
  });

  return (
    <Container>
      <Header />
      <Content>
        <TitleBanner>
          <img
            src={"/activities__banner.jpg"}
            alt="portada"
            className="activity__thumbnail"
          ></img>
          <h1 className="activity__title">Listado de Actividades</h1>
        </TitleBanner>
        <ActivitiesContainer>
          {!isLoading ? (
            !activities?.data?.error && !isError ? (
              activities?.data?.activities?.rows?.map((activity) => {
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
        if (activities?.data && activities?.data?.error)
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
        {activities?.data?.activities?.rows?.map((activity) => {
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
