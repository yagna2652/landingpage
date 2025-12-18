"use client";

import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-serif text-3xl tracking-[-0.04em] text-black">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-serif text-xl font-medium tracking-[-0.02em] text-black">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-6 font-serif text-[1.3rem] leading-[1.58] tracking-[-0.04em] text-[#111] antialiased">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(800).url();
      return (
        <figure className="my-8">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              width={800}
              height={450}
              className="w-full"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
