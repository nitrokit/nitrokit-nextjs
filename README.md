<div align="center">
  <a href="https://nitrokit.tr">
    <img alt="Nitrokit Logo" src="https://raw.githubusercontent.com/nitrokit/nitrokit-nextjs/refs/heads/main/public/images/logos/nitrokit.png" height="100">
  </a>

# Nitrokit

🚀 Modern Next.js boilerplate with TypeScript, authentication, and development automation

<a href="https://github.com/nitrokit/nitrokit-nextjs"><img src="https://vercelbadge.vercel.app/api/nitrokit/nitrokit-nextjs"/></a> <a href="https://codecov.io/gh/nitrokit/nitrokit-nextjs"><img src="https://codecov.io/gh/nitrokit/nitrokit-nextjs/graph/badge.svg?token=7V4UDZX9FC"/></a> <a href="https://www.codefactor.io/repository/github/nitrokit/nitrokit-nextjs"><img src="https://img.shields.io/codefactor/grade/github/nitrokit/nitrokit-nextjs?style=flat" alt="CodeFactor Grade"></a> <a title="Crowdin" target="_blank" href="https://crowdin.com/project/nitrokit"><img src="https://badges.crowdin.net/nitrokit/localized.svg"></a> <a href="https://www.npmjs.com/package/nitrokit-cli"><img alt="NPM Version" src="https://img.shields.io/npm/v/nitrokit-cli?label=nitrokit-cli"></a> <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License: Apache-2.0"></a> <a href="https://github.com/nitrokit/nitrokit-nextjs"><img src="https://img.shields.io/badge/semantic--release-e10079?logo=semantic-release" alt="semantic-release: next.js"></a>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=http%3A%2F%2Fgithub.com%2Fnitrokit%2Fnitrokit-nextjs&env=AUTH_SECRET,DATABASE_URL,GOOGLE_SITE_VERIFICATION,GOOGLE_ANALYTICS,YANDEX_VERIFICATION,EMAIL_PROVIDER,RESEND_API_KEY,RESEND_AUDIENCE_ID,RESEND_FROM_EMAIL,UPSTASH_REDIS_REST_URL&project-name=nitrokit&repository-name=nitrokit-nextjs&demo-title=Nitrokit&demo-description=%F0%9F%9A%80%20A%20modern%20and%20production-ready%20Next.js%20boilerplate.%20It%20provides%20a%20quick%20start%20with%20TypeScript%2C%20i18n%20support%2C%20and%20automated%20tooling.&demo-url=https%3A%2F%2Fpreview.nitrokit.tr&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fnitrokit%2Fnitrokit-nextjs%2Frefs%2Fheads%2Fmain%2Fpublic%2Fscreenshots%2Fscreenshot-1.png)

</div>

## ✨ Features

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4 & shadcn/ui
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL with Prisma
- **Authentication:** NextAuth.js v5
- **Internationalization (i18n):** Full App Router support with next-intl
- **Form Management:** React Hook Form & Zod
- **Containerization:** Optimized Docker support for development and production
- **Linting & Formatting:** ESLint and Prettier
- **Testing:** Vitest (Unit/Integration) & Playwright (E2E)
- **UI Components:** `shadcn/ui` built on Radix UI
- **Email:** Resend & React Email
- **API Rate Limiting:** Upstash Ratelimit
- **Automatic Versioning:** Semantic Release

## 🚀 Getting Started

You have a few options to get started with this boilerplate.

### With `nitrokit-cli`

You can create a new project using this boilerplate with the [Nitrokit CLI](https://www.npmjs.com/package/nitrokit-cli).

```bash
npx nitrokit-cli new my-app
```

### With Docker

1.  Ensure you have Docker installed and running on your machine.
2.  Run the following command in the project directory:
    ```bash
    docker-compose up
    ```

### Manual Setup

1.  Install dependencies:
    ```bash
    pnpm install
    ```
2.  Start the development server:
    ```bash
    pnpm dev
    ```

The application will be available by default at `http://localhost:3000`.

## 📜 Available Scripts

| Script                | Description                        |
| --------------------- | ---------------------------------- |
| `pnpm dev`            | Starts the development server.     |
| `pnpm build`          | Builds the project for production. |
| `pnpm start`          | Starts the production-ready build. |
| `pnpm lint:fix`       | Checks for code style and errors.  |
| `pnpm format:write`   | Formats the code with Prettier.    |
| `pnpm test`           | Runs unit and integration tests.   |
| `pnpm prisma:migrate` | Creates a new database migration.  |

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a pull request.

## 📝 License

Licensed under the Apache License 2.0 - see [LICENSE](LICENSE) file.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://mustafagenc.info">Mustafa Genç</a></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
