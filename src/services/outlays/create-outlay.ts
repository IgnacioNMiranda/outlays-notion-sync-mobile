import { CreateOutlayDTO } from '../../dtos/create-outlay-dto'
import { OUTLAYS_API_URL, API_KEY, API_TOKEN } from '@env'
import { getStatusError } from './utils'

export const createOutlay = async (outlayDto: CreateOutlayDTO) => {
  const response = await fetch(`${OUTLAYS_API_URL}/outlays`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(outlayDto),
  })

  if (response.ok) {
    const outlay = await response.json()
    // Type of the data doesn't really matter, not doing anything with it.
    return { data: outlay, error: '' }
  }

  const error = response.statusText || getStatusError(response.status)
  return { data: null, error }
}
