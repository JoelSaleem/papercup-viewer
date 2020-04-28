import React, { useEffect, useState } from "react";
import styled from "../../modules/styled";
import { mapAudioDataToBtns, fetchAudioList } from "./eventHandlers";
import { USE_SERVER } from "../../App";

export const localAudioFiles = [
  {
    title: "TOL_6min_720p_download",
    audioUrl: "TOL_6min_720p_download.wav",
    waveformUrl: "TOL_6min_720p_download.json",
  },
  {
    title: "07023003",
    audioUrl: "07023003.wav",
    waveformUrl: "07023003.json",
  },
];

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
