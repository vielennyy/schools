## Installation

1. Install [nvm](https://github.com/nvm-sh/nvm) or [LTS Node.js](https://nodejs.org) directly from official website.
2. Install [Docker](https://www.docker.com) to run project in containers for dev and prod environment.
3. Activate corepack (`corepack enable`) to enable pnpm or install it manually: `npm i pnpm@latest -g`.
4. Clone this repository - `git clone `.
5. Install all project dependencies - `pnpm i -r`.



### Backend

1. First of all, you need to generate types for Prisma.
2. Move to `apps/backend` folder and run this commands:

- `pnpm prisma format` - Format prisma schema if models updated.
- `pnpm prisma migrate dev` - Generate new migration for new changes.
- `pnpm prisma generate` - Generate types for Prisma.

## Docker

### Development Mode

1. Create a new file `.env.dev` and paste the contents from the `.env.dev.example` file into it.
2. In `apps/backend` folder create a new file `.env` and paste the contents from the `.env.example` file.
3. Run `docker compose -f docker-compose.dev.yaml --env-file=.env.dev up -d`.
4. Done. When running locally, the backend should have a connection to the database.