import React from "react";
import { Play, Check, ArrowRight } from "lucide-react";

interface EntourageEffectProps {
  onOpenVideo: (url: string) => void;
  onOpenBooking: () => void;
}

export default function EntourageEffect({ onOpenVideo, onOpenBooking }: EntourageEffectProps) {
  const handlePlayVideo = () => {
    onOpenVideo("https://www.w3schools.com/html/mov_bbb.mp4");
  };

  const benefits = [
    "Saving time and cutting through the administrative burden.",
    "Access to exclusive off-market home loan opportunities through our Mortgage Brokers.",
    "Removing the complexity from buying residential or commercial property.",
    "Partnering with an elite finance and property advisory team built entirely around you.",
    "Tailored asset finance solutions for vehicles, equipment, and business growth.",
    "Seamless legal settlements handled start to finish by Meridian Legal."
  ];

  return (
    <section id="entourage-effect" className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Video Thumbnail with Play Button Overlay */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-xl overflow-hidden shadow-xl border border-gray-100 cursor-pointer" onClick={handlePlayVideo}>
              {/* Image Aspect ratio 4:3 */}
              <div className="aspect-[4/3] w-full bg-brand-neutral relative">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                  alt="Modern Corporate Building Melbourne"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay vignette */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
              </div>

              {/* Absolute Centered Circular Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="h-16 w-16 rounded-full bg-brand-green text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-charcoal">
                  <Play className="h-6 w-6 fill-current ml-1" />
                </div>
              </div>

              {/* Decorative Scrim with subtitle */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent z-10 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Video Tour</p>
                <p className="text-sm font-semibold font-serif">Step Inside Meridian HQ</p>
              </div>
            </div>
          </div>

          {/* Right Column: Rich Text, Benefits List, and CTA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold text-brand-green uppercase tracking-[0.25em] block">
              The People Behind Your Home Loan and Property Journey
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-charcoal tracking-tight leading-tight">
              The Meridian Advantage
            </h2>

            <p className="text-sm sm:text-base text-brand-graygreen leading-relaxed font-light">
              Your Meridian team grows with you, exactly when you need it. Today it might be advice on saving a first home deposit; tomorrow, it's stepping into the right loan for a growing family. Our Finance Brokers and Property Advisors guide you through residential and commercial purchases, while our Asset Finance specialists secure the vehicles, equipment, or personal finance your business or lifestyle needs.
            </p>
            
            <p className="text-sm sm:text-base text-brand-graygreen leading-relaxed font-light">
              When it's time to close, our Conveyancing team manages every detail of settlement, so you move forward with total confidence. Wherever you are in your journey, your Meridian team is one call away.
            </p>

            {/* Benefits List */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-brand-charcoal uppercase tracking-[0.15em] mb-3">Having Meridian behind you means:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="bg-brand-green/10 text-brand-green p-0.5 rounded-full shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 stroke-[3px]" />
                    </span>
                    <span className="text-xs sm:text-sm text-brand-graygreen font-light">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-between bg-brand-green hover:bg-brand-green-hover text-white font-semibold text-xs py-4 px-8 rounded transition-all uppercase tracking-wider group hover:scale-[1.02] shadow-md cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
