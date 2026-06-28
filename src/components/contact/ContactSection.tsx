import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { trackFormSubmission, trackWhatsAppClick } from '../../lib/analytics/ga4';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const EDGE_FN_URL = `${SUPABASE_URL}/functions/v1/submit-lead`;

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '918421504028';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello, I would like to know more about your consultancy services.',
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const INITIAL_FORM = {
  full_name: '',
  business_name: '',
  phone: '',
  email: '',
  service: 'FSSAI Licensing',
  message: '',
  website: '', // honeypot — hidden from users, bots fill it
};

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate_limit'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(EDGE_FN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.status === 429) {
        setSubmitStatus('rate_limit');
        return;
      }

      if (!response.ok || result.error) {
        setErrorMessage(result.error ?? 'Something went wrong. Please try again.');
        setSubmitStatus('error');
        return;
      }

      // Success — track GA4 event + reset form
      trackFormSubmission(formData.service);
      setSubmitStatus('success');
      setFormData(INITIAL_FORM);
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 sm:py-36 max-w-7xl mx-auto px-6 md:px-8 border-t border-white/5 z-10 overflow-hidden bg-black"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col items-start text-left max-w-3xl mb-16 sm:mb-24 relative z-10">
        <span
          className={`text-[10px] tracking-[0.3em] text-[#16D9C5] font-mono font-medium uppercase mb-4 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          LET'S TALK
        </span>

        <h3
          className={`font-display text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-[1.2] transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Ready To Get
          <br />
          Certified &amp; Compliant?
        </h3>

        <p
          className={`text-white/50 tracking-wider text-xs sm:text-sm uppercase leading-relaxed mt-5 transition-all duration-[1200ms] delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Whether you need FSSAI licensing, BIS certification, packaged drinking water consultancy,
          or RO compliance guidance, we're here to help.
        </p>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* LEFT COLUMN: CONTACT DETAILS & TRUST */}
        <div
          className={`lg:col-span-5 flex flex-col justify-start transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8">
            <h4 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              Speak With A Compliance Expert
            </h4>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mt-3 max-w-sm font-sans">
              Get personalized guidance and understand the next steps for your certification or
              compliance requirements.
            </p>
          </div>

          {/* Contact Methods list */}
          <div className="space-y-5 font-mono text-[11px] sm:text-xs tracking-wider text-white/70">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-white/30 uppercase">PHONE</span>
              <a
                href="tel:+918421504028"
                className="hover:text-[#16D9C5] transition-colors duration-300"
              >
                +91 84215 04028
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-white/30 uppercase">EMAIL</span>
              <a
                href="mailto:desireconsultancy37@gmail.com"
                className="hover:text-[#16D9C5] transition-colors duration-300"
              >
                desireconsultancy37@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-white/30 uppercase">HOURS</span>
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </div>
          </div>

          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('contact_section')}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 text-emerald-400 hover:text-white transition-all duration-300 text-xs tracking-wider font-mono font-medium mt-8 self-start"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Connect on WhatsApp
          </a>

          {/* Trust Features */}
          <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-white/5">
            <span className="flex items-center gap-2 text-[10px] sm:text-xs tracking-wide text-white/70 font-sans">
              <span className="text-[#16D9C5] select-none">✓</span> Personalized Guidance
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs tracking-wide text-white/70 font-sans">
              <span className="text-[#16D9C5] select-none">✓</span> End-To-End Support
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs tracking-wide text-white/70 font-sans">
              <span className="text-[#16D9C5] select-none">✓</span> Fast Response Time
            </span>
            <span className="flex items-center gap-2 text-[10px] sm:text-xs tracking-wide text-white/70 font-sans">
              <span className="text-[#16D9C5] select-none">✓</span> PAN India Consultancy
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: INQUIRY FORM */}
        <div
          className={`lg:col-span-7 w-full transition-all duration-[1400ms] delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white/[0.005] border border-white/5 p-8 sm:p-10 rounded-2xl relative overflow-hidden">
            {submitStatus === 'success' ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <span className="w-12 h-12 rounded-full border border-[#16D9C5]/30 flex items-center justify-center text-[#16D9C5] text-lg font-mono mb-6 select-none bg-[#16D9C5]/5">
                  ✓
                </span>
                <h5 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-2">
                  Inquiry Received Successfully
                </h5>
                <p className="text-white/50 text-xs sm:text-sm max-w-xs leading-relaxed font-sans">
                  Thank you for reaching out. A compliance expert will review your requirements and
                  respond within 24 hours. Check your email for a confirmation.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-8 text-[9px] tracking-widest text-[#16D9C5] hover:text-white uppercase font-mono font-semibold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : submitStatus === 'rate_limit' ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <span className="text-3xl mb-4">⏳</span>
                <h5 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-2">
                  Slow Down a Moment
                </h5>
                <p className="text-white/50 text-xs sm:text-sm max-w-xs leading-relaxed font-sans">
                  You've submitted too many requests recently. Please wait a few minutes and try
                  again, or contact us directly via WhatsApp.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-8 text-[9px] tracking-widest text-[#16D9C5] hover:text-white uppercase font-mono font-semibold"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field — hidden from users, visible to bots */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />

                {/* Error message */}
                {submitStatus === 'error' && errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-xs text-red-400 font-mono">
                    {errorMessage}
                  </div>
                )}

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="text-[9px] tracking-widest text-white/40 font-mono uppercase mb-2 block"
                    >
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      maxLength={100}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:border-[#16D9C5]/50 focus:ring-1 focus:ring-[#16D9C5]/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="business_name"
                      className="text-[9px] tracking-widest text-white/40 font-mono uppercase mb-2 block"
                    >
                      Business Name *
                    </label>
                    <input
                      required
                      type="text"
                      id="business_name"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="e.g. Sharma Foods Pvt Ltd"
                      maxLength={150}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:border-[#16D9C5]/50 focus:ring-1 focus:ring-[#16D9C5]/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-[9px] tracking-widest text-white/40 font-mono uppercase mb-2 block"
                    >
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 99999 99999"
                      maxLength={20}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:border-[#16D9C5]/50 focus:ring-1 focus:ring-[#16D9C5]/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-[9px] tracking-widest text-white/40 font-mono uppercase mb-2 block"
                    >
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@sharmafoods.com"
                      maxLength={150}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:border-[#16D9C5]/50 focus:ring-1 focus:ring-[#16D9C5]/30 focus:outline-none transition-all duration-300 font-sans"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label
                    htmlFor="service"
                    className="text-[9px] tracking-widest text-white/40 font-mono uppercase mb-2 block"
                  >
                    Service Required *
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:border-[#16D9C5]/50 focus:ring-1 focus:ring-[#16D9C5]/30 focus:outline-none transition-all duration-300 font-sans appearance-none"
                    >
                      <option value="FSSAI Licensing">FSSAI Licensing</option>
                      <option value="BIS Certification">BIS Certification</option>
                      <option value="Packaged Drinking Water Consultancy">
                        Packaged Drinking Water Consultancy
                      </option>
                      <option value="Industrial RO Solutions">Industrial RO Solutions</option>
                      <option value="Other">Other / General Inquiry</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/30 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-[9px] tracking-widest text-white/40 font-mono uppercase mb-2 block"
                  >
                    Message *
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your compliance or setup requirements..."
                    maxLength={2000}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-white/20 focus:border-[#16D9C5]/50 focus:ring-1 focus:ring-[#16D9C5]/30 focus:outline-none transition-all duration-300 font-sans resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="contact-form-submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-tr from-[#0E6EFF] to-[#16D9C5] text-black font-semibold text-xs tracking-widest uppercase hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(14,110,255,0.35)] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Request...' : 'Book Consultation'}
                </button>

                <span className="text-[9px] tracking-wider text-white/30 text-center block mt-6 font-mono">
                  We typically respond within 24 hours. Your data is secure.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
