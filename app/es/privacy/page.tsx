import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Plastex Maroc handles information sent through this website.",
  alternates: { canonical: "/es/privacy/", languages: { fr: "/privacy/", en: "/es/privacy/" } },
};
export default function PrivacyPage() {
  return (
    <article className="legal-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> LEGAL
      </div>
      <h1>
        Privacy policy<span className="period">.</span>
      </h1>
      <p className="legal-date">Last updated 16 November 2026</p>
      <h2>Information you send us</h2>
      <p>
        If you contact us by email, we receive the information you choose to
        provide, such as your name, business contact details, product
        requirements, and message. We use it to respond to your enquiry and
        manage related business correspondence.
      </p>
      <h2>Website operation</h2>
      <p>
        The website has no account registration. Its hosting provider may process
        standard technical data, such as IP address and request logs, to deliver
        and secure the site.
      </p>
      <h2>Career applications</h2>
      <p>
        If you apply through the careers page, we store your contact details,
        answers, and CV privately for recruitment review. The site extracts
        searchable text and work-related keyword hints from the CV. These hints
        do not decide whether you are selected; a person reviews applications.
        Contact us to ask about your application data or request deletion.
      </p>
      <h2>Sharing and retention</h2>
      <p>
        We use enquiry and application information only for the purpose for which
        it was submitted, or when required by law. Recruitment applications are
        kept in private server storage until reviewed and removed by our team.
        We keep business correspondence for as long as needed for its purpose
        and applicable obligations.
      </p>
      <h2>Your questions</h2>
      <p>
        To ask about your information or request a correction or deletion where
        applicable, email{" "}
        <a href="mailto:commercial@plastexmaroc.com">
          commercial@plastexmaroc.com
        </a>
        .
      </p>
    </article>
  );
}
