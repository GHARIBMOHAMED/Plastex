import type { Metadata } from "next";
import CareerReview from "./review-client";

export const metadata: Metadata = { title: "Examen des candidatures", robots: { index: false, follow: false } };

export default function CareerReviewPage() {
  return <CareerReview />;
}
