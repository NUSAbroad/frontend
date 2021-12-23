import React from "react";
import styled from "styled-components";

import { ReactComponent as CrossInCircleIcon } from "../../../assets/x-circle.svg";
import { Body2 } from "../../Styles";

const Wrapper = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid ${(props) => props.theme.colors.blueCrayola};
  border-radius: 30px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TagBody2 = styled(Body2)`
  color: ${(props) => props.theme.colors.blueCrayola};
  margin-right: 8px;
`;

const ExtendedCrossInCircleIcon = styled(CrossInCircleIcon)`
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  tag: Types.Country;
  deleteFilter: (filter: Types.Country) => void;
}

const FilterTag: React.FC<Props> = (props) => {
  const { tag, deleteFilter } = props;

  return (
    <Wrapper>
      <TagContainer>
        <TagBody2>{tag.name}</TagBody2>
        <ExtendedCrossInCircleIcon
          style={{ transform: "scale(1.2)" }}
          onClick={() => deleteFilter(tag)}
        />
      </TagContainer>
    </Wrapper>
  );
};

export default FilterTag;
