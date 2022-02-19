import React, { useState } from "react";
import { CoverPage, BoxItems, Buttom, Item } from "./styles";

export default function Slider() {
  const [position, SetPosition] = useState(0);
  const [selection, SetSelection] = useState([true, false, false, false]);
  const [classAnimation, SetClassAnimation] = useState(
    "animate__animated animate__fadeInUp"
  );

  const slider = [
    {
      id: 1,
      titulo: "We are the creative class community",
      imagen: "/portada-1.png",
    },
    {
      id: 2,
      titulo: "We are passionate about working as a team",
      imagen: "/portada-2.jpg",
    },
    {
      id: 3,
      titulo: "Give you the best work experience",
      imagen: "/portada-3.jpg",
    },
    {
      id: 4,
      titulo: "Creating the minds of the future is our passion",
      imagen: "/portada-4.jpg",
    },
  ];

  function ChangeSlider(e) {
    const item = e.target.getAttribute("data-item");
    if (item === "1") {
      SetClassAnimation("animate__animated animate__fadeOutDown");
      SetSelection([true, false, false, false]);
      setTimeout(() => {
        SetPosition(0);
        SetClassAnimation("animate__animated animate__fadeInDown");
      }, 1300);
    } else if (item === "2") {
      SetClassAnimation("animate__animated animate__fadeOutDown");
      SetSelection([false, true, false, false]);
      setTimeout(() => {
        SetPosition(1);
        SetClassAnimation("animate__animated animate__fadeInDown");
      }, 1300);
    } else if (item === "3") {
      SetClassAnimation("animate__animated animate__fadeOutDown");
      SetSelection([false, false, true, false]);
      setTimeout(() => {
        SetPosition(2);
        SetClassAnimation("animate__animated animate__fadeInDown");
      }, 1300);
    } else if (item === "4") {
      SetClassAnimation("animate__animated animate__fadeOutDown");
      SetSelection([false, false, false, true]);
      setTimeout(() => {
        SetPosition(3);
        SetClassAnimation("animate__animated animate__fadeInDown");
      }, 1300);
    }
  }
  return (
    <CoverPage fondo={slider[position].imagen}>
      <h1 className={classAnimation}>{slider[position].titulo}</h1>
      <Buttom className={classAnimation}>Aplicar ahora</Buttom>
      <BoxItems className={classAnimation}>
        <Item
          data-item={1}
          onClick={ChangeSlider}
          color={Number(selection[0])}
        />
        <Item
          data-item={2}
          onClick={ChangeSlider}
          color={Number(selection[1])}
        />
        <Item
          data-item={3}
          onClick={ChangeSlider}
          color={Number(selection[2])}
        />
        <Item
          data-item={4}
          onClick={ChangeSlider}
          color={Number(selection[3])}
        />
      </BoxItems>
    </CoverPage>
  );
}
