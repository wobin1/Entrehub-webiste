'use client';

import { useEffect, useState } from 'react';
import { Check, Facebook, Link2, Linkedin, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

const linkClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-navy hover:bg-navy hover:text-white';

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => setUrl(window.location.href), []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets = [
    { name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'X (Twitter)', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context); fail quietly
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="font-semibold text-slate-800">Share this article</p>
      <ul className="flex gap-2">
        {targets.map(({ name, icon: Icon, href }) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`Share on ${name} (opens in a new tab)`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copyLink} className={linkClass} aria-label="Copy link to this article">
            {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Link2 className="h-5 w-5" aria-hidden="true" />}
          </button>
        </li>
      </ul>
      <span role="status" className="text-sm text-slate-600">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}
