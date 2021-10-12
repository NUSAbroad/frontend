import React from "react";
import styled from "styled-components";

const BodyCell = styled.td<{ $softBorder?: boolean }>`
  padding: 10px;

  &:not(:last-child) {
    border-right: 1px solid
      ${(props) =>
        props.$softBorder
          ? props.theme.colors.grey200
          : props.theme.colors.grey300};
  }
`;

const BodyRow = styled.tr`
  &:not(:last-child) {
    > ${BodyCell} {
      border-bottom: 1px solid ${(props) => props.theme.colors.grey300};
    }
  }
`;

interface Props {
  mapping: Types.Mapping;
}

const MappingsRow: React.FC<Props> = function (props) {
  const { mapping } = props;

  return (
    <BodyRow>
      <BodyCell $softBorder>{mapping.nusModuleFaculty}</BodyCell>
      <BodyCell $softBorder>{mapping.nusModuleCode}</BodyCell>
      <BodyCell $softBorder>{mapping.nusModuleName}</BodyCell>
      <BodyCell>{mapping.nusModuleCredits}</BodyCell>
      <BodyCell $softBorder>{mapping.partnerModuleCode}</BodyCell>
      <BodyCell $softBorder>{mapping.partnerModuleName}</BodyCell>
      <BodyCell>{mapping.partnerModuleCredits}</BodyCell>
    </BodyRow>
  );
};

export default MappingsRow;
