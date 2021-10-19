import styled from "styled-components";

export const Cell = styled.td`
  vertical-align: top;
  padding: 10px 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey200};
  border-right: 1px solid ${(props) => props.theme.colors.grey200};

  &:last-child {
    border-right: 1px solid ${(props) => props.theme.colors.grey300};
  }
`;

export const Row = styled.tr`
  &:last-child {
    td {
      border-bottom: 1px solid ${(props) => props.theme.colors.grey300};

      &:first-child {
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-bottom-right-radius: 5px;
      }
    }
  }
`;
