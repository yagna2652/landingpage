export function InkBleedFilter() {
  return (
    <svg className="absolute h-0 w-0">
      <defs>
        <filter id="ink-bleed" x="-20%" y="-20%" width="140%" height="140%">
          {/* Organic noise for edge warping */}
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          {/* Displacement to warp edges */}
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          {/* Slight blur for ink soak effect */}
          <feGaussianBlur in="displaced" stdDeviation="0.5" result="blurred" />
          {/* Sharpen alpha to crisp up edges */}
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}






