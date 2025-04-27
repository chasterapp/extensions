import { test } from '@/playwright/lib/fixtures'
import { expect } from '@playwright/test'

test('displays keyholder AI entrypoint with navigation', async ({ page }) => {
  await page.goto(`/sessions/valid_token_keyholder_ai/keyholder-ai`)

  const nav = page.locator('nav')
  await expect(nav).toContainText('Conversations')
})
