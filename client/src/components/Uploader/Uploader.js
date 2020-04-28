import React from 'react'
import styled from '../../modules/styled'
import { onFileUploadReq } from './eventHandlers'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center
`
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default () => {
  return (
    <Container>
      <InputContainer>
        Upload File
        <input type='file' name='file' onChange={onFileUploadReq} />
      </InputContainer>
    </Container>
  )
}
