import React from "react";
import styled, { useTheme } from "styled-components";

import { Body2, StyledLink, Subheading } from "../../Styles";

const Cell = styled.th`
  vertical-align: bottom;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
`;

const HeadingCell = styled(Cell)`
  position: sticky;
  left: 0;
  min-width: 130px;
  max-width: 130px;
  padding: 10px;
  border-top-left-radius: 5px;
  background: ${(props) => props.theme.colors.grey100};
`;

const UniCell = styled(Cell)`
  min-width: 250px;
  max-width: 250px;
  border-left: none;
  border-right: 1px solid ${(props) => props.theme.colors.grey200};
  background: ${(props) => props.theme.colors.babyPowder};

  &:last-child {
    border-top-right-radius: 5px;
    border-right: 1px solid ${(props) => props.theme.colors.grey300};
  }
`;

interface Props {
  unis: Types.University[];
}

const HeaderRow: React.FC<Props> = function (props) {
  const { unis } = props;
  const theme = useTheme();

  return (
    <tr>
      <HeadingCell>
        <Body2 $color={theme.colors.grey500}>University</Body2>
      </HeadingCell>
      {unis.map((uni) => (
        <UniCell key={uni.id}>
          <Subheading $color={theme.colors.blueCrayola}>
            <StyledLink to={`/universities/${uni.slug}`}>{uni.name}</StyledLink>
          </Subheading>
        </UniCell>
      ))}
    </tr>
  );
};

export default HeaderRow;
