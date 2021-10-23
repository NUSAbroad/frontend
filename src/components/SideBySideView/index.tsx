import React from "react";
import styled from "styled-components";

import { Body2 } from "../Styles";
import AdditionalInfoRow from "./components/AdditionalInfoRow";
import HeaderRow from "./components/HeaderRow";
import HeadingCell from "./components/HeadingCell";
import MyMappingsRow from "./components/MyMappingsRow";
import QuickLinksRow from "./components/QuickLinksRow";
import { Cell, Row } from "./components/Styles";

const Container = styled.div`
  max-width: 100%;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  background: ${(props) => props.theme.colors.babyPowder};
  text-align: left;
`;

interface Props {
  unis: Types.University[];
}

const SideBySideView: React.FC<Props> = function (props) {
  const { unis } = props;

  if (unis.length === 0) {
    return null;
  }

  return (
    <Container>
      <Table cellSpacing="0">
        <thead>
          <HeaderRow unis={unis} />
        </thead>
        <tbody>
          <Row>
            <HeadingCell>Location</HeadingCell>
            {unis.map((uni) => (
              <Cell key={uni.id}>
                <Body2>
                  {uni.state && `${uni.state}, `}
                  {uni.Country.name}
                </Body2>
              </Cell>
            ))}
          </Row>
          <Row>
            <HeadingCell>Semesters</HeadingCell>
            {unis.map((uni) => (
              <Cell key={uni.id}>
                {uni.Semesters.map((sem, index) => (
                  <Body2 key={index}>{sem.description}</Body2>
                ))}
              </Cell>
            ))}
          </Row>
          <AdditionalInfoRow unis={unis} />
          <Row>
            <HeadingCell>Past Approved Mappings</HeadingCell>
            {unis.map((uni) => (
              <Cell key={uni.id}>
                <Body2>{uni.mappingsCount} mappings</Body2>
              </Cell>
            ))}
          </Row>
          <MyMappingsRow unis={unis} />
          <QuickLinksRow unis={unis} />
        </tbody>
      </Table>
    </Container>
  );
};

export default SideBySideView;
