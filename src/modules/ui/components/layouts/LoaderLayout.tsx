import MainLayout from '@/modules/ui/components/layouts/MainLayout'
import { CircularProgress } from '@mui/joy'

const LoaderLayout = () => (
  <MainLayout
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
    }}
  >
    <CircularProgress size="lg" />
  </MainLayout>
)

export default LoaderLayout
