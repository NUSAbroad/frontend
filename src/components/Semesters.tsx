import React from "react";
import styled from "styled-components";

import { Body1, Subheading } from "./Styles";

interface Props {
  semesters: string[];
}

const MarginSubheading = styled(Subheading)`
  margin-bottom: 10px;
`;

const Semesters: React.FC<Props> = (props) => {
  const { semesters } = props;

  return (
    <>
      <MarginSubheading>Semesters</MarginSubheading>
      {semesters.map((elem, index) => {
        return <Body1 key={index}>{elem}</Body1>;
      })}
    </>
  );
};

export default Semesters;
