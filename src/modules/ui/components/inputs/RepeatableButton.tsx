import { IconButton } from '@mui/joy'
import { useEffect, useRef, type ComponentProps } from 'react'
import { useLongPress } from 'use-long-press'

const REPEAT_MS = 50

type Props = Omit<ComponentProps<typeof IconButton>, 'onClick'> & {
  onClick: () => void
}

const RepeatableButton = ({ onClick, ...rest }: Props) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onClickRef = useRef(onClick)

  useEffect(() => {
    onClickRef.current = onClick
  }, [onClick])

  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const bind = useLongPress(
    () => {
      timerRef.current = setInterval(() => onClickRef.current(), REPEAT_MS)
    },
    {
      onCancel: stop,
      onFinish: stop,
      onStart: onClick,
    },
  )

  return <IconButton {...bind()} {...rest} />
}

export default RepeatableButton
