const repoUrl = "https://github.com/ncecere/open-mcp-portal";
// Links into the repository are pinned at the release tag, so they keep
// showing the files of the version this page describes.
const tree = `${repoUrl}/blob/v0.3.0`;

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
  version: "v0.3.0",
  // The releases before it: the "New in v0.2.0" section describes
  // `previousVersion`, its small follow-up card describes `patchVersion`, and
  // the hardening card after it describes `hardeningVersion`; each links its
  // own notes. `version` has its own card after them.
  previousVersion: "v0.2.0",
  previousReleaseNotesUrl: `${repoUrl}/releases/tag/v0.2.0`,
  patchVersion: "v0.2.1",
  patchReleaseNotesUrl: `${repoUrl}/releases/tag/v0.2.1`,
  hardeningVersion: "v0.2.2",
  hardeningReleaseNotesUrl: `${repoUrl}/releases/tag/v0.2.2`,
  // The release day of `version` (the footer and the sitemap show it).
  releaseDate: "2026-10-20" as string | null,
  releaseNotesUrl: `${repoUrl}/releases/tag/v0.3.0`,
  // The published, cosign-signed container image of `version`, by digest
  // (the tag is v0.3.0). Verify with cosign v3.0 or newer, certificate
  // identity `imageCertificateIdentity`, OIDC issuer `imageOidcIssuer`.
  image: "ghcr.io/ncecere/open-mcp-portal@sha256:f6a3598c47e738fd307c7296f0357670872c247ac487069a52686ebb13c515e4",
  imageTag: "ghcr.io/ncecere/open-mcp-portal:v0.3.0",
  imageCertificateIdentity: `${repoUrl}/.github/workflows/image.yml@refs/tags/v0.3.0`,
  imageOidcIssuer: "https://token.actions.githubusercontent.com",
  releasesUrl: `${repoUrl}/releases`,
  licenseUrl: `${tree}/LICENSE`,
  securityUrl: `${repoUrl}/security`,
  // Where people ask questions and report how their MCP client works.
  discussionsUrl: `${repoUrl}/discussions`,
  clientCompatibilityUrl: "https://docs.omp.bitop.dev/docs/use/client-compatibility",
  statusUrl: `${tree}/docs/status.md`,
  deployUrl: `${tree}/docs/deploy.md`,
  // The roadmap changes between releases, so it is not pinned at the tag: the docs site's page, which links every item's issue.
  roadmapUrl: "https://docs.omp.bitop.dev/docs/releases/roadmap",
  threatModelUrl: `${tree}/docs/threat-model.md`,
  mcpProtocolUrl: `${tree}/docs/mcp-protocol.md`,
  adminOverviewUrl: `${tree}/docs/admin-overview.md`,
  notificationsUrl: `${tree}/docs/notifications.md`,
  automationTokensUrl: `${tree}/docs/automation-tokens.md`,
  connectUrl: `${tree}/docs/connect-clients.md`,
  identityUrl: `${tree}/docs/upstream-identity.md`,
  agentPlatformsUrl: `${tree}/docs/agent-platforms.md`,
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
