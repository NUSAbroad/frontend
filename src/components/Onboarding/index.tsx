import React from "react";
import styled from "styled-components";

import Card from "./components/Card";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.bistre50};
  z-index: 99;
`;

const OnboardOverlay: React.FC = function () {
  return (
    <Overlay>
      <Card />
    </Overlay>
  );
};

export default OnboardOverlay;
