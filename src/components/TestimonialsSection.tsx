import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/homepageData";

interface TestimonialsSectionProps {
  onOpenVideo: (url: string) => void;
}

export default function TestimonialsSection({ onOpenVideo }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(TESTIMONIALS.length - 1, prev + 1));
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials-section" className="bg-brand-green py-20 lg:py-24 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green-hover rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-brand-gold uppercase tracking-[0.25em] block">
              Mortgage Broker and Property Advisory Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              What It's Like To Have <br /> Meridian On Your Side
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? "border-white/10 text-white/30 cursor-not-allowed"
                  : "border-white/30 text-white hover:border-brand-gold hover:text-brand-gold bg-white/5"
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === TESTIMONIALS.length - 1}
              className={`h-11 w-11 rounded-full border flex items-center justify-center transition-all ${
                currentIndex === TESTIMONIALS.length - 1
                  ? "border-white/10 text-white/30 cursor-not-allowed"
                  : "border-white/30 text-white hover:border-brand-gold hover:text-brand-gold bg-white/5"
              }`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[400px] bg-brand-darkgreen rounded-lg overflow-hidden snap-start shrink-0 group border border-white/5 shadow-2xl relative"
            >
              {/* Image with 1:1 Aspect Ratio */}
              <div className="aspect-[4/3] w-full relative bg-brand-green overflow-hidden cursor-pointer" onClick={() => onOpenVideo(t.videoUrl)}>
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark to transparent scrim on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darkgreen via-brand-darkgreen/20 to-transparent z-10" />

                {/* Absolute overlay video play button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="h-12 w-12 rounded-full bg-brand-gold text-brand-charcoal flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-brand-gold text-brand-charcoal text-[9px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider">
                    {t.category}
                  </span>
                </div>
              </div>

              {/* Text content card details */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-brand-gold transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-brand-gold uppercase tracking-wider font-sans">
                      {t.achievement}
                    </p>
                  </div>
                  <Quote className="h-7 w-7 text-white/10 shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-brand-neutral/80 italic font-light leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic active index indicator dots */}
        <div className="flex items-center gap-1.5 justify-center mt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                if (containerRef.current) {
                  const cardWidth = containerRef.current.scrollWidth / TESTIMONIALS.length;
                  containerRef.current.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
                }
              }}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === idx ? "w-6 bg-brand-gold" : "w-2.5 bg-white/20"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
