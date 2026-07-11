import React from "react";
import { ArrowRight, Trophy, Award, ShieldAlert, CheckCircle2 } from "lucide-react";
import { AWARDS } from "../data/homepageData";

interface AwardsBannerProps {
  onOpenBooking: () => void;
}

export default function AwardsBanner({ onOpenBooking }: AwardsBannerProps) {
  return (
    <section id="awards-section" className="bg-white py-20 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: Award Event Photo with Diagonal Cutout */}
          <div className="lg:col-span-5 relative">
            {/* Main Image container with border-radius */}
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3] bg-brand-neutral border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800"
                alt="Entourage Awards Event Group Photo"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              
              {/* Green triangular overlay on bottom-left [DNA-MICRO-8] */}
              <div 
                className="absolute bottom-0 left-0 w-32 h-32 bg-brand-green border-r border-t border-brand-gold/20 flex items-end p-4 z-10"
                style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
              >
                <Trophy className="h-6 w-6 text-brand-gold relative z-20" />
              </div>
            </div>

            {/* Decorative outline frames */}
            <div className="absolute -top-3 -right-3 w-1/3 h-1/3 border-t-2 border-r-2 border-brand-gold/30 rounded-tr" />
            <div className="absolute -bottom-3 -left-3 w-1/3 h-1/3 border-b-2 border-l-2 border-brand-green/30 rounded-bl" />
          </div>

          {/* Right: Copy & Description */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-brand-green uppercase tracking-[0.25em] block">
              Finance Broker Awards
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-charcoal tracking-tight leading-tight">
              65+ Award Wins & <br className="hidden sm:inline" /> Achievements
            </h2>

            <p className="text-sm sm:text-base text-brand-graygreen leading-relaxed font-light">
              Named a 2026 MFAA Finalist for Diversified Brokerage of the Year, Meridian sits at the intersection of property and finance. We handle the research and detail required to find the right property and the right loan for every client, in Melbourne and beyond.
            </p>
            <p className="text-[10px] text-brand-green uppercase tracking-widest font-mono">
              theadviser.com
            </p>
            <p className="text-sm sm:text-base text-brand-graygreen leading-relaxed font-light">
              We don't rely on off-the-shelf templates — our advisors build custom lending strategies aligned to your long-term wealth, investment, and retirement goals.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-between bg-brand-green hover:bg-brand-green-hover text-white font-semibold text-xs py-4 px-8 rounded transition-all uppercase tracking-wider group hover:scale-[1.02] shadow-md cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

        {/* Medallions Strip Footer */}
        <div className="pt-10 border-t border-gray-100">
          <p className="text-center text-xs font-bold text-brand-charcoal uppercase tracking-[0.15em] mb-8">
            Industry Recognition & Certifications
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 justify-center items-center">
            {AWARDS.map((award) => (
              <div
                key={award.id}
                className="flex flex-col items-center text-center p-3.5 bg-brand-neutral/45 rounded-lg border border-brand-neutral hover:border-brand-gold/30 hover:bg-brand-neutral transition-all group cursor-default"
              >
                {/* Circular Medallion */}
                <div className="relative h-14 w-14 rounded-full border-2 border-brand-gold flex items-center justify-center bg-white shadow-md mb-3 transform transition-transform group-hover:rotate-[360deg] duration-700">
                  <div className="absolute inset-0.5 rounded-full border border-brand-gold/20 flex items-center justify-center bg-gradient-to-tr from-yellow-50 to-white">
                    <Award className="h-5 w-5 text-brand-gold" />
                  </div>
                </div>

                <p className="text-[10px] font-bold text-brand-charcoal uppercase tracking-wider leading-tight">
                  {award.title}
                </p>
                <p className="text-[9px] text-brand-gold font-semibold mt-0.5">
                  {award.year}
                </p>
                <p className="text-[9px] text-brand-graygreen font-light leading-none mt-0.5">
                  {award.organization}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
