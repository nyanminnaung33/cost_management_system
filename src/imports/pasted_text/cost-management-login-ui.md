Create a modern enterprise login page UI design for a Japanese Cost Management System (原価管理システム).

Design Style:
- Corporate, clean, professional desktop web application
- Centered login card layout
- Desktop-first (1440px frame)
- Minimal, business-oriented UI similar to internal company systems
- Soft shadow card with rounded corners (8px)
- Neutral background gradient or light gray background
- Japanese language UI
- Accessible form spacing and clear validation feedback

Layout Structure:
- Full-page centered layout (vertical + horizontal center)
- Main container width: 420–480px
- White login card with subtle elevation
- Company logo displayed at top center
- Form fields stacked vertically
- Button row aligned right

Header Section:
- Company logo image centered
- Logo size approx 120–160px width
- Space below logo before form starts

Form Fields:
1. 担当者コード (Manager Code)
   - Text input field
   - Label above input
   - Placeholder example: 「例：M001」

2. パスワード (Password)
   - Password input
   - Masked characters
   - Label above input

Validation UI:
- Error message shown under each input
- Small red text (#D32F2F)
- Global error message displayed above form inputs

Buttons:
- Two buttons aligned horizontally

Left Button:
- Label: 「クリア」
- Secondary style
- Outline button
- Gray border

Right Button:
- Label: 「ログイン」
- Primary filled button
- Corporate blue color
- Hover + disabled states

Loading State:
- Button text changes to:
  「ログイン中...」
- Disabled appearance (reduced opacity)

Interaction States:
- Input focus highlight
- Hover states for buttons
- Error state input border (red)
- Disabled submit button while loading

Design Tokens:
- Font: Noto Sans JP or Inter
- Base font size: 14px
- Label: 13px medium weight
- Input height: 40px
- Border radius: 6px
- Spacing scale: 8px system

Color Guidelines:
- Primary: #1976D2 (corporate blue)
- Background: #F5F7FA
- Card: #FFFFFF
- Border: #DADCE0
- Error: #D32F2F
- Text primary: #222222

Component Naming (important):
Use developer-friendly names matching React classes:

login-page
login-container
login-logo-wrapper

login-form
login-form__group
login-form__label
login-form__input
login-form__button-row
login-form__button--primary
login-form__button--secondary
login-error-message

Prototype Behavior:
- Clicking ログイン → navigates to 「原価入力画面」
- クリア button resets fields
- Show validation messages when fields are empty

Output Requirements:
- Auto layout enabled
- Reusable components for inputs and buttons
- Ready for React implementation
- Clean layer hierarchy