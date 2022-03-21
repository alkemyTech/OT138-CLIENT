import React, { useEffect, useState } from "react";
import Header from "../components/Header/Landing";
import Banner from "../components/Banner";
import Pagination from "../components/Pagination";
import {
  Card,
  HeaderCard,
  TestimonialsContainer,
} from "../styles/Testimonials";
import { getTestimonies } from "../services/requests/testimonials";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { Container, Content } from "../components/Wrappers/Containers";
import { Footer } from "../components/Footer";
function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
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
    ["testimonios", limit, currentPage],
    () => getTestimonies(limit, currentPage),
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
        setTestimonials(items);
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
      {console.log(testimonials)}
      <Header />
      <Content>
        <Banner title={"Testimonios"} thumbnail={"/testimonials.jpg"} />
        <TestimonialsContainer>
          {isLoading || isFetching ? (
            <Loading />
          ) : testimonials && testimonials.length > 0 ? (
            testimonials.map((testimonial) => {
              const { id, name, image, content } = testimonial;
              return (
                <Card key={id}>
                  <HeaderCard>
                    <img
                      src={image}
                      alt="imagen-perfil"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/broken__image.gif";
                      }}
                    />
                    <h2>{name}</h2>
                  </HeaderCard>
                  <Content>
                    <p>{content}</p>
                  </Content>
                </Card>
              );
            })
          ) : (
            <h2>¡En este momento no contamos con Testimonios!</h2>
          )}
        </TestimonialsContainer>
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

export default Testimonials;
