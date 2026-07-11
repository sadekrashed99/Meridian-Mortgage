import React from "react";
import { ArrowRight } from "lucide-react";
import { CONTENT_BLOCKS } from "../data/homepageData";

interface ContentBlocksProps {
  onOpenBooking: () => void;
}

export default function ContentBlocks({ onOpenBooking }: ContentBlocksProps) {
  const handleButtonClick = (buttonText?: string) => {
    if (buttonText === "About Us") {
      const element = document.getElementById("entourage-effect");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      onOpenBooking();
    }
  };

  return (
    <div className="bg-white">
      {CONTENT_BLOCKS.map((block, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={block.id}
            className={`py-16 lg:py-20 border-b border-gray-100 last:border-0 ${
              isEven ? "bg-white" : "bg-brand-neutral/20"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Text Content Column */}
                <div 
                  className={`lg:col-span-7 space-y-6 ${
                    isEven ? "lg:order-1" : "lg:order-2 lg:pl-8"
                  }`}
                >
                  <span className="text-xs font-semibold text-brand-green uppercase tracking-[0.25em] block">
                    {block.eyebrow}
                  </span>
                  
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-charcoal tracking-tight leading-tight">
                    {block.title}
                  </h2>

                  <div className="space-y-4">
                    {block.description.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm sm:text-base text-brand-graygreen leading-relaxed font-light"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Optional CTA Button */}
                  {block.buttonText && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleButtonClick(block.buttonText)}
                        className="inline-flex items-center justify-between bg-brand-charcoal hover:bg-brand-green text-white font-semibold text-xs py-4 px-8 rounded transition-all uppercase tracking-wider group hover:scale-[1.02] shadow-md cursor-pointer"
                      >
                        <span>{block.buttonText}</span>
                        <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Photographic Card Column */}
                <div 
                  className={`lg:col-span-5 relative ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3] bg-brand-neutral border border-gray-100">
                    <img
                      src={block.image}
                      alt={block.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Decorative Frame Elements */}
                  <div className={`absolute -top-3 w-1/4 h-1/4 border-t-2 rounded-t ${
                    isEven ? "-left-3 border-l-2 border-brand-green/20" : "-right-3 border-r-2 border-brand-gold/20"
                  }`} />
                  <div className={`absolute -bottom-3 w-1/4 h-1/4 border-b-2 rounded-b ${
                    isEven ? "-right-3 border-r-2 border-brand-gold/20" : "-left-3 border-l-2 border-brand-green/20"
                  }`} />
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
