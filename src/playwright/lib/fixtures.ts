import type { Page } from '@playwright/test'
import { test as base } from '@playwright/test'

export type Fixtures = {
  page: Page
}

export const test = base.extend<Fixtures>({})
