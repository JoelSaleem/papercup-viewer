import React, { useState } from "react";
import Peaks from "./modules/Peaks";
import useAudioSource from "./hooks/useAudioSource";

import AppStyles from "./components/AppStyles";
import AudioList from "./components/List/ListContainer";
import MediaPlayer from "./components/MediaPlayer";
import Uploader from "./components/FileUploader";

// True if we are serving files dynamically from server
// False if we are using static assets in public dir
export const USE_SERVER = true;

// ip address and port on which the server is running
export const SERVER_BASE_ADDR = "http://127.0.0.1:8000";

function App() {
  // Element refs for peaks.js
  const [zoomview, setZoomview] = useState();
  const [overview, setOverview] = useState();
  const [media, setMedia] = useState();

  // Select audio source
  const { audioUrl, waveformUrl, setAudioSource } = useAudioSource(media);

  // Setup peaks.js
  if (audioUrl && waveformUrl) {
    const peaks = new Peaks(waveformUrl, USE_SERVER, SERVER_BASE_ADDR);
    peaks.updateRefs(zoomview, overview, media);
    peaks.init();
  }

  return (
    <div className="App">
      <AppStyles>
        <AudioList setAudioSource={setAudioSource} audioUrl={audioUrl} />
        <MediaPlayer
          audioUrl={audioUrl}
          setZoomview={setZoomview}
          setOverview={setOverview}
          setMedia={setMedia}
        />
        {USE_SERVER && <Uploader />}
      </AppStyles>
    </div>
  );
}

export default App;
