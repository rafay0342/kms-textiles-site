---
name: verify
description: Build/launch/drive recipe for verifying changes to the KMS Textiles static site and its server.
---

# Verifying kms-textiles-site

Static React site (prebuilt `dist/` is committed) served by the hand-rolled `server.mjs`.
No test suite — verify at the HTTP surface.

## Launch (mirrors production)

```bash
PORT=20115 HOST=127.0.0.1 NODE_ENV=production pnpm start
# ready when it logs: KMS Textiles server listening on 127.0.0.1:20115
```

Production (Airo PaaS) runs exactly `NODE_ENV=production pnpm start` with PORT/HOST injected.
`dist/` is committed, so no build step is needed to serve; `pnpm install && pnpm run build`
regenerates it after `src/` changes.

## Drive

- Happy paths: `/` (text/html), `/assets/*.js`, `/images/*.png`, unknown path → SPA fallback 200.
- Hostile requests (server must answer AND stay up): `/%`, `/%zz`, `/a%` → 400;
  `--path-as-is /../../etc/passwd` and `/..%2f..%2fetc%2fpasswd` → index.html, never file contents;
  5000-char path → 200 SPA fallback.
- Aborted downloads: loop `curl --max-time 0.05 --limit-rate 1K /images/<biggest>.png`,
  then compare `ls /proc/<pid>/fd | wc -l` before/after — must not grow.
- Shutdown: `kill -TERM` must end the `pnpm start` wrapper with exit code 0, within ~5s even
  with a stuck half-sent request held open (hard-exit fallback in server.mjs).

## Gotchas

- `pgrep -f 'node server.mjs'` matches your own shell's command line and self-kills the
  session — always use `pgrep -fx 'node server.mjs'`.
- Loopback socket buffers swallow ~1MB files instantly, so "in-flight download" tests go
  idle server-side; use a half-sent request (partial headers/body over a raw socket) to
  hold a genuinely active connection.
