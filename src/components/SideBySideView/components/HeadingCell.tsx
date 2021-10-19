import React from "react";
import styled, { useTheme } from "styled-components";

import { Body2 } from "../../Styles";
import { Cell } from "./Styles";

const StyledCell = styled(Cell)`
  position: sticky;
  left: 0;
  padding: 10px;
  background: ${(props) => props.theme.colors.grey100};
  border-left: 1px solid ${(props) => props.theme.colors.grey300};
  border-right: 1px solid ${(props) => props.theme.colors.grey300};
`;

const HeadingCell: React.FC = function (props) {
  const { children } = props;
  const theme = useTheme();

  return (
    <StyledCell>
      <Body2 $color={theme.colors.grey500}>{children}</Body2>
    </StyledCell>
  );
};

export default HeadingCell;
