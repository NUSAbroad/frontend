import React from "react";
import styled, { css } from "styled-components";

import { View } from "../../../constants/plannerViews";
import { useAppDispatch } from "../../../redux/hooks";
import { setView } from "../../../redux/plannerSlice";
import { Button } from "../../Styles";

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)<{ $isCurrView: boolean }>`
  ${(props) =>
    props.$isCurrView &&
    css`
      background: ${props.theme.colors.blueCrayola};
      color: ${props.theme.colors.floralWhite};
    `}

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

interface Props {
  currView: View;
}

const ViewToggle: React.FC<Props> = function (props) {
  const { currView } = props;
  const dispatch = useAppDispatch();

  const handleClick = (view: View) => {
    if (view == currView) {
      return;
    }
    dispatch(setView(view));
  };

  return (
    <Buttons>
      <StyledButton
        $isCurrView={currView === View.MAPPINGS}
        onClick={() => handleClick(View.MAPPINGS)}
      >
        Mappings View
      </StyledButton>
      <StyledButton
        $isCurrView={currView === View.SIDE_BY_SIDE}
        onClick={() => handleClick(View.SIDE_BY_SIDE)}
      >
        Side-by-side View
      </StyledButton>
    </Buttons>
  );
};

export default ViewToggle;
