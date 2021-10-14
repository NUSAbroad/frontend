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

const FacultiesSection: React.FC = () => {
  return (
    <Wrapper>
      <Title>Faculties</Title>
      <TagsWrapper>
        <TagContainer>
          <Body1>Arts {"&"} Humanities</Body1>
        </TagContainer>
        <TagContainer>
          <Body1>Natural {"&"} Mathematical Sciences</Body1>
        </TagContainer>
        <TagContainer>
          <Body1>Social Science {"&"} Public Policy</Body1>
        </TagContainer>
        <TagContainer>
          <Body1>Law</Body1>
        </TagContainer>
        <TagContainer>
          <Body1>School of Bioscience Education</Body1>
        </TagContainer>
      </TagsWrapper>
    </Wrapper>
  );
};

export default FacultiesSection;
