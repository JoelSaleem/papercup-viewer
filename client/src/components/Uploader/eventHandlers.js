import {post } from '../../modules/requests'
import {SERVER_BASE_ADDR} from '../../App'

export const onFileUploadReq = (e) => {
  const formData = new FormData()
  formData.append('file', e.target.files[0])
  post(`${SERVER_BASE_ADDR}/peaks/upload`, formData)
}
