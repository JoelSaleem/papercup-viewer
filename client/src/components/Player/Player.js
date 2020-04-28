import React from 'react'
import styled from '../../modules/styled'

import WaveformContainer from './WaveformContainers'
import Media from './MediaElem'

const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default ({audioUrl, setMedia, setOverview, setZoomview }) => {
  return (
    <>
      <WaveformContainer setOverview={setOverview} setZoomview={setZoomview} />
      
      <MediaWrapper>
        <Media audioUrl={audioUrl} setMedia={setMedia} />
      </MediaWrapper>
    </>
  )
}
