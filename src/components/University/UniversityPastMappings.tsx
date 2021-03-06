import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { getMostRecentDate } from "../../utils/date";
import MappingsTable from "../MappingsTable";
import Notice from "../Notice";
import SearchBar from "../SearchBar";
import { Body2, Divider, Heading2 } from "../Styles";

const Container = styled.div`
  width: 100%;
  margin-top: 30px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    margin-top: 20px;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

const MappingsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 10px;
`;

const StyledNotice = styled(Notice)`
  margin-top: 20px;
`;

const StyledSearchBar = styled(SearchBar)`
  width: 300px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: 100%;
  }
`;

interface Props {
  uni: Types.University;
}

const UniversityPastMappings: React.FC<Props> = function (props) {
  const { uni } = props;
  const theme = useTheme();
  const [query, setQuery] = useState<string>("");
  const [filteredMappings, setFilteredMappings] = useState<Types.Mapping[]>(
    uni.Mappings
  );
  const [displayHitsCount, setDisplayHitsCount] = useState<boolean>();
  const [hitsCount, setHitsCount] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => filterMappings(query), 200);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const filterMappings = (query: string) => {
    const filter = new RegExp(query.trim(), "i");
    const filteredMappings = uni.Mappings.filter((mapping) =>
      filter.test(JSON.stringify(mapping))
    );
    setFilteredMappings(filteredMappings);
    setHitsCount(filteredMappings.length.toString());
    if (query.length !== 0) {
      setDisplayHitsCount(true);
    }
  };

  const onSearchChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const query = e.target.value;
    setQuery(query);
    if (query.length === 0) {
      setDisplayHitsCount(false);
    }
  };

  const onCrossClickHandler = () => {
    setDisplayHitsCount(false);
    setQuery("");
  };

  const mostRecentDate = getMostRecentDate(uni.Mappings);

  return (
    <Container>
      <HeadingWrapper>
        <Heading2>Past Approved Mappings</Heading2>
        <StyledSearchBar
          size="sm"
          onChangeHandler={onSearchChangeHandler}
          query={query}
          onCrossClickHandler={onCrossClickHandler}
          placeholder="Module code or name..."
        />
      </HeadingWrapper>
      <MappingsMeta>
        <Body2 $color={theme.colors.grey400}>
          {mostRecentDate && `Last retrieved from EduRec on ${mostRecentDate}`}
        </Body2>
        <Body2 $color={theme.colors.grey500} $weight="300">
          {displayHitsCount && (
            <span>
              <strong>{hitsCount}</strong> mappings found &bull;&nbsp;
            </span>
          )}
          <strong>{uni.Mappings.length}</strong> Total
        </Body2>
      </MappingsMeta>
      <StyledDivider />
      <MappingsTable mappings={filteredMappings} uni={uni} />
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
