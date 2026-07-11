import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
}

export default function BookingModal({ isOpen, onClose, selectedService = "finance" }: BookingModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(selectedService);
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("morning");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setService(selectedService);
      setIsSubmitted(false);
      setError("");
      // Set tomorrow's date as default preferred date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPreferredDate(tomorrow.toISOString().split("T")[0]);
    }
  }, [isOpen, selectedService]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !preferredDate) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-green text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-semibold">Book a Meridian Strategy Call</h2>
            <p className="text-xs text-brand-neutral/80 mt-1">Independent expert advice on Melbourne properties & finance.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-2">I need help with:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "finance", label: "Finance / Mortgage" },
                    { id: "property", label: "Property / Buyer's Agent" },
                    { id: "asset", label: "Asset / Business Lending" },
                    { id: "legal", label: "Conveyancing / Legal" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setService(item.id)}
                      className={`py-2 px-3 text-xs font-medium border rounded text-center transition-all ${
                        service === item.id
                          ? "border-brand-green bg-brand-green/10 text-brand-green font-semibold"
                          : "border-gray-200 hover:border-brand-green text-brand-graygreen"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0400 000 000"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Estimate budget */}
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">Estimated Purchase Budget (Optional)</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal appearance-none bg-white bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em_1em] bg-[right_0.75rem_center] bg-no-repeat"
                >
                  <option value="">Select a range</option>
                  <option value="under-600k">Under $600k (FHB Exemption threshold)</option>
                  <option value="600k-1m">$600,000 - $1,000,000</option>
                  <option value="1m-2m">$1,000,000 - $2,000,000</option>
                  <option value="above-2m">$2,000,000+</option>
                </select>
              </div>

              {/* Scheduler */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">Preferred Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-xs text-brand-charcoal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">Preferred Time *</label>
                  <div className="flex bg-gray-100 p-0.5 rounded gap-0.5 mt-0.5">
                    {[
                      { id: "morning", label: "AM" },
                      { id: "afternoon", label: "PM" }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPreferredTime(t.id)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${
                          preferredTime === t.id
                            ? "bg-brand-green text-white"
                            : "text-brand-graygreen hover:text-brand-charcoal"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">Describe your goals (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the property you're looking at, your pre-approval status, or any questions you have."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-green focus:border-brand-green text-sm text-brand-charcoal placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-3 px-4 rounded text-center transition-all uppercase tracking-wider mt-4 hover:scale-[1.01]"
              >
                Schedule My Free Strategy Session →
              </button>

              <div className="flex items-center gap-2 text-[10px] text-gray-400 justify-center mt-2">
                <ShieldCheck className="h-4 w-4 text-brand-green" />
                <span>Your privacy is highly secure. No obligation, 100% confidential.</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 px-4 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-green/10 text-brand-green mb-2">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-charcoal">Strategy Call Scheduled!</h3>
              <div className="bg-brand-neutral p-4 rounded-lg text-left max-w-sm mx-auto border border-gray-200 text-sm space-y-2.5">
                <p className="text-brand-charcoal font-semibold text-center border-b border-gray-200 pb-2 mb-2 uppercase tracking-widest text-xs">Strategy Session Details</p>
                <p className="text-brand-graygreen"><strong className="text-brand-charcoal">Client Name:</strong> {name}</p>
                <p className="text-brand-graygreen"><strong className="text-brand-charcoal">Category:</strong> {service.toUpperCase()}</p>
                <p className="text-brand-graygreen"><strong className="text-brand-charcoal">Phone Contact:</strong> {phone}</p>
                <p className="text-brand-graygreen"><strong className="text-brand-charcoal">Preferred Time:</strong> {preferredDate} ({preferredTime === "morning" ? "Morning 9:00 AM - 12:00 PM" : "Afternoon 1:00 PM - 5:00 PM"})</p>
                {budget && <p className="text-brand-graygreen"><strong className="text-brand-charcoal">Lending Bracket:</strong> {budget === "under-600k" ? "Under $600k" : budget === "600k-1m" ? "$600k - $1M" : budget === "1m-2m" ? "$1M - $2M" : "Above $2M"}</p>}
              </div>
              <p className="text-xs text-brand-graygreen max-w-md mx-auto pt-2 leading-relaxed">
                An expert Meridian Finance & Property specialist will call you directly at your selected time. We will send a calendar invitation to <strong className="text-brand-charcoal">{email}</strong> shortly.
              </p>
              <button
                onClick={onClose}
                className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-bold py-2.5 px-6 rounded transition-all uppercase tracking-wider mt-4"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
