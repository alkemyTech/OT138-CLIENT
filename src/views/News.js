import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";
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
import toast from "react-hot-toast";

export default function News() {
    const [news, setNews] = useState([]);
    const [pagination, setPagination] = useState({
        pages: 1,
        count: 0
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
        ["novedades", limit, currentPage],
        () => getNews(limit, currentPage),
        {
            retry: false,
        }
    );

    useEffect(() => {
        if (response) {
            if (response.data.error) {
                toast.error('Error al obtener novedades');
            } else {
                const { items, ...pagination } = response.data.result;
                setNews(items);
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
            <Banner title={"Novedades"} thumbnail={"/news__banner.jpg"} />
            <Content>
                <NewsContainer>
                    {
                        (isLoading || isFetching) ? <Loading /> :
                            news && news.length > 0 ?
                                news.map((news_item) => {
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
                                :
                                <h1>¡En este momento no contamos con Novedades!</h1>
                    }
                </NewsContainer>
                <div className="divider">
                    {pagination && (
                        <Pagination
                            onPageChange={goToPage}
                            totalPages={pagination.pages}
                        />
                    )}
                </div>
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
