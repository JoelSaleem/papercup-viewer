import React from "react";
import ListButton from "./ListButton";
import { get } from "../../modules/requests";
import { SERVER_BASE_ADDR } from "../../App";

const isAudioFileSelected = (selectedAudioUrl, audioUrl) => {
  return selectedAudioUrl && selectedAudioUrl === audioUrl;
};

export const mapAudioDataToBtns = (selectedAudioUrl, setSource) => ({
  title,
  audioUrl,
  waveformUrl,
}) => (
  <ListButton
    key={title}
    isSelected={() => isAudioFileSelected(selectedAudioUrl, audioUrl)}
    title={title}
    audioUrl={audioUrl}
    waveformUrl={waveformUrl}
    setSource={setSource}
  />
);

export const fetchAudioList = (USE_SERVER, callback) => {
  if (USE_SERVER) {
    fetchAudioListServer((list) => callback(list));
  } else {
    fetchAudioListLocal(callback);
  }
};

export const fetchAudioListServer = async (callback) => {
  const audioData = await get(`${SERVER_BASE_ADDR}/peaks/`);
  const availableFiles = audioData.data || [];

  // Only include files that have audio and waveform data
  const validFiles = [];
  for (let key in availableFiles) {
    const hasWavedata = availableFiles[key].includes("json");
    const hasAudio = availableFiles[key].length > 1;
    if (hasAudio && hasWavedata) {
      validFiles.push(key);
    }
  }

  const list = validFiles.map((title) => ({
    title,
    audioUrl: title + ".wav",
    waveformUrl: title + ".json",
  }));

  callback(list);
};

const fetchAudioListLocal = (callback) => {
  return get("/fileList.json")
    .then((res) => res.data)
    .then((data) => callback(data.files));
};
