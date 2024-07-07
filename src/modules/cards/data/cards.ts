import type { CardDatabase } from '@/modules/cards/models/card-database'

export const cardDatabase: CardDatabase = {
  cards: [
    {
      type: 'green',
      name: 'Green',
      description: 'Gives 1 key',
      color: '#60CB64',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 1,
      shouldResetActions: false,
      actions: [],
    },
    {
      type: 'red',
      name: 'Red',
      description: 'Uses 1 chance',
      color: '#CC6060',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: true,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [],
    },
    {
      type: 'yellow_add_1',
      name: 'Yellow +1',
      description: 'Adds 1 red card',
      color: '#EDD245',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [
        {
          type: 'change_card_amount',
          params: {
            cards: ['red'],
            amount: {
              type: 'relative_value',
              value: 1,
            },
          },
        },
      ],
    },
    {
      type: 'yellow_add_2',
      name: 'Yellow +2',
      description: 'Adds 2 red cards',
      color: '#EDD245',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [
        {
          type: 'change_card_amount',
          params: {
            cards: ['red'],
            amount: {
              type: 'relative_value',
              value: 2,
            },
          },
        },
      ],
    },
    {
      type: 'yellow_add_3',
      name: 'Yellow +3',
      description: 'Adds 3 red cards',
      color: '#EDD245',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [
        {
          type: 'change_card_amount',
          params: {
            cards: ['red'],
            amount: {
              type: 'relative_value',
              value: 3,
            },
          },
        },
      ],
    },
    {
      type: 'yellow_remove_1',
      name: 'Yellow -1',
      description: 'Removes 1 red card',
      color: '#EDD245',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [
        {
          type: 'change_card_amount',
          params: {
            cards: ['red'],
            amount: {
              type: 'relative_value',
              value: -1,
            },
          },
        },
      ],
    },
    {
      type: 'yellow_remove_2',
      name: 'Yellow -2',
      description: 'Removes 2 red cards',
      color: '#EDD245',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [
        {
          type: 'change_card_amount',
          params: {
            cards: ['red'],
            amount: {
              type: 'relative_value',
              value: -2,
            },
          },
        },
      ],
    },
    {
      type: 'sticky',
      name: 'Sticky',
      description: 'Consumes 1 chance, and stays in the deck',
      color: '#F8C047',
      category: 'main',
      shouldPickCard: false,
      shouldCountAsAction: true,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [],
    },
    {
      type: 'reset',
      name: 'Reset',
      description: 'Resets the number of green, red and yellow cards',
      color: '#5BA2E0',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: true,
      actions: [
        {
          type: 'reset_card',
          params: {
            cards: [
              'green',
              'red',
              'yellow_add_1',
              'yellow_add_2',
              'yellow_add_3',
              'yellow_remove_1',
              'yellow_remove_2',
            ],
          },
        },
      ],
    },
    {
      type: 'freeze',
      name: 'Freeze',
      description: 'Freezes the game',
      color: '#E6F4F8',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [
        {
          type: 'freeze',
          params: {
            duration: {
              type: 'multiplier',
              min: 2,
              max: 4,
            },
          },
        },
      ],
    },
    {
      type: 'double',
      name: 'Double up',
      description: 'Doubles red and yellow cards',
      color: '#AC6DCA',
      category: 'main',
      shouldPickCard: true,
      shouldCountAsAction: false,
      nbKeysGiven: 0,
      shouldResetActions: false,
      actions: [
        {
          type: 'change_card_amount',
          params: {
            cards: [
              'red',
              'yellow_add_1',
              'yellow_add_2',
              'yellow_add_3',
              'yellow_remove_1',
              'yellow_remove_2',
            ],
            amount: {
              type: 'multiplier',
              value: 2,
            },
          },
        },
      ],
    },
  ],
  categories: [
    {
      type: 'main',
      name: 'Main cards',
      initialCards: [
        {
          type: 'green',
          name: 'Green',
          cards: ['green'],
        },
        {
          type: 'red',
          name: 'Red',
          cards: ['red'],
        },
        {
          type: 'yellow_add',
          name: 'Yellow - Add',
          description: 'Adds from 1 to 3 yellow cards',
          cards: ['yellow_add_1', 'yellow_add_2', 'yellow_add_3'],
        },
        {
          type: 'yellow_remove',
          name: 'Yellow - Remove',
          description: 'Removes from 1 to 2 yellow cards',
          cards: ['yellow_remove_1', 'yellow_remove_2'],
        },
        {
          type: 'sticky',
          name: 'Sticky',
          cards: ['sticky'],
        },
        {
          type: 'freeze',
          name: 'Freeze',
          cards: ['freeze'],
        },
        {
          type: 'double',
          name: 'Double',
          cards: ['double'],
        },
        {
          type: 'reset',
          name: 'Reset',
          cards: ['reset'],
        },
      ],
    },
  ],
}
