import React from "react";
import styled from "styled-components";

import SEO from "../components/SEO";
import { Body1, Heading1, Heading2, StyledLink } from "../components/Styles";

const Wrapper = styled.div`
  width: 100%;
  max-width: 33rem;
  margin: 0 auto;
  padding: 30px 0;
`;

const StyledHeading1 = styled(Heading1)`
  margin-bottom: 1rem;
  // text-align: center;
`;

const StyledBody1 = styled(Body1)`
  margin-top: 1rem;
`;

const About: React.FC = function () {
  return (
    <Wrapper>
      <SEO title="About" />
      <StyledHeading1>About</StyledHeading1>
      <StyledBody1>
        We started NUSAbroad to help improve the exchange application experience
        for students. Anyone who has prepared exchange applications in the past
        would know that it is a <b>slow, tedious and messy</b> process.
      </StyledBody1>
      <StyledBody1>
        Our goal was to make the experience <b>fast, easy and organised</b>{" "}
        instead. We sought to do this by simplifying the process of finding
        information on partner universities and their past approved mappings, as
        well as provide a built-in tool for preparing your study plan.
      </StyledBody1>
      <StyledBody1>
        Here are some of the things you can do with NUSAbroad:
      </StyledBody1>
      <ul>
        <li>
          <StyledBody1>
            Get a <b>quick overview</b> of{" "}
            <StyledLink to="/universities">
              all 189 partner universities
            </StyledLink>
            , with information such as past approved mappings, semester
            schedule, estimated costs, minimum CAP and quick links to related
            resources.
          </StyledBody1>
        </li>
        <li>
          <StyledBody1>
            <b>Search</b> by module code or module name to find universities
            which have past approved mappings for the module. You can also
            search for universities by name or filter by country.
          </StyledBody1>
        </li>
        <li>
          <StyledBody1>
            <b>Organise</b> your exchange study plan with the{" "}
            <StyledLink to="/planner">built-in planner</StyledLink>, which helps
            keep track of your selected universities and module mappings. And
            when you’re ready to submit your study plan, you can simply{" "}
            <b>download</b> it as a Word Document.
          </StyledBody1>
        </li>
        <li>
          <StyledBody1>
            <b>Compare universities</b> side-by-side on the same page with the{" "}
            <StyledLink to="/planner">built-in planner</StyledLink>.
          </StyledBody1>
        </li>
      </ul>
      <Heading2>Share your feedback</Heading2>
      <StyledBody1>
        We&apos;re still in the process of improving and iterating on our
        application, and we would love to hear your feedback! Found a bug or
        have suggestions? Let us know{" "}
        <StyledLink
          to={{ pathname: "https://bit.ly/nusabroad" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </StyledLink>
        !
      </StyledBody1>
    </Wrapper>
  );
};

export default About;
