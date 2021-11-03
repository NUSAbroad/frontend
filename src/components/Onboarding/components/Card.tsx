import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Arrow } from "../../../assets/chevron-right.svg";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { steps } from "../../../constants/onboarding";
import { useAppDispatch } from "../../../redux/hooks";
import { hideOnboard } from "../../../redux/onboardSlice";
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
  background: ${(props) => props.theme.colors.black};
  border-radius: 15px;
  width: 600px;
  max-width: 90%;
  height: 480px;
  max-height: 80%;
  padding: 60px 60px 30px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: 500px;
    height: 430px;
    padding: 50px 50px 20px;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.sm}) {
    height: 400px;
    padding: 40px 35px 20px;
  }
`;

const StyledLogo = styled(Logo)`
  width: 2rem;
  height: auto;

  path {
    fill: ${(props) => props.theme.colors.babyPowder};
  }
`;

const StyledContent = styled.div`
  margin-bottom: auto;
  overflow-y: auto;
`;

const StyledButton = styled(Button)`
  &:hover {
    color: ${(props) => props.theme.colors.black};
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

  @media (max-width: ${(props) => props.theme.breakPoints.sm}) {
    ${(props) => (props.$isLeft ? `left: 5px;` : `right: 5px;`)}
  }

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
  const dispatch = useAppDispatch();
  const [currStep, setCurrStep] = useState<number>(0);

  const handleButtonClick = () => {
    dispatch(hideOnboard());
  };

  return (
    <Wrapper>
      <StyledContent>
        <StyledLogo />
        {steps[currStep].content}
      </StyledContent>
      {steps[currStep].buttonText && (
        <StyledButton
          $color={theme.colors.saffron}
          $focusColor={theme.colors.saffron50}
          onClick={handleButtonClick}
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
