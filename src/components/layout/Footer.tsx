import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Send } from 'lucide-react';
import Container from './Container';

const SHOP_LINKS = [
  { label: "Men's", href: '/shop/men' },
  { label: "Women's", href: '/shop/women' },
  { label: 'Unisex', href: '/shop/unisex' },
  { label: 'New Drops', href: '/shop?filter=new' },
  { label: 'Under ₹499', href: '/shop?budget=499' },
];

const HELP_LINKS = [
  { label: 'About THRIFTVERSE', href: '/about' },
  { label: 'Curators', href: '/curators' },
  { label: 'How It Works', href: '/about#how-it-works' },
  { label: 'Sizing Guide', href: '/about#sizing' },
  { label: 'Contact', href: '/about#contact' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Twitter / X', href: '#', icon: Twitter },
  { label: 'YouTube', href: '#', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-ink-800 border-t-0">
      {/* Section divider top edge */}
      <div className="section-divider" />

      <Container className="py-12 lg:py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1: Brand + Newsletter */}
          <div className="xs:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-block font-display text-4xl text-stark tracking-wider hover:text-crimson transition-colors"
              aria-label="THRIFTVERSE — Go to homepage"
            >
              THRIFTVERSE
            </Link>
            <p className="mt-3 font-sans text-sm text-stark-dim leading-relaxed">
              One-of-one thrift drops curated by obsessives.
              No fast fashion. No fakes. Just heat.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="font-mono text-xs text-vibranium uppercase tracking-[.2em] mb-3">
                Join the Vault
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-0 comic-border"
                aria-label="Newsletter signup"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="flex-1 min-w-0 bg-ink px-3 py-2.5 text-sm text-stark placeholder:text-stark-dim
                             border-0 outline-none focus:ring-0 font-sans"
                  required
                />
                <button
                  type="submit"
                  className="btn-comic px-3 py-2 rounded-none border-l-[3px] border-l-black
                             shadow-none active:shadow-none"
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={14} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <h3 className="font-cond font-bold text-base text-stark uppercase tracking-widest mb-4">
              Shop
            </h3>
            <nav aria-label="Footer shop links">
              <ul className="space-y-2.5">
                {SHOP_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-sans text-sm text-stark-dim hover:text-stark hover:underline
                                 underline-offset-2 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3: Help */}
          <div>
            <h3 className="font-cond font-bold text-base text-stark uppercase tracking-widest mb-4">
              Help
            </h3>
            <nav aria-label="Footer help links">
              <ul className="space-y-2.5">
                {HELP_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-sans text-sm text-stark-dim hover:text-stark hover:underline
                                 underline-offset-2 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4: Social */}
          <div>
            <h3 className="font-cond font-bold text-base text-stark uppercase tracking-widest mb-4">
              Follow the Drops
            </h3>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 font-sans text-sm text-stark-dim
                               hover:text-vibranium transition-colors min-h-[44px]"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t-[3px] border-black">
        <Container className="py-4 flex flex-col xs:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-stark-dim text-center xs:text-left">
            © {new Date().getFullYear()} THRIFTVERSE. All rights reserved.
          </p>
          <p className="font-mono text-xs text-stark-dim text-center xs:text-right">
            Thrift smart. Dress loud. One of one.
          </p>
        </Container>
      </div>
    </footer>
  );
}
