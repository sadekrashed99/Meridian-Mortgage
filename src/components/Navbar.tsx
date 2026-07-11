import React, { useState, useEffect, useRef } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

interface DropdownItem {
  title: string;
  subtitle: string;
  targetId: string;
  serviceId?: string;
}

const SERVICES_ITEMS: DropdownItem[] = [
  { 
    title: "Finance & Lending", 
    subtitle: "Tailored home loans, private bank access & rates", 
    targetId: "services-section", 
    serviceId: "finance" 
  },
  { 
    title: "Buyer's Advocacy", 
    subtitle: " Melbourne off-market experts & bidding support", 
    targetId: "buyers-advocate" 
  },
  { 
    title: "Asset & Vehicle", 
    subtitle: "Smart funding for commercial fleets & equipment", 
    targetId: "services-section", 
    serviceId: "asset" 
  },
  { 
    title: "Legal & Conveyancing", 
    subtitle: "Property lawyers, contract review & settlement", 
    targetId: "services-section", 
    serviceId: "legal" 
  }
];

const STORY_ITEMS: DropdownItem[] = [
  { 
    title: "The Meridian Advantage", 
    subtitle: "Our integrated mortgage & property advisory model", 
    targetId: "entourage-effect" 
  },
  { 
    title: "Benefits & Value", 
    subtitle: "The client-first edge that rates us 5-stars", 
    targetId: "why-choose-us" 
  },
  { 
    title: "Client Stories", 
    subtitle: "Video diaries of Olympic athletes & local buyers", 
    targetId: "testimonials-section" 
  },
  { 
    title: "Achievements", 
    subtitle: "Over 70 national MFAA & MPA industry awards", 
    targetId: "awards-section" 
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"services" | "story" | null>(null);
  
  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileStoryOpen, setMobileStoryOpen] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll handler to transition floating bar states
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = (menu: "services" | "story") => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    const element = document.getElementById(id);
    if (element) {
      const offset = 88; // Height of the floating bar + offset gap
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const openBooking = () => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-booking", { detail: { service: "finance" } }));
  };

  return (
    <>
      {/* Floating Island Header Wrapper */}
      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-6 lg:px-8 pointer-events-none ${
          isScrolled ? "top-3" : "top-6"
        }`}
      >
        <header
          id="jony-ive-header"
          className={`max-w-6xl mx-auto w-full pointer-events-auto transition-all duration-500 ease-out rounded-full border border-white/10 backdrop-blur-xl flex items-center justify-between ${
            isScrolled
              ? "bg-brand-green/85 py-2.5 px-6 shadow-[0_20px_45px_rgba(0,0,0,0.3)]"
              : "bg-brand-green/55 py-4 px-8 shadow-lg"
          }`}
        >
          {/* Logo with high tracking and light weight */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center focus:outline-none cursor-pointer group"
          >
            <span className="text-sm sm:text-[15px] font-light text-white tracking-[0.3em] font-sans transition-opacity group-hover:opacity-85 uppercase">
              MERIDIAN
            </span>
          </button>

          {/* Minimalist Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {/* Services Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => scrollToSection("services-section")}
                className={`text-white/85 hover:text-white text-[11px] font-medium tracking-[0.18em] uppercase flex items-center gap-1.5 transition-colors cursor-pointer py-2 focus:outline-none ${
                  activeDropdown === "services" ? "text-brand-gold" : ""
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-300 ${
                  activeDropdown === "services" ? "rotate-180 text-brand-gold" : ""
                }`} />
              </button>

              {/* Jony Ive Glass Dropdown */}
              {activeDropdown === "services" && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[290px] bg-brand-green/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col gap-0.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {SERVICES_ITEMS.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToSection(item.targetId);
                        if (item.serviceId) {
                          window.dispatchEvent(new CustomEvent("set-service-tab", { detail: { serviceId: item.serviceId } }));
                        }
                      }}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-white/5 rounded-xl transition-all duration-200 group flex flex-col gap-0.5"
                    >
                      <span className="text-[11px] font-medium tracking-wider text-white/95 group-hover:text-brand-gold uppercase transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-white/45 group-hover:text-white/70 font-light leading-snug transition-colors">
                        {item.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Our Story Dropdown Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("story")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => scrollToSection("entourage-effect")}
                className={`text-white/85 hover:text-white text-[11px] font-medium tracking-[0.18em] uppercase flex items-center gap-1.5 transition-colors cursor-pointer py-2 focus:outline-none ${
                  activeDropdown === "story" ? "text-brand-gold" : ""
                }`}
              >
                <span>Our Story</span>
                <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-300 ${
                  activeDropdown === "story" ? "rotate-180 text-brand-gold" : ""
                }`} />
              </button>

              {/* Jony Ive Glass Dropdown */}
              {activeDropdown === "story" && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[290px] bg-brand-green/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col gap-0.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {STORY_ITEMS.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.targetId)}
                      className="w-full text-left px-3.5 py-2.5 hover:bg-white/5 rounded-xl transition-all duration-200 group flex flex-col gap-0.5"
                    >
                      <span className="text-[11px] font-medium tracking-wider text-white/95 group-hover:text-brand-gold uppercase transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-white/45 group-hover:text-white/70 font-light leading-snug transition-colors">
                        {item.subtitle}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Calculators (Direct Trigger) */}
            <button
              onClick={() => {
                setActiveDropdown(null);
                window.dispatchEvent(new CustomEvent("open-calculator"));
              }}
              className="text-white/85 hover:text-white text-[11px] font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer focus:outline-none py-2"
            >
              Calculators
            </button>

            {/* Contact Link */}
            <button
              onClick={() => scrollToSection("footer-contact")}
              className="text-white/85 hover:text-white text-[11px] font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer focus:outline-none py-2"
            >
              Contact
            </button>
          </nav>

          {/* Integrated Actions (Phone + Book) */}
          <div className="hidden sm:flex items-center gap-6">
            {/* Phone link styled with zero unnecessary clutter */}
            <a
              href="tel:0394215500"
              className="text-[11px] font-sans tracking-[0.15em] font-light text-white/70 hover:text-brand-gold transition-colors flex items-center gap-1.5 focus:outline-none"
            >
              <Phone className="h-3 w-3 opacity-60 text-brand-gold" />
              <span>03 9421 5500</span>
            </a>

            {/* Minimal Gold Pill button */}
            <button
              onClick={openBooking}
              className="bg-brand-gold hover:bg-white text-brand-charcoal hover:text-brand-green text-[10px] font-bold px-5 py-2.5 rounded-full uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_4px_12px_rgba(212,175,55,0.15)] hover:shadow-md hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Hamburguer / Close Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:0394215500"
              className="sm:hidden flex items-center justify-center p-2 rounded-full text-white/80 hover:text-brand-gold hover:bg-white/5 transition-all"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-brand-gold focus:outline-none cursor-pointer transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </header>
      </div>

      {/* Full-screen iOS-style Translucent Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-green/95 backdrop-blur-2xl flex flex-col justify-center items-center lg:hidden animate-in fade-in duration-300">
          <nav className="flex flex-col text-center gap-8 p-6 w-full max-w-md">
            {/* Logo in overlay */}
            <div className="mb-4">
              <span className="text-lg font-light text-white/50 tracking-[0.4em] uppercase">MERIDIAN</span>
            </div>

            {/* Services Collapsible Accordion */}
            <div className="border-b border-white/5 pb-3">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full text-center text-white text-lg font-light tracking-[0.2em] uppercase hover:text-brand-gold py-1 flex items-center justify-center gap-2"
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              {mobileServicesOpen && (
                <div className="flex flex-col gap-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  {SERVICES_ITEMS.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        scrollToSection(item.targetId);
                        if (item.serviceId) {
                          window.dispatchEvent(new CustomEvent("set-service-tab", { detail: { serviceId: item.serviceId } }));
                        }
                      }}
                      className="text-white/60 hover:text-brand-gold text-xs tracking-wider uppercase py-1"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Our Story Collapsible Accordion */}
            <div className="border-b border-white/5 pb-3">
              <button
                onClick={() => setMobileStoryOpen(!mobileStoryOpen)}
                className="w-full text-center text-white text-lg font-light tracking-[0.2em] uppercase hover:text-brand-gold py-1 flex items-center justify-center gap-2"
              >
                <span>Our Story</span>
                <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${mobileStoryOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileStoryOpen && (
                <div className="flex flex-col gap-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  {STORY_ITEMS.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.targetId)}
                      className="text-white/60 hover:text-brand-gold text-xs tracking-wider uppercase py-1"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Calculators Trigger */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent("open-calculator"));
              }}
              className="text-white text-lg font-light tracking-[0.2em] uppercase hover:text-brand-gold py-1 border-b border-white/5 pb-3"
            >
              Calculators
            </button>

            {/* Contact Trigger */}
            <button
              onClick={() => scrollToSection("footer-contact")}
              className="text-white text-lg font-light tracking-[0.2em] uppercase hover:text-brand-gold py-1"
            >
              Contact Us
            </button>

            {/* Phone + Call to Action inside Mobile Panel */}
            <div className="pt-8 border-t border-white/10 flex flex-col gap-5 items-center">
              <a
                href="tel:0394215500"
                className="flex items-center gap-2 px-6 py-2.5 border border-white/10 rounded-full text-white/80 text-sm tracking-[0.15em] font-light hover:border-brand-gold hover:text-brand-gold transition-colors bg-white/5"
              >
                <Phone className="h-3.5 w-3.5 text-brand-gold" />
                <span>03 9421 5500</span>
              </a>
              
              <button
                onClick={openBooking}
                className="bg-brand-gold hover:bg-white text-brand-charcoal hover:text-brand-green text-xs font-bold px-8 py-3.5 rounded-full uppercase tracking-[0.18em] transition-all duration-300 shadow-md w-full"
              >
                Let's Talk
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
