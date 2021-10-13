import React from "react";
import styled from "styled-components";

import { Body1, Subheading } from "./Styles";

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const Title = styled(Subheading)`
  padding-bottom: 10px;
`;

const SemestersSection: React.FC = () => {
  return (
    <Wrapper>
      <Title>Semesters</Title>
      <Body1>Sept - Dec</Body1>
      <Body1>Jan - June</Body1>
    </Wrapper>
  );
};

export default SemestersSection;
