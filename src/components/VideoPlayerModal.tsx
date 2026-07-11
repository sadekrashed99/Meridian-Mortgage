import React, { useEffect } from "react";
import { X, Play, ShieldAlert } from "lucide-react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoPlayerModal({ isOpen, onClose, videoUrl }: VideoPlayerModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all">
      <div 
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 hover:bg-white/15 rounded-full transition-all bg-black/40"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Cinematic Video Player */}
        <div className="w-full h-full flex items-center justify-center relative">
          <video
            autoPlay
            controls
            playsInline
            src={videoUrl}
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Subtle branding seal */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-brand-gold/20 px-3 py-1 rounded text-[10px] text-brand-gold font-bold uppercase tracking-wider">
            Entourage Client Stories
          </div>
        </div>
      </div>
    </div>
  );
}
