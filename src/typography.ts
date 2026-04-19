/**
 * SITE-WIDE TYPOGRAPHY & SIZING CONSTANTS
 *
 * Change values here to update sizes across every section at once.
 * Each key maps to a Tailwind responsive class string.
 *
 * Breakpoints:  base → sm(640) → md(768) → lg(1024) → xl(1280) → 2xl(1536)
 */

// ─── SECTION LEVEL ────────────────────────────────────────────────────────────
// The main h1/h2 title of each page section
export const SECTION_HEADER =
  "text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl 2xl:text-7xl font-black tracking-tighter uppercase leading-none";

// Small eyebrow text above the section header ("OUR EXPERTISE", "JOIN THE GUILD" …)
export const SECTION_LABEL =
  "text-[10px] md:text-xs xl:text-sm 2xl:text-base font-bold uppercase tracking-[0.5em]";

// Body paragraph directly under the section header
export const SECTION_DESC =
  "text-sm md:text-base lg:text-xs xl:text-sm 2xl:text-base leading-relaxed font-medium";

// ─── CARD / CONTAINER LEVEL ───────────────────────────────────────────────────
// h3 inside a card ("GAME DEVELOPMENT", "DEVELOPMENT", "UNREAL ENGINE 5" …)
export const CARD_HEADER =
  "text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg font-black uppercase tracking-wider";

// Body text inside a card
export const CARD_DESC =
  "text-[10px] md:text-xs lg:text-[10px] xl:text-xs 2xl:text-sm leading-relaxed font-medium";

// ─── BUTTONS ──────────────────────────────────────────────────────────────────
// Primary CTA buttons ("VIEW OPENINGS", "SEND MESSAGE" …)
export const BUTTON_TEXT =
  "text-[10px] md:text-xs xl:text-sm 2xl:text-base font-bold uppercase tracking-[0.3em]";

// Small tag / badge pills ("GRAND STRATEGY", "PC" …)
export const TAG_TEXT =
  "text-[8px] md:text-[9px] xl:text-[10px] 2xl:text-xs font-bold uppercase tracking-[0.2em]";

// ─── CARD ICON / IMAGE ────────────────────────────────────────────────────────
// Outer box that wraps the icon
export const CARD_ICON_BOX =
  "w-12 h-12 md:w-13 md:h-13 lg:w-11 lg:h-11 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16";

// The icon/image element itself
export const CARD_ICON =
  "w-6 h-6 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8";
