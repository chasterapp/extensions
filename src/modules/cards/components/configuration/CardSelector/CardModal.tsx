import type { CardConfigurationInitialCard } from '@/modules/cards/models/card-configuration'
import type { CardOptions } from '@/modules/cards/models/card-options'
import { Modal, ModalClose, ModalDialog } from '@mui/joy'
import CardDescription from './CardDescription'

export type Props = {
  value: CardConfigurationInitialCard
  setValue: (val: CardConfigurationInitialCard) => void
  card: Pick<CardOptions, 'name' | 'type' | 'description'>
  allowRange?: boolean
  isRangeSelect?: boolean
  readonly?: boolean
  open: boolean
  onClose: () => void
}

const CardModal = ({
  value,
  setValue,
  card,
  isRangeSelect,
  readonly,
  open,
  onClose,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <CardDescription
          card={card}
          value={value}
          setValue={setValue}
          readonly={readonly}
          isRangeSelect={isRangeSelect}
        />
      </ModalDialog>
    </Modal>
  )
}

export default CardModal
