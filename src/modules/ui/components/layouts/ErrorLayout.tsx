import { Alert, Stack, Typography } from '@mui/joy'

interface ErrorLayoutProps {
  error: unknown
  title?: string
}

const ErrorLayout = ({
  error,
  title = 'An error occurred',
}: ErrorLayoutProps) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unknown error occurred'

  return (
    <Alert
      color="danger"
      variant="soft"
      sx={{
        maxWidth: '600px',
        width: '100%',
      }}
    >
      <Stack>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-md" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      </Stack>
    </Alert>
  )
}

export default ErrorLayout
