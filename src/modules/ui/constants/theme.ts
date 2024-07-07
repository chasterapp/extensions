'use client'

import type { DefaultColorPalette } from '@mui/joy/styles/types'
import type { Theme } from '@mui/joy'
import { extendTheme } from '@mui/joy'

const buttonOrIconButtonRoot = ({
  theme,
  ownerState,
}: {
  theme: Theme
  ownerState: Record<string, unknown>
}) => ({
  fontWeight: 400,
  transition: '150ms cubic-bezier(0.33, 1, 0.68, 1)',
  transitionProperty: 'color,background-color',
  borderRadius: '1.875rem',
  ...(ownerState.variant === 'solid' && {
    borderColor:
      theme.colorSchemes.dark.palette[
        ownerState.color as DefaultColorPalette
      ]?.[500] || theme.colorSchemes.dark.palette.primary[500],
    borderWidth: '1px',
    borderStyle: 'solid',
  }),
  ...(ownerState.variant === 'outlined' && {
    borderColor:
      theme.colorSchemes.dark.palette[
        ownerState.color as DefaultColorPalette
      ]?.[500] || theme.colorSchemes.dark.palette.primary[500],
    color:
      theme.colorSchemes.dark.palette[
        ownerState.color as DefaultColorPalette
      ]?.[500] || theme.colorSchemes.dark.palette.primary[500],
    '&:hover': {
      color:
        theme.colorSchemes.dark.palette[
          ownerState.color as DefaultColorPalette
        ]?.[100] || theme.colorSchemes.dark.palette.primary[100],
    },
  }),
})

const theme = extendTheme({
  fontFamily: {
    body: '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: '#272533',
        },
        primary: {
          50: '#eff1fa',
          100: '#e0e4f5',
          200: '#c5cbed',
          300: '#a6b0e3',
          400: '#8b98da',
          500: '#6d7dd1',
          600: '#3d53c2',
          700: '#2d3e90',
          800: '#1f2a61',
          900: '#0f142f',
        },
        danger: {
          '50': '#fef3f2',
          '100': '#fde5e3',
          '200': '#fcd0cc',
          '300': '#f9b0a8',
          '400': '#f38276',
          '500': '#e74c3c',
          '600': '#d53d2d',
          '700': '#b33022',
          '800': '#942b20',
          '900': '#7b2921',
        },
      },
    },
  },
  components: {
    JoyFormLabel: {
      styleOverrides: {
        root: () => ({
          '--FormLabel-fontSize': '1rem',
        }),
      },
    },
    JoyRadioGroup: {
      styleOverrides: {
        root: () => ({
          '--RadioGroup-gap': '0.5rem',
        }),
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...buttonOrIconButtonRoot({ theme, ownerState }),
        }),
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...buttonOrIconButtonRoot({ theme, ownerState }),
          ...(ownerState.size === 'md' && {
            fontSize: '1rem',
            padding: '0.375rem 0.75rem',
          }),
          ...(ownerState.size === 'lg' && {
            fontSize: '1.125rem',
          }),
        }),
      },
    },
    JoyInput: {
      styleOverrides: {
        root: () => ({
          borderRadius: '1rem',
          height: '2.375rem',
        }),
      },
    },
    JoyCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'outlined' && {
            backgroundColor: '#343241',
            boxShadow: '0 4px 8px rgba(0, 0, 0, .2)',
            borderRadius: '1.875rem',
          }),
        }),
      },
    },
  },
})

export default theme
