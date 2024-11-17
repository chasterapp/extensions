import { Factory } from 'fishery'
import type { CardGameData } from '../models/card-game-data'

export class CardGameDataFactory extends Factory<CardGameData> {}

export const cardGameDataFactory = CardGameDataFactory.define(() => ({
  deck: {
    red: 2,
    green: 1,
  },
  hand: [],
  lockStartedAt: new Date(),
  lockResetAt: null,
  freezeStartsAt: null,
  freezeEndsAt: null,
  freezeDurations: [],
  lastActionCountedAt: null,
  nbActionsSinceLastReset: 0,
}))
