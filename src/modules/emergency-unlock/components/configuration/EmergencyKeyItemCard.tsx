import { useTranslation } from '@/app/i18n/client'
import InsetCard from '@/modules/ui/components/surfaces/InsetCard'
import { Card, CardContent, CardOverflow, Typography } from '@mui/joy'
import Image from 'next/image'
import emergencyKey from './emergencyKey.png'

type Props = {
  role: 'wearer' | 'keyholder'
}

const EmergencyKeyItemCard = ({ role }: Props) => {
  const { t } = useTranslation()

  return (
    <Card orientation="horizontal">
      <CardOverflow>
        <InsetCard sx={{ ml: 2, alignSelf: 'flex-start' }}>
          <Image src={emergencyKey} alt="" height={37} width={37} />
        </InsetCard>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md" fontWeight="bold">
          {t('emergency_unlock.emergency_key')}
        </Typography>
        <Typography>
          {role === 'keyholder'
            ? t('emergency_unlock.emergency_key_item_description_for_keyholder')
            : t('emergency_unlock.emergency_key_item_description_for_wearer')}
        </Typography>
        <Typography level="body-md" fontWeight="bold">
          €5.00
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EmergencyKeyItemCard
