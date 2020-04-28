import React from 'react'
import Peaks from './Peaks'

describe('Peaks class initialisation', () => {
    it('Initialises without crashing', () => {
        const peaks = new Peaks('abc')
    
        const zoomview = (<div />).instance
        const overview = (<div />).instance
        const mediaElem = (<audio />).instance
    
        peaks.updateRefs(zoomview, overview, mediaElem)
        peaks.init()
    })
})

describe('Peaks class operation', () => {
    let peaks = null
    beforeEach(() => {
        peaks = new Peaks('abc', false, '/testpath')
    })

    it('can get the path to waveform data if we are using local data', () => {
        expect(peaks.getDataUri()).toBe('/abc')
    })

    it('can get the path to waveform data if we are using data from' + 
        ' a server', () => {
        const peaks = new Peaks('abc', true, '/testpath')
        expect(peaks.getDataUri()).toBe('/testpath/peaks/waveform/abc')
    })
})