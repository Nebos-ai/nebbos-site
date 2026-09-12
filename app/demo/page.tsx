import type { Metadata } from "next";
import { PAGES } from "@/content/pages";
import { PageRenderer } from "@/components/site/PageRenderer";
import { BookDemoForm } from "@/components/forms/BookDemoForm";

const page = PAGES.demo;

// BookDemoForm serves as the hero surface — skip the redundant paper-hero
// section from PAGES.demo so the visitor lands on the form, not on text.
const pageWithoutHero = {
  ...page,
  sections: page.sections.filter((s) => s.id !== "hero"),
};

export const metadata: Metadata = {
  title: page.title,
  description: page.metaDescription,
};

export default function DemoPage() {
  return (
    <>
      <BookDemoForm />
      <PageRenderer page={pageWithoutHero} />
    </>
  );
}
