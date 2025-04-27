import type { StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

let container: StartedPostgreSqlContainer | null = null

export async function setupTestDatabase() {
  container = await new PostgreSqlContainer('postgres:15')
    .withDatabase('chaster_test')
    .withUsername('postgres')
    .withPassword('postgres')
    .start()

  const databaseUrl = container.getConnectionUri()

  process.env.DATABASE_URL = databaseUrl
  await execAsync('npm run db:migrate')

  return databaseUrl
}

export async function teardownTestDatabase() {
  if (container) {
    await container.stop()
    container = null
  }
}
