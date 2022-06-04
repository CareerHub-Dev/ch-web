## Getting Started

Before you run the projects you may define these Environment Variables:
* BACKEND_SERVER_URL,
* JWT_SECRET
* NODE_ENV

##### Note: NextJS has a built-in support for this, you just need to create a file named `.env.local` in project's root directory

To run dev server:

```bash
make dev
```

To build and run prod server:
```bash
make prod
```

Open [http://127.0.0.1:3000/](http://127.0.0.1:3000/) with a browser to see the result.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
