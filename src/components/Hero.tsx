import React from "react";
import { ArrowRight, Play, Landmark, Star, Building, ShieldCheck } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenVideo: (url: string) => void;
}

export default function Hero({ onOpenBooking, onOpenVideo }: HeroProps) {
  const handlePlayVideo = () => {
    onOpenVideo("https://www.w3schools.com/html/mov_bbb.mp4");
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-brand-darkgreen">
      {/* Background Image with Dark Gradient Tint Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578593139888-396237599365?auto=format&fit=crop&q=80&w=1600"
          alt="Melbourne Skyline Twilight"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* GRAD-1 Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darkgreen/90 via-brand-darkgreen/75 to-brand-green/95 z-10" />
      </div>

      {/* Hero content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto flex flex-col justify-center items-center py-8">
        <span className="text-xs sm:text-sm font-semibold text-brand-gold uppercase tracking-[0.2em] mb-4 animate-fade-in">
          Mortgage Broker & Property Advisors Melbourne
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 max-w-3xl">
          Mortgage Brokers <br className="hidden sm:inline" /> Melbourne
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-brand-neutral/90 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          A dedicated team behind you makes every property purchase, sale, and home loan across Melbourne and Australia simpler, faster, and less stressful.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-brand-gold hover:bg-yellow-600 text-brand-charcoal text-xs sm:text-sm font-bold px-8 py-4 rounded transition-all uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 group hover:scale-[1.02]"
          >
            <span>Let's Talk</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={handlePlayVideo}
            className="w-full sm:w-auto border border-white/40 hover:border-white text-white text-xs sm:text-sm font-bold px-8 py-4 rounded transition-all uppercase tracking-wider flex items-center justify-center gap-2 group bg-white/5 hover:bg-white/10"
          >
            <div className="bg-white/10 p-1 rounded-full text-brand-gold">
              <Play className="h-3 w-3 fill-brand-gold text-brand-gold" />
            </div>
            <span>Watch Video</span>
          </button>
        </div>
      </div>

      {/* Lower Hero Achievements/Statistics Strip Overlay */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-auto pt-10 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-4 group p-4 rounded bg-white/5 backdrop-blur-sm border border-white/5">
            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-brand-gold shrink-0 bg-white/5">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors">$2.8 Billion+ Loans</p>
              <p className="text-xs text-brand-neutral/80 font-sans uppercase tracking-wider mt-0.5">Total Finance Settled</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 group p-4 rounded bg-white/5 backdrop-blur-sm border border-white/5">
            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-brand-gold shrink-0 bg-white/5">
              <Star className="h-5 w-5 fill-brand-gold text-brand-gold" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors">550+ 5-Star Reviews</p>
              <p className="text-xs text-brand-neutral/80 font-sans uppercase tracking-wider mt-0.5">Top-Rated Google Reviews</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 group p-4 rounded bg-white/5 backdrop-blur-sm border border-white/5">
            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-brand-gold shrink-0 bg-white/5">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-brand-gold transition-colors">3,200+ Properties</p>
              <p className="text-xs text-brand-neutral/80 font-sans uppercase tracking-wider mt-0.5">Purchased or Financed</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
