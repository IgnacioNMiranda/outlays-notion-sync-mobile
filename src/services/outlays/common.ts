import { CreateOutlayDTO } from '../../dtos/create-outlay-dto'
import { OUTLAYS_API_URL } from '@env'

export const createOutlay = async (outlayDto: CreateOutlayDTO) => {
  console.log(`${OUTLAYS_API_URL}/outlays`)

  const response = await fetch(`${OUTLAYS_API_URL}/outlays`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(outlayDto),
  })
  if (response.ok) {
    const outlay = await response.json()
    return { data: outlay, error: '' }
  }
  return { data: null, error: response.statusText }
}
