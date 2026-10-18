import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Fingerprint,
  Github,
  Key,
  Layers,
  Library,
  LogIn,
  Network,
  Plug,
  Server,
  Shield,
} from "@/components/icons";
import { Screenshot, type SlotName } from "@/components/Screenshot";
import { ButtonLink, CheckList, CodeBlock, Eyebrow, Note, SectionHeading, Strong, TextLink } from "@/components/ui";
import { site } from "@/lib/site";

/*
 * Every claim here is checked against Open MCP Portal v0.2.0
 * (github.com/ncecere/open-mcp-portal at the v0.2.0 tag; the repository was
 * called open-mcp-gateway until the rename): docs/releases/v0.2.0.md (the
 * "New in v0.2.0" section and the status card), docs/threat-model.md,
 * docs/mcp-protocol.md, docs/admin-overview.md, docs/notifications.md,
 * docs/automation-tokens.md, SPEC.md, docs/decisions.md,
 * docs/status.md, docs/registry.md, the "As built" sections of
 * docs/phase3-gateways.md to docs/phase7-upstream-oauth.md,
 * docs/upstream-identity.md, docs/connect-clients.md, docs/deploy.md,
 * examples/mail-mcp/README.md, the Makefile and the screen names in web/src.
 * Keep it that way: nothing on this page may describe a feature that isn't
 * built. Planned work is named as planned, in the project status card.
 */

const gatewayUrl = `https://${site.exampleHost}/mcp/support`;

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <NewInRelease />
      <Connect />
      <ServerAuthors />
      <Screenshots />
      <SelfHost />
      <OpenSource />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

// Tool names are {server-slug}__{tool} (SPEC §6); the tools are the ones of
// the repository's fake MCP server (cmd/fakemcp).
const heroExample = `# Add a gateway to Claude Code: no key, no header
claude mcp add --transport http support \\
  ${gatewayUrl}

# Run /mcp in Claude Code and sign in with your company account.
# The client sees only the tools this gateway gives you:
#   status__check_outage
#   tickets__search_tickets
#   tickets__create_ticket`;

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-glow relative overflow-hidden border-b border-brand-border">
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="min-w-0">
          <a
            href={site.releaseNotesUrl}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-border-emphasis bg-brand-surface px-3 py-1 text-xs font-medium text-brand-muted hover:text-brand-text"
          >
            <span className="rounded-full bg-brand-primary-subtle px-2 py-0.5 text-brand-primary-subtle-text">{site.version}</span>
            <span>Open source, MIT licensed</span>
            <ArrowRight className="size-3.5 shrink-0" />
          </a>
          <p className="mt-6 text-base font-semibold text-brand-text">{site.name}</p>
          <h1 id="hero-title" className="mt-2 text-4xl font-semibold tracking-tight text-brand-text sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            One governed place for your company&apos;s MCP servers
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">
            Open MCP Portal ({site.shortName}) is where your teams register the MCP servers they build, publish them to
            a reviewed company catalog, and combine their tools into gateways. People and agents connect to a gateway
            with one URL, under your own sign-in, and see only what they may use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.docsUrl}>
              <BookOpen className="size-4" />
              Read the docs
            </ButtonLink>
            <ButtonLink href={site.repoUrl} variant="secondary">
              <Github className="size-4" />
              View on GitHub
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-xl text-sm text-brand-subtle">
            Self-hosted: one Go service with its web UI built in, and PostgreSQL. Run it with Docker Compose or on
            Kubernetes.
          </p>
        </div>
        <div className="min-w-0">
          <CodeBlock label="Connect an MCP client to a gateway">{heroExample}</CodeBlock>
          <p className="mt-3 text-sm text-brand-muted">
            Every call is checked again, carries a signed identity to the server, and leaves a record. The client&apos;s
            own credential is never passed on.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- The problem */

const problems: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <Server className="size-5" />,
    title: "Servers nobody can find",
    body: "Every team builds MCP servers for its own systems. Nobody has the full list, knows who owns each one, or can tell whether its tools changed since someone last looked.",
  },
  {
    icon: <Key className="size-5" />,
    title: "Credentials in every config",
    body: "People paste URLs, keys and tokens into each client, one server at a time. The servers can't tell who is calling, and taking access back means finding every copy.",
  },
  {
    icon: <Shield className="size-5" />,
    title: "No one place to govern it",
    body: "There is nowhere to decide which people, teams or agents may use which tools, to review a server before the company relies on it, or to see afterwards what was called.",
  },
];

