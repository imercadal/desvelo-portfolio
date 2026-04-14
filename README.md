# Desvelo — Creative Media Agency

> We lose sleep so your content doesn't.

Portfolio and marketing site for Desvelo, a creative agency based in New York City (with operations in Santiago, Chile) specializing in video production, filmmaking, event videography, and custom web design.

---

## Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Chat**: n8n-powered AI widget via `@n8n/chat`
- **Email capture**: n8n webhook → Google Sheets

---

## Getting Started

**Prerequisites**: Node.js 18+, npm

```bash
git clone https://github.com/imercadal/desvelo-portfolio.git
cd desvelo-portfolio
npm install
```

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_N8N_WEBHOOK_URL="https://imercadal.app.n8n.cloud/webhook/03f84ff4-e680-4200-8162-c7f2aaab2d74/chat"> (publicly available)
NEXT_PUBLIC_EMAIL_WEBHOOK_URL
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | n8n chat webhook for the AI assistant widget |
| `NEXT_PUBLIC_EMAIL_WEBHOOK_URL` | n8n webhook that appends emails to a Google Sheet |

---

## Design System

- **Accent color**: `#005EFF` — use Tailwind classes `text-highlight`, `bg-highlight`, `border-highlight` (never hardcode the hex)
- **No rounded corners**: all UI is hard-angled; `rounded-*` classes are not used
- **Typography**: Geist Sans for body/display, Geist Mono for labels and UI chrome
- **Textures**: applied as absolute overlays with `mix-blend-mode: overlay` at 8–15% opacity; source images are in `public/Textures/`
- **Pattern break rule**: each section contains one intentional small imperfection (e.g. one border 3px thicker than the rest)

---

## Project Structure

```
desvelo-portfolio/
├── app/
│   ├── components/
│   │   ├── EmailSignup.tsx        # Email capture form
│   │   ├── N8nChatLoader.tsx      # Dynamic loader for chat widget (SSR-safe)
│   │   ├── N8nChat.tsx            # n8n chat initialization
│   │   └── n8n-chat-overrides.css # Brand color overrides for chat widget
│   ├── globals.css                # Tailwind config + design tokens
│   ├── layout.tsx                 # Root layout + metadata
│   └── page.tsx                   # Home page
├── public/
│   ├── Desvelo_Logo1.jpeg
│   └── Textures/
└── .env.local                     # Not committed — see Environment Variables
```

---

## Contact

contact@desvelo.com
