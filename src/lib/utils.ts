import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
const MONTHS_FULL = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${MONTHS_FULL[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatDateUppercase(dateString: string): string {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Platform name formatting for guides
const PLATFORM_NAMES: Record<string, string> = {
  raycast: "Raycast",
  cursor: "Cursor",
  "claude-code": "Claude Code",
  chatgpt: "ChatGPT",
  windsurf: "Windsurf",
  "claude-ai": "Claude.ai",
  poe: "Poe",
  other: "Other",
};

export function formatPlatform(platform: string): string {
  return PLATFORM_NAMES[platform] || platform;
}

// Read time calculation utility
/**
 * Calculates estimated reading time based on word count
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadTime(text: string | undefined): string {
  if (!text) return '1 min read';

  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return `${minutes} min read`;
}
