import React, { useState } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, Send, CheckCircle2 } from "lucide-react";

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterName && newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterName("");
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <footer id="footer-contact" className="bg-brand-green text-white pt-20 relative overflow-hidden font-sans border-t border-brand-green-hover">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold via-brand-green-hover to-brand-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Left Column: Get yourself an Entourage */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.25em] block">
              Contact Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-none">
              Get Yourself <br /> A Meridian Team
            </h2>
            
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                onClick={onOpenBooking}
                className="bg-brand-gold hover:bg-yellow-600 text-brand-charcoal text-xs font-bold py-4 px-8 rounded transition-all uppercase tracking-wider shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                Let's Chat →
              </button>
              
              <p className="text-xs text-brand-neutral/60 leading-relaxed font-light sm:max-w-xs">
                Speak with independent mortgage brokers & buyer's advocates today. 100% free consult.
              </p>
            </div>

            {/* Social icons row */}
            <div className="space-y-3 pt-4">
              <p className="text-[10px] font-bold text-brand-neutral uppercase tracking-[0.15em]">Join our community</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: <Facebook className="h-4 w-4" />, href: "https://facebook.com" },
                  { icon: <Instagram className="h-4 w-4" />, href: "https://instagram.com" },
                  { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com" },
                  { icon: <Youtube className="h-4 w-4" />, href: "https://youtube.com" },
                  { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="h-9 w-9 rounded-full border border-white/20 hover:border-brand-gold hover:text-brand-gold flex items-center justify-center text-white/80 transition-all bg-white/5 hover:scale-105"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Info Blocks */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pl-12">
            
            {/* Phone */}
            <a
              href="tel:0394215500"
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-all group"
            >
              <div className="h-11 w-11 rounded-full border border-white/20 group-hover:border-brand-gold flex items-center justify-center text-brand-gold shrink-0 bg-white/5">
                <Phone className="h-5 w-5 fill-brand-gold" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-neutral/60">Phone Contact</p>
                <p className="text-xl font-bold font-serif text-white group-hover:text-brand-gold transition-colors mt-0.5">03 9421 5500</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@meridianfg.com.au"
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-all group"
            >
              <div className="h-11 w-11 rounded-full border border-white/20 group-hover:border-brand-gold flex items-center justify-center text-brand-gold shrink-0 bg-white/5">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-neutral/60">Email Address</p>
                <p className="text-lg font-semibold text-white group-hover:text-brand-gold transition-colors mt-0.5">info@meridianfg.com.au</p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
              <div className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center text-brand-gold shrink-0 bg-white/5">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-neutral/60">Melbourne Head Office</p>
                <p className="text-sm text-brand-neutral/90 leading-relaxed mt-0.5">Level 4, 22 River St, Richmond VIC 3121</p>
              </div>
            </div>

          </div>

        </div>

        {/* Middle: Hear the latest from Entourage (Newsletter Subscribe Form) */}
        <div className="py-12 border-b border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center lg:text-left max-w-sm">
            <h3 className="text-xl font-serif font-bold text-white">Hear the Latest From Meridian</h3>
            <p className="text-xs text-brand-neutral/60">Get monthly property trends, rate movements, and market insights.</p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-2xl">
              <input
                type="text"
                required
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                placeholder="Your Name"
                className="flex-1 bg-white/5 border border-white/15 focus:border-brand-gold rounded px-4 py-3 text-sm text-white placeholder-brand-neutral/40 focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 bg-white/5 border border-white/15 focus:border-brand-gold rounded px-4 py-3 text-sm text-white placeholder-brand-neutral/40 focus:ring-1 focus:ring-brand-gold focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brand-charcoal hover:bg-brand-gold hover:text-brand-charcoal text-white font-bold text-xs px-8 py-3.5 rounded transition-all uppercase tracking-widest flex items-center justify-center gap-2 shrink-0 cursor-pointer border border-white/10"
              >
                <span>Subscribe</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          ) : (
            <div className="bg-brand-darkgreen/50 border border-brand-gold/30 rounded-lg p-4 flex items-center gap-3 w-full lg:max-w-xl animate-in zoom-in duration-300">
              <CheckCircle2 className="h-5 w-5 text-brand-gold shrink-0" />
              <div className="text-xs text-brand-neutral">
                <strong className="text-white">Success!</strong> Thank you for subscribing. We will send the latest Melboune property reports to your inbox.
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Entity details (4 columns) */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-[11px] text-brand-neutral/60 leading-relaxed font-light">
          
          {/* Column 1: Finance */}
          <div className="space-y-2">
            <p className="font-semibold text-brand-neutral text-xs uppercase tracking-wider border-b border-white/10 pb-1.5 mb-2">Meridian Finance</p>
            <p className="font-medium text-brand-neutral">Meridian Finance Group Pty Ltd</p>
            <p>ABN: 41 618 372 905</p>
            <p>Australian Credit Licence: 489213</p>
            <p>Providing independent financial structuring, custom investment loans, first home buyer advice, and rate negotiation.</p>
          </div>

          {/* Column 2: Property */}
          <div className="space-y-2">
            <p className="font-semibold text-brand-neutral text-xs uppercase tracking-wider border-b border-white/10 pb-1.5 mb-2">Meridian Property</p>
            <p className="font-medium text-brand-neutral">Meridian Property Advisory Pty Ltd</p>
            <p>ABN: 27 604 519 883</p>
            <p>Real Estate Licence: 091447L</p>
            <p>Boutique buyer's advocates representing clients at auctions, sourcing off-market luxury listings, and evaluating investments.</p>
          </div>

          {/* Column 3: Asset */}
          <div className="space-y-2">
            <p className="font-semibold text-brand-neutral text-xs uppercase tracking-wider border-b border-white/10 pb-1.5 mb-2">Meridian Asset Finance</p>
            <p className="font-medium text-brand-neutral">Meridian Asset Finance Pty Ltd</p>
            <p>ACN: 685 194 227 is an authorised credit representative of a licensed aggregator.</p>
            <p>Australian Credit Licence: 528604</p>
            <p>Tailored equipment leasing, corporate fleets, cashflow optimization, and vehicle financing structured for business growth.</p>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-2">
            <p className="font-semibold text-brand-neutral text-xs uppercase tracking-wider border-b border-white/10 pb-1.5 mb-2">Meridian Legal</p>
            <p className="font-medium text-brand-neutral">Meridian & Associates Pty Ltd</p>
            <p>Trading as Meridian Legal</p>
            <p>Practitioner Number: E0041237</p>
            <p>Licensed legal firm providing contract reviews, professional conveyancing services, and title transfers for home buyers.</p>
          </div>

        </div>

      </div>

      {/* Subfooter: Legal strip & Copyright */}
      <div className="bg-[#111111] text-white/50 py-6 text-xs border-t border-white/5 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p>© Copyright 2026 Meridian Mortgage Brokers. All Rights Reserved.</p>
            <p className="text-[10px] text-white/30">Lending services are subject to standard bank credit criteria, terms, fees, and charges.</p>
          </div>
          
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#culture" className="hover:text-brand-gold transition-colors">Corporate Culture</a>
            <span className="text-white/20">|</span>
            <span className="text-white/40">
              Crafted by <strong className="text-brand-gold font-normal">Optireach Systems</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
