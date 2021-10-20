import React from "react";

import { useAppSelector } from "../../../redux/hooks";
import { getUnis } from "../../../redux/plannerSlice";
import PlannerSideListRow from "./PlannerSideListRow";

const PlannerSideList: React.FC = () => {
  const unis = useAppSelector(getUnis);

  return (
    <>
      {unis.map((uni) => {
        return <PlannerSideListRow key={uni.id} uni={uni} />;
      })}
    </>
  );
};

export default PlannerSideList;
