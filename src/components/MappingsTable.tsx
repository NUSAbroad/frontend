import React from "react";
import styled from "styled-components";

import MappingsRow from "./MappingsRow";

const mapping: Types.Mapping = {
  id: "1",
  nusModuleFaculty: "SOC",
  nusModuleCode: "CS2030",
  nusModuleName: "Programming Methodology II",
  nusModuleCredits: 4,
  partnerModuleCode: "CS2030",
  partnerModuleName: "Programming Methodology II",
  partnerModuleCredits: 4,
  partnerUniversityId: "1234",
};

const Table = styled.table`
  width: 100%;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.babyPowder};
  border: 1px solid ${(props) => props.theme.colors.grey300};
  text-align: left;
  overflow: hidden;
`;

const HeaderCell = styled.th<{ $softBorder?: boolean }>`
  padding: 5px 10px;
  color: ${(props) => props.theme.colors.grey500};
  font-weight: 400;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey300};

  &:not(:last-child) {
    border-right: 1px solid
      ${(props) =>
        props.$softBorder
          ? props.theme.colors.grey200
          : props.theme.colors.grey300};
  }
`;

const HeaderRow = styled.tr<{ $isSmall?: boolean; $isCentered?: boolean }>`
  background: ${(props) => props.theme.colors.grey100};
  font-size: ${(props) =>
    props.$isSmall ? props.theme.fontSizes.sm : props.theme.fontSizes.md};
  ${(props) =>
    props.$isCentered &&
    `
    text-align: center;
  `};
`;

const ButtonCell = styled.td`
  padding: 0;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background: none;
  color: ${(props) => props.theme.colors.blueCrayola};
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.grey200};
  }
`;

interface Props {
  isPlanner?: boolean;
}

const MappingsTable: React.FC<Props> = function (props) {
  const { isPlanner } = props;

  return (
    <>
      <Table cellSpacing="0">
        <thead>
          <HeaderRow $isCentered>
            <HeaderCell colSpan={4}>NUS</HeaderCell>
            <HeaderCell colSpan={3}>PU</HeaderCell>
          </HeaderRow>
          <HeaderRow $isSmall>
            <HeaderCell $softBorder>Faculty</HeaderCell>
            <HeaderCell $softBorder>Module Code</HeaderCell>
            <HeaderCell $softBorder>Module Name</HeaderCell>
            <HeaderCell>Credits</HeaderCell>
            <HeaderCell $softBorder>Module Code</HeaderCell>
            <HeaderCell $softBorder>Module Name</HeaderCell>
            <HeaderCell>Credits</HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          <MappingsRow mapping={mapping} />
          <MappingsRow mapping={mapping} />
          <MappingsRow mapping={mapping} />
          {isPlanner && (
            <tr>
              <ButtonCell colSpan={7}>
                <AddButton>+ Add mapping</AddButton>
              </ButtonCell>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default MappingsTable;
