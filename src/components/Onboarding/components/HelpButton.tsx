import React from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../redux/hooks";
import { showOnboard } from "../../../redux/onboardSlice";
import { Button } from "../../Styles";

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 35px;
  padding: 0;
  border-radius: 100%;
  background: ${(props) => props.theme.colors.babyPowder};
  font-weight: 600;
  line-height: 33px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  cursor: pointer;
  z-index: 3;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    bottom: 20px;
    right: 20px;
    width: 30px;
    line-height: 28px;
  }
`;

const HelpButton: React.FC = function () {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(showOnboard());
  };

  return <StyledButton onClick={handleClick}>?</StyledButton>;
};

export default HelpButton;
