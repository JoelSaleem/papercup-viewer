import React, {} from 'react'

export default ({ instance, setZoomview, setOverview }) => {
  const renderZoomContainer = () => (
    <div id='zoomview-container' ref={setZoomview} />
  )

  const renderOverviewContainer = () => (
    <div id='overview-container' ref={setOverview} />
  )

  return (
      <div id='waveform-container'>
        {renderZoomContainer()}      
        {renderOverviewContainer()}
      </div>
  )
}

