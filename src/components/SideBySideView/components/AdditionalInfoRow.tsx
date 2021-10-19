import React from "react";

import { Body2 } from "../../Styles";
import HeadingCell from "./HeadingCell";
import { Cell, Row } from "./Styles";

interface Props {
  unis: Types.University[];
}

const AdditionalInfoRow: React.FC<Props> = function (props) {
  const { unis } = props;

  return (
    <Row>
      <HeadingCell>Additional Info</HeadingCell>
      {unis.map((uni) => (
        <Cell key={uni.id}>
          {uni.additionalInfo
            ? Object.entries(uni.additionalInfo).map(([key, value], index) => (
                <Body2 key={index}>
                  {key}: {value}
                </Body2>
              ))
            : "-"}
        </Cell>
      ))}
    </Row>
  );
};

export default AdditionalInfoRow;
