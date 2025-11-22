You are a UI/UX implementation assistant. Redesign the entire UI styling of the website according to the screenshots. Do not change layout, routing, typography scale, or content. Only update colors, contrast, backgrounds, card styling, spacing, and hierarchy.

MAIN OBJECTIVE:
Fix readability, contrast, visual hierarchy, button clarity, section separation, and remove teal-colored body text.

-------------------------------------
STRICT COLOR ROLES
-------------------------------------

Primary (Teal): #2CA6AF
→ buttons, CTAs, interactive elements, links, menu highlights

Dark Navy: #00253A
→ ALL headings + body text + card titles + meta headers

White: #FFFFFF
→ card background, main content blocks

Light Gray: #E6EDF0
→ secondary background, section separators, borders

Accent Orange: #EE6644
→ highlights, icons, micro-CTAs, emphasis (not text paragraphs)

Alert Red: #DB1328
→ warnings, errors, emergency notices only

-------------------------------------
TEXT HIERARCHY (FIX LEGIBILITY)
-------------------------------------

- Body text: color #00253A with at least 90% opacity
- No teal text for long paragraphs
- Category labels like “ANXIETY”, “COST” should be navy or muted navy (#284657), NOT teal
- Font-weight for titles: 700–800 to increase presence
- Minimum contrast: WCAG AA (4.5:1), auto-darken if needed

-------------------------------------
BACKGROUND & LAYERING (FIX BLENDING)
-------------------------------------

Current issue: cards blend into background.

UPDATE TO:

Page background (global): #F9FBFD

Card:
  background: #FFFFFF
  border: 1px solid #D3E2E7
  shadow: 0 10px 25px rgba(0, 37, 58, 0.06)
  text: #00253A
  radius: 18px

Alternate sections:
  use #F9FBFD or #E6EDF0 consistently to create spacing

-------------------------------------
BUTTONS (FIX LOW VISIBILITY)
-------------------------------------

PRIMARY BUTTON:
  bg: #2CA6AF
  text: #FFFFFF
  border: none
  hover: darken teal by 12–15%
  radius: 9999px

SECONDARY BUTTON:
  bg: #00253A
  text: #FFFFFF
  hover: lighten navy ~10%

OUTLINE BUTTON (ghost):
  bg: transparent
  border: 1.5px solid #2CA6AF
  text: #00253A or #2CA6AF
  hover: light gray background

CRITICAL RULE:
Do not allow teal text on teal background.

-------------------------------------
USE OF ORANGE
-------------------------------------

Orange (#EE6644) must be used for:
- Highlight icons
- Small text labels (e.g., “POPULAR” tag alternative)
- Important links and callouts
NOT for:
- Body text
- Large headers
- Card backgrounds

-------------------------------------
SPACING & VISUAL BREATHING
-------------------------------------

- Section padding: min 48px top + bottom
- Card padding: min 24–32px
- Increase vertical whitespace between groups to create clarity

-------------------------------------
OUTPUT FORMAT REQUIRED
-------------------------------------

1. Updated global CSS tokens (:root variables)
2. Updated Tailwind config with new colors and utilities
3. Updated classnames across components
4. Updated sample components:
   - Card
   - Primary Button
   - Secondary Button
   - Tag/Badge (POPULAR, COST, ANXIETY)
   - Section wrapper
   - Hero block

Return code in full.
