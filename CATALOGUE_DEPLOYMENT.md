# Partner catalogue deployment

The catalogue is a server-rendered part of the existing Next.js site. It cannot run from the previous static `out/` hosting setup. Keep the public site and the catalogue in one Next.js process, behind HTTPS on the Plastex domain. The catalogue uses PostgreSQL and a separate Crawlee worker.

## VPS staging

1. Copy the repository to a staging host with Docker Compose. Copy `.env.catalogue.example` to `.env`, set the same strong URL-safe password in `POSTGRES_PASSWORD` and `DATABASE_URL`, and keep `.env` private. Put the staging site behind your existing HTTPS reverse proxy pointing at `127.0.0.1:3000`.
2. Run `docker compose -f docker-compose.catalogue.yml up --build -d`. The migration service creates the tables before the web and worker services start. Back up the PostgreSQL volume and the `catalogue_uploads` volume together.
3. Create the first administrator with a one-off command, passing credentials through a secure shell session:

   ```bash
   docker compose -f docker-compose.catalogue.yml run --rm \
     -e BOOTSTRAP_ADMIN_EMAIL='admin@example.com' \
     -e BOOTSTRAP_ADMIN_PASSWORD='replace-with-a-unique-long-password' \
     web npm run catalogue:bootstrap
   ```

4. Sign in at `/catalogue/login/`, add individual partner accounts, and create draft products using **Plastex** part numbers, approved OE codes, specifications, fitments, localized text, and owned photos. Only **Approuver et publier** makes a record visible. Edits to a published product remain private until it is approved again.
5. Start the RN2255V source crawl from **Sources et rapprochements**. Review extracted references, specifications, applications, and source date. A reviewed proposal remains evidence only: update the relevant Plastex draft and publish it explicitly. The worker reads at most one permitted catalogue URL at a time. It tries JNBK first. A NiBK URL requires a previously staged JNBK record with the same supplier code, category, and an overlapping OE reference.

The RN2255V page was fetched successfully with `CheerioCrawler` during development; its source markup exposed six VAG OE references and twelve specification fields. The source is advisory, and none of these values were published as Plastex facts. If another page requires JavaScript, the worker uses `PlaywrightCrawler` after the HTML response has no usable catalogue content. It respects robots.txt, uses no access bypass, and records failures in the admin screen.

## Access and indexing

- Partner and admin sessions use server-side random tokens in HttpOnly cookies. Deactivating a user deletes their sessions. The catalogues in French, English and Spanish, their product routes, photos, and all product APIs require authentication. Admin APIs also require the administrator role and same-origin mutations.
- Catalogue pages are `noindex`, omitted from `sitemap.xml`, and disallowed in `robots.txt`. Search engines may still discover login links, but they cannot receive catalogue content.
- Do not expose PostgreSQL to the public internet. Keep the reverse proxy on HTTPS and maintain database and photo backups. The existing `.openai/hosting.json` remains a static hosting configuration for the older host; it is not suitable for this dynamic catalogue.

## Checks before public launch

Run `npm run test:catalogue`, `npm run build`, and a staging smoke test. On staging, verify partner sign-in and revocation, admin-only endpoints, unpublished product invisibility, approval and draft revisions, all three locales, mobile layout, photo access, and the contact link with `?part=...`. Check `robots.txt` and `sitemap.xml`. Run one deliberately invalid supplier URL and confirm the crawl reports a failure without changing a product. Launch only after Plastex reviews the first records.
