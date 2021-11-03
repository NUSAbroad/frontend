import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Arrow } from "../../../assets/chevron-right.svg";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { steps } from "../../../constants/onboarding";
import { Button } from "../../Styles";
import SkipButton from "./SkipButton";
import StepIndicator from "./StepIndicator";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${(props) => props.theme.colors.bistre};
  border-radius: 15px;
  width: 600px;
  height: 470px;
  padding: 60px 50px 30px;
`;

const StyledLogo = styled(Logo)`
  width: 40px;
  height: auto;

  path {
    fill: ${(props) => props.theme.colors.babyPowder};
  }
`;

const StyledContent = styled.div`
  margin-bottom: auto;
`;

const StyledButton = styled(Button)`
  &:hover {
    color: ${(props) => props.theme.colors.bistre};
  }
`;

const StyledArrow = styled(Arrow)<{ $isLeft?: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.$isLeft ? `left: 10px;` : `right: 10px;`)}
  transform:
    translateY(-50%)
    ${(props) => props.$isLeft && `rotate(180deg)`};
  cursor: pointer;

  path {
    stroke: ${(props) => props.theme.colors.grey200};
  }

  &:hover {
    path {
      stroke: ${(props) => props.theme.colors.saffron};
    }
  }
`;

const Card: React.FC = function () {
  const theme = useTheme();
  const [currStep, setCurrStep] = useState<number>(0);

  return (
    <Wrapper>
      <StyledLogo />
      <StyledContent>{steps[currStep].content}</StyledContent>
      {steps[currStep].buttonText && (
        <StyledButton
          $color={theme.colors.saffron}
          $focusColor={theme.colors.saffron50}
        >
          {steps[currStep].buttonText}
        </StyledButton>
      )}
      <StepIndicator currStep={currStep} />
      {currStep > 0 && (
        <StyledArrow $isLeft onClick={() => setCurrStep(currStep - 1)} />
      )}
      {currStep < steps.length - 1 && (
        <StyledArrow onClick={() => setCurrStep(currStep + 1)} />
      )}
      <SkipButton currStep={currStep} />
    </Wrapper>
  );
};

export default Card;
