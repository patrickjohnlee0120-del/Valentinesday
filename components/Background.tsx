
import React from 'react';

const Background: React.FC = () => {
  // Using the provided seamless peony pattern image
  const peonyImageUrl = 'https://input-files.s3.us-west-2.amazonaws.com/fe3a9f07-882f-4886-9a29-79841da9287c.png';
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#ffe4e6]">
      {/* 1. Base Layer: The Seamless Peony Pattern */}
      <div 
        className="absolute inset-0 bg-repeat bg-center"
        style={{
          backgroundImage: `url('${peonyImageUrl}')`,
          backgroundSize: '400px 400px', // Adjusted for clear detail without being too small
          imageRendering: 'auto',
        }}
      ></div>

      {/* 2. Soft Pastel Overlay: Blush pink layer for readability as requested (0.6 - 0.8 opacity) */}
      <div className="absolute inset-0 bg-[#fff5f6]/75 backdrop-blur-[0.5px]"></div>

      {/* 3. Subtle Vignette: Soft gradient to keep focus on the center content */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-100/20 via-transparent to-rose-200/30"></div>

      {/* 4. Decorative Floating Elements: Romantic floating hearts and petals */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-400 opacity-30 animate-float-slow select-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
              fontSize: `${14 + Math.random() * 20}px`,
              filter: 'blur(0.5px)'
            }}
          >
            {i % 3 === 0 ? '🌸' : '❤'}
          </div>
        ))}
      </div>

      <style>{`
        /* Optimized for Safari mobile to prevent layout shifts */
        @keyframes float-slow {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.3; }
          85% { opacity: 0.3; }
          100% { transform: translateY(-125vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-slow {
          animation: float-slow linear infinite;
          will-change: transform; /* Hint for browser performance */
        }
      `}</style>
    </div>
  );
};

export default Background;
