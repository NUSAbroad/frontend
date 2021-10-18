import React from "react";
import styled from "styled-components";

import { Body1, Subheading } from "./Styles";

const Wrapper = styled.div``;

const Title = styled(Subheading)`
  padding-bottom: 10px;
`;

const TagContainer = styled.div`
  padding: 0 15px;
  display: inline-block;
  line-height: 30px;
  border: 1px solid black;
  border-radius: 35px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TagsWrapper = styled.div``;

interface Props {
  faculties: Types.Faculty[];
}

const FacultiesSection: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <Title>Faculties</Title>
      <TagsWrapper>
        {props.faculties.map((faculty, index) => (
          <TagContainer key={index}>
            <Body1>{faculty.name}</Body1>
          </TagContainer>
        ))}
      </TagsWrapper>
    </Wrapper>
  );
};

export default FacultiesSection;
