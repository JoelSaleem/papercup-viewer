import React from 'react'
import Button from '../layout/Button'

export default ({ title, audioUrl, waveformUrl, setSource, isSelected }) => {
  const onButtonClicked = () => {
    setSource(audioUrl, waveformUrl)
  }

  return (
    <Button disabled={isSelected()} onClick={onButtonClicked}>
      {title}
    </Button>
  )
}
