## Getting Started

Before you start make sure you have `pnpm` installed.
Before you run the project you have to define these Environment Variables:
* BACKEND_SERVER_URL,
* BACKEND_IMAGE_DOMAIN,
* REACT_EDITOR

##### Note: NextJS has a built-in support for this, and to override values specified in `.env.local`, you may create `.env` file in project's root directory
---
Start dev server:
```bash
pnpm dev
```
---
Start production build:
```bash
pnpm build
```
---
Start production server:
```bash
pnpm start
```
The app will start at port 3000

---
### Running tests
---
Run jest and react tests:
```bash
pnpm test
```
---
Run end-to-end tests:
```bash
pnpm test:e2e
```
