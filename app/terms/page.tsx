import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Plastex Maroc website.",
  alternates: { canonical: "/terms/" },
};
export default function TermsPage() {
  return (
    <article className="legal-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> LEGAL
      </div>
      <h1>
        Terms of use<span className="period">.</span>
      </h1>
      <p className="legal-date">Last updated 16 November 2026</p>
      <h2>Website information</h2>
      <p>
        This website presents Plastex Maroc and its products for general
        information. Product descriptions may change. Confirm specifications,
        availability, pricing, and suitability with our commercial team before
        placing an order.
      </p>
      <h2>Use of content</h2>
      <p>
        Website text, graphics, and branding belong to Plastex Maroc or their
        respective rights holders. You may view this content for your own
        business evaluation. Reproduction or commercial reuse requires prior
        written permission.
      </p>
      <h2>Enquiries</h2>
      <p>
        Sending an enquiry does not create a purchase contract. Any supply
        agreement depends on a separate quotation and agreed commercial terms.
      </p>
      <h2>External links</h2>
      <p>
        Links to external websites are provided for convenience. Their content
        and practices are governed by their respective operators.
      </p>
      <h2>Contact</h2>
      <p>
        For questions about this website, email{" "}
        <a href="mailto:commercial@plastexmaroc.com">
          commercial@plastexmaroc.com
        </a>
        .
      </p>
    </article>
  );
}
