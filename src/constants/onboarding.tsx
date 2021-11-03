import styled from "styled-components";

import { Body1, Heading3 } from "../components/Styles";

const StyledHeading3 = styled(Heading3)`
  margin-top: 0.6rem;
  color: ${(props) => props.theme.colors.babyPowder};
  font-weight: 300;
`;

const StyledBody1 = styled(Body1)`
  margin-top: 0.6rem;
  color: ${(props) => props.theme.colors.grey200};
  font-weight: 300;

  b {
    font-weight: 600;
  }
`;

const StyledList = styled.ul`
  margin: 0;
  padding-left: 2rem;
  color: ${(props) => props.theme.colors.grey200};
`;

const Highlight = styled.span`
  color: ${(props) => props.theme.colors.saffron};
  font-weight: 400;
`;

interface Step {
  step: number;
  content: JSX.Element;
  buttonText?: string;
}

export const steps: Step[] = [
  {
    step: 1,
    content: (
      <>
        <StyledHeading3>Welcome to NUSAbroad! 🎉</StyledHeading3>
        <StyledBody1>
          Applying for exchange? Let us help you make your application process{" "}
          <b>fast, easy and organised</b>.
        </StyledBody1>
        <StyledBody1>
          Let&apos;s have a look at how NUSAbroad can help!
        </StyledBody1>
      </>
    ),
  },
  {
    step: 2,
    content: (
      <>
        <StyledHeading3>
          Browse our comprehensive catalogue of partner unis
        </StyledHeading3>
        <StyledBody1>
          Head over to the <b>Universities</b> page to browse all 189 partner
          unis.
        </StyledBody1>
        <StyledList>
          <li>
            <StyledBody1>
              Have a uni in mind? <Highlight>Search for it by name!</Highlight>
            </StyledBody1>
          </li>
          <li>
            <StyledBody1>
              Keen on a specific country?{" "}
              <Highlight>Filter by countries!</Highlight>
            </StyledBody1>
          </li>
          <li>
            <StyledBody1>
              Planning to map a specific mod?{" "}
              <Highlight>Search for the module code or name</Highlight> to find
              unis with past approved mappings to that mod!
            </StyledBody1>
          </li>
        </StyledList>
      </>
    ),
  },
  {
    step: 3,
    content: (
      <>
        <StyledHeading3>Can’t decide which uni?</StyledHeading3>
        <StyledBody1>
          Every school, a good school. We know how hard it can be to choose.
        </StyledBody1>
        <StyledBody1>
          But fret not, simply add the unis you’re interested in to your
          planner, and you can <Highlight>compare them side-by-side</Highlight>{" "}
          on the <b>Planner</b> page!
        </StyledBody1>
      </>
    ),
  },
  {
    step: 4,
    content: (
      <>
        <StyledHeading3>Plan. Download. Submit.</StyledHeading3>
        <StyledBody1>
          Past mappings not what you’re looking for?{" "}
          <Highlight>Customise</Highlight> your own module mappings on the{" "}
          <b>Planner</b> page.
        </StyledBody1>
        <StyledBody1>
          And when you’re ready, you can <Highlight>download</Highlight> it as a
          Word Document and submit as your study plan!
        </StyledBody1>
      </>
    ),
  },
  {
    step: 5,
    content: (
      <>
        <StyledHeading3>Let&apos;s get you abroad! ✈️</StyledHeading3>
        <StyledBody1>
          You&apos;re all set and ready to start planning! We hope you get
          accepted to your dream uni!
        </StyledBody1>
        <StyledBody1>
          You can <Highlight>revisit these quick tips again anytime</Highlight>,
          via the question mark button on the bottom right of your screen.
        </StyledBody1>
      </>
    ),
    buttonText: "Let's get started!",
  },
];
