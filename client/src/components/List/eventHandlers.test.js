import { mount } from "enzyme";
import { mapAudioDataToBtns } from "./eventHandlers";

describe("mapAudioDataToBtns", () => {
  const audioData = {
    files: [
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
    ],
  };

  it("renders a button given a a data element", () => {
      const btns = mapAudioDataToBtns('abc', () => {})(audioData.files[1])
      const wrapper = mount(btns)
      expect(wrapper.find('#list-button-07023003').exists()).toBe(true)
      
  });
});
