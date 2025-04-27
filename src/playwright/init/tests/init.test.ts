import { test } from '@/playwright/lib/fixtures'
import { expect } from '@playwright/test'

test('inits a session with a main token', async ({ page }) => {
  const params = {
    mainToken: 'valid_token_emergency_unlock',
    extensionSlug: 'emergency-unlock',
  }
  await page.goto(`/init#${encodeURIComponent(JSON.stringify(params))}`)
  await expect(page.locator('body')).toContainText(
    'Emergency Unlock session page',
  )
})

test('inits a session with a configuration token', async ({ page }) => {
  const params = {
    partnerConfigurationToken: 'valid_token',
    extensionSlug: 'emergency-unlock',
  }
  await page.goto(`/init#${encodeURIComponent(JSON.stringify(params))}`)
  await expect(page.locator('body')).toContainText(
    'You can buy emergency keys or use a safeword to unlock yourself in case of emergency.',
  )
})
