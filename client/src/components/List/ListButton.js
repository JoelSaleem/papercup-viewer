import React from 'react'
import FlatButton from '../layout/FlatButton'

export default ({ title, audioUrl, waveformUrl, setSource, isSelected }) => {
  const onButtonClicked = () => {
    setSource(audioUrl, waveformUrl)
  }

  return (
    <FlatButton selected={isSelected()} onClick={onButtonClicked}>
      {title}
    </FlatButton>
  )
}
