import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { Button, Input, Label, TextArea } from "../Inputs";
import Modal from "../Modal";
import { FloatingButton } from "./styles";
import { v4 as uuidv4 } from "uuid";
import api from "../../config/api";
export default function FloatingDonateButton() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(20);
  const [message, setMessage] = useState(null);
  return (
    <>
      <Modal
        open={show}
        onClose={() => setShow(false)}
        center
        closeOnOverlayClick={false}
      >
        <h3>¡Colaborá con Somos Más ONG!</h3>
        <img
          src="/mercadopago.jpg"
          style={{
            width: "100%",
            maxWidth: "250px",
            alignSelf: "center",
            padding: "10px 0 0 0",
          }}
          alt="mercadopago"
        />
        <form onSubmit={event => event.preventDefault()}>
          <Label>Escribe tu Dedicatoria</Label>
          <TextArea
            placeholder={"Escribe tu Dedicatoria aquí (opcional)"}
            onChange={(e) => setMessage(e?.target?.value)}
          />
          <Label>Elige el monto a donar</Label>
          <Input
            type={"number"}
            defaultValue={20}
            onChange={(e) => {
              e.target.value <= 300000 && e?.target?.value >= 15
                ? setValue(e.target.value)
                : e.target.value >= 300000
                  ? setValue(300000)
                  : e.target.value >= 15
                    ? setValue(e?.target?.value)
                    : e?.target?.value < 15
                      ? setValue(15)
                      : setValue(e?.target?.value);
            }}
          />
        </form>
        <Button
          onClick={async () => {
            let uuid = uuidv4();
            const { data: donar } = await api.post(
              `/payment/new?uuid=${uuid}&value=${value}&message=${message ? message.toString() : null
              }`
            );
            donar?.urlId && window.location.replace(donar?.urlId);
          }}
          style={{
            alignSelf: "end",
            margin: "1rem 0 0 0",
            background: "#009ee3",
          }}
        >
          <b>Donar</b>
        </Button>
      </Modal>
      <FloatingButton
        onClick={() => {
          setShow(true);
        }}
      >
        <FaDollarSign />
      </FloatingButton>
    </>
  );
}
