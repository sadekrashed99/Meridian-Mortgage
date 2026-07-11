import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight, HelpCircle } from "lucide-react";
import { SERVICES } from "../data/homepageData";

interface ServicesSectionProps {
  onOpenCalculator: () => void;
  onOpenBooking: (serviceId: string) => void;
}

export default function ServicesSection({ onOpenCalculator, onOpenBooking }: ServicesSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState("finance");

  useEffect(() => {
    const handleSetTab = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.serviceId) {
        setActiveServiceId(customEvent.detail.serviceId);
      }
    };
    window.addEventListener("set-service-tab", handleSetTab);
    return () => {
      window.removeEventListener("set-service-tab", handleSetTab);
    };
  }, []);

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services-section" className="bg-brand-green text-white py-20 lg:py-24 overflow-hidden relative">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green-hover rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Responsive 3-Column / Asymmetric Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Intro Texts (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.25em] block">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Meet Your Meridian Team
            </h2>
            
            <p className="text-sm sm:text-base text-brand-neutral/80 leading-relaxed font-light">
              Meridian exists to handle the complex, detail-heavy work of finding, financing, buying and selling property, so you don't have to. We're not just Mortgage Brokers — we're Buyer's Advocates, Asset Finance Specialists and Conveyancers who treat precision and client care as non-negotiable.
            </p>
            <p className="text-sm sm:text-base text-brand-neutral/80 leading-relaxed font-light">
              What does it feel like to have one seamless team of finance and property experts on your side? Ask the 550+ Google reviewers who rate their Meridian experience five stars. We make buying, selling, and financing simpler — and put more money back in your pocket along the way.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenBooking(activeServiceId)}
                className="inline-flex items-center justify-between border border-white/20 hover:border-brand-gold text-white hover:text-brand-gold font-semibold text-xs py-3.5 px-6 rounded transition-all uppercase tracking-wider group bg-white/5 hover:bg-white/10"
              >
                <span>Learn More</span>
                <ArrowRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-between border border-brand-gold hover:bg-brand-gold hover:text-brand-charcoal text-brand-gold font-semibold text-xs py-3.5 px-6 rounded transition-all uppercase tracking-wider group bg-transparent"
              >
                <span>Loan Calculators</span>
                <ArrowUpRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Elegant Overlapping Portrait (4 cols) */}
          <div className="lg:col-span-4 flex justify-center items-center relative py-4 lg:py-0">
            {/* Outline Backdrop Glow */}
            <div className="absolute inset-0 border border-white/5 scale-105 rounded" />
            <div className="relative w-full max-w-[340px] aspect-[3/4] overflow-hidden shadow-2xl bg-brand-darkgreen">
              {/* Overlay shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent z-10" />
              <img
                src={activeService.image}
                alt={activeService.title}
                className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
                key={activeService.id} // trigger animation on image change
              />
              <div className="absolute bottom-5 left-5 z-20">
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.25em] block mb-1">Active Specialty</span>
                <p className="text-xl font-serif font-semibold text-white">{activeService.title}</p>
              </div>
            </div>
          </div>

          {/* Column 3: Clickable Services Menu & Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              {SERVICES.map((s) => {
                const isSelected = s.id === activeServiceId;
                return (
                  <div key={s.id} className="border-b border-white/10 pb-4 last:border-0">
                    <button
                      onClick={() => setActiveServiceId(s.id)}
                      className="w-full flex items-center justify-between py-2 text-left group focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`h-10 w-10 rounded-full border flex items-center justify-center font-sans text-xs font-semibold tracking-widest transition-all ${
                          isSelected
                            ? "bg-brand-gold text-brand-charcoal border-brand-gold"
                            : "border-white/20 text-white/70 group-hover:border-white group-hover:text-white"
                        }`}>
                          {s.number}
                        </span>
                        <span className={`text-lg sm:text-xl font-serif tracking-wide transition-all ${
                          isSelected ? "text-brand-gold font-semibold" : "text-white/80 group-hover:text-white"
                        }`}>
                          {s.title}
                        </span>
                      </div>
                      <span className={`h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-transform ${
                        isSelected ? "rotate-90 text-brand-gold border-brand-gold/30" : "group-hover:translate-x-1"
                      }`}>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </button>

                    {/* Expandable descriptive paragraph */}
                    {isSelected && (
                      <div className="mt-3 pl-14 pr-4 text-xs sm:text-sm text-brand-neutral/85 leading-relaxed font-light animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="mb-3">{s.description}</p>
                        {s.id === "finance" && (
                          <p className="text-[10px] text-brand-neutral/40 uppercase tracking-widest font-mono mt-2 mb-3">
                            mortgagechoice.com
                          </p>
                        )}
                        <button
                          onClick={() => onOpenBooking(s.id)}
                          className="text-brand-gold font-semibold hover:underline text-xs flex items-center gap-1 uppercase tracking-wider"
                        >
                          <span>Get {s.title} consultation</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
