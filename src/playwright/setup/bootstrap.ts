import { setupTestDatabase, teardownTestDatabase } from '../lib/test-db'
import { TEST_PORT } from './constants'
import type { ChildProcess } from 'child_process'
import { spawn } from 'child_process'

async function cleanup() {
  await teardownTestDatabase()
}

async function main() {
  console.log('Starting test database...')
  const databaseUrl = await setupTestDatabase()
  console.log('Test database started successfully')

  console.log('Starting Next.js...')

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    NODE_ENV: 'test' as const,
    DATABASE_URL: databaseUrl,
    PORT: TEST_PORT.toString(),
  }

  // Start Next.js server
  const nextProcess: ChildProcess = spawn(
    'npx',
    ['next', 'dev', '-p', TEST_PORT.toString()],
    {
      env,
      stdio: 'inherit',
    },
  )

  // Handle process exit
  process.on('exit', () => {
    nextProcess.kill()
    void cleanup()
  })

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    nextProcess.kill()
    void cleanup()
    process.exit()
  })
}

void main()
