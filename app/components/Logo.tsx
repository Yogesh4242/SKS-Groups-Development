"use client";

import { forwardRef } from "react";

/**
 * SKS GROUPS – Building Logo
 *
 * Colours: BROWN (#3D1C06 dark, #6B3A1F mid, #9C5A2E light, #C4845A highlight)
 *          on WHITE (#FFFFFF / #FDF8F4). Zero gold, zero other hues.
 *
 * Props:
 *   variant   "banner" (default) | "card"
 *   className – forwarded to <svg>
 *
 * HOW THE RISE ANIMATION WORKS (driven by PageTransition):
 *   Each variant exposes a <clipPath id="riseClip"> that wraps the
 *   building <path>. The clip rect starts at full height (building fully
 *   visible). PageTransition sets its height to 0 (anchored at the
 *   BOTTOM = ground) then animates it to full height, so the building
 *   appears to "rise" upward from the ground.
 *
 *   The building <path> is always the FIRST <path> in the SVG so
 *   PageTransition can reliably grab it via svg.querySelector("path").
 */
const Logo = forwardRef<SVGSVGElement, { className?: string; variant?: "banner" | "card" }>(
  ({ className, variant = "banner" }, ref) => {

  /* ── CARD ─────────────────────────────────────────────────────────── */
  if (variant === "card") {
    return (
      <svg
        ref={ref}
        viewBox="0 0 260 310"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* clipPath used by PageTransition to animate the rise */}
          <clipPath id="riseClip" clipPathUnits="userSpaceOnUse">
            <rect id="riseRect" x="68" y="42" width="124" height="190" />
          </clipPath>
        </defs>

        {/* White card background */}
        <rect x="0" y="0" width="260" height="310" rx="16" fill="#FFFFFF" />
        <rect x="0" y="0" width="260" height="310" rx="16"
          fill="none" stroke="#9C5A2E" strokeWidth="2.5" />

        {/* ── FIRST PATH = animated building ── */}
        <path
          clipPath="url(#riseClip)"
          d="
            M 130 232
            L  83 232  L  83  70
            L 104  70  L 104  53  L 116  42  L 128  53  L 128  70
            L 177  70  L 177 232  L 130 232

            M  91  86  L  91 103  L 108 103  L 108  86  Z
            M 113  86  L 113 103  L 130 103  L 130  86  Z
            M 135  86  L 135 103  L 152 103  L 152  86  Z
            M 157  86  L 157 103  L 170 103  L 170  86  Z

            M  91 113  L  91 130  L 108 130  L 108 113  Z
            M 113 113  L 113 130  L 130 130  L 130 113  Z
            M 135 113  L 135 130  L 152 130  L 152 113  Z
            M 157 113  L 157 130  L 170 130  L 170 113  Z

            M  91 140  L  91 157  L 108 157  L 108 140  Z
            M 113 140  L 113 157  L 130 157  L 130 140  Z
            M 135 140  L 135 157  L 152 157  L 152 140  Z
            M 157 140  L 157 157  L 170 157  L 170 140  Z

            M  91 167  L  91 184  L 108 184  L 108 167  Z
            M 113 167  L 113 184  L 130 184  L 130 167  Z
            M 135 167  L 135 184  L 152 184  L 152 167  Z

            M  91 194  L  91 209  L 108 209  L 108 194  Z
            M 113 194  L 113 209  L 130 209  L 130 194  Z
          "
          stroke="#6B3A1F"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="#9C5A2E"
          fillRule="evenodd"
          fillOpacity="0.13"
        />

        {/* Ground */}
        <line x1="65" y1="234" x2="195" y2="234"
          stroke="#3D1C06" strokeWidth="3" strokeLinecap="round" />

        {/* Wordmark */}
        <text x="130" y="262" fill="#3D1C06"
          fontSize="30" fontWeight="900"
          fontFamily="Barlow Condensed, sans-serif"
          letterSpacing="2" textAnchor="middle" dominantBaseline="middle">
          SKS GROUPS
        </text>

        {/* Tagline */}
        <text x="130" y="289" fill="#9C5A2E"
          fontSize="10" fontWeight="500"
          fontFamily="Barlow Condensed, sans-serif"
          letterSpacing="5" textAnchor="middle" dominantBaseline="middle">
          BUILDING YOUR FUTURE
        </text>
      </svg>
    );
  }

  /* ── BANNER (default) ─────────────────────────────────────────────── */
  return (
    <svg
      ref={ref}
      viewBox="0 0 1060 350"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="riseClip" clipPathUnits="userSpaceOnUse">
          <rect id="riseRect" x="18" y="12" width="244" height="292" />
        </clipPath>

        <linearGradient id="brownV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C4845A" />
          <stop offset="100%" stopColor="#6B3A1F" />
        </linearGradient>
      </defs>

      {/* ── FIRST PATH = animated building ── */}
      <path
        clipPath="url(#riseClip)"
        d="
          M 140 304
          L  70 304  L  70  50
          L 100  50  L 100  30  L 115  12  L 130  30  L 130  50
          L 210  50  L 210 304  L 140 304

          M  84  70  L  84  95  L 107  95  L 107  70  Z
          M 119  70  L 119  95  L 142  95  L 142  70  Z
          M 154  70  L 154  95  L 177  95  L 177  70  Z
          M 189  70  L 189  95  L 204  95  L 204  70  Z

          M  84 109  L  84 134  L 107 134  L 107 109  Z
          M 119 109  L 119 134  L 142 134  L 142 109  Z
          M 154 109  L 154 134  L 177 134  L 177 109  Z
          M 189 109  L 189 134  L 204 134  L 204 109  Z

          M  84 148  L  84 173  L 107 173  L 107 148  Z
          M 119 148  L 119 173  L 142 173  L 142 148  Z
          M 154 148  L 154 173  L 177 173  L 177 148  Z
          M 189 148  L 189 173  L 204 173  L 204 148  Z

          M  84 187  L  84 212  L 107 212  L 107 187  Z
          M 119 187  L 119 212  L 142 212  L 142 187  Z
          M 154 187  L 154 212  L 177 212  L 177 187  Z
          M 189 187  L 189 212  L 204 212  L 204 187  Z

          M  84 226  L  84 251  L 107 251  L 107 226  Z
          M 119 226  L 119 251  L 142 251  L 142 226  Z
          M 154 226  L 154 251  L 177 251  L 177 226  Z
          M 189 226  L 189 251  L 204 251  L 204 226  Z

          M  84 265  L  84 284  L 107 284  L 107 265  Z
          M 119 265  L 119 284  L 142 284  L 142 265  Z
        "
        stroke="#6B3A1F"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="url(#brownV)"
        fillRule="evenodd"
        fillOpacity="0.14"
      />

      {/* Side building left */}
      <rect x="24" y="132" width="42" height="172"
        stroke="#9C5A2E" strokeWidth="3.5" fill="none" rx="1" opacity="0.4"/>
      <rect x="30" y="148" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="48" y="148" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="30" y="170" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="48" y="170" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="30" y="192" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="48" y="192" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="30" y="214" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="48" y="214" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="30" y="236" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="48" y="236" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="30" y="258" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="48" y="258" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="30" y="280" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="48" y="280" width="12" height="14" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>

      {/* Side building right */}
      <rect x="218" y="155" width="38" height="149"
        stroke="#9C5A2E" strokeWidth="3.5" fill="none" rx="1" opacity="0.4"/>
      <rect x="223" y="170" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="239" y="170" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="223" y="189" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="239" y="189" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="223" y="208" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="239" y="208" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="223" y="227" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="239" y="227" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="223" y="246" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="239" y="246" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="223" y="265" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="239" y="265" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="223" y="284" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>
      <rect x="239" y="284" width="11" height="12" stroke="#9C5A2E" strokeWidth="2" fill="none" opacity="0.35"/>

      {/* Ground */}
      <line x1="14" y1="306" x2="260" y2="306"
        stroke="#3D1C06" strokeWidth="4.5" strokeLinecap="round"/>

      {/* Wordmark */}
      <text x="292" y="168" fill="#3D1C06"
        fontSize="104" fontWeight="900"
        fontFamily="Barlow Condensed, sans-serif"
        letterSpacing="4" dominantBaseline="middle">
        SKS GROUPS
      </text>

      {/* Thin rule */}
      <line x1="292" y1="236" x2="1046" y2="236"
        stroke="#9C5A2E" strokeWidth="1.5" opacity="0.4"/>

      {/* Tagline */}
      <text x="294" y="258" fill="#9C5A2E"
        fontSize="20" fontWeight="500"
        fontFamily="Barlow Condensed, sans-serif"
        letterSpacing="12" dominantBaseline="middle">
        BUILDING YOUR FUTURE
      </text>

      {/* Bottom rule */}
      <line x1="292" y1="280" x2="1046" y2="280"
        stroke="#6B3A1F" strokeWidth="3.5"/>
    </svg>
  );
});

Logo.displayName = "Logo";
export default Logo;