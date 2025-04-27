export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.CI === 'true') {
    const { server } = await import('./playwright/mocks/node')
    server.listen()
  }
}
