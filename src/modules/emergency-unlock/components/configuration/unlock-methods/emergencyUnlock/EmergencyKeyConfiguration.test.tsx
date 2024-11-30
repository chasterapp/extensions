import '@testing-library/jest-dom'
import type { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
import { render, screen } from '@testing-library/react'
import EmergencyKeyConfiguration from './EmergencyKeyConfiguration'
import { useForm } from 'react-hook-form'
import { defaultConfiguration } from '@/modules/emergency-unlock/data/defaultConfiguration'
import { configurationToForm } from '@/modules/emergency-unlock/models/emergencyUnlockConfiguration'
import { t } from 'i18next'
import userEvent from '@testing-library/user-event'

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
      <EmergencyKeyConfiguration
        form={methods}
        role={PartnerConfigurationRoleEnum.Keyholder}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

describe('EmergencyKeyConfiguration', () => {
  it('renders and submits the emergency key form for a keyholder', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<Form onSubmit={onSubmit} />)

    expect(
      await screen.findByText(t('emergency_unlock.emergency_keys')),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('radio', {
        name: t('emergency_unlock.let_wearer_choose_number_of_keys'),
      }),
    ).toBeChecked()

    expect(
      screen.queryByLabelText(
        t('emergency_unlock.number_of_keys_required_to_unlock'),
      ),
    ).not.toBeInTheDocument()

    await user.click(
      await screen.findByRole('radio', {
        name: t('emergency_unlock.select_number_of_keys'),
      }),
    )

    const input = await screen.findByLabelText(
      t('emergency_unlock.number_of_keys_required_to_unlock'),
    )
    expect(input).toBeInTheDocument()
    await user.clear(input)
    await user.type(input, '5')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nbRequiredKeys: '5',
        wearerCanChooseNbRequiredKeys: false,
      }),
    )
  })

  it('lets the wearer choose the number of keys', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<Form onSubmit={onSubmit} />)

    expect(
      await screen.findByRole('radio', {
        name: t('emergency_unlock.let_wearer_choose_number_of_keys'),
      }),
    ).toBeChecked()

    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nbRequiredKeys: '1',
        wearerCanChooseNbRequiredKeys: true,
      }),
    )
  })
})
