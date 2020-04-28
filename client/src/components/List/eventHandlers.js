import React from 'react'
import ListButton from './ListButton'
import { get } from '../../modules/requests'
import {SERVER_BASE_ADDR} from '../../App'

const isAudioFileSelected = (selectedAudioUrl, audioUrl) => {
  return selectedAudioUrl && selectedAudioUrl === audioUrl
}

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
)

export const fetchAudioList = async (callback) => {
  const audioData = await get(`${SERVER_BASE_ADDR}/peaks/`)
  const availableFiles = audioData.data || []

  const validFiles = [] 
  for (let key in availableFiles) {
    const hasWavedata = availableFiles[key].includes('json')
    const hasAudio = availableFiles[key].length > 1
    if (hasAudio && hasWavedata) {
      validFiles.push(key)
    }
  }
  
  const list = validFiles.map(title => ({
    title,
    audioUrl: title + '.wav',
    waveformUrl: title + '.json',
  }))
  callback(list)
}
