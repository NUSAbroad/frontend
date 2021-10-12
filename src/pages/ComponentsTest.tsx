import React from "react";
import styled, { useTheme } from "styled-components";

import MappingsTable from "../components/MappingsTable";
import Notice from "../components/Notice";
import {
  Body1,
  Body2,
  Button,
  Divider,
  Heading1,
  Heading2,
  Heading3,
  StyledLink,
  Subheading,
} from "../components/Styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const ComponentsTest: React.FC = function () {
  const theme = useTheme();

  return (
    <Container>
      <Heading1>Heading1</Heading1>
      <Divider />
      <Heading2>Heading2</Heading2>
      <Heading3>Heading3</Heading3>
      <Subheading>Subheading</Subheading>
      <Body1>Body1</Body1>
      <Body2>Body2</Body2>
      <Heading2>
        <StyledLink to="/">Link</StyledLink>
      </Heading2>
      <Body1>
        <StyledLink to="/">Link</StyledLink>
      </Body1>
      <Button>Button</Button>
      <Button
        $color={theme.colors.orangeSoda}
        $focusColor={theme.colors.orangeSoda50}
      >
        Button
      </Button>
      <Notice>This is a notice</Notice>
      <MappingsTable />
      <MappingsTable isPlanner />
    </Container>
  );
};

export default ComponentsTest;
