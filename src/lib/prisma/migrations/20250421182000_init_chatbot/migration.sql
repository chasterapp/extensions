-- CreateTable
CREATE TABLE "ChatbotKeyholder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "kinks" TEXT[],
    "personalityTraits" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatbotKeyholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotConversation" (
    "id" TEXT NOT NULL,
    "keyholderId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatbotConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatbotMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatbotConversation" ADD CONSTRAINT "ChatbotConversation_keyholderId_fkey" FOREIGN KEY ("keyholderId") REFERENCES "ChatbotKeyholder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatbotMessage" ADD CONSTRAINT "ChatbotMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatbotConversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
