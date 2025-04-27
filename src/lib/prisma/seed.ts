import { prisma } from '@/lib/prisma'
import { MOCK_KEYHOLDERS } from '../../modules/keyholder-ai/domain/mock/keyholders'

async function main() {
  for (const [id, keyholder] of Object.entries(MOCK_KEYHOLDERS)) {
    await prisma.chatbotKeyholder.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name: keyholder.name,
        description: keyholder.description,
        avatarUrl: keyholder.avatarUrl,
        kinks: keyholder.kinks,
        personalityTraits: keyholder.personalityTraits,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
