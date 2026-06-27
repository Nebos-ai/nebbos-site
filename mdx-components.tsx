import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Maps MDX elements onto the
// marketing prose styles (see .prose in app/globals.css).
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
