import React from "react";
import styled from "styled-components";

import { Body1, Subheading } from "../../Styles";

const StyledBody1 = styled(Body1)`
  margin-top: 5px;
`;

interface Props {
  semesters: Types.Semester[];
}

const MarginSubheading = styled(Subheading)`
  margin-bottom: 5px;
`;

const Semesters: React.FC<Props> = (props) => {
  const { semesters } = props;

  return (
    <>
      <MarginSubheading>Semesters</MarginSubheading>
      {semesters.map((elem, index) => {
        return <StyledBody1 key={index}>{elem.description}</StyledBody1>;
      })}
    </>
  );
};

export default Semesters;
