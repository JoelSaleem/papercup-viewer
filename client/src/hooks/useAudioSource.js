import {useState} from 'react'

export default mediaElem => {
    const [audioUrl, setAudioUrl] = useState()
    const [waveformUrl, setWaveformUrl] = useState()
    
    const setAudioSource = (audioPath, waveformPath) => {
      setAudioUrl(audioPath)
      setWaveformUrl(waveformPath)
      
      if (mediaElem) {
          // Reload <audio> when switching sources
        mediaElem.pause()
        mediaElem.source = audioPath
        mediaElem.load()
      }
    }

    return {audioUrl, waveformUrl, setAudioSource}
}