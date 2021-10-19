import React from "react";

import University from "./components/University";

interface Props {
  unis: Types.University[];
}

const MappingsView: React.FC<Props> = function (props) {
  const { unis } = props;

  return (
    <>
      {unis.map((uni) => (
        <University key={uni.id} uni={uni} />
      ))}
    </>
  );
};

export default MappingsView;
