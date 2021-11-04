import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";
import { getIsVisible } from "../../redux/onboardSlice";
import Card from "./components/Card";
import HelpButton from "./components/HelpButton";

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
  const isVisible = useAppSelector(getIsVisible);

  return (
    <>
      <HelpButton />
      {isVisible && (
        <Overlay>
          <Card />
        </Overlay>
      )}
    </>
  );
};

export default OnboardOverlay;
