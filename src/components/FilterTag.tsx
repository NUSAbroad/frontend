import React from "react";
import styled from "styled-components";

import { ReactComponent as CrossInCircleIcon } from "../assets/x-circle.svg";
import { Body2 } from "./Styles";

const Wrapper = styled.div`
  padding: 0 15px;
  display: inline-block;
  line-height: 25px;
  border: 1px solid ${(props) => props.theme.colors.blueCrayola};
  border-radius: 35px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TagBody2 = styled(Body2)`
  color: ${(props) => props.theme.colors.blueCrayola};
  margin-right: 10px;
`;

interface Props {
  tag: string;
}

const FilterTag: React.FC<Props> = (props) => {
  const { tag } = props;

  return (
    <Wrapper>
      <TagContainer>
        <TagBody2>{tag}</TagBody2>
        <CrossInCircleIcon style={{ transform: "scale(1.2)" }} />
      </TagContainer>
    </Wrapper>
  );
};

export default FilterTag;