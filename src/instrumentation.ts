export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.CI === 'true') {
    const { server } = await import('./mocks/node')
    server.listen()
  }
}
