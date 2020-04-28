import React from 'react'
import { USE_SERVER, SERVER_BASE_ADDR } from '../../App'

export default ({ setMedia, audioUrl }) => {
  let sourceUrl = null
  if (USE_SERVER) {
    sourceUrl = SERVER_BASE_ADDR + '/peaks/audio/' + audioUrl
  } else {
    sourceUrl = audioUrl
  }

  return (
    <audio id='audio' controls='controls' ref={(c) => setMedia(c)}>
      {audioUrl && <source src={sourceUrl} type='audio/wav' />}
    </audio>
  )
}
