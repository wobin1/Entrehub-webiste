'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import MessageFormModal from './message-form-modal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const whatsappNumber = '+2348123456789'; // Random Nigerian WhatsApp number
const whatsappMessage = "Hello ENTREHUB! I'm interested in your digital marketing services. Can we discuss my project?";
const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [showMessageForm, setShowMessageForm] = useState(false);

  const closeAll = () => {
    setShowMessageForm(false);
    onClose();
  };

  return (
    <>
      <Dialog.Root open={isOpen && !showMessageForm} onOpenChange={(open) => !open && closeAll()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-navy-deep/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <Dialog.Close
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>

            <div className="p-6 pb-4 sm:p-8 sm:pb-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-10 w-10 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <Image src="/images/logo.jpeg" alt="" width={40} height={40} className="h-full w-full object-cover" />
                </span>
                <Dialog.Title className="text-xl font-bold text-slate-900">Contact ENTREHUB</Dialog.Title>
              </div>
              <Dialog.Description className="leading-relaxed text-slate-600">
                Ready to transform your digital presence? Get in touch with us today and let&apos;s discuss your project.
              </Dialog.Description>
            </div>

            <ul className="space-y-3 px-6 sm:px-8">
              <li>
                <a
                  href="tel:+2348129721560"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-navy/25 hover:bg-navy-tint/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-tint text-navy" aria-hidden="true">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-slate-600">Phone</span>
                    <span className="block font-semibold text-slate-900">+234 812 972 1560</span>
                  </span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setShowMessageForm(true)}
                  className="flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition-colors hover:border-navy/25 hover:bg-navy-tint/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-tint text-navy" aria-hidden="true">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-slate-600">Email</span>
                    <span className="block font-semibold text-slate-900">info@entrehubng.com</span>
                  </span>
                </button>
              </li>
              <li className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-tint text-navy" aria-hidden="true">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-slate-600">Location</span>
                  <span className="block font-semibold text-slate-900">Kaduna, Nigeria</span>
                </span>
              </li>
            </ul>

            <div className="space-y-3 p-6 sm:p-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 font-semibold text-white shadow-sm transition-colors hover:bg-green-800"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>

              <button
                type="button"
                onClick={() => setShowMessageForm(true)}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 font-semibold text-white shadow-sm transition-colors hover:bg-navy-hover"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
                Send us a message
              </button>

              <p className="pt-1 text-center text-sm text-slate-600">
                We typically respond within 30 minutes during business hours.
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <MessageFormModal isOpen={isOpen && showMessageForm} onClose={closeAll} />
    </>
  );
}
