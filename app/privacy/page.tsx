import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Plastex Maroc handles information sent through this website.",
  alternates: { canonical: "/privacy/" },
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
        The website itself has no account registration or contact form. Its
        hosting provider may process standard technical data, such as IP address
        and request logs, to deliver and secure the site.
      </p>
      <h2>Sharing and retention</h2>
      <p>
        We share enquiry information only as needed to respond and conduct our
        business, or when required by law. We keep correspondence for as long as
        needed for those purposes and applicable obligations.
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
