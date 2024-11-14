import { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
import { Alert, Box, Link } from '@mui/joy'
import { useTranslation } from 'react-i18next'

type Props = {
  role: PartnerConfigurationRoleEnum
}

const DisclaimerAlert = ({ role }: Props) => {
  const { t } = useTranslation()

  return (
    <Alert color="warning">
      <Box>
        {role === 'keyholder'
          ? t('emergency_unlock.disclaimer_alert_for_keyholder')
          : t('emergency_unlock.disclaimer_alert_for_wearer')}
        <br />
        <Link level="body-sm" href="https://docs.chaster.app/" target="_blank">
          {t('emergency_unlock.learn_how_to_secure_your_keys')}
        </Link>
      </Box>
    </Alert>
  )
}

export default DisclaimerAlert
