import { Radio } from '@mui/joy'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import FormRadioGroup from './FormRadioGroup'

const Form = ({ children }: PropsWithChildren) => {
  const methods = useForm<{ test: string }>({
    defaultValues: {
      test: '',
    },
  })

  return (
    <>
      <p>
        Value: {methods.watch('test').toString()} (
        {typeof methods.watch('test')})
      </p>
      <FormRadioGroup name="test" control={methods.control}>
        {children}
      </FormRadioGroup>
    </>
  )
}

describe('FormRadioGroup', () => {
  it('selects the correct radio value', () => {
    render(
      <Form>
        <Radio value="test1" label="Option 1" />
        <Radio value="test2" label="Option 2" />
      </Form>,
    )

    const radio1 = screen.getByRole('radio', { name: 'Option 1' })
    const radio2 = screen.getByRole('radio', { name: 'Option 2' })

    act(() => radio1.click())

    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()
    expect(screen.getByText('Value: test1 (string)')).toBeInTheDocument()

    act(() => radio2.click())

    expect(radio1).not.toBeChecked()
    expect(radio2).toBeChecked()
    expect(screen.getByText('Value: test2 (string)')).toBeInTheDocument()
  })

  it('sets the value instead of the stringified value', () => {
    render(
      <Form>
        <Radio value={true} label="Option 1" />
        <Radio value={false} label="Option 2" />
      </Form>,
    )

    const radio1 = screen.getByRole('radio', { name: 'Option 1' })
    act(() => radio1.click())
    expect(screen.getByText('Value: true (boolean)')).toBeInTheDocument()

    const radio2 = screen.getByRole('radio', { name: 'Option 2' })
    act(() => radio2.click())
    expect(screen.getByText('Value: false (boolean)')).toBeInTheDocument()
  })
})
