import '@testing-library/jest-dom'
import type { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { defaultConfiguration } from '@/modules/emergency-unlock/data/defaultConfiguration'
import { configurationToForm } from '@/modules/emergency-unlock/models/emergencyUnlockConfiguration'
import { t } from 'i18next'
import userEvent from '@testing-library/user-event'
import SafewordConfiguration from './SafewordConfiguration'

const Form = ({
  onSubmit,
}: {
  onSubmit: (form: EmergencyUnlockConfigurationForm) => void
}) => {
  const methods = useForm<EmergencyUnlockConfigurationForm>({
    defaultValues: configurationToForm(defaultConfiguration),
  })

  return (
    <form onSubmit={methods.handleSubmit((form) => onSubmit(form))} noValidate>
      <SafewordConfiguration
        form={methods}
        role={PartnerConfigurationRoleEnum.Keyholder}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

describe('SafewordConfiguration', () => {
  it('renders and submits the safeword form for a keyholder', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<Form onSubmit={onSubmit} />)

    expect(
      await screen.findByText(t('emergency_unlock.safeword')),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('radio', {
        name: t('emergency_unlock.let_wearer_choose_safeword'),
      }),
    ).toBeChecked()

    expect(
      screen.queryByLabelText(t('emergency_unlock.safeword')),
    ).not.toBeInTheDocument()

    await user.click(
      await screen.findByRole('radio', {
        name: t('emergency_unlock.enter_the_safeword'),
      }),
    )

    const input = await screen.findByLabelText(t('emergency_unlock.safeword'))
    expect(input).toBeInTheDocument()
    await user.clear(input)
    await user.type(input, 'password')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        safeword: 'password',
        wearerCanChooseSafeword: false,
      }),
    )
  })

  it('lets the wearer choose the safeword', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<Form onSubmit={onSubmit} />)

    expect(
      await screen.findByRole('radio', {
        name: t('emergency_unlock.let_wearer_choose_safeword'),
      }),
    ).toBeChecked()

    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        safeword: '',
        wearerCanChooseSafeword: true,
      }),
    )
  })
})
