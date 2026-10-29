# Security notes

## Residual advisory: next-auth 5.0.0-beta.28

The stack pins `next-auth` to `5.0.0-beta.28` as specified in the brief. npm reports a
critical advisory against `next-auth` for every release up to and including
`5.0.0-beta.31`. The fix ships in `5.0.0-beta.32`, which is outside the pinned range.

What has been done:

- `package.json` carries an override that forces `@auth/core` to `0.41.3`. This removes
  the critical advisory from the dependency that actually executes the auth flow, and it
  is the only auth package in the production tree that runs request handling.
- The app uses the Credentials provider only. No Email provider, no OAuth provider and no
  Bearer token verification are configured, so the four advisories that apply to those
  code paths are not reachable in this deployment.
- Email input is normalised with `NFKC` before validation and restricted to ASCII, which
  removes the homoglyph `@` bypass at the input boundary.
- Sign in grants no data access. It stores an email and display name in a signed session
  cookie for saved artisan shortlists. There is no dashboard, no billing and no personal
  record behind it.

What is left:

- The advisory record on the `next-auth` package itself keeps `npm audit` at
  `--audit-level=high` failing with one critical finding. This is documented rather than
  silenced.

Remediation when the pin is lifted:

```bash
npm install next-auth@5.0.0-beta.32 --save-exact
```

Then remove the `overrides` block if `@auth/core` resolves to a patched release on its own
and re-run `npm audit --audit-level=high`.

## Form handling

- Both form endpoints validate every field server side, cap length and reject extra large
  payloads by truncation.
- A per-IP counter in memory limits submissions to four listings or five messages a minute.
- A hidden field traps bots that fill every input.
- reCAPTCHA v3 is used when a site key is configured, with a v2 checkbox fallback and a
  local confirmation when no key exists. The server verifies v2 and v3 tokens against
  Google when a secret is configured.
- No submission is stored on the server. Each submission returns a WhatsApp hand off link
  so the message still reaches the team when no webhook is configured.

## Headers

`vercel.json` sets a Content Security Policy, HSTS, nosniff, a referrer policy, a
Permissions Policy that disables camera, microphone, geolocation, payment and USB, and
`frame-ancestors 'self'`.
