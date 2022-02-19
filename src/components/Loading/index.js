import React from "react";
import { SpinnerContainer } from "./styles";
import { TailSpin } from "react-loader-spinner";

function Loading() {
  return (
    <SpinnerContainer>
      <TailSpin height="80" width="80" color="grey" />
    </SpinnerContainer>
  );
}
export default Loading;
