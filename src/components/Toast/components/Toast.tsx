import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";

import { useAppDispatch } from "../../../redux/hooks";
import { clearToast } from "../../../redux/toastSlice";
import { Body2 } from "../../Styles";

const Container = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 15px;
  border-radius: 3px;
  background: ${(props) => props.theme.colors.bistre};
`;

const UndoButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-family: ${(props) => props.theme.typeface};
  cursor: pointer;
`;

interface Props {
  toast: Types.Toast;
}

const Toast: React.FC<Props> = function (props) {
  const { toast } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const time = toast?.canUndo ? 8000 : 3000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearToast());
    }, time);

    return () => clearTimeout(timeout);
  }, [toast]);

  const handleUndoClick = () => {
    console.log("click");
  };

  return (
    <Container>
      <Body2 $color={theme.colors.babyPowder}>{toast?.message}</Body2>
      {toast?.canUndo && (
        <UndoButton onClick={handleUndoClick}>
          <Body2 $color={theme.colors.saffron} $weight="600">
            UNDO
          </Body2>
        </UndoButton>
      )}
    </Container>
  );
};

export default Toast;
