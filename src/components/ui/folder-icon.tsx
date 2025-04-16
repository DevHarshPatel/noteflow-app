export function FolderIcon({ color = "#FF8400" }: { color?: string }) {
  return (
    <svg width="450" height="288" viewBox="0 0 450 288" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g filter="url(#filter0_di_363_16)">
        <rect x="2" width="439" height="278" rx="53" fill="white"/>
      </g>
      <g filter="url(#filter1_ddi_363_16)">
        <path d="M42.8975 136.8C42.8975 121.119 42.8975 113.278 45.9493 107.288C48.6337 102.02 52.9172 97.7363 58.1857 95.0518C64.1753 92 72.016 92 87.6975 92H212.26C219.289 92 222.803 92 226.1 92.8116C229.023 93.5312 231.811 94.7173 234.356 96.3243C237.228 98.1372 239.665 100.669 244.539 105.734L254.675 116.266C259.549 121.331 261.986 123.863 264.857 125.676C267.403 127.283 270.19 128.469 273.113 129.188C276.41 130 279.925 130 286.954 130H353.479C369.16 130 377.001 130 382.99 133.052C388.259 135.736 392.542 140.02 395.227 145.288C398.279 151.278 398.279 159.119 398.279 174.8V202.2C398.279 217.881 398.279 225.722 395.227 231.712C392.542 236.98 388.259 241.264 382.99 243.948C377.001 247 369.16 247 353.479 247H87.6975C72.016 247 64.1753 247 58.1857 243.948C52.9172 241.264 48.6337 236.98 45.9493 231.712C42.8975 225.722 42.8975 217.881 42.8975 202.2V136.8Z" fill={color}/>
      </g>
      <defs>
        <filter id="filter0_di_363_16" x="0" y="0" width="443" height="282" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_363_16"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_363_16" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_363_16"/>
        </filter>
        <filter id="filter1_ddi_363_16" x="-0.00254059" y="39.1" width="449.181" height="248.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_363_16"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="-6"/>
          <feGaussianBlur stdDeviation="23.45"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow_363_16" result="effect2_dropShadow_363_16"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_363_16" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow_363_16"/>
        </filter>
      </defs>
    </svg>
  );
} 