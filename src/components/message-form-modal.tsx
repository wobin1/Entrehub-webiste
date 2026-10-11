"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Send, Check } from "lucide-react";
import { submitContactForm } from "@/lib/api/client";

interface MessageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageFormModal({
  isOpen,
  onClose,
}: MessageFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      await submitContactForm(formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Auto-close after 2 seconds on success
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error: unknown) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && !isSubmitting && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-navy-deep/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-[110] max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-white shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Dialog.Close
            aria-label="Close"
            disabled={isSubmitting}
            className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Dialog.Close>

          <div className="grid md:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative hidden bg-navy-deep p-8 md:flex md:flex-col md:justify-center">
              <div className="relative z-10">
                <p className="text-3xl font-bold text-white mb-4">
                  Let&apos;s Connect
                </p>
                <p className="text-slate-300 mb-6">
                  Have a question or want to work together? Drop us a message
                  and we&apos;ll get back to you as soon as possible.
                </p>
                <ul className="space-y-3 text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check
                      className="h-4 w-4 text-orange-400"
                      aria-hidden="true"
                    />
                    Quick response time
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      className="h-4 w-4 text-orange-400"
                      aria-hidden="true"
                    />
                    Professional support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      className="h-4 w-4 text-orange-400"
                      aria-hidden="true"
                    />
                    Tailored solutions
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-6 sm:p-8">
              <Dialog.Title className="text-2xl font-bold text-slate-900 mb-2">
                Send us a message
              </Dialog.Title>
              <p className="mb-6 text-sm text-slate-600">
                Fields marked <span aria-hidden="true">*</span>
                <span className="sr-only">with an asterisk</span> are required.
              </p>

              <div role="status" aria-live="polite">
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      Message sent successfully!
                    </p>
                    <p className="text-green-700 text-sm">
                      We&apos;ll get back to you soon.
                    </p>
                  </div>
                )}
              </div>
              <div role="alert">
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">{errorMessage}</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-800 mb-2"
                  >
                    Name{" "}
                    <span className="text-red-700" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-slate-400 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-800 mb-2"
                  >
                    Email{" "}
                    <span className="text-red-700" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-slate-400 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-800 mb-2"
                  >
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-slate-400 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="+234 123 456 7890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-800 mb-2"
                  >
                    Message{" "}
                    <span className="text-red-700" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-400 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-12 bg-navy text-white font-semibold py-3 px-6 rounded-lg hover:bg-navy-hover transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
