import React from "react";
import styled from "styled-components";

import { steps } from "../../../constants/onboarding";

const Wrapper = styled.div`
  display: flex;
  gap: 7px;
  justify-content: center;
`;

const Bar = styled.div<{ $isCurrStep: boolean }>`
  height: 3px;
  width: 40px;
  border-radius: 3px;
  background: ${(props) =>
    props.$isCurrStep
      ? props.theme.colors.saffron
      : props.theme.colors.floralWhite30};
`;

interface Props {
  currStep: number;
}

const StepIndicator: React.FC<Props> = function (props) {
  const { currStep } = props;
  return (
    <Wrapper>
      {steps.map((_step, index) => (
        <Bar key={index} $isCurrStep={index == currStep} />
      ))}
    </Wrapper>
  );
};

export default StepIndicator;
