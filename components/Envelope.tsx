
import React, { useState } from 'react';
import { playSound } from '../utils/sounds';

interface EnvelopeProps {
  onFinished: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onFinished }) => {
  const [state, setState] = useState<'closed' | 'opening' | 'vanishing'>('closed');

  const handleOpen = () => {
    if (state !== 'closed') return;
    
    playSound('paper');
    playSound('sparkle');
    setState('opening');
    
    setTimeout(() => {
      setState('vanishing');
      setTimeout(() => {
        onFinished();
      }, 700);
    }, 1000);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center w-full max-w-[340px] aspect-[4/3] cursor-pointer transition-all duration-700 ${state === 'vanishing' ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <div 
        onClick={handleOpen}
        className="relative w-full h-full group"
      >
        <div className="absolute inset-0 bg-rose-100 shadow-xl rounded-sm"></div>
        <div className="absolute inset-2 bg-rose-50/50 rounded-sm"></div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
            backgroundColor: '#fecdd3'
          }}></div>
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
            backgroundColor: '#fecdd3'
          }}></div>
          <div className="absolute inset-0" style={{
            clipPath: 'polygon(0% 100%, 50% 50%, 100% 100%)',
            backgroundColor: '#fda4af'
          }}></div>
        </div>

        <div 
          className={`absolute top-0 left-0 right-0 h-1/2 z-30 transition-transform duration-700 ease-in-out origin-top ${state !== 'closed' ? 'rotate-x-180 -scale-y-100' : 'rotate-x-0'}`}
          style={{
            clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
            backgroundColor: '#fb7185',
            transformOrigin: 'top'
          }}
        ></div>

        {state === 'closed' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-300">
            <svg className="w-12 h-12 text-white filter drop-shadow-md animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}
      </div>
      
      {state === 'closed' && (
        <p className="absolute -bottom-12 text-rose-400 font-pacifico text-lg animate-bounce">
          Tap to open 💌
        </p>
      )}
    </div>
  );
};

export default Envelope;
