import Image from 'next/image';
import Script from 'next/script';
import EmailSignup from './components/EmailSignup';

const SERVICES = [
  {
    label: 'Video Production',
    desc: 'End-to-end production for brands, campaigns, and stories that demand to be seen.',
  },
  {
    label: 'Filmmaking',
    desc: 'Narrative and documentary work built on craft, from pre-production through post.',
  },
  {
    label: 'Event Videography',
    desc: 'Live events and personal milestones captured with the attention they deserve.',
  },
  {
    label: 'Web Design & Dev',
    desc: 'Custom sites built from scratch — no templates, no shortcuts.',
  },
];

export default function Home() {
  return (
    <main className="bg-black text-white font-sans">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between px-8 md:px-16 pt-10 pb-16 overflow-hidden">

        {/* Texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/Textures/noise-texture-background-with-gradient-colors-digital-grainy-gradient-post-template.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
            opacity: 0.1,
          }}
        />

        {/* Thin grid lines — decorative */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/Desvelo_Logo1.jpeg"
            alt="Desvelo"
            width={160}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-auto">
          {/* Pattern break: the period is blue */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight uppercase max-w-4xl">
            We lose sleep so your content doesn&apos;t
            <span className="text-highlight">.</span>
          </h1>
          {/* Thick blue rule */}
          <div className="mt-8 h-1 w-24 bg-highlight" />
          <p className="mt-6 font-mono text-sm uppercase tracking-widest text-white/60">
            New York City &nbsp;/&nbsp; Santiago, Chile
          </p>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="bg-white text-black px-8 md:px-16 py-20 border-t-4 border-highlight">
        <p className="font-mono text-xs uppercase tracking-widest text-highlight mb-10">
          What we do
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 border-l-2 border-t-2 border-black">
          {SERVICES.map((s, i) => (
            <div
              key={s.label}
              className={`border-r-2 border-b-2 border-black p-6 ${
                // Pattern break: third cell gets an extra-thick top border
                i === 2 ? 'border-t-[3px]' : ''
              }`}
            >
              <div className="h-1 w-8 bg-highlight mb-4" />
              <h2 className="font-mono text-xs uppercase tracking-widest mb-3">{s.label}</h2>
              <p className="text-sm leading-relaxed text-black/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────── */}
      <section className="bg-black py-20 border-t-4 border-highlight">
        <p className="font-mono text-xs uppercase tracking-widest text-highlight mb-10 px-8 md:px-16">
          Selected Work
        </p>
        <div className="border-y-2 md:mx-16 md:border-2 border-highlight">
          <div className="relative pt-[177.78%] md:pt-[56.25%]">
            <iframe
              src="https://player.vimeo.com/video/1087396555?h=92d92e82e7&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="irene_dpreel_homepage"
            />
          </div>
          <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative bg-black px-8 md:px-16 py-24 border-t-4 border-white overflow-hidden">

        {/* Texture overlay — film grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/Textures/close-up-film-texture-details.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
            opacity: 0.12,
          }}
        />

        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-4">
            Stay in the loop
          </h2>
          <p className="font-mono text-sm text-white/60 mb-8 uppercase tracking-widest">
            Sign up for emails. We won&apos;t spam.
          </p>
          <EmailSignup />
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-black border-t-4 border-highlight px-8 md:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* Left */}
          <div>
            <Image
              src="/Desvelo_Logo1.jpeg"
              alt="Desvelo"
              width={100}
              height={38}
              className="object-contain mb-4"
            />
            <p className="font-mono text-xs text-white/40 uppercase tracking-widest max-w-xs">
              Creative media agency.<br />We lose sleep so your content doesn&apos;t.
            </p>
          </div>

          {/* Right */}
          <div className="font-mono text-xs uppercase tracking-widest text-white/60 space-y-2">
            <p>New York City, USA</p>
            <p>Santiago, Chile</p>
            <a
              href="mailto:contact@desvelo.com"
              className="block text-highlight hover:text-white transition-colors duration-150"
            >
              contact@desvelo.com
            </a>
          </div>
        </div>

        <p className="mt-12 font-mono text-xs text-white/20 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Desvelo
        </p>
      </footer>

    </main>
  );
}
