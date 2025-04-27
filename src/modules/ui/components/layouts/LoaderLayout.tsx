import MainLayout from '@/modules/ui/components/layouts/MainLayout'
import { CircularProgress } from '@mui/joy'

const LoaderLayout = () => (
  <MainLayout
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    }}
  >
    <CircularProgress size="lg" />
  </MainLayout>
)

export default LoaderLayout
