import React from "react";
import { Compass, Briefcase, Gem, Sprout, ArrowRight } from "lucide-react";
import { WHY_CHOOSE_US } from "../data/homepageData";

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export default function WhyChooseUs({ onOpenBooking }: WhyChooseUsProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Compass":
        return <Compass className="h-7 w-7 text-brand-green stroke-[1.5]" />;
      case "Briefcase":
        return <Briefcase className="h-7 w-7 text-brand-green stroke-[1.5]" />;
      case "Diamond":
        return <Gem className="h-7 w-7 text-brand-green stroke-[1.5]" />;
      case "Sprout":
        return <Sprout className="h-7 w-7 text-brand-green stroke-[1.5]" />;
      default:
        return <Compass className="h-7 w-7 text-brand-green stroke-[1.5]" />;
    }
  };

  return (
    <section id="why-choose-us" className="bg-white py-20 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Titles */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold text-brand-green uppercase tracking-[0.25em] block">
            Why Choose Us?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-charcoal tracking-tight">
            A Team Built Entirely Around You
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((card) => (
            <div
              key={card.id}
              className="bg-brand-neutral/60 hover:bg-brand-neutral/90 rounded-lg p-8 border border-brand-neutral/40 hover:border-brand-green/20 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Icon outlined container */}
                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-sm border border-brand-neutral">
                  {getIcon(card.iconName)}
                </div>
                
                <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-charcoal">
                  {card.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-brand-graygreen leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="text-center mt-12">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-between bg-brand-charcoal hover:bg-brand-green text-white font-semibold text-xs py-4 px-10 rounded transition-all uppercase tracking-wider group hover:scale-[1.02] shadow-md cursor-pointer"
          >
            <span>Let's Chat</span>
            <ArrowRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
