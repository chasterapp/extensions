import type { ChasterEvent } from '@/modules/base/contexts/WindowEventsContext'
import { WindowEventsContext } from '@/modules/base/contexts/WindowEventsContext'
import type { PartnerConfigurationChildEvents } from '@chasterapp/chaster-js'
import { PartnerConfigurationChildEventEnum } from '@chasterapp/chaster-js'
import { useContext, useEffect, useRef } from 'react'

const postMessage = (
  event: PartnerConfigurationChildEventEnum,
  payload?: PartnerConfigurationChildEvents['payload'],
) => {
  parent.postMessage(
    JSON.stringify({ type: 'partner_configuration', event, payload }),
    '*',
  )
}

type Props = {
  onSave: () => Promise<void>
}

export const useSaveCapability = ({ onSave }: Props) => {
  const { addListener, removeListener } = useContext(WindowEventsContext)
  const onSaveRef = useRef(onSave)

  useEffect(() => {
    onSaveRef.current = onSave
  }, [onSave])

  useEffect(() => {
    const listener = async (event: ChasterEvent) => {
      if (event.event === 'partner_configuration_save') {
        postMessage(PartnerConfigurationChildEventEnum.SaveLoading)
        try {
          await onSaveRef.current()
          postMessage(PartnerConfigurationChildEventEnum.SaveSuccess)
        } catch (err) {
          postMessage(PartnerConfigurationChildEventEnum.SaveFailed)
          throw err
        }
      }
    }

    addListener(listener)
    postMessage(PartnerConfigurationChildEventEnum.Capabilities, {
      features: { save: true },
    })
    return () => removeListener(listener)
  }, [addListener, removeListener])
}
