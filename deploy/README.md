# Static nginx deploy

`next build` writes the site to `out/` because `output: "export"` is set in `next.config.ts`. Copy `out/` to the nginx root. The origin does not run Node.

`deploy/nginx/zhenhua.lu.conf` is the origin server block:

- `try_files $uri $uri.html $uri/ =404` so `/projects` serves `projects.html` and `/projects.txt` (client flight data) is served as a file
- `location = /home` returns `301` to `https://zhenhua.lu/` (static export does not apply `redirects()`)
- `rewrite ^/(.+)/$` sends `/projects/` to `/projects` so `try_files` can find `projects.html`
- security and cache headers copied from `next.config.ts` `headers()`
- `www.zhenhua.lu` returns `301` to `https://zhenhua.lu$request_uri`

Cloudflare proxy stays enabled on `@` and `www`. This repo does not change DNS. While the origin listens only on port 80, set Cloudflare SSL/TLS to Flexible. Do not add an origin HTTP-to-HTTPS redirect; `$scheme` is `http` behind the proxy and that redirect loops.

`/api/og` is prerendered once at build time. Static export cannot read `?title=`, and no page calls that query. Open Graph and Twitter images stay on `/images/suoluetu.webp`. nginx serves `/api/og` as `image/png`.
