This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

This is a template for [Nextjs](https://nextjs.org/). It includes the following libraries:

- [NextAuth](https://next-auth.js.org/)
- [Prisma](https://prisma.io/) ORM
- [TailwindCSS](https://tailwindcss.com/) for sytles
- [Pinojs](https://github.com/pinojs/pino) for logging
- [Cypress](https://www.cypress.io/) for e2e testing
- [Zod:heart:](https://zod.dev/) for models definition and validation

## Configuration

A .env and/or .env.local file need to be created in the root directory. The following values must be configured:

- **NEXTAUTH_URL**: See [https://next-auth.js.org/configuration/options#nextauth_url](https://next-auth.js.org/configuration/options#nextauth_url)
- **NEXTAUTH_SECRET**: See [https://next-auth.js.org/configuration/options#nextauth_secret](https://next-auth.js.org/configuration/options#nextauth_secret)

- **GOOGLE_ID**: See [https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
- **GOOGLE_SECRET**: See previous
- **DATABASE_URL**: See [https://www.prisma.io/docs/reference/database-reference/connection-urls#postgresql](https://www.prisma.io/docs/reference/database-reference/connection-urls#postgresql)

Optional:

- **PRODUCTION_LOG_LEVEL**: Loglevel to use when deploying in production mode. See [Pino docs](https://github.com/pinojs/pino/blob/master/docs/api.md#level-string)

For Cypress, a cypress.env.json is required with the following values:

- **GOOGLE_CLIENT_ID**: See GOOGLE_ID
- **GOOGLE_SECRET**: See GOOGLE_SECRET
- **REFRESH_TOKEN**: You can generate a refresh token using [Google Oauth Playground](https://developers.google.com/oauthplayground/). You can use the Google Oauth2 API v2 to generate an access and refresh token. Make sure to configure the playground to use your own credentials in the settings.

---

> _Note_:

## By default the project is setup to use a Postgres database. If you want to use a different database, you need to override the provider for the datasource in `/prisma/schema.prisma`. Check out [Prisma data source docs](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#datasource) for more.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
