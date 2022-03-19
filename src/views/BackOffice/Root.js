import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Content } from "../../components/Wrappers/Containers";
import {
  BackOfficeContainer,
  BackofficeDivider,
  BackofficeWelcome,
  StatisticsBox,
  Thumbnail,
} from "../../styles/BackOffice";
import Table from "../../components/Table";
import { getActivities } from "../../services/requests/activities";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { getNews } from "../../services/requests/news";
import { getUsersList } from "../../services/requests/users";
function Backoffice({ auth }) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;

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

  const {
    data: news,
    isLoadingNews,
    isFetchingNews,
    isErrorNews,
  } = useQuery(
    ["novedades", limit, currentPage],
    () => getNews(limit, currentPage),
    {
      retry: false,
    }
  );

  const {
    data: users,
    isLoadingUser,
    isFetchingUser,
    isErrorUser,
  } = useQuery(
    ["usuarios", limit, currentPage],
    () => getUsersList(limit, currentPage),
    {
      retry: false,
    }
  );

  return (
    <Content>
      <BackofficeWelcome>
        <h1 className="welcome__title">
          👋 Hola, {auth?.user?.firstName} {auth?.user?.lastName}
        </h1>
        <p className="welcome__description">¡Qué alegría verte de nuevo!</p>
      </BackofficeWelcome>
      <BackOfficeContainer>
        <BackofficeDivider>
          <h2>Últimas Actividades</h2>
          <StatisticsBox>
            <Table>
              <thead>
                <tr>
                  <th width="10%"></th>
                  <th width="45%">Nombre</th>
                  <th width="45%">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  !response?.data?.error && !isError ? (
                    response?.data?.result?.items?.map((activity) => {
                      const { id, name, image, content } = activity;
                      return (
                        <tr key={id}>
                          <td>
                            <Link to={`/actividades/${id}`}>
                              <Thumbnail src={image} />
                            </Link>
                          </td>
                          <td>
                            <Link to={`/actividades/${id}`}>
                              <b>{name}</b>
                            </Link>
                          </td>
                          <td className="table__wrap__text">{content}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <h1>¡En este momento no contamos con Actividades!</h1>
                  )
                ) : !isLoading &&
                  !isFetching &&
                  response?.data?.error &&
                  isError ? (
                  <h1>¡No se encontraron Actividades!</h1>
                ) : null}
              </tbody>
            </Table>
          </StatisticsBox>
          <h2>Últimas Novedades</h2>
          <StatisticsBox>
            <Table>
              <thead>
                <tr>
                  <th width="10%"></th>
                  <th width="45%">Nombre</th>
                  <th width="45%">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {!isLoadingNews ? (
                  !news?.data?.error && !isErrorNews ? (
                    news?.data?.result?.items?.map((item) => {
                      const { id, name, image, content } = item;
                      return (
                        <tr key={id}>
                          <td>
                            <Link to={`/novedades/${id}`}>
                              <Thumbnail src={image} />
                            </Link>
                          </td>
                          <td>
                            <Link to={`/novedades/${id}`}>
                              <div class="parent">
                                <div class="child">
                                  <b>{name}</b>
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="table__wrap__text">{content}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <h1>¡En este momento no contamos con Novedades!</h1>
                  )
                ) : !isLoadingNews &&
                  !isFetchingNews &&
                  news?.data?.error &&
                  isErrorNews ? (
                  <h1>¡No se encontraron Novedades!</h1>
                ) : null}
              </tbody>
            </Table>
          </StatisticsBox>
        </BackofficeDivider>
        <BackofficeDivider>
          <h2>Últimas Donaciones</h2>
          <StatisticsBox>
            <Table>
              <thead>
                <tr>
                  <th width="33%">Dedicatoria</th>
                  <th width="33%">Dinero</th>
                  <th width="33%">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr key={1}>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </StatisticsBox>
          <h2>Listado de Usuarios</h2>
          <StatisticsBox>
            <Table>
              <thead>
                <tr>
                  <th width="10%"></th>
                  <th width="25%">Nombres</th>
                  <th width="25%">Apellidos</th>
                  <th width="35%">Email</th>
                </tr>
              </thead>
              <tbody>
                {!isLoadingUser ? (
                  !users?.data?.error && !isErrorUser ? (
                    users?.data?.result?.map((user) => {
                      const { id, firstName, lastName, image, email, roleId } =
                        user;
                      return (
                        <tr key={id}>
                          <td>
                            <Thumbnail src={image} />
                          </td>
                          <td>
                            <b>{firstName}</b>
                          </td>
                          <td>{lastName}</td>
                          <td>{email}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <h1>¡En este momento no contamos con Usuarios!</h1>
                  )
                ) : !isLoadingUser &&
                  !isFetchingUser &&
                  users?.data?.error &&
                  isErrorUser ? (
                  <h1>¡No se encontraron Usuarios!</h1>
                ) : null}
              </tbody>
            </Table>
          </StatisticsBox>
        </BackofficeDivider>
      </BackOfficeContainer>
    </Content>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Backoffice);
