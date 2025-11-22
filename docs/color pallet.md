🎨 Bảng màu chính (Final Version)
Tên màu	HEX	Gợi ý sử dụng
Xanh teal	#2CA6AF	Màu chủ đạo, button, menu, highlight
Xanh navy	#00253A	Header, footer, nền tối, text đậm
Trắng	#FFFFFF	Nền chính, card, nội dung
Cam đậm	#EE6644	CTA, accent, icon nổi bật
Đỏ tươi	#DB1328	Cảnh báo, alert, error
Xám nhạt	#E6EDF0	Background phụ, border, section

Tone & cảm giác: hiện đại, đáng tin cậy, clean, phù hợp lĩnh vực pet + health info.

📌 PROMPT — Apply Color System to Entire Website (Updated)
You are a UI/UX implementation assistant. Apply the following brand color system across the entire website. Do not change layout, spacing, typography, or content. Only apply and standardize colors. Maintain strong visual hierarchy and high contrast.

COLOR SYSTEM (PetMatchr):
Primary (Teal): #2CA6AF             // Main brand, buttons, menus
Dark Base (Navy): #00253A           // Header, footer, dark background, strong titles
White: #FFFFFF                      // Main background, cards, content areas
Accent Orange: #EE6644              // CTA, highlights, clickable elements
Alert Red: #DB1328                  // Warning, danger, error states
Light Gray: #E6EDF0                 // Secondary background, borders, neutral sections

USAGE RULES:
- Global background: #FFFFFF or #E6EDF0 only.
- Header + footer: #00253A with white text.
- Primary buttons: background #2CA6AF, text #FFFFFF; hover darken teal 12–15%.
- Secondary buttons: background #00253A, text #FFFFFF; hover lighten navy ~8%.
- Accent orange used only for CTAs, icons, link emphasis—not body text.
- Alerts must use #DB1328 for key highlights with white text or light-gray background.

ACCESSIBILITY REQUIREMENTS:
- Text on light backgrounds: #00253A only.
- Text on navy backgrounds: #FFFFFF or #E6EDF0 only.
- Minimum contrast: WCAG AA (4.5:1) or auto-correct color to pass contrast.
- Remove medium gray text; avoid low-opacity UI elements.

UI ELEMENT GUIDELINES:
- Inputs: White background, border #E6EDF0, text #00253A, focus ring teal.
- Cards: White background, subtle shadow, navy headings.
- Links: Teal, underline on hover, darken slightly on hover.
- Icons: Orange for calls-to-action, teal for informational, red only for warnings.

OUTPUT FORMAT REQUIRED:
1. Updated CSS variables (`:root`)
2. Tailwind theme config (`extend.colors`)
3. Example UI application:
   - Navbar
   - Hero section
   - Card grid
   - CTA section
   - Alert component