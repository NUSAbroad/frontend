import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";
import { getToast } from "../../redux/toastSlice";
import Toast from "./components/Toast";

const Overlay = styled.div`
  position: fixed;
  bottom: 80px;
  right: 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    bottom: 65px;
    right: 20px;
  }
`;

const ToastOverlay: React.FC = function () {
  const toast = useAppSelector(getToast);

  return <Overlay>{toast != null && <Toast toast={toast} />}</Overlay>;
};

export default ToastOverlay;
