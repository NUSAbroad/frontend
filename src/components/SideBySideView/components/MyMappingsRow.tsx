import React from "react";
import styled from "styled-components";

import { countMCs } from "../../../utils/countMCs";
import { Body2, Pill } from "../../Styles";
import HeadingCell from "./HeadingCell";
import { Cell, Row } from "./Styles";

const Mods = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

interface Props {
  unis: Types.University[];
}

const MyMappingsRow: React.FC<Props> = function (props) {
  const { unis } = props;

  return (
    <Row>
      <HeadingCell>My Mappings</HeadingCell>
      {unis.map((uni) => (
        <Cell key={uni.id}>
          <Body2>
            {uni.Mappings.length} mappings &bull; {countMCs(uni.Mappings)} MCs
          </Body2>
          <Mods>
            {uni.Mappings.map((mapping) => (
              <Pill key={mapping.id}>
                <Body2>{mapping.nusModuleCode}</Body2>
              </Pill>
            ))}
          </Mods>
        </Cell>
      ))}
    </Row>
  );
};

export default MyMappingsRow;
