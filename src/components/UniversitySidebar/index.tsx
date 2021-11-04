import React from "react";
import styled, { css } from "styled-components";

import QuickLinks from "./components/QuickLinks";
import Semesters from "./components/Semesters";

const Wrapper = styled.div<{ $isUniPage?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-basis: 240px;
  flex-shrink: 0;
  width: 100%;

  ${(props) =>
    props.$isUniPage
      ? css`
          @media (max-width: ${(props) => props.theme.breakPoints.md}) {
            flex-basis: initial;
          }
        `
      : css`
          @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
            flex-basis: initial;
          }
        `}
`;

interface Props {
  semesters: Types.Semester[];
  links: Types.Link[];
  isUniPage?: boolean;
}

const UniversitySidebar: React.FC<Props> = (props) => {
  const { semesters, links, isUniPage } = props;

  return (
    <Wrapper $isUniPage={isUniPage}>
      <Semesters semesters={semesters} />
      <QuickLinks links={links} />
    </Wrapper>
  );
};

export default UniversitySidebar;
