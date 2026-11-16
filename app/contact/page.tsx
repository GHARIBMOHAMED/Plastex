import type { Metadata } from "next";
import { Arrow } from "../components";

export const metadata: Metadata = {
  title: "Contact Our Commercial Team",
  description:
    "Contact Plastex Maroc in Tangier about brake discs, clutch discs, brake drums, and international sourcing enquiries.",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <section className="inner-page contact-page container">
      <div className="eyebrow dark">
        <span className="eyebrow-line" /> GET IN TOUCH
      </div>
      <h1>
        LET’S TALK
        <br />
        <em>COMPONENTS.</em>
      </h1>
      <div className="contact-layout">
        <div>
          <p className="large-copy">
            Tell us about your application, part reference, expected volume, and
            destination market. Our commercial team can take the conversation
            from there.
          </p>
          <a
            className="button-dark"
            href="mailto:commercial@plastexmaroc.com?subject=Product%20enquiry%20%7C%20Plastex%20Maroc"
          >
            Email our team <Arrow diagonal />
          </a>
        </div>
        <div className="contact-details">
          <div>
            <span>EMAIL</span>
            <a href="mailto:commercial@plastexmaroc.com">
              commercial@plastexmaroc.com
            </a>
          </div>
          <div>
            <span>PHONE</span>
            <a href="tel:+212539351136">+212 539 351 136</a>
          </div>
          <div>
            <span>LOCATION</span>
            <p>
              Z.I. Route de Tétouan, lot 46
              <br />
              90000 Tangier, Morocco
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
