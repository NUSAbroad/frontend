import React from "react";
import styled from "styled-components";

import { steps } from "../../../constants/onboarding";

const StyledButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  margin: 0;
  padding: 0.3em 0.4em 0.2em;
  border: 0;
  border-radius: 3px;
  background: none;
  color: ${(props) => props.theme.colors.grey300};
  font-size: ${(props) => props.theme.fontSizes.sm};
  letter-spacing: 0.05em;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.grey500};
    color: ${(props) => props.theme.colors.grey100};
  }
`;

interface Props {
  currStep: number;
}

const SkipButton: React.FC<Props> = function (props) {
  const { currStep } = props;

  if (currStep === steps.length - 1) {
    return null;
  }
  return <StyledButton>SKIP</StyledButton>;
};

export default SkipButton;
