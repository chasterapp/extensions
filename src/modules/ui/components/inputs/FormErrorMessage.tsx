import { InfoOutlined } from '@mui/icons-material'
import { FormHelperText } from '@mui/joy'
import type { FieldError } from 'react-hook-form'

type Props = {
  error: FieldError | undefined
}

export const FormErrorMessage = ({ error }: Props) => {
  if (!error || !error.message) return null

  return (
    <FormHelperText>
      <InfoOutlined />
      {error.message}
    </FormHelperText>
  )
}
