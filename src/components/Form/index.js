import React from "react";
import { FormStyle } from "./styles";

export default function Form({children}) {
  return (
    <FormStyle>
        {children}
    </FormStyle>
  );
}
