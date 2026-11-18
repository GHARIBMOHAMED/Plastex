# Careers setup

The careers page is at `/careers/`. The private review screen is at `/careers/review/`.

## Run locally

Run `npm run dev` or `npm run build` followed by `npm run start`. Applications are saved in `.local-applications/` under the project root. This directory and `.env.local` are ignored by Git. Back up the application directory as private recruitment data; do not serve or commit it.

An admin token was generated in `.env.local` as `RECRUITMENT_ADMIN_TOKEN`. Enter that token on the review screen to load applications. Keep it private and set a new strong token in the deployment environment. The review screen can filter by area, extracted work-related capability tags, and free text from CVs and answers. No application is rejected or ranked automatically.

## Publish vacancies

The confirmed **Comptable Confirmé(e)** and **Chargé(e) de Logistique** vacancies in Tanger are published in `app/careers/jobs.ts`. Add future roles to that file with a stable `id`, title, location, summary, and requirements. Employment type is optional until confirmed. The form still accepts general applications. Do not add `JobPosting` structured data for draft roles.

## CV handling

The form accepts PDF and DOCX files up to 5 MB. Text extraction can fail for scans, images, or protected files; these appear as **needs manual review** in the review screen. The original CV is retained for a person to inspect. Delete application folders when no longer needed or when a valid deletion request is handled.

The local file store requires a persistent writable disk and a running Next.js server. Static hosting and ephemeral serverless file systems are unsuitable for this setup. Before public deployment, arrange persistent private storage, HTTPS, backups, a retention schedule, and a review of recruitment data obligations.
