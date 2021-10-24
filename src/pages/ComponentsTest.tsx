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
import UniversitySidebar from "../components/UniversitySidebar";
import { useAppDispatch } from "../redux/hooks";
import { setToast } from "../redux/toastSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const ComponentsTest: React.FC = function () {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setToast({ message: "Button Clicked" }));
  };

  const handleUndoableClick = () => {
    dispatch(setToast({ message: "Button Clicked", canUndo: true }));
  };

  const testUni = {
    id: 0,
    name: "National University of Singapore",
    slug: "national-university-of-singapore",
    state: null,
    countryId: 0,
    additionalInfo: null,
    updatedAt: "Thursday",
    Country: {
      name: "Singapore",
    },
    Links: [],
    Semesters: [],
    Faculties: [],
    Mappings: [],
  };

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
      <Button onClick={handleClick}>Button</Button>
      <Button
        $color={theme.colors.orangeSoda}
        $focusColor={theme.colors.orangeSoda50}
        onClick={handleUndoableClick}
      >
        Undoable Button
      </Button>
      <Notice>This is a notice</Notice>
      <MappingsTable mappings={[]} uni={testUni} />
      <MappingsTable mappings={[]} isPlanner uni={testUni} />
      <UniversitySidebar
        semesters={[]}
        links={[{ link: "/test", name: "GRO PDF" }]}
      />
    </Container>
  );
};

export default ComponentsTest;
