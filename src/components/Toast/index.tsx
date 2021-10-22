import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";
import { getToast } from "../../redux/toastSlice";
import Toast from "./components/Toast";

const Overlay = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const ToastOverlay: React.FC = function () {
  const toast = useAppSelector(getToast);

  return <Overlay>{toast != null && <Toast toast={toast} />}</Overlay>;
};

export default ToastOverlay;
