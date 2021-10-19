import React from "react";

import { Body2, StyledLink } from "../../Styles";
import HeadingCell from "./HeadingCell";
import { Cell, Row } from "./Styles";

interface Props {
  unis: Types.University[];
}

const QuickLinksRow: React.FC<Props> = function (props) {
  const { unis } = props;

  return (
    <Row>
      <HeadingCell>Quick Links</HeadingCell>
      {unis.map((uni) => (
        <Cell key={uni.id}>
          {uni.Links.map((link, index) => (
            <Body2 key={index}>
              <StyledLink
                to={{ pathname: `${link.link}` }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </StyledLink>
            </Body2>
          ))}
        </Cell>
      ))}
    </Row>
  );
};

export default QuickLinksRow;
