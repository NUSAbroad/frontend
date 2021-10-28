import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import Spinner from "../components/Spinner";
import UniversityInfo from "../components/University/UniversityInfo";
import UniversityPastMappings from "../components/University/UniversityPastMappings";
import { BACKEND_URL } from "../constants";
import { useDocumentTitle } from "../hooks/DocumentTitle";

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 0;
`;

const University: React.FC = function () {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [uni, setUni] = useState<Types.University | null>(null);

  useDocumentTitle(uni?.name);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/universities/${slug}`)
      .then((response) => {
        setLoading(false);
        setUni(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (uni == null) {
    return <span>Error</span>;
  }

  return (
    <Container>
      <UniversityInfo uni={uni} />
      <UniversityPastMappings uni={uni} />
    </Container>
  );
};

export default University;
