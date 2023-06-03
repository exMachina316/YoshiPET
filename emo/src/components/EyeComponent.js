import React, { useState, useEffect } from 'react';

const irisGradient = (
  <radialGradient id="iris">
    <stop offset="0%" stopColor="#b6aaaa" />
    <stop offset="87%" stopColor="#b6aaaa" />
    <stop offset="92%" stopColor="#333333" />
  </radialGradient>
);

const irisRingGradient = (
  <radialGradient id="iris-ring">
    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
    <stop offset="80%" stopColor="rgba(255,255,255,0)" />
    <stop offset="100%" stopColor="rgba(255,255,255,.6)" />
  </radialGradient>
);

function Eye() {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    return () => clearTimeout(blinkTimeout);
  }, []);

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {irisGradient}
        {irisRingGradient}
      </defs>
      <g>
        <ellipse cx="50" cy="43" fill="green" id="iris" rx="20" ry="30" />
        <path d="m32,55q-7-35,17-42q26 5,19,42q-17-20,-35 0" fill="rgba(0,0,0,.6)" id="iris-shadow" />
        <ellipse cx="50" cy="45" fill="url(#iris-ring)" id="iris-ring" rx="12" ry="17" />
        <ellipse cx="50" cy="46" fill="black" id="pupil" rx="5" ry="10" />
        <path d="m0,50q50-80,100 0q-50-40,-100 0" id="upper-eye-lid-cover" />
        <path
          d={isBlinking ? "m0,50q50-80,100 0q-50-40,-100 0" : "m0,50q50-60,100 0q-50-40,-100 0"}
          fill="#000"
          id="upper-eye-lid"
        >
          <animate
            attributeName="d"
            dur="0.3s"
            repeatCount="1"
            values="
              m0,50q50-60,100 0q-50-40,-100 0;
              m0,50q50-80,100 0q-50-40,-100 0;
            "
          />
        </path>
        <path d="m1,50q27 33,78 21q-63 14,-78 -21" id="lower-eye-lid-cover" />
        <path
          d={isBlinking ? "m1,50q27 33,78 21q-63 14,-78 -21" : "m1,50q17 45,78 21q-63 14,-78 -21"}
          fill="#000"
          id="lower-eye-lid"
        >
          <animate
            attributeName="d"
            dur="0.3s"
            repeatCount="1"
            values="
              m1,50q27 33,78 21q-63 14,-78 -21;
              m1,50q17 45,78 21q-63 14,-78 -21;
            "
          />
        </path>
      </g>
    </svg>
  );
}

export default Eye;
