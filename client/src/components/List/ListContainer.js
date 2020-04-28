import React, { useEffect, useState } from "react";
import styled from "../../modules/styled";
import { mapAudioDataToBtns, fetchAudioList } from "./eventHandlers";
import { USE_SERVER } from "../../App";

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
`;

export default ({ setAudioSource, audioUrl: selectedAudioUrl }) => {
  let [buttonData, setButtonData] = useState([]);

  useEffect(() => {
    fetchAudioList(USE_SERVER, setButtonData);
  }, []);

  const renderButtonList = () => {
    return buttonData.map(mapAudioDataToBtns(selectedAudioUrl, setAudioSource));
  };

  return <ListWrapper>{renderButtonList()}</ListWrapper>;
};
