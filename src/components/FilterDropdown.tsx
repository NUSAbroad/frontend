import React from "react";
import styled from "styled-components";

import { Body1 } from "./Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  width: 100%;
  border-radius: 3px;
  background-color: white;
  overflow: auto;
  max-height: 20vh;
`;

const WhiteBox = styled(Body1)`
  background-color: white;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey300};
    cursor: pointer;
  }
`;

interface Props {
  submitFilter: (filter: string) => void;
  countries: Types.Country[];
}

const FilterDropdown: React.FC<Props> = (props) => {
  const { countries, submitFilter } = props;
  return (
    <Wrapper>
      {countries.map((country) => {
        return (
          <WhiteBox key={country.id} onClick={() => submitFilter(country.name)}>
            {country.name}
          </WhiteBox>
        );
      })}
    </Wrapper>
  );
};

export default FilterDropdown;
