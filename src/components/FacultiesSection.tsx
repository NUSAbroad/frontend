import React from "react";
import styled from "styled-components";

import { Body1, Subheading } from "./Styles";

const Container = styled.div`
  margin-top: 20px;
`;

const TagContainer = styled.div`
  padding: 0 15px;
  border: 1px solid ${(props) => props.theme.colors.bistre};
  border-radius: 35px;
  line-height: 2rem;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

interface Props {
  faculties: Types.Faculty[];
}

const FacultiesSection: React.FC<Props> = (props) => {
  const { faculties } = props;

  return (
    <Container>
      <Subheading>Faculties</Subheading>
      <TagsWrapper>
        {faculties.map((faculty, index) => (
          <TagContainer key={index}>
            <Body1>{faculty.name}</Body1>
          </TagContainer>
        ))}
      </TagsWrapper>
    </Container>
  );
};

export default FacultiesSection;
