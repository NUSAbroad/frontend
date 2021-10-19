import React, { useState } from "react";
import styled from "styled-components";

import { View } from "../../constants/plannerViews";
import MappingsView from "../MappingsView";
import { Heading3 } from "../Styles";
import ViewToggle from "./components/ViewToggle";

const Container = styled.div`
  flex-grow: 1;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
`;

// Mock data, replace with redux later
const unis: Types.University[] = [
  {
    id: 225,
    name: "University of Canterbury",
    countryId: 9,
    state: null,
    slug: "university-of-canterbury",
    additionalInfo: null,
    updatedAt: "2021-10-18T08:54:04.600Z",
    Mappings: [
      {
        id: 5683,
        nusModuleFaculty: "BIZ",
        nusModuleCode: "FIN2704X",
        nusModuleName: "Finance",
        nusModuleCredits: 4,
        partnerModuleCode: "FINC201",
        partnerModuleName: "BUSINESS FINANCE",
        partnerModuleCredits: 15,
        partnerUniversityId: 225,
        nusFacultyId: 3,
        updatedAt: "2021-10-18T09:21:59.667Z",
      },
      {
        id: 5684,
        nusModuleFaculty: "BIZ",
        nusModuleCode: "MKT3702",
        nusModuleName: "Consumer Behaviour",
        nusModuleCredits: 4,
        partnerModuleCode: "MKTG204",
        partnerModuleName: "CONSUMER BEHAVIOUR",
        partnerModuleCredits: 15,
        partnerUniversityId: 225,
        nusFacultyId: 3,
        updatedAt: "2021-10-18T09:21:59.667Z",
      },
      {
        id: 5685,
        nusModuleFaculty: "BIZ",
        nusModuleCode: "FIN3716",
        nusModuleName: "Financial Modelling",
        nusModuleCredits: 4,
        partnerModuleCode: "FINC305",
        partnerModuleName: "FINANCIAL MODELLING",
        partnerModuleCredits: 15,
        partnerUniversityId: 225,
        nusFacultyId: 3,
        updatedAt: "2021-10-18T09:21:59.667Z",
      },
    ],
    Country: {
      name: "New Zealand",
    },
    Links: [
      {
        name: "GRO Infosheet",
        link: "https://nus.edu.sg/gro/docs/default-source/prog/sep/pu/nz/sep_new_zealand_canterbury.pdf",
      },
    ],
    Semesters: [
      {
        description: "Sep - Nov 2021",
      },
      {
        description: "Feb - May 2021",
      },
    ],
    Faculties: [
      {
        name: "Business",
        type: "PU",
      },
      {
        name: "Design",
        type: "PU",
      },
      {
        name: "Engineering",
        type: "PU",
      },
    ],
  },
  {
    id: 260,
    name: "Carnegie Mellon University",
    countryId: 15,
    state: null,
    slug: "carnegie-mellon-university",
    additionalInfo: null,
    updatedAt: "2021-10-18T08:54:04.600Z",
    Mappings: [
      {
        id: 7124,
        nusModuleFaculty: "SoC",
        nusModuleCode: "CS1010S",
        nusModuleName: "Programming Methodology",
        nusModuleCredits: 4,
        partnerModuleCode: "CS15112",
        partnerModuleName: "Fundamentals of Programming and Computer Science",
        partnerModuleCredits: 3,
        partnerUniversityId: 260,
        nusFacultyId: 9,
        updatedAt: "2021-10-18T09:21:59.667Z",
      },
    ],
    Country: {
      name: "USA",
    },
    Links: [
      {
        name: "GRO Infosheet",
        link: "https://nus.edu.sg/gro/docs/default-source/prog/sep/pu/us/sep_usa_carnegie_mellon_university.pdf",
      },
    ],
    Semesters: [
      {
        description: "Term 3: Sep to Nov 2035",
      },
      {
        description: "Term 2: May to July 2021",
      },
      {
        description: "Term 1: Jan - March 2021",
      },
    ],
    Faculties: [
      {
        name: "Business",
        type: "PU",
      },
      {
        name: "Design",
        type: "PU",
      },
      {
        name: "Engineering",
        type: "PU",
      },
    ],
  },
];

const PlannerMain: React.FC = function () {
  const [currView, setCurrView] = useState<View>(View.MAPPINGS);

  return (
    <Container>
      <HeaderSection>
        <Heading3>My Universities</Heading3>
        <ViewToggle currView={currView} setCurrView={setCurrView} />
      </HeaderSection>
      {currView == View.MAPPINGS && <MappingsView unis={unis} />}
    </Container>
  );
};

export default PlannerMain;
