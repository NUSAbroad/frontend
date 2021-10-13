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
  border: 1px solid ${(props) => props.theme.colors.blueCrayola};
  border-radius: 35px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TagsWrapper = styled.div``;

const TagBody1 = styled(Body1)`
  color: ${(props) => props.theme.colors.blueCrayola};
`;

const FacultiesSection: React.FC = () => {
  return (
    <Wrapper>
      <Title>Faculties</Title>
      <TagsWrapper>
        <TagContainer>
          <TagBody1>Arts {"&"} Humanities</TagBody1>
        </TagContainer>
        <TagContainer>
          <TagBody1>Natural {"&"} Mathematical Sciences</TagBody1>
        </TagContainer>
        <TagContainer>
          <TagBody1>Social Science {"&"} Public Policy</TagBody1>
        </TagContainer>
        <TagContainer>
          <TagBody1>Law</TagBody1>
        </TagContainer>
        <TagContainer>
          <TagBody1>School of Bioscience Education</TagBody1>
        </TagContainer>
      </TagsWrapper>
    </Wrapper>
  );
};

export default FacultiesSection;
