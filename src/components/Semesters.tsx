import React from "react";
import styled from "styled-components";

import { Body2, Subheading } from "./Styles";

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
        return <Body2 key={index}>{elem}</Body2>;
      })}
    </>
  );
};

export default Semesters;
