import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { createMapping } from "../redux/plannerSlice";
import MappingsRow from "./MappingsRow";
import { Body1 } from "./Styles";

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

const PaginationWrapper = styled.div`
  color: ${(props) => props.theme.colors.blueCrayola};
  display: flex;
  padding: 5px 10px 10px 10px;
  justify-content: right;
`;

const Pagination = styled.span<{ $selected?: boolean }>`
  margin-left: 10px;
  text-decoration: ${(props) => props.$selected && "underline"};

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const StyledBody1 = styled(Body1)`
  padding: 10px;
`;

interface Props {
  isPlanner?: boolean;
  mappings: Types.Mapping[];
  uni: Types.University;
}

const MAPPINGS_PER_PAGE = 10;

const MappingsTable: React.FC<Props> = function (props) {
  const { isPlanner, mappings, uni } = props;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const totalPageCount = Math.ceil(mappings.length / MAPPINGS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [mappings]);

  const handleAddClick = () => {
    dispatch(createMapping(uni.id));
  };

  const onPaginationClick = (page: number) => {
    setPage(page);
  };

  const onNextPageClick = () => {
    setPage(page + 1);
  };

  const onPreviousPageClick = () => {
    setPage(page - 1);
  };

  const generatePaginatedMappings = () => {
    const startIndex = (page - 1) * MAPPINGS_PER_PAGE;
    const endIndex = startIndex + MAPPINGS_PER_PAGE;
    const displayedMappings = mappings.slice(startIndex, endIndex);
    return displayedMappings.map((mapping) => (
      <MappingsRow
        key={mapping.id}
        mapping={mapping}
        isPlanner={isPlanner}
        uni={uni}
      />
    ));
  };

  const generateMappings = () =>
    mappings.map((mapping) => (
      <MappingsRow
        key={mapping.id}
        mapping={mapping}
        isPlanner={isPlanner}
        uni={uni}
      />
    ));

  const generatePaginations = () => {
    const paginations = [];
    for (let i = 1; i <= totalPageCount; i++) {
      paginations.push(
        <Pagination $selected={page === i} onClick={() => onPaginationClick(i)}>
          {i}
        </Pagination>
      );
    }
    return paginations;
  };

  return (
    <Container>
      <Table cellSpacing="0">
        <thead>
          <HeaderRow $isCentered>
            <HeaderCell colSpan={4} id="nus-header">
              NUS
            </HeaderCell>
            <HeaderCell colSpan={3}>Partner University</HeaderCell>
            <HeaderCell colSpan={1} />
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
          {isPlanner ? generateMappings() : generatePaginatedMappings()}
          {isPlanner && (
            <tr>
              <ButtonCell colSpan={8}>
                <AddButton onClick={handleAddClick}>+ Add mapping</AddButton>
              </ButtonCell>
            </tr>
          )}
          {!isPlanner && mappings.length === 0 && (
            <tr>
              <ButtonCell colSpan={8}>
                <StyledBody1>No mappings available</StyledBody1>
              </ButtonCell>
            </tr>
          )}
        </tbody>
      </Table>
      {!isPlanner && totalPageCount > 1 && (
        <PaginationWrapper>
          {page !== 1 && (
            <Pagination onClick={onPreviousPageClick}>Previous</Pagination>
          )}
          {generatePaginations()}
          {page !== totalPageCount && (
            <Pagination onClick={onNextPageClick}>Next</Pagination>
          )}
        </PaginationWrapper>
      )}
    </Container>
  );
};

export default MappingsTable;
