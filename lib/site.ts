const repoUrl = "https://github.com/ncecere/open-mcp-portal";
// Links into the repository follow `main` until the first tag exists; once
// v0.1.0 is tagged, point `tree` at `${repoUrl}/blob/v0.1.0`.
const tree = `${repoUrl}/blob/main`;

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
  // The release day of `version` (the footer and the sitemap show it). Null
  // until the tag exists; set it the day the release is tagged.
  releaseDate: null as string | null,
  // Until v0.1.0 is tagged, the release link goes to the releases page.
  releaseNotesUrl: `${repoUrl}/releases`,
  releasesUrl: `${repoUrl}/releases`,
  licenseUrl: `${tree}/LICENSE`,
  securityUrl: `${repoUrl}/security`,
  statusUrl: `${tree}/docs/status.md`,
  deployUrl: `${tree}/docs/deploy.md`,
  connectUrl: `${tree}/docs/connect-clients.md`,
  identityUrl: `${tree}/docs/upstream-identity.md`,
  mailExampleUrl: `${tree}/examples/mail-mcp/README.md`,
  websiteRepoUrl: "https://github.com/ncecere/omp-website",
  // The example portal used in every snippet on the page.
  exampleHost: "portal.example.com",
  // HTTP header names the portal sends to MCP servers. They are protocol
  // names, unchanged by the product's rename (internal/identity/identity.go);
  // check them against docs/upstream-identity.md when the product changes.
  headers: {
    identity: "MCP-Gateway-Identity",
    provider: "MCP-Gateway-Provider",
    providerToken: "MCP-Gateway-Provider-Token",
  },
} as const;
