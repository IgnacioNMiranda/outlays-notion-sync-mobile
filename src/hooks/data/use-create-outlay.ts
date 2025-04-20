import { useMutation } from 'react-query'
import { createOutlay as createOutlayBackend } from '../../services/outlays/create-outlay'
import { CreateOutlayDTO } from '../../dtos/create-outlay-dto'

export const useCreateOutlay = () => {
  const createOutlayMutation = useMutation('create-outlay', createOutlayBackend)

  const createOutlay = async (dto: CreateOutlayDTO) => {
    const newOutlay = await createOutlayMutation.mutateAsync(dto)
    return newOutlay
  }

  return { createOutlay }
}
