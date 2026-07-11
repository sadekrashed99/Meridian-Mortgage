import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import EntourageEffect from "./components/EntourageEffect";
import WhyChooseUs from "./components/WhyChooseUs";
import TestimonialsSection from "./components/TestimonialsSection";
import AwardsBanner from "./components/AwardsBanner";
import ContentBlocks from "./components/ContentBlocks";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

// Modals
import CalculatorModal from "./components/CalculatorModal";
import BookingModal from "./components/BookingModal";
import VideoPlayerModal from "./components/VideoPlayerModal";

export default function App() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorTab, setCalculatorTab] = useState<"repayments" | "borrowing" | "stamp-duty">("repayments");
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState("finance");

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  // Set up global event listeners for easy triggering from anywhere (like the chatbot or navigation menu)
  useEffect(() => {
    const handleOpenCalculator = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.tab) {
        setCalculatorTab(customEvent.detail.tab);
      } else {
        setCalculatorTab("repayments");
      }
      setIsCalculatorOpen(true);
    };

    const handleOpenBooking = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.service) {
        setBookingService(customEvent.detail.service);
      } else {
        setBookingService("finance");
      }
      setIsBookingOpen(true);
    };

    window.addEventListener("open-calculator", handleOpenCalculator);
    window.addEventListener("open-booking", handleOpenBooking);

    return () => {
      window.removeEventListener("open-calculator", handleOpenCalculator);
      window.removeEventListener("open-booking", handleOpenBooking);
    };
  }, []);

  const openCalculator = (tab: "repayments" | "borrowing" | "stamp-duty" = "repayments") => {
    setCalculatorTab(tab);
    setIsCalculatorOpen(true);
  };

  const openBooking = (service: string = "finance") => {
    setBookingService(service);
    setIsBookingOpen(true);
  };

  const openVideo = (url: string) => {
    setVideoUrl(url);
    setIsVideoOpen(true);
  };

  return (
    <div className="min-h-screen bg-white relative selection:bg-brand-gold selection:text-brand-charcoal overflow-x-hidden">
      {/* Top sticky Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Section 02: Hero Section */}
        <Hero 
          onOpenBooking={() => openBooking("finance")} 
          onOpenVideo={openVideo} 
        />

        {/* Section 03: Interactive Services */}
        <ServicesSection 
          onOpenCalculator={() => openCalculator("repayments")} 
          onOpenBooking={openBooking} 
        />

        {/* Section 04: The Entourage Effect (About Us Video Block) */}
        <EntourageEffect 
          onOpenVideo={openVideo} 
          onOpenBooking={() => openBooking("finance")} 
        />

        {/* Section 05: Why Choose Us (Benefits Cards) */}
        <WhyChooseUs 
          onOpenBooking={() => openBooking("finance")} 
        />

        {/* Section 06: Testimonials Client Carousel */}
        <TestimonialsSection 
          onOpenVideo={openVideo} 
        />

        {/* Section 07: Awards & Achievements Banner */}
        <AwardsBanner 
          onOpenBooking={() => openBooking("finance")} 
        />

        {/* Sections 08, 09, 10: Alternating rich visual blocks (Melbourne Based, Buyer's Advocate, All Lending) */}
        <ContentBlocks 
          onOpenBooking={() => openBooking("finance")} 
        />
      </main>

      {/* Section 11: Call to Action Form, Contact, & Licensed Corporate Footer */}
      <Footer 
        onOpenBooking={() => openBooking("finance")} 
      />

      {/* Floating interactive Chat widget */}
      <ChatWidget />

      {/* --- POPUP Lightbox Modals --- */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialTab={calculatorTab}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={bookingService}
      />

      <VideoPlayerModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
      />
    </div>
  );
}
