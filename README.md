<h1 align="center">
<br>
<picture>
	<img width="90" alt="Chaster" src="https://chaster.app/logo192.png">
</picture>
<br><br>Chaster Extensions
</h1>

<p align="center">
A powerful platform for creating and managing custom extensions for the Chaster app.
<br><br>
<a href="https://docs.chaster.app/api/basics/introduction">Documentation</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://docs.chaster.app/api/extensions-api/getting-started/">Getting started →</a>
</p>

## Overview

Chaster Extensions is a Next.js-based web application that provides a platform for creating and managing extensions for the Chaster platform.

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) Joy
- **State Management**: Zustand
- **API Client**: React Query
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest, Playwright
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Docker and Docker Compose
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone git@github.com:chasterapp/extensions.git
cd extensions
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` with the following required environment variables:

```bash
OPENROUTER_API_KEY=your_openrouter_api_key
CHASTER_API_CLIENT_ID=your_chaster_client_id
CHASTER_API_TOKEN=your_chaster_api_token
```

4. Start the development database:
```bash
docker-compose up -d
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3011](http://localhost:3011).

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── lib/          # Shared utilities and configurations
├── modules/      # Feature modules
├── constants/    # Application constants
└── playwright/   # End-to-end tests
```

## Testing

The project uses a comprehensive testing strategy:

- **Unit Tests**: Jest for component and utility testing
- **End-to-End Tests**: Playwright for browser automation
- **Database Tests**: Testcontainers for isolated database testing

Run tests:
```bash
npm test          # Run unit tests
npm run test:e2e  # Run end-to-end tests
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request
