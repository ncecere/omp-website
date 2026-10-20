# omp-website

The landing page for [Open MCP Portal (OMP)](https://github.com/ncecere/open-mcp-portal), a self-hosted, open-source (MIT) portal where a company's teams register the MCP servers they build, publish them to a reviewed catalog, and give people and agents governed access through curated gateways, with sign-in for any MCP client, signed identity to the servers, per-person credentials and audit. The site is served at https://omp.bitop.dev; the documentation lives in its own repository and site, https://docs.omp.bitop.dev.

It's one long page plus a 404 page, with no pricing, sign-up, forms, cookies, tracking or third-party requests. The text describes Open MCP Portal **v0.3.2** (released 2026-10-20, per-person keys, the portal's own OAuth client and mTLS with a private CA, after the v0.3.1 credentials and operations release, the v0.3.0 agent-platform trust release, the v0.2.2 hardening release, v0.2.1 and v0.2.0; the repository was called `open-mcp-gateway` before the rename) and is checked against its `docs/releases/v0.3.2.md`, `docs/releases/v0.3.1.md`, `docs/releases/v0.3.0.md`, `docs/releases/v0.2.2.md`, `docs/releases/v0.2.1.md` and `docs/releases/v0.2.0.md`, `docs/threat-model.md`, `docs/mcp-protocol.md`, `docs/admin-overview.md`, `docs/notifications.md`, `docs/automation-tokens.md`, `SPEC.md`, `docs/decisions.md`, `docs/status.md`, `docs/registry.md`, the "As built" sections of `docs/phase3-gateways.md` to `docs/phase7-upstream-oauth.md`, `docs/upstream-identity.md`, `docs/connect-clients.md`, `docs/deploy.md`, `examples/mail-mcp/README.md`, the `Makefile` and the screen names in `web/src`. Nothing on the page describes a feature that isn't built; planned work is named as planned in the project status card.

