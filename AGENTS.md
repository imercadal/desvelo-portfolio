<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Design system

- **Accent color**: `--highlight: #005EFF` in `app/globals.css`. Use Tailwind classes `text-highlight`, `bg-highlight`, `border-highlight` — never hardcode `#005EFF`.
- **No rounded corners**: Do not use any `rounded-*` Tailwind classes. All UI is hard-angled.
- **Texture overlays**: Applied as `position: absolute; inset: 0; mix-blend-mode: overlay; opacity: 0.08–0.15; pointer-events: none`. Source images are in `public/Textures/`.
- **Typography**: Geist Sans for body/display, Geist Mono for labels, metadata, and UI chrome.
- **Pattern break rule**: Each section should contain one small intentional imperfection (e.g. one element slightly offset, one border 1px thicker than the rest). This is intentional per the brand brief.

## Tailwind 4 cache gotcha

If a CSS variable color change doesn't appear in the browser, delete `.next/` and restart the dev server. Tailwind 4 can serve a stale build.

## CSS variable → Tailwind mapping

All theme tokens live in `app/globals.css` under `@theme inline`. To add a new color token: add it to `:root` and map it as `--color-<name>: var(--<name>)` in the `@theme inline` block. It will then be available as `text-<name>`, `bg-<name>`, `border-<name>`.

## Third-party scripts

Use `next/script` with `strategy="lazyOnload"` for any non-critical third-party scripts (e.g. Vimeo player.js). Do not use bare `<script>` tags in JSX.

**`next/script` does not support `type="module"` with ESM `import` statements.** For module scripts that use CDN imports, inject a `<script type="module">` tag manually in `useEffect` instead.

## Vue-based npm packages (e.g. `@n8n/chat`)

Importing Vue packages directly in Next.js causes a `'ownKeys' on proxy` error at module evaluation time — even inside `'use client'` components — because Next.js analyzes imports server-side.

**Pattern to use:**
1. Create a `'use client'` loader component that wraps the import with `next/dynamic` + `ssr: false`:
   ```tsx
   // e.g. app/components/N8nChatLoader.tsx
   'use client';
   import dynamic from 'next/dynamic';
   const N8nChat = dynamic(() => import('./N8nChat'), { ssr: false });
   export default function N8nChatLoader() { return <N8nChat />; }
   ```
2. Import the loader (not the Vue component) in `layout.tsx` or any server component.
3. **Do not** use `dynamic(..., { ssr: false })` directly inside `layout.tsx` — it is not allowed there.

## Overriding third-party CSS variables

CSS custom property declarations in `:root` follow cascade order — the last declaration wins. To override a third-party package's default `:root` variables, import the package CSS **before** your overrides **in the same file**:

```css
/* app/components/my-overrides.css */
@import 'third-party/style.css'; /* their defaults */
/* then your :root overrides below — these win */
:root { --their-var: your-value; }
```

Do **not** put the package `@import` in `globals.css` using a bare npm specifier — PostCSS cannot resolve those. Keep it as a side-effect import in the component file, and pair it with a local overrides CSS file imported immediately after.

## Email signup

`app/components/EmailSignup.tsx` POSTs `{ email }` to the n8n webhook at `NEXT_PUBLIC_EMAIL_WEBHOOK_URL` (`.env.local`). The workflow appends the email and a timestamp to a Google Sheet.

## Analytics

Umami analytics is loaded in `app/layout.tsx` via `next/script` with `strategy="afterInteractive"`. It auto-tracks page views — no custom event calls needed unless adding explicit tracking. Configured via two env vars in `.env.local`:

- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` — the Umami script endpoint (e.g. `https://cloud.umami.is/script.js`)
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — the site's unique ID from the Umami dashboard
