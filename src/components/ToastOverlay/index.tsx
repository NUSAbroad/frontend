import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";
import { getToasts } from "../../redux/toastSlice";
import Toast from "./components/Toast";

const Overlay = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
`;

const ToastOverlay: React.FC = function () {
  const toasts = useAppSelector(getToasts);

  return (
    <Overlay>
      <List>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </List>
    </Overlay>
  );
};

export default ToastOverlay;
