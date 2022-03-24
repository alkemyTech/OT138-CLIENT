import React, { useEffect, useState } from "react";
import { Container, Content } from "../components/Wrappers/Containers";
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
    const { success, data, errorMessage } = await getMembers();

    if (success) {
      setMembers(data);
      setState("ready");
    } else {
      setState("error");
    }
  };

  return (
    <Container>
      <Banner title={"Nosotros"} thumbnail={"/members__banner.jpg"} />
      <Content>
        {state === "loading" && <Loading />}
        {state === "ready" && (
          <MembersContainer>
            {members.length > 0 ? (
              members.map((member, index) => {
                return (
                  <Card
                    key={index}
                    name={member.name}
                    image={member.image}
                    area={member.area}
                  />
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
