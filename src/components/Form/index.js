import React from "react";
import { FormStyle } from "./styles";

export default function Form({children, ...rest}) {
  return (
    <FormStyle {...rest}>
        {children}
    </FormStyle>
  );
}
