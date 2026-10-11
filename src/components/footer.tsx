import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Our Work', href: '/#work' },
  { name: 'Blog', href: '/blog' },
];

const services = [
  'Web & App Development',
  'Social Media Marketing',
  'Email Marketing',
  'SEO',
  'Creative & Content',
];

// TODO: replace '#' with the real profile URLs
const socialMedia = [
  { name: 'Instagram', href: '#' },
  { name: 'Twitter', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Facebook', href: '#' },
];

const linkClass =
  'inline-flex min-h-9 items-center text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline';

export default function Footer() {
  return (
    <footer className="on-dark bg-navy-deep text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-10 w-10 overflow-hidden rounded-xl ring-1 ring-white/20">
                <Image src="/images/logo.jpeg" alt="" width={40} height={40} className="h-full w-full object-cover" />
              </span>
              <span className="text-xl font-bold tracking-tight">
                ENTRE<span className="text-orange-400">HUB</span>
              </span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Innovative digital marketing strategies that blend creativity and data-driven insights to elevate
              your brand&apos;s online presence and drive measurable growth.
            </p>
          </div>

          <nav aria-labelledby="footer-menu">
            <h3 id="footer-menu" className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Menu
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={linkClass}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h3 id="footer-services" className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/#services" className={linkClass}>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-social">
            <h3 id="footer-social" className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Social media
            </h3>
            <ul className="space-y-2">
              {socialMedia.map((social) => (
                <li key={social.name}>
                  <a href={social.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                    {social.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} ENTREHUB. All rights reserved.</p>
          <ul className="flex gap-6 text-sm">
            <li>
              <a href="#" className={linkClass}>
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#" className={linkClass}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
