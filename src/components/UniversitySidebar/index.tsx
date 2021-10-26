import React from "react";
import styled from "styled-components";

import QuickLinks from "./components/QuickLinks";
import Semesters from "./components/Semesters";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: 200px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

interface Props {
  semesters: Types.Semester[];
  links: Types.Link[];
}

const UniversitySidebar: React.FC<Props> = (props) => {
  const { semesters, links } = props;

  return (
    <Wrapper>
      <Semesters semesters={semesters} />
      <QuickLinks links={links} />
    </Wrapper>
  );
};

export default UniversitySidebar;
