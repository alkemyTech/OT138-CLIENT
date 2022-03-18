import React, { useEffect, useState } from "react";
import { Container, Content } from "../components/Wrappers/Containers";
import Header from "../components/Header/Landing";
import { Footer } from "../components/Footer";
import { Card } from "../components/Members";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import { MembersContainer } from "../styles/Members";
import { getMembers } from "../services/requests/members";

function Members() {
  const [state, setState] = useState("loading");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setState("loading");
    getMembers()
      .then(async (response) => {
        if (!response.error) {
          const data = await response.data.data.map((member) => {
            return {
              name: member.name,
              image: member.image,
            };
          });
          setMembers(await data);
          setState("ready");
        } else {
          setState("error");
        }
      })
      .catch((err) => {
        setState("error");
      });
  };

  return (
    <Container>
      <Header />
      <Banner title={"Nosotros"} thumbnail={"/members__banner.jpg"} />
      <Content>
        {state === "loading" && <Loading />}
        {state === "ready" && (
          <MembersContainer>
            {members.length > 0 ? (
              members.map((member, index) => {
                return (
                  <Card key={index} name={member.name} image={member.image} />
                );
              })
            ) : (
              <h2>¡Aún no hay nada que mostrar aquí!</h2>
            )}
          </MembersContainer>
        )}
        {state === "error" && <h2>Lo lamentamos, hubo un error</h2>}
      </Content>
      <Footer />
    </Container>
  );
}

export default Members;
