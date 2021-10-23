import React from "react";
import styled from "styled-components";

import FilterSearchBar from "./components/FilterSearchBar";
import FilterTag from "./components/FilterTag";

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
`;

interface Props {
  filters: Types.Country[];
  setFilters: React.Dispatch<React.SetStateAction<Types.Country[]>>;
}

const Filter: React.FC<Props> = function (props) {
  const { filters, setFilters } = props;

  const deleteFilter = (filter: Types.Country) => {
    const newFilters = [...filters];
    newFilters.splice(newFilters.indexOf(filter), 1);
    setFilters(newFilters);
  };

  return (
    <>
      <FilterSearchBar filters={filters} setFilters={setFilters} />
      <TagsWrapper>
        {filters.map((tag) => (
          <FilterTag key={tag.id} tag={tag} deleteFilter={deleteFilter} />
        ))}
      </TagsWrapper>
    </>
  );
};

export default Filter;