function Problem() {
  return (
    <section aria-labelledby="problem-title" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="problem-title" eyebrow="The problem" title="MCP servers multiply faster than anyone can keep track of them">
          <p>
            MCP lets AI clients and agents use your company&apos;s systems through tools. That works until there are
            dozens of servers, hundreds of tools and everyone connecting to them in their own way.
          </p>
        </SectionHeading>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {problems.map((p) => (
            <li key={p.title} className="rounded-card border border-brand-border bg-brand-surface p-6">
              <span className="flex size-9 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-primary-subtle-text">
                {p.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-brand-text">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- How it works */

function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-control border border-brand-border-emphasis bg-brand-surface px-3 py-2 text-sm font-medium text-brand-text">
      {children}
    </li>
  );
}

/** Points right on wide screens, down when the diagram stacks. Decorative. */
function FlowArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-brand-subtle">
      <svg viewBox="0 0 24 24" className="size-6 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </div>
  );
}

// SPEC §6 and docs/phase3-gateways.md "As built": the checks on every call.
const portalSteps: { title: string; body: string }[] = [
  { title: "Sign in", body: "An OAuth access token bound to this gateway, a personal API key or a service account key." },
  { title: "Allow", body: "Access to the gateway, the tool selected in it, the minimum role, the server enabled (and, from the catalog, published and approved), the rate limit." },
  { title: "Vouch", body: "A short-lived signed identity token, and the person's own token where a tool needs one." },
  { title: "Forward", body: "To the server over Streamable HTTP, through an address guard and your internal-network allowlist." },
  { title: "Record", body: "Who called what, the outcome and the latency. Arguments and results only where a team opted in." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="how-title" eyebrow="How it works" title="Clients in front, your MCP servers behind, rules in between">
          <p>
            Teams register servers and the portal reads what they offer. Admins publish them to the catalog. Gateways
            pick the tools a group of people needs, and every call through a gateway takes the same path.
          </p>
        </SectionHeading>

        <figure className="mt-12">
          <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1.5fr_auto_1fr]">
            <div className="rounded-card border border-brand-border bg-brand-surface p-5">
              <p className="text-sm font-semibold text-brand-subtle">People and agents</p>
              <ul className="mt-4 space-y-2">
                <Chip>Claude Code</Chip>
                <Chip>VS Code</Chip>
                <Chip>Cursor</Chip>
                <Chip>Claude</Chip>
                <Chip>Agents, CI and scripts</Chip>
              </ul>
              <p className="mt-4 text-xs text-brand-subtle">
                to <code className="font-mono">/mcp/&lt;gateway&gt;</code>
              </p>
            </div>

            <FlowArrow />

            <div className="rounded-card border-2 border-brand-primary bg-brand-surface p-5 shadow-brand-2">
              <p className="text-sm font-semibold text-brand-text">{site.name}</p>
              <ol className="mt-4 space-y-3">
                {portalSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-primary-subtle text-xs font-semibold text-brand-primary-subtle-text">
                      {i + 1}
                    </span>
                    <span className="text-sm text-brand-muted">
                      <Strong>{s.title}.</Strong> {s.body}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-brand-border pt-3 text-xs text-brand-subtle">
                Registry, catalog, gateways and records in PostgreSQL · web UI for teams and admins
              </p>
            </div>

            <FlowArrow />

            <div className="grid gap-4">
              <div className="rounded-card border border-brand-border bg-brand-surface p-5">
                <p className="text-sm font-semibold text-brand-subtle">Your teams&apos; MCP servers</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  <Chip>On your internal network</Chip>
                  <Chip>Public, over HTTPS</Chip>
                  <Chip>GitHub&apos;s hosted MCP server</Chip>
                </ul>
              </div>
              <div className="rounded-card border border-brand-border bg-brand-surface p-5">
                <p className="text-sm font-semibold text-brand-subtle">Accounts people connect</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  <Chip>GitHub</Chip>
                  <Chip>Google</Chip>
                  <Chip>Microsoft Entra ID</Chip>
                  <Chip>Atlassian</Chip>
                  <Chip>Slack</Chip>
                  <Chip>GitLab</Chip>
                </ul>
              </div>
            </div>
          </div>
          <figcaption className="mt-4 text-sm text-brand-muted">
            Tool lists come from the stored definitions (for catalog servers, the approved ones) without contacting the
            servers; every call is checked again. A tool that isn&apos;t allowed looks exactly like one that doesn&apos;t exist.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Features */

function FeatureCard({
  id,
  icon,
  eyebrow,
  title,
  lead,
  bullets,
  note,
  wide = false,
}: {
  id: string;
  icon?: ReactNode;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  bullets: ReactNode[];
  note?: ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      aria-labelledby={id}
      className={`flex min-w-0 flex-col rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8 ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-primary-subtle-text">
            {icon}
          </span>
        ) : null}
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <h3 id={id} className="mt-3 text-xl font-semibold tracking-tight text-brand-text sm:text-2xl">
        {title}
      </h3>
      <div className="mt-3 space-y-3 leading-relaxed text-brand-muted">{lead}</div>
      <CheckList items={bullets} columns={wide} />
      {note ? <Note>{note}</Note> : null}
    </article>
  );
}

function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-16 border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="features-title" eyebrow="Features" title="From a team's server to a governed tool call">
          <p>
            {site.shortName} is one installation for one company. Teams own their servers and gateways; platform admins
            set the rules, review what is published and see everything; platform auditors see the same, read-only.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* docs/registry.md */}
          <FeatureCard
            id="feature-registry"
            icon={<Server className="size-5" />}
            eyebrow="Registry and discovery"
            title="Register a server; the portal reads what it offers"
            lead={
              <p>
                A team adds its MCP server&apos;s URL. The portal discovers its tools, prompts, resources and resource
                templates, and keeps checking that the server is healthy.
              </p>
            }
            bullets={[
              <>
                <Strong>Owned by teams,</Strong> private to the team until it is published. Editors register and test
                servers; owners and admins publish them.
              </>,
              <>
                <Strong>Change detection:</Strong> each definition is fingerprinted. When an approved tool changes, it
                drops out of the catalog until someone approves the new version; a tool that disappears loses its
                approval.
              </>,
              <>
                <Strong>Health checks</Strong> every five minutes by default, with the error class and a
                &ldquo;failing since&rdquo; time.
              </>,
              <>
                <Strong>A static header</Strong> such as an API key can be stored per server, encrypted, and shown only
                as its last four characters.
              </>,
            ]}
            note={<>Servers are remote, reached over Streamable HTTP. The portal doesn&apos;t host or run MCP servers.</>}
          />

          {/* docs/registry.md "Publishing", decisions 9 and 40 */}
          <FeatureCard
            id="feature-catalog"
            icon={<Library className="size-5" />}
            eyebrow="Company catalog"
            title="Published after review, not before"
            lead={
              <p>
                The catalog lists the servers the whole company may build on, with only their approved capabilities.
                Any signed-in person can browse it.
              </p>
            }
            bullets={[
              <>
                <Strong>A publishing policy:</Strong> approval required (the default) or self-publish, with an override
                per team, so a trusted team can publish on its own.
              </>,
              <>
                <Strong>Back to review</Strong>, under approval required, when a published server changes its URL,
                starts asking people to sign in, or asks for wider access.
              </>,
              <>
                <Strong>Descriptions are treated as untrusted text:</Strong> a model will read them, so reviewers see
                them before approving. Tool annotations are shown as hints and never used for authorization.
              </>,
            ]}
          />

          {/* docs/phase3-gateways.md, decisions 13, 16, 17 */}
          <FeatureCard
            id="feature-gateways"
            icon={<Network className="size-5" />}
            eyebrow="Gateways"
            title="Curated tools at one URL"
            wide
            lead={
              <p>
                A gateway is a selection of tools, prompts and resources from one or more servers, served at{" "}
                <code>https://{site.exampleHost}/mcp/&lt;gateway&gt;</code>. Build as many as you need: one for support,
                one for an on-call team, one for a release pipeline.
              </p>
            }
            bullets={[
              <>
                <Strong>Team gateways</Strong> are curated by a team&apos;s owners and admins from their own servers and
                the catalog, for the team&apos;s members.
              </>,
              <>
                <Strong>Platform gateways</Strong> are curated by platform admins and granted to teams, people or SSO
                groups from your identity provider.
              </>,
              <>
                <Strong>A minimum team role</Strong> per tool on team gateways: members might read, while only editors
                may call the tool that writes.
              </>,
              <>
                <Strong>No clashes:</Strong> tools are exposed as <code>server__tool</code>, and resources under{" "}
                <code>omp://server/</code>, so servers can use the same names.
              </>,
              <>
                <Strong>Checked on every call:</Strong> removing someone from a team or a grant, turning a gateway off
                or unpublishing a server takes effect at the next request.
              </>,
              <>
                <Strong>Limits per gateway:</Strong> a rate limit per minute, and a switch to record call contents.
              </>,
            ]}
          />

          {/* docs/phase4-client-auth.md, docs/connect-clients.md */}
          <FeatureCard
            id="feature-sign-in"
            icon={<LogIn className="size-5" />}
            eyebrow="Client sign-in"
            title="Sign-in for any MCP client"
            lead={
              <p>
                The portal is an OAuth 2.1 authorization server as the MCP authorization spec describes, in front of
                your company&apos;s single sign-on. Interactive clients open the browser; headless ones use keys.
              </p>
            }
            bullets={[
              <>
                <Strong>OAuth sign-in</Strong> with PKCE, Client ID Metadata Documents and dynamic registration. Each
                connection is bound to one gateway; self-registered apps are marked unverified.
              </>,
              <>
                <Strong>Consent per person, app and gateway.</Strong> Apps your admins trust (Claude, Claude Code and VS
                Code out of the box) skip the consent page. People see and disconnect their apps under Connected apps.
              </>,
              <>
                <Strong>Personal API keys</Strong> for scripts and clients that can&apos;t open a browser, optionally
                limited to some gateways, with an expiry of up to a year.
              </>,
              <>
                <Strong>Service accounts</Strong> for agents and CI that must not depend on one person: owned by a team,
                with a member or editor role and up to two active keys, so they rotate without downtime.
              </>,
            ]}
          />

          {/* docs/phase7-upstream-oauth.md, docs/phase5-delegated-credentials.md */}
          <FeatureCard
            id="feature-credentials"
            icon={<Key className="size-5" />}
            eyebrow="Per-person credentials"
            title="Tools that act as the person calling them"
            lead={
              <p>
                Some tools must act as you: on GitHub&apos;s hosted MCP server, or on Google, Microsoft or Atlassian
                behind your own server. The portal signs each person in once and keeps their token, so neither the client
                nor the model ever sees it.
              </p>
            }
            bullets={[
              <>
                <Strong>OAuth-protected MCP servers:</Strong> Detect sign-in reads the server&apos;s metadata; the
                portal registers itself as a client, or uses one you enter or a platform provider. Each person&apos;s
                token goes only to that server.
              </>,
              <>
                <Strong>Delegated credentials</Strong> for your own servers: admins configure auth providers (presets for
                GitHub, Google, Microsoft Entra ID, Atlassian, Slack and GitLab), and a server asks for a provider and
                scopes, per tool if needed. Each person allows each server once, and the token goes only to a server they
                allowed.
              </>,
              <>
                <Strong>A link, not an error:</Strong> the first call answers with a one-time link (JSON-RPC{" "}
                <code>-32042</code> for clients on earlier revisions; see New in {site.version} for 2026-07-28) to a
                page that names the tool, the gateway and every scope. It works only for that person, once, for 10
                minutes.
              </>,
              <>
                <Strong>Kept fresh, easy to revoke:</Strong> tokens are encrypted at rest and refreshed by the portal.
                People disconnect under My connections; admins can revoke anyone&apos;s.
              </>,
            ]}
          />

          {/* docs/upstream-identity.md, decisions 7, 19, 45 */}
          <FeatureCard
            id="feature-identity"
            icon={<Fingerprint className="size-5" />}
            eyebrow="Signed identity"
            title="Your servers know who is calling"
            wide
            lead={
              <p>
                Every forwarded call carries a short-lived token signed by the portal: who is calling, through which
                gateway, for which tool. Servers verify it against the portal&apos;s published keys.
              </p>
            }
            bullets={[
              <>
                <Strong>A JWT per call</Strong>, ES256, valid for five minutes, with the audience set to the server&apos;s
                own URL, so it can&apos;t be replayed elsewhere.
              </>,
              <>
                <Strong>Keys at</Strong> <code>/.well-known/jwks.json</code>, rotated every 30 days, with the next key
                published a day before it signs.
              </>,
              <>
                <Strong>People and service accounts</Strong> are told apart, with email and teams for people.
              </>,
              <>
                <Strong>Off for outside servers:</Strong> a per-server switch sends no identity to servers run outside the
                company.
              </>,
            ]}
            note={
              <>
                The details for server authors are <a href="#server-authors" className="font-medium text-brand-link underline underline-offset-2 hover:text-brand-link-hover">below</a>.
              </>
            }
          />

          {/* docs/phase6-operations.md "As built" */}
          <FeatureCard
            id="feature-governance"
            icon={<Activity className="size-5" />}
            eyebrow="Governance"
            title="Audit, limits and records you can answer for"
            wide
            lead={
              <p>
                Every administrative change is audited in the same transaction that makes it. Every call is recorded with
                its metadata. Call contents are kept only where a team chose to keep them.
              </p>
            }
            bullets={[
              <>
                <Strong>An audit log</Strong> for the platform and each team: servers, reviews, gateways, grants, keys,
                consents and connections. Never a secret or a token.
              </>,
              <>
                <Strong>Call records</Strong> with the caller, the client, the gateway, server and tool, the outcome,
                latency and sizes; teams see calls through their gateways and to their servers.
              </>,
              <>
                <Strong>Rate limits</Strong> per person, credential, service account and gateway, with ceilings and team
                overrides, counted in PostgreSQL and shared by every replica.
              </>,
              <>
                <Strong>Opt-in payload capture</Strong> per gateway or server: arguments and results, redacted by built-in
                rules and your own patterns, cut to 16 KiB and encrypted. Only the owning team&apos;s admins and platform
                staff can open them, and every view is audited.
              </>,
              <>
                <Strong>Retention</Strong> with team overrides: call records 90 days, captured contents 14 days (at most
                90), the audit log 400 days by default.
              </>,
              <>
                <Strong>Usage dashboards</Strong> for teams and platform admins: calls, errors by outcome, p50 and p95
                latency by gateway, server, tool, team or kind of caller, over up to 90 days.
              </>,
              <>
                <Strong>Prometheus metrics</Strong> on a separate listener, with no user, key or team IDs in labels.
              </>,
              <>
                <Strong>Key rotation</Strong> for the encryption key and the API key pepper, while serving.
              </>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- New in v0.2.0 */

// docs/releases/v0.2.0.md. Claims and limits are the release notes' own; the
// "not yet tried" list is repeated in the project status card.
function NewInRelease() {
  return (
    <section id="new" aria-labelledby="new-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="new-title" eyebrow={`New in ${site.version}`} title="The newest MCP revision, and what a pilot needs to run it">
          <p>
            {site.version} adds support for the MCP 2026-07-28 revision, an admin overview, notifications and automation
            tokens, and fixes the issues found in a security review of v0.1.0. Read the{" "}
            <TextLink href={site.releaseNotesUrl}>release notes</TextLink> before you upgrade: it adds migrations, and
            people consent once per server.
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* docs/releases/v0.2.0.md "MCP 2026-07-28, and every older revision"; docs/mcp-protocol.md */}
          <FeatureCard
            id="new-protocol"
            icon={<Network className="size-5" />}
            eyebrow="Protocol"
            title="MCP 2026-07-28, next to every older revision"
            wide
            lead={
              <p>
                Gateways speak the 2026-07-28 revision alongside 2024-11-05, 2025-03-26, 2025-06-18 and 2025-11-25. The
                revision is chosen per request, so one gateway serves old and new clients at once, and an older client
                sees exactly what it saw before.
              </p>
            }
            bullets={[
              <>
                <Strong>Toward clients:</Strong> <code>server/discover</code>, the required request headers checked against the
                body, and lists marked private to the person, because they differ per person.
              </>,
              <>
                <Strong>&ldquo;Connect your account&rdquo; as a question:</Strong> a client that declares URL elicitation gets
                the consent link as an <code>input_required</code> result. Other 2026-07-28 clients get a tool error with
                the link in the text; older clients keep <code>-32042</code>.
              </>,
              <>
                <Strong>Toward your servers:</Strong> the portal tries 2026-07-28 first, falls back to{" "}
                <code>initialize</code> by the specification&apos;s rule, and shows the answer on the server&apos;s page.
              </>,
              <>
                <Strong>Relayed and streamed:</Strong> an upstream server&apos;s elicitation requests reach a client that
                can answer them, a call&apos;s progress streams as server-sent events when the client asks, and trace
                headers are passed through.
              </>,
            ]}
            note={
              <>
                Exercised with the official conformance suite, curl and the Go SDK client; the failures that remain are
                by design. Not yet tried with real Claude Code, VS Code or Cursor on the new revision.{" "}
                <TextLink href={site.mcpProtocolUrl}>MCP protocol</TextLink>
              </>
            }
          />

          {/* docs/releases/v0.2.0.md "For the pilot"; docs/admin-overview.md */}
          <FeatureCard
            id="new-overview"
            icon={<Activity className="size-5" />}
            eyebrow="Admin overview"
            title="What needs attention, on one page"
            lead={
              <p>
                Platform admins land on an Overview of what needs attention across the portal, with the numbers that
                matter. Each team has the same for itself.
              </p>
            }
            bullets={[
              <>Failing servers, held-back changes, reviews waiting, expiring keys and lapsed sign-ins.</>,
              <>Every item opens the screen where it is dealt with.</>,
            ]}
            note={<TextLink href={site.adminOverviewUrl}>Admin overview</TextLink>}
          />

          {/* docs/notifications.md */}
          <FeatureCard
            id="new-notifications"
            icon={<Plug className="size-5" />}
            eyebrow="Notifications"
            title="In the portal, by email, or to a webhook"
            lead={
              <p>
                Eight events, with personal preferences per event and channel. Team webhooks are managed by team owners and
                admins, platform webhooks by platform admins.
              </p>
            }
            bullets={[
              <>
                <Strong>A bell and inbox</Strong> in the portal.
              </>,
              <>
                <Strong>Email</Strong> through your SMTP server: off until you set <code>SMTP_HOST</code>, and only to
                addresses your identity provider reported as verified.
              </>,
              <>
                <Strong>Webhooks:</Strong> signed JSON for your own receiver, or Slack-compatible. URLs are stored encrypted
                and shown as a host only; they reach public https addresses unless the operator allows a network.
              </>,
            ]}
            note={
              <>
                Email has been tested against a local mail sink, not yet a real provider over TLS.{" "}
                <TextLink href={site.notificationsUrl}>Notifications</TextLink>
              </>
            }
          />

          {/* docs/automation-tokens.md */}
          <FeatureCard
            id="new-tokens"
            icon={<Key className="size-5" />}
            eyebrow="Automation tokens"
            title="Tokens for CI, for the management API"
            lead={
              <p>
                Platform tokens (read or provision) and team publisher tokens, which register, refresh and publish a
                team&apos;s servers, for the management API under <code>/v1</code>.
              </p>
            }
            bullets={[
              <>
                <Strong>Expiring and revocable in one click,</Strong> showing who made them and when they were last used.
              </>,
              <>
                <Strong>Audited as the token,</Strong> and created and revoked only in a browser session.
              </>,
              <>
                <Strong>Never on <code>/mcp</code>,</Strong> and MCP credentials never work on <code>/v1</code>.
              </>,
            ]}
            note={<TextLink href={site.automationTokensUrl}>Automation tokens</TextLink>}
          />

          {/* docs/releases/v0.2.0.md "Security fixes"; docs/threat-model.md */}
          <FeatureCard
            id="new-security"
            icon={<Shield className="size-5" />}
            eyebrow="Security"
            title="Fixes from a published threat model"
            lead={
              <p>
                A review of v0.1.0 found four issues, all fixed in {site.version}. The{" "}
                <TextLink href={site.threatModelUrl}>threat model</TextLink> is written for security reviewers.
              </p>
            }
            bullets={[
              <>
                <Strong>Provider tokens go only to servers a person allowed,</Strong> at the address they had when allowed.
                Moving a server to another host ends its permissions.
              </>,
              <>
                <Strong>Approvals are bound to what the reviewer saw:</Strong> an approval of something that changed in
                between is refused.
              </>,
              <>
                <Strong>A stored header value is not sent to a new origin</Strong> unless the same change supplies a new
                one, and a crafted sign-in redirect no longer leaves the site.
              </>,
            ]}
            note={
              <>
                Upgrading: everyone consents once per server, and scripts that approve must send the digest they
                reviewed. A person&apos;s provider token still carries every scope they granted that provider.
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Connect */

// docs/connect-clients.md; the same shapes as web/src/components/gateways/connect-snippets.ts.
const claudeSnippet = `claude mcp add --transport http support \\
  ${gatewayUrl}

# then run /mcp in Claude Code
# and choose "support" to sign in`;

const vscodeSnippet = `{
  "servers": {
    "support": {
      "type": "http",
      "url": "${gatewayUrl}"
    }
  }
}`;

const cursorSnippet = `{
  "mcpServers": {
    "support": {
      "url": "${gatewayUrl}"
    }
  }
}`;

const keySnippet = `curl -X POST ${gatewayUrl} \\
  -H "Authorization: Bearer omp_..." \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`;

function Connect() {
  return (
    <section id="connect" aria-labelledby="connect-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="connect-title" eyebrow="Connect your AI client" title="Add the URL; sign in in the browser">
          <p>
            Every gateway has one MCP endpoint, <code>https://{site.exampleHost}/mcp/&lt;gateway&gt;</code>. My
            gateways lists the ones you can use, with these snippets filled in. There is no key to copy: the first time
            the client connects, it opens your browser and you sign in with your company account.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <CodeBlock label="Claude Code">{claudeSnippet}</CodeBlock>
          <CodeBlock label="VS Code: .vscode/mcp.json">{vscodeSnippet}</CodeBlock>
          <CodeBlock label="Cursor: ~/.cursor/mcp.json">{cursorSnippet}</CodeBlock>
          <div className="min-w-0">
            <CodeBlock label="Scripts and agents: a personal or service account key">{keySnippet}</CodeBlock>
            <p className="mt-3 text-sm text-brand-muted">
              Personal keys start with <code>omp_</code>, service account keys with <code>omp_sa_</code>. Both are
              shown once. <TextLink href={site.connectUrl}>Connecting clients</TextLink>
            </p>
          </div>
        </div>
        <div className="mt-10 max-w-3xl">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-brand-text">What a connected app can do</h3>
            <CheckList
              items={[
                <>It acts as you, on that gateway only: its token is refused by every other gateway.</>,
                <>It sees the tools you may use there now. Lose access and the next request is refused.</>,
                <>Access tokens last an hour; the app refreshes them, and signs in again after 30 days unused. A refresh token reused after 30 seconds ends the connection.</>,
                <>Claude (claude.ai and Claude Desktop) connects as a custom connector; for claude.ai the portal must be reachable from the internet.</>,
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- For MCP server authors */

// docs/upstream-identity.md "TypeScript (jose)", with the example URLs.
const verifySnippet = `import { createRemoteJWKSet, jwtVerify } from "jose";

const PORTAL = "https://${site.exampleHost}";
const MY_URL = "https://status.example.com/mcp"; // as registered

// Caches keys and fetches the set again for an unknown kid.
const jwks = createRemoteJWKSet(
  new URL(\`\${PORTAL}/.well-known/jwks.json\`),
);

export async function identity(headers: Headers) {
  const token =
    headers.get("${site.headers.identity.toLowerCase()}") ??
    headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  const { payload } = await jwtVerify(token, jwks, {
    algorithms: ["ES256"],
    issuer: PORTAL,
    audience: MY_URL,
    clockTolerance: 30,
  });
  return payload; // principal_type, sub, email, teams, tool
}`;

const claims: { name: string; what: string }[] = [
  { name: "principal_type", what: "user, or service_account" },
  { name: "sub", what: "The person's or service account's stable ID" },
  { name: "email, name", what: "The person's email (never for service accounts) and name" },
  { name: "teams", what: "Slugs of the caller's teams" },
  { name: "gateway", what: "The gateway's slug" },
  { name: "tool, prompt, resource", what: "What was called, exactly one of them" },
  { name: "client", what: "The MCP client, with client_verified for OAuth apps" },
  { name: "provider", what: "Set when a provider token comes with the call" },
];

function ServerAuthors() {
  return (
    <section id="server-authors" aria-labelledby="authors-title" className="scroll-mt-16 border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="authors-title" eyebrow="For MCP server authors" title="Build the tools; leave sign-in to the portal">
          <p>
            Your server receives calls from the portal, never the client&apos;s own key or token. Verify the identity
            token and you know who is calling, from which team and through which gateway, without running sign-in or
            storing anyone&apos;s tokens yourself.
          </p>
        </SectionHeading>
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          <div className="min-w-0 space-y-6">
            <CodeBlock label="Verify the identity token (TypeScript, jose)">{verifySnippet}</CodeBlock>
            <div className="min-w-0 overflow-x-auto rounded-card border border-brand-border-emphasis bg-brand-surface">
              <table className="w-full text-left text-sm">
                <caption className="border-b border-brand-border px-4 py-2 text-left text-xs font-medium text-brand-muted">
                  Identity token claims, besides iss, aud, exp and jti
                </caption>
                <tbody>
                  {claims.map((c) => (
                    <tr key={c.name} className="border-b border-brand-border last:border-0">
                      <th scope="row" className="py-2 pr-3 pl-4 align-top font-mono text-xs font-normal whitespace-nowrap text-brand-text sm:text-[0.8125rem]">
                        {c.name}
                      </th>
                      <td className="py-2 pr-4 pl-3 text-brand-muted">{c.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="min-w-0">
            <CheckList
              items={[
                <>
                  <Strong>Where the token arrives:</Strong> in <code>Authorization: Bearer</code>, or in{" "}
                  <code>{site.headers.identity}</code> when your server uses the <code>Authorization</code> header for
                  something else. Check the signature (ES256, keys from the JWKS), the issuer, the audience (your
                  server&apos;s URL as registered) and the expiry.
                </>,
                <>
                  <Strong>Provider tokens:</Strong> when a tool needs the person&apos;s account on another service, the
                  call also brings <code>{site.headers.provider}</code> (the provider, such as <code>github</code>) and{" "}
                  <code>{site.headers.providerToken}</code> (their access token, refreshed by the portal). Accept it only
                  when the identity token&apos;s <code>provider</code> claim matches, and never log or store it.
                </>,
                <>
                  <Strong>OAuth servers work as they are:</Strong> if your server is itself an OAuth resource server, the
                  portal is an ordinary MCP client of it. Each person&apos;s token for your server arrives as the bearer,
                  and the portal handles a <code>401</code> with one refresh and a <code>403</code>{" "}
                  <code>insufficient_scope</code> by asking the person for more access.
                </>,
                <>
                  <Strong>Parameter headers:</Strong> when a tool&apos;s input schema marks an argument with{" "}
                  <code>x-mcp-header</code>, forwarded tool calls also carry its value in an <code>Mcp-Param-&lt;Name&gt;</code>{" "}
                  header, built from the approved definition (SEP-2243).
                </>,
                <>
                  <Strong>Calls only:</Strong> lists are served from the approved definitions, so your server sees tool
                  calls, prompt gets and resource reads, plus discovery and health checks.
                </>,
              ]}
            />
            <Note>
              The repository includes a worked example: a Gmail MCP server that used to run its own Google OAuth and now
              relies on the portal&apos;s identity token and delegated Google token. It stores no tokens, sessions or
              client secret. <TextLink href={site.mailExampleUrl}>examples/mail-mcp</TextLink>
            </Note>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.identityUrl} variant="secondary">
                Verifying the identity token
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Screenshots */

const gallery: SlotName[] = [
  "my-gateways",
  "catalog",
  "server-sign-in",
  "gateway-capabilities",
  "oauth-consent",
  "connect-confirm",
  "admin-usage",
  "call-detail",
];

function Screenshots() {
  return (
    <section id="screenshots" aria-labelledby="screenshots-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="screenshots-title" eyebrow="The web UI" title="One portal for people, teams and administrators">
          <p>
            Everyone signed in sees the catalog and their gateways. Teams manage their servers, gateways, service
            accounts and usage. Platform admins review, grant and configure; auditors see the same pages, read-only.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {gallery.map((slot) => (
            <Screenshot key={slot} slot={slot} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Self-host */

// Makefile `demo` and compose.demo.yaml; docs/deploy.md "Demo".
const quickStart = `git clone --branch ${site.version} https://github.com/ncecere/open-mcp-portal.git
cd open-mcp-portal
make demo    # portal + PostgreSQL + a fake MCP server
             # on http://localhost:8090, with development sign-in`;

// The release image (signed with cosign keyless signing by the repository's
// image workflow at the tag); deploy/kubernetes pins the same image.
const pullImage = `docker pull ${site.image}

# Verify the signature (cosign v3.0 or newer; keyless, GitHub Actions OIDC)
cosign verify ${site.image} \\
  --certificate-identity ${site.imageCertificateIdentity} \\
  --certificate-oidc-issuer ${site.imageOidcIssuer}`;

// docs/deploy.md "Kubernetes › Secrets".
const k8sSecrets = `kubectl create namespace open-mcp-portal
kubectl -n open-mcp-portal create secret generic open-mcp-portal-runtime \\
  --from-literal=DATABASE_URL='postgres://omp:<password>@db.example.com:5432/omp?sslmode=require' \\
  --from-literal=ENCRYPTION_KEY="$(openssl rand -base64 32)" \\
  --from-literal=API_KEY_PEPPER="$(openssl rand -base64 32)" \\
  --from-literal=OIDC_CLIENT_SECRET='<from your IdP>'`;

const requirements = [
  "PostgreSQL: the only dependency. No cache, queue, worker or object storage",
  "An OpenID Connect identity provider for sign-in, optionally with a groups claim for SSO group grants",
  "TLS in front of the portal, on the host in APP_URL",
  "Two 32-byte secrets: ENCRYPTION_KEY and API_KEY_PEPPER, kept with your backups",
];

function SelfHost() {
  return (
    <section id="self-host" aria-labelledby="self-host-title" className="scroll-mt-16 border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="self-host-title" eyebrow="Self-host" title="Run it on your own infrastructure">
          <p>
            {site.name} is one stateless binary with the web UI built in, in a distroless container image. Every replica
            shares PostgreSQL, so you scale it by adding replicas; background loops such as health checks and retention
            take a database lock, so only one replica runs each.
          </p>
          <p>
            Servers on your internal network need an allowlist entry: platform admins add networks and host names under
            Admin › Internal networks, and the deployment can add its own. Loopback and cloud metadata addresses stay
            blocked whatever the list says.
          </p>
        </SectionHeading>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0 space-y-6">
            <CodeBlock label="Try Open MCP Portal on your machine with Docker Compose">{quickStart}</CodeBlock>
            <ol className="list-decimal space-y-3 pl-5 text-brand-muted marker:text-brand-subtle">
              <li>
                Open <code>http://localhost:8090</code> and sign in as <code>admin</code>. Create a team under{" "}
                <Strong>Admin › Teams</Strong>.
              </li>
              <li>
                In the team, add the fake MCP server as <code>http://127.0.0.1:8091/mcp</code>. The portal reads its
                tools, prompts and resources.
              </li>
              <li>
                Create a gateway from some of its tools and an API key under <Strong>Account › API keys</Strong>, then
                connect a client to <code>http://localhost:8090/mcp/&lt;gateway&gt;</code>.
              </li>
            </ol>
            <Note>
              The demo uses development sign-in and public example keys, which the portal accepts only on a loopback
              address. Never expose it.
            </Note>
            <CodeBlock label={`Pull and verify the published ${site.version} image (tag ${site.version})`}>{pullImage}</CodeBlock>
            <CodeBlock label="Kubernetes: the runtime secret the Kustomize base expects">{k8sSecrets}</CodeBlock>
          </div>
          <div className="self-start rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-brand-text">What you need</h3>
            <ul className="mt-4 space-y-2 text-sm text-brand-muted">
              {requirements.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-text" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg font-semibold text-brand-text">On Kubernetes</h3>
            <p className="mt-2 text-sm text-brand-muted">
              A Kustomize base and an example overlay: two replicas with a migrate init container, a disruption budget,
              default-deny NetworkPolicies and a pod that meets the restricted Pod Security Standard, with Ingress or
              Gateway API routes. <code>/healthz</code> and <code>/readyz</code> for probes; graceful shutdown on
              SIGTERM.
            </p>
            <Note>
              The image <code>{site.imageTag}</code> is published and signed with cosign (v3.0 or newer verifies it);
              pin it by digest in your overlay. There is no Helm chart.
            </Note>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.docsUrl}>
                Self-hosting docs
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={site.deployUrl} variant="secondary">
                Deployment guide on GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Open source */

function OpenSource() {
  return (
    <section id="open-source" aria-labelledby="open-source-title" className="scroll-mt-16 border-t border-brand-border bg-brand-surface-sunken py-20 sm:py-24">
      <div className="container-page">
        <h2 id="open-source-title" className="sr-only">
          Open source and project status
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <article aria-labelledby="oss-title" className="min-w-0 rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-primary-subtle-text">
                <Plug className="size-5" />
              </span>
              <Eyebrow>Open source</Eyebrow>
            </div>
            <h3 id="oss-title" className="mt-3 text-2xl font-semibold tracking-tight text-brand-text">
              MIT licensed, built in the open
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-brand-muted">
              <p>
                {site.name} is released under the MIT licence. Run it for as many people as you like, and change the code
                if you need to.
              </p>
              <p>
                It is written in Go with PostgreSQL, and a React web UI built into the binary. The management API is
                described in OpenAPI, which generates the Go and TypeScript types. Integration tests run against real
                PostgreSQL, an authorization matrix covers every operation for every role, and component tests cover
                the UI.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.repoUrl} variant="secondary">
                <Github className="size-4" />
                Source on GitHub
              </ButtonLink>
              <ButtonLink href={site.licenseUrl} variant="ghost">
                Read the licence
              </ButtonLink>
            </div>
          </article>
          <article aria-labelledby="status-title" className="min-w-0 rounded-card border border-brand-border bg-brand-surface p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-primary-subtle-text">
                <Layers className="size-5" />
              </span>
              <Eyebrow>Project status</Eyebrow>
            </div>
            <h3 id="status-title" className="mt-3 text-2xl font-semibold tracking-tight text-brand-text">
              {site.version} is released, and honest about it
            </h3>
            <div className="mt-4 space-y-3 leading-relaxed text-brand-muted">
              <p>
                Everything on this page is built and tested against real PostgreSQL. Real clients have worked since
                v0.1.0: Claude Code and pi have signed in to gateways over OAuth and called tools, and GitHub&apos;s
                hosted MCP server has run end to end with each person&apos;s own GitHub sign-in.
              </p>
              <p>
                {site.version} was published on October 18, 2026, the day after v0.1.0. It is pre-1.0 software and
                hasn&apos;t run in production. Not verified yet: Claude Code, VS Code and Cursor on the 2026-07-28
                revision (it was exercised with the conformance suite, curl and the Go SDK client), a real Google or
                Microsoft provider for delegated credentials (only GitHub has run end to end), email over TLS to a real
                mail provider, the Kubernetes manifests on a real cluster (validated, not applied), and an end-to-end
                test that provider tokens are redacted from captured payloads (unit tests only). Pilot it before you
                depend on it.
              </p>
              <p>
                Limits: remote servers only (no stdio); streaming covers the progress of a tool call, with no
                server-pushed list changes or resource subscriptions; no sampling or roots relay; notifications are sent
                by one loop on one replica at a time. Next on the{" "}
                <TextLink href={site.roadmapUrl}>roadmap</TextLink> (an order of work, not a schedule): per-person
                secrets for servers that don&apos;t use OAuth, tool classification and scopes on credentials, and
                approval before sensitive calls.
              </p>
            </div>
            <p className="mt-6 text-brand-muted">
              Read the <TextLink href={site.statusUrl}>status and handoff notes</TextLink> and the{" "}
              <TextLink href={site.releaseNotesUrl}>{site.version} release notes</TextLink>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
