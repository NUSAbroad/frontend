import React from "react";
import styled, { useTheme } from "styled-components";

import { getMostRecentDate } from "../utils/date";
import MappingsTable from "./MappingsTable";
import Notice from "./Notice";
import { Body1, Body2, Heading2 } from "./Styles";

const Container = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const MappingsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const StyledNotice = styled(Notice)`
  margin-top: 20px;
`;

interface Props {
  uni: Types.University;
}

const UniversityPastMappings: React.FC<Props> = function (props) {
  const { uni } = props;
  const theme = useTheme();

  return (
    <Container>
      <Heading2>Past Approved Mappings</Heading2>
      <MappingsMeta>
        <Body1 $color={theme.colors.grey400}>
          Last retrieved from EduRec on {getMostRecentDate(uni.Mappings)}
        </Body1>
        <Body1 $weight="300">
          <strong>{uni.Mappings.length}</strong> Total
        </Body1>
      </MappingsMeta>
      <MappingsTable mappings={uni.Mappings} />
      <StyledNotice>
        <Body2>
          These past mappings were approved solely based on the similarity of
          content, and not based on its availability. It is possible that some
          modules are not actually available despite being in this list.
          Therefore, it is highly recommended to do your own research to verify
          that your selected modules are available in your exchange semester and
          offered to exchange students.
        </Body2>
      </StyledNotice>
    </Container>
  );
};

export default UniversityPastMappings;
