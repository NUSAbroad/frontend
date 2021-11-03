import React from "react";
import styled from "styled-components";

import { steps } from "../../../constants/onboarding";
import { useAppDispatch } from "../../../redux/hooks";
import { hideOnboard } from "../../../redux/onboardSlice";

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

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    top: 25px;
    right: 25px;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.sm}) {
    top: 20px;
    right: 20px;
  }
`;

interface Props {
  currStep: number;
}

const SkipButton: React.FC<Props> = function (props) {
  const { currStep } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(hideOnboard());
  };

  if (currStep === steps.length - 1) {
    return null;
  }

  return <StyledButton onClick={handleClick}>SKIP</StyledButton>;
};

export default SkipButton;
