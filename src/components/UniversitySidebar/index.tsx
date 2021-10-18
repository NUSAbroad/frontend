import React from "react";
import styled from "styled-components";

import QuickLinks from "./components/QuickLinks";
import Semesters from "./components/Semesters";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
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
