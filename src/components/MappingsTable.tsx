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

const Container = styled.div`
  margin: -5px;
  padding: 5px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.babyPowder};
  border: 1px solid ${(props) => props.theme.colors.grey300};
  text-align: left;
`;

const HeaderCell = styled.th<{ $softBorder?: boolean }>`
  padding: 5px 10px;
  color: ${(props) => props.theme.colors.grey500};
  font-weight: 400;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey300};
  background: ${(props) => props.theme.colors.grey100};
  white-space: nowrap;
  overflow: hidden;

  &:not(:last-child) {
    border-right: 1px solid
      ${(props) =>
        props.$softBorder
          ? props.theme.colors.grey200
          : props.theme.colors.grey300};
  }
`;

const HeaderRow = styled.tr<{ $isSmall?: boolean; $isCentered?: boolean }>`
  font-size: ${(props) =>
    props.$isSmall ? props.theme.fontSizes.sm : props.theme.fontSizes.md};
  ${(props) =>
    props.$isCentered &&
    `
    text-align: center;
  `};

  &:first-child {
    ${HeaderCell} {
      &:first-child {
        border-top-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
      }
    }
  }
`;

const ButtonCell = styled.td`
  padding: 0;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 0 0 4px 4px;
  background: none;
  color: ${(props) => props.theme.colors.blueCrayola};
  font-size: ${(props) => props.theme.fontSizes.md};
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.grey200};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors.blueCrayola50};
  }
`;

interface Props {
  isPlanner?: boolean;
}

const MappingsTable: React.FC<Props> = function (props) {
  const { isPlanner } = props;

  return (
    <Container>
      <Table cellSpacing="0">
        <thead>
          <HeaderRow $isCentered>
            <HeaderCell colSpan={4}>NUS</HeaderCell>
            <HeaderCell colSpan={3}>PU</HeaderCell>
            <HeaderCell />
          </HeaderRow>
          <HeaderRow $isSmall>
            <HeaderCell $softBorder>Faculty</HeaderCell>
            <HeaderCell $softBorder>Module Code</HeaderCell>
            <HeaderCell $softBorder>Module Name</HeaderCell>
            <HeaderCell>Credits</HeaderCell>
            <HeaderCell $softBorder>Module Code</HeaderCell>
            <HeaderCell $softBorder>Module Name</HeaderCell>
            <HeaderCell>Credits</HeaderCell>
            <HeaderCell />
          </HeaderRow>
        </thead>
        <tbody>
          <MappingsRow mapping={mapping} isPlanner={isPlanner} />
          <MappingsRow mapping={mapping} isPlanner={isPlanner} />
          <MappingsRow mapping={mapping} isPlanner={isPlanner} />
          {isPlanner && (
            <tr>
              <ButtonCell colSpan={8}>
                <AddButton onClick={() => console.log("clicked")}>
                  + Add mapping
                </AddButton>
              </ButtonCell>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MappingsTable;
