import React from "react";
import styled from "styled-components";

import QuickLinks from "./components/QuickLinks";
import Semesters from "./components/Semesters";

const Wrapper = styled.div`
  // border-left: 1px solid ${(props) => props.theme.colors.grey200};
  // padding-left: 20px;
  display: flex;
  flex-direction: column;
  width: 240px;

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: 240px;
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
