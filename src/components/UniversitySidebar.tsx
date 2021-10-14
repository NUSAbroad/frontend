import React from "react";
import styled from "styled-components";

import QuickLinks from "./QuickLinks";
import Semesters from "./Semesters";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  semesters: string[];
  links: { [name: string]: string };
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