`lib/site.ts` holds the version, the release day (`2026-10-20`; the footer and sitemap show it), the release notes link, the published image (by digest, `ghcr.io/ncecere/open-mcp-portal@sha256:80ee9a1c…`, tag `v0.3.2`, with the cosign certificate identity) and the repository links (pinned at `blob/v0.3.2`; move them to the next tag when the page describes a newer release), the example host (`mcp.example.com`, the host the screenshots and the docs show) and the HTTP header names the portal sends to MCP servers (`MCP-Gateway-Identity`, `MCP-Gateway-Provider`, `MCP-Gateway-Provider-Token`; protocol names that the product's rename kept).

**Naming.** The page leads with "Open MCP Portal" (title, hero, metadata) and uses "OMP" only as a short form after it. The text names no competing products (other MCP gateways, registries, tool platforms or API management products); the MCP clients the portal connects (Claude, Claude Code, VS Code, Cursor) and the services people sign in to (GitHub, Google, Microsoft Entra ID, Atlassian, Slack, GitLab) are named because they are what it connects to. Examples use generic names (`mcp.example.com`, Example Corp, a `support` gateway). `scripts/postbuild.mjs` fails the build if a page uses a forbidden name or "OMP" before "Open MCP Portal".

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) with `output: "export"`: `next build` writes plain static files to `out/`.
- React 19, TypeScript 5.9, [Tailwind CSS](https://tailwindcss.com) 4.
- Inter Variable, self-hosted from `@fontsource-variable/inter`.
- Node 22 and npm; every version is pinned in `package-lock.json` (the same versions as the Open Model Gateway website).
- nginx (alpine, pinned by digest) in the container.

## Brand tokens: `app/brand.css`

`app/brand.css` holds Open MCP Portal's colours (light by default, and dark), radii, shadows and font stacks, and maps them to Tailwind v4 theme variables (`bg-brand-surface`, `text-brand-muted`, `bg-brand-primary`, `text-brand-link`, `rounded-card`, `shadow-brand-2` and so on). The docs site (omp-docs, `app/brand.css`) uses **the same file, byte for byte**, so the two sites look like one product.

The file is **generated**, not written by hand: `scripts/brand-css.mjs` derives it deterministically from the product's own UI theme, so anyone who runs it against the same product revision gets the same bytes:

```sh
npm run brand              # write app/brand.css from the product repository
npm run brand -- --check   # fail if app/brand.css differs from what the sources give
cmp app/brand.css ../omp-docs/app/brand.css
```

- **Sources:** `web/src/components/ui/themes/neutral.css` (the Bitop "neutral" theme: cool slate neutrals with an indigo accent; colours and shadows) and `web/src/components/ui/styles/tokens.css` (radii, font stacks) in the product repository. `PRODUCT_DIR` names it; by default the first of `../golang/open-mcp-portal` and `../golang/open-mcp-gateway`.
- **Rules:** light values from the `:root, [data-theme="light"]` block, dark values from `[data-theme="dark"]`; `var(--…)` references resolved to literal values (dark falls back to light); each brand token `--omp-<name>` takes one semantic token (`--omp-bg` from `--color-bg`, `--omp-text-muted` from `--color-text-muted`, `--omp-focus-ring` from `--color-focus-ring`, `--omp-shadow-1` from `--shadow-1`, … the full list is `TOKENS` in the script), keeping the source line's comment prefixed with the source token's name; whitespace in values collapsed to one space; radii (`--radius-control`, `--radius-card`, `--radius-popover`) and fonts (`--font-family-sans`, `--font-family-mono`) from `tokens.css`. The `@theme inline` block maps every token to the same Tailwind names the sister sites use.
- The product uses the same Bitop theme as Open Model Gateway, so the values equal the OMG sites'; only the `--omp-` prefix and the comments differ.

Copy the script to omp-docs (or copy the generated file) and change both repositories together. Components and `app/globals.css` use only the Tailwind names (in CSS through `--theme(--color-brand-…)`), never the raw token variables, so a new `brand.css` drops in without other changes. The theme follows the system (`prefers-color-scheme`); `data-theme="dark|light"` or `class="dark|light"` can force one.

## Logo, favicon and Open Graph card

The logo's source, exports and usage rules live in `../omp-assets/logo/` (the mark is in the folder named by `source` in `lib/mark.json`; currently `keystone`).

- `components/logo.tsx` is the only place the site draws the logo (header and footer): the mark as inline SVG (`mark-small.svg`, 28 px, `aria-hidden`) beside the name as live text. omp-docs should draw it identically; change both together.
- `lib/mark.json` holds the mark as inner SVG markup on its 64 grid: `svg` is `mark-small.svg` (read by `components/logo.tsx`), `svgRegular` is `mark.svg` (read by `scripts/og-image.mjs`). `npm run og` writes both from the logo folder; `placeholder: true` marks the neutral stand-in (an outlined square on the family's dark tile) the site used before the logo existed.
- `npm run og` (`scripts/og-image.mjs`) finds the logo folder (`LOGO_DIR`; else `../omp-assets/logo/<source>`; else the only folder under `../omp-assets/logo/` with every export: `mark.svg`, `mark-small.svg`, `favicon.ico`, `favicon.svg`, `png/apple-touch-icon.png`, `png/icon-192.png`, `png/icon-512.png`), copies the five icons unchanged into `public/`, refreshes `lib/mark.json`, and draws `public/og.png` (1200x630: the mark and name, the headline and, once that slot is filled, the `my-gateways` screenshot) in the brand's dark colours. Without a logo folder it draws the icons (including a PNG-in-ICO `favicon.ico`) from the placeholder mark. Rerun it when the logo or the screenshot changes and commit the results.

## Screenshots

The page has 8 named screenshot slots in its web UI section, listed in `lib/slots.json` with their alt text and captions. A slot without an image shows a clearly marked placeholder with the expected file name. All 8 are filled from the Example Corp capture in `../omp-assets/screenshots/` (Open MCP Portal at commit `d039647`, 2026-10-17; `MANIFEST.md` there). Four slots name a docs file through `"file"` (`server-sign-in` → `add-server-detect`, `gateway-capabilities` → `gateway-capabilities-picker`, `call-detail` → `call-detail-payload`) or one of the website's own (`connect-confirm` → `connect-confirm-more-scopes`).

```sh
npm run images   # copy the screenshots that exist into public/images as WebP, record their sizes
npm run og       # rebuild the Open Graph card and icons
```

Commit the results (`public/images/`, `lib/screenshots.json`, `public/og.png`, icons, `lib/mark.json`). Screenshots come from a fictional demo installation (Example Corp) in `../omp-assets/screenshots/`; set `SCREENSHOTS_DIR` to read from another directory. For each slot the script looks for `file` (or the slot's own name) as `.png`, `.webp` or `.jpg` and, if that's missing, the slot's `interimFile`, recording `"interim": true` in `lib/screenshots.json`. After a retake, check each slot's alt text and caption against its image (they were last checked against the 2026-10-17 set).

| Slot | Shows |
|---|---|
| `my-gateways` | My gateways, with a gateway's URL and Connect snippets (also used by `public/og.png`) |
| `catalog` | Catalog: published servers with their teams, health, counts and badges |
| `server-sign-in` | Team › MCP servers › Add server, OAuth: each person signs in, after Detect sign-in |
| `gateway-capabilities` | A team gateway's Capabilities tab (Choose capabilities), with minimum roles |
| `oauth-consent` | The consent page: "Cursor wants to use Support tools as you" |
| `connect-confirm` | Connect your GitHub account: the request and the scopes asked for |
| `admin-usage` | Admin › Usage |
| `call-detail` | A call page, with View contents for a recorded call |

## Local development

```sh
npm ci
npm run dev      # http://localhost:3000
```

## Build

```sh
npm run typecheck
npm run build    # static export to out/, then scripts/postbuild.mjs
```

`scripts/postbuild.mjs` hashes the inline scripts Next.js writes into the HTML and puts them in the Content-Security-Policy (`build/security-headers.conf`), so `script-src` needs no `'unsafe-inline'`. It fails the build if the output loads a script, style sheet, font, image or frame from another origin, if the page text uses a forbidden name, or if "OMP" appears before "Open MCP Portal".

To run the production image locally, read-only like in a cluster:

```sh
npm run docker   # builds the image and serves it on http://127.0.0.1:8080
```

## Container image and deployment

`.github/workflows/publish.yaml` builds the site on every pull request and push. On `main` it also builds and pushes a multi-arch (linux/amd64, linux/arm64) image, with every action pinned by commit SHA:

- `ghcr.io/ncecere/omp-website:<full commit SHA>`
- `ghcr.io/ncecere/omp-website:latest`

The image is nginx serving `out/`:

- runs as user 101, listens on port **8080**, and answers `GET /healthz` with `ok`;
- works with a read-only root filesystem: the pid file and temp paths are under `/tmp`, so mount an `emptyDir` (or tmpfs) there;
- sends security headers (CSP, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP);
- caches hashed assets under `/_next/static/` for a year (`immutable`), other assets for an hour, and revalidates pages on every request.

Deployment lives outside this repository. New GHCR packages start private; make the package public, or pull it with a registry credential.

Dependabot opens one grouped pull request a week each for npm, GitHub Actions and the Docker base images.

## Licence

- **Code:** MIT, see [`LICENSE`](LICENSE).
- **Website text:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), see [`LICENSE-CONTENT`](LICENSE-CONTENT).
- Inter is under the SIL Open Font License 1.1.
