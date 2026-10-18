const repoUrl = "https://github.com/ncecere/open-mcp-portal";
// Links into the repository are pinned at the release tag, so they keep
// showing the files of the version this page describes.
const tree = `${repoUrl}/blob/v0.1.0`;

export const site = {
  name: "Open MCP Portal",
  // The short form, used only after the full name has been given.
  // scripts/postbuild.mjs fails the build if "OMP" appears before it.
  shortName: "OMP",
  url: "https://omp.bitop.dev",
  title: "Open MCP Portal: one governed place for your company's MCP servers",
  description:
    "Open MCP Portal (OMP) is a self-hosted, open-source portal where teams register the MCP servers they build, publish them to a company catalog, and give people and agents governed access through curated gateways, with sign-in, signed identity, delegated credentials and audit.",
  docsUrl: "https://docs.omp.bitop.dev",
  repoUrl,
  version: "v0.1.0",
  // The release day of `version` (the footer and the sitemap show it).
  releaseDate: "2026-10-17" as string | null,
  releaseNotesUrl: `${repoUrl}/releases/tag/v0.1.0`,
  // The published, cosign-signed container image of `version`.
  image: "ghcr.io/ncecere/open-mcp-portal:v0.1.0",
  releasesUrl: `${repoUrl}/releases`,
  licenseUrl: `${tree}/LICENSE`,
  securityUrl: `${repoUrl}/security`,
  statusUrl: `${tree}/docs/status.md`,
  deployUrl: `${tree}/docs/deploy.md`,
  connectUrl: `${tree}/docs/connect-clients.md`,
  identityUrl: `${tree}/docs/upstream-identity.md`,
  mailExampleUrl: `${tree}/examples/mail-mcp/README.md`,
  websiteRepoUrl: "https://github.com/ncecere/omp-website",
  // The example portal used in every snippet on the page: the host the screenshots show
  // (the Example Corp capture instance in omp-assets, and the docs' examples).
  exampleHost: "mcp.example.com",
  // HTTP header names the portal sends to MCP servers. They are protocol
  // names, unchanged by the product's rename (internal/identity/identity.go);
  // check them against docs/upstream-identity.md when the product changes.
  headers: {
    identity: "MCP-Gateway-Identity",
    provider: "MCP-Gateway-Provider",
    providerToken: "MCP-Gateway-Provider-Token",
  },
} as const;
