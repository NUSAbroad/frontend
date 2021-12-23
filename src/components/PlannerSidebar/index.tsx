import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BACKEND_URL } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addUni, getUnis, removeUni } from "../../redux/plannerSlice";
import { setToast } from "../../redux/toastSlice";
import analytics from "../../utils/analytics";
import { exportPlanner } from "../../utils/exportPlanner";
import Combobox from "../Combobox";
import { Button, Divider } from "../Styles";
import PlannerSideList from "./components/PlannerSideList";
import UniListboxOption from "./components/UniListboxOption";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: sticky;
  top: 78px;
  height: fit-content;
`;

const PlannerSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const unis = useAppSelector(getUnis);
  const [allUnis, setAllUnis] = useState<Types.University[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/search/general`)
      .then((response) => {
        setAllUnis(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onExportClickHandler = () => {
    analytics.sendEvent({
      category: "Planner",
      action: "Exported planner as Word Doc",
    });
    exportPlanner(unis);
  };

  /* ---------- Combobox helper functions ---------- */
  const filterUnis = (filter: string): Types.University[] => {
    const toMatch = filter.toLowerCase();
    const filteredUnis = [...allUnis].filter((uni) => {
      return uni.name.toLowerCase().indexOf(toMatch) !== -1;
    });

    return filteredUnis;
  };

  const isUniSelected = (uni: Types.University): boolean =>
    unis.find((selectedUni) => selectedUni.name === uni.name) != null;

  const handleSelectUni = (uni: Types.University) => {
    if (isUniSelected(uni)) {
      analytics.sendEvent({
        category: "Planner",
        action: "Removed university from planner",
        label: "Planner Sidebar",
      });
      dispatch(removeUni(uni));
      dispatch(
        setToast({
          message: "University removed from planner",
          canUndo: true,
          undoMessage: "University re-added to planner",
        })
      );
    } else {
      analytics.sendEvent({
        category: "Planner",
        action: "Added university to planner",
        label: "Planner Sidebar",
      });
      dispatch(addUni(uni));
      dispatch(setToast({ message: "University added to planner" }));
    }
  };
  /* ----------------------------------------------- */

  return (
    <Wrapper>
      <Button onClick={onExportClickHandler}>Download as .docx</Button>
      <Combobox
        options={allUnis}
        placeholder="Add university to list..."
        filterOptions={filterUnis}
        isOptionSelected={isUniSelected}
        handleSelect={handleSelectUni}
        optionComponent={UniListboxOption}
      />
      <PlannerSideList />
      <Divider />
    </Wrapper>
  );
};

export default PlannerSidebar;
