import React from "react";
import styled from "styled-components";

import { Body1, Body2, Subheading } from "./Styles";

const Container = styled.div`
  margin-top: 20px;
`;

const StyledBody2 = styled(Body2)`
  margin-top: 5px;
  color: ${(props) => props.theme.colors.grey400};
`;

const TagContainer = styled.div`
  padding: 0 15px;
  border: 1px solid ${(props) => props.theme.colors.bistre};
  border-radius: 1rem;
  line-height: 2rem;
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

interface Props {
  className?: string;
  faculties: Types.Faculty[];
}

const FacultiesSection: React.FC<Props> = (props) => {
  const { className, faculties } = props;

  if (faculties.length === 0) {
    return (
      <Container className={className}>
        <Subheading>No faculties specified</Subheading>
        <StyledBody2>
          More information can be found in the GRO infosheet
        </StyledBody2>
      </Container>
    );
  }

  let heading;
  let subheading;

  if (faculties[0].type === "PU") {
    heading = "Partner Uni Faculties";
    subheading = "These faculties are accepting exchange students";
  } else {
    heading = "NUS Faculties";
    subheading = "Suitable for students from these faculties";
  }

  return (
    <Container className={className}>
      <Subheading>{heading}</Subheading>
      <StyledBody2>{subheading}</StyledBody2>
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
