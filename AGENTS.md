# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **Gatsby v3 static blog** ("Div's Blog"). Content lives in `content/blog` (Markdown), UI in `src/`.

### Node version (important)
- The project must run on **Node 16** (`v16.20.2`). Gatsby v3 does not reliably build on the environment's default Node 22.
- The default `node` on PATH is a `/exec-daemon` shim pointing at Node 22 and it takes precedence over nvm. Before running any command, put the nvm Node 16 bin first on PATH:
  ```bash
  export PATH="$HOME/.nvm/versions/node/v16.20.2/bin:$PATH"
  ```
  Verify with `node -v` (should print `v16.20.2`). The update script installs Node 16 + yarn but cannot persist PATH into new shells, so future agents must export it themselves.

### Package manager
- Use **yarn (classic, 1.x)** — there is a `yarn.lock`. Install with `yarn install --frozen-lockfile`.

### Run / build / test (see `package.json` scripts)
- Dev server: `yarn develop` → serves on `http://localhost:8001/` (GraphiQL at `/___graphql`).
- Production build: `yarn build`; serve build: `yarn serve`.
- `yarn test` is a placeholder echo — there are no automated tests.

### Known gotchas
- Lint is broken out of the box: `.eslintrc` extends `prettier/react`, which was removed in `eslint-config-prettier` 8 (the version installed). `yarn eslint 'src/**/*.{js,jsx}'` fails with a config error until `.eslintrc` is updated. This is a pre-existing repo issue, not an environment problem.
- In `gatsby develop`, navigating between pages can briefly flash a dev-only error overlay (`Failed to execute 'insertAdjacentHTML' on 'Element': The element has no parent.`). It auto-dismisses within ~1–2s and content renders correctly; it does not affect production builds.
