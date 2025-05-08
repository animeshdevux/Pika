"use client"

import React from "react"

const icons = [
  // Use emoji or SVG paths for demo; replace with your icons as needed
  "M12 2L2 14h9l-1 8 10-12h-9l1-8z", // lightning
  "M3 12l2-2 4 4 8-8 2 2-10 10z", // check
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.54 0 4.5 2.46 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z", // heart
  "M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z", // folder
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z", // star
]

export function HeroIconSlider() {
  return (
    <div className="overflow-hidden w-full h-32 relative">
      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        <div className="flex animate-slide-x gap-8" style={{ minWidth: '200%' }}>
          {[...Array(2)].flatMap((_, i) =>
            icons.map((d, idx) => (
              <svg
                key={i + '-' + idx}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 md:w-16 md:h-16 opacity-60 bg-white/10 rounded-xl p-2 shadow-lg"
                style={{ minWidth: 64 }}
              >
                <path d={d} />
              </svg>
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide-x {
          animation: slide-x 18s linear infinite;
        }
      `}</style>
    </div>
  )
} 