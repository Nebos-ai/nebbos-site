import type { Metadata } from "next";
import { PAGES } from "@/content/pages";
import { PageRenderer } from "@/components/site/PageRenderer";

const page = PAGES.about;

export const metadata: Metadata = {
  title: page.title,
  description: page.metaDescription,
};

export default function AboutPage() {
  return <PageRenderer page={page} />;
}
