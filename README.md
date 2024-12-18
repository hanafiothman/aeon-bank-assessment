# AEON ProtoPortal

## Getting Started

Pre-requisite:

- Node.js 18+
  - for macOS and other unix users, avoid Homebrew and consider [nvm](https://github.com/nvm-sh/nvm)
  - for Windows users, consider [nvm-windows](https://github.com/coreybutler/nvm-windows)
- `.env` set

For `.env`, create an `.env` file in the project root and make sure you define the following environment variables in the file:

```
APP_URL=http://localhost:3000  # or any other port that you are using
```

Run the following commands to start the development server:

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.

## Unit tests

The unit tests files are stored in the `/__tests__` folder, following the structure in the `/app` folder.

To run the unit tests, run this command:
```
pnpm test
```

You should see the tests running in the Terminal.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
