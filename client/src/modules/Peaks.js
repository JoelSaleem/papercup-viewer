import Peaks from 'peaks.js'

export default class PeaksManager {
  constructor(waveformFilename, USE_SERVER, SERVER_BASE_ADDR) {
    this.USE_SERVER = USE_SERVER
    this.SERVER_BASE_ADDR = SERVER_BASE_ADDR
    this.waveformFilename = waveformFilename

    // Container refs
    this.zoomviewRef = null
    this.overviewRef = null
    this.mediaRef = null

    this._peaksInstance = null
  }

  getDataUri () {
    if (this.USE_SERVER) {
      return this.SERVER_BASE_ADDR + '/peaks/waveform/' + this.waveformFilename
    } else {
      return '/' + this.waveformFilename
    }
  }

  updateRefs(zoomviewRef, overviewRef, mediaRef) {
    this.zoomviewRef = zoomviewRef
    this.overviewRef = overviewRef
    this.mediaRef = mediaRef
  }

  getOpts() {
    return {
      containers: {
        zoomview: this.zoomviewRef,
        overview: this.overviewRef,
      },
      mediaElement: this.mediaRef,
      dataUri: {
        json: this.getDataUri(),
      },
      keyboard: true,
      pointMarkerColor: '#006eb0',
      showPlayheadTime: true
    }
  }

  init () {
    if (this.zoomviewRef && this.overviewRef && this.mediaRef) {
      Peaks.init(this.getOpts(), (err, peaks) => {
        if (err) {
          throw new Error(err)
        }

        this._peaksInstance = peaks
      })
    }
  }

  getInstance() {
    return this._peaksInstance
  }
}
