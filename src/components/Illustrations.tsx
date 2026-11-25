// Original SVG illustrations for MathMate — friendly, geometric, hand-drawn feel.

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="42" height="42" rx="13" fill="#3B82F6" />
      <rect x="3" y="3" width="42" height="42" rx="13" fill="url(#mm-grad)" opacity="0.85" />
      <path d="M15 30V18.5L21 26l4-7.5V30" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30.5" cy="18.5" r="2.2" fill="#FBBF24" />
      <circle cx="33" cy="31" r="1.7" fill="#FBBF24" />
      <circle cx="14" cy="31" r="1.4" fill="#FBBF24" />
      <defs>
        <linearGradient id="mm-grad" x1="3" y1="3" x2="45" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Hero illustration: a friendly calculator + floating maths symbols
export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 360" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Calculator body */}
      <rect x="120" y="70" width="190" height="230" rx="28" fill="white" stroke="#C4B5FD" strokeWidth="3" />
      <rect x="120" y="70" width="190" height="230" rx="28" fill="url(#calc-grad)" opacity="0.06" />
      {/* Screen */}
      <rect x="140" y="92" width="150" height="58" rx="12" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
      <text x="278" y="132" fontFamily="Baloo 2, sans-serif" fontSize="26" fontWeight="700" fill="#3B82F6" textAnchor="end">2 + 2 =</text>
      {/* Buttons */}
      {[0, 1, 2].map((c) =>
        [0, 1, 2, 3].map((r) => {
          const isOp = c === 2 && r === 3;
          const isEq = c === 2 && r === 3;
          return (
            <rect
              key={`${c}-${r}`}
              x={140 + c * 48}
              y={168 + r * 32}
              width="38"
              height="24"
              rx="8"
              fill={isOp ? '#FEF3C7' : isEq ? '#FBBF24' : '#F8FAFC'}
              stroke={isOp ? '#FCD34D' : '#E2E8F0'}
              strokeWidth="1.5"
            />
          );
        })
      )}
      {/* floating symbols */}
      <g className="animate-floaty" style={{ transformOrigin: '60px 60px' }}>
        <circle cx="60" cy="60" r="26" fill="#FEF3C7" />
        <text x="60" y="69" fontFamily="Baloo 2, sans-serif" fontSize="26" fontWeight="700" fill="#D97706" textAnchor="middle">π</text>
      </g>
      <g className="animate-floaty-slow" style={{ transformOrigin: '360px 90px' }}>
        <rect x="338" y="68" width="50" height="50" rx="14" fill="#EDE9FE" />
        <text x="363" y="103" fontFamily="Baloo 2, sans-serif" fontSize="30" fontWeight="700" fill="#7C3AED" textAnchor="middle">+</text>
      </g>
      <g className="animate-floaty" style={{ transformOrigin: '50px 250px' }}>
        <path d="M30 250 H70 L50 230 Z" fill="#DBEAFE" />
        <text x="50" y="248" fontFamily="Baloo 2, sans-serif" fontSize="18" fontWeight="700" fill="#2563EB" textAnchor="middle">△</text>
      </g>
      <g className="animate-floaty-slow" style={{ transformOrigin: '370px 250px' }}>
        <circle cx="365" cy="250" r="24" fill="#D1FAE5" />
        <text x="365" y="258" fontFamily="Baloo 2, sans-serif" fontSize="22" fontWeight="700" fill="#059669" textAnchor="middle">÷</text>
      </g>
      <defs>
        <linearGradient id="calc-grad" x1="120" y1="70" x2="310" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Feature illustration: daily life maths (coins + cart)
export function DailyLifeArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="30" y="60" width="100" height="62" rx="10" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="2.5" />
      <path d="M30 60 H130 L120 40 H40 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="70" cy="86" r="6" fill="#60A5FA" />
      <circle cx="90" cy="86" r="6" fill="#8B5CF6" />
      <rect x="60" y="98" width="40" height="6" rx="3" fill="#E2E8F0" />
      {/* coin */}
      <circle cx="160" cy="95" r="22" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2.5" />
      <text x="160" y="103" fontFamily="Baloo 2, sans-serif" fontSize="20" fontWeight="800" fill="#92400E" textAnchor="middle">$</text>
      <circle cx="150" cy="130" r="8" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
    </svg>
  );
}

// Feature illustration: learning zone (book + pencil)
export function LearningArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="40" y="40" width="110" height="78" rx="8" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2.5" />
      <path d="M40 40 H150 V52 H40 Z" fill="#3B82F6" />
      <rect x="55" y="64" width="80" height="5" rx="2.5" fill="#93C5FD" />
      <rect x="55" y="76" width="60" height="5" rx="2.5" fill="#93C5FD" />
      <rect x="55" y="88" width="70" height="5" rx="2.5" fill="#93C5FD" />
      <rect x="55" y="100" width="45" height="5" rx="2.5" fill="#93C5FD" />
      {/* pencil */}
      <g transform="rotate(35 165 70)">
        <rect x="150" y="62" width="58" height="12" rx="2" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
        <path d="M150 62 V74 L142 68 Z" fill="#FED7AA" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
        <rect x="200" y="62" width="8" height="12" fill="#8B5CF6" />
      </g>
    </svg>
  );
}

// --- Daily Life Maths section illustrations ---

// Shopping & Discounts: price tag with % off
export function ShoppingArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M52 8 L96 8 L96 52 L48 100 L4 56 L52 8 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="78" cy="26" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <text x="64" y="46" fontFamily="Baloo 2, sans-serif" fontSize="22" fontWeight="800" fill="#D97706" textAnchor="middle">%</text>
      <circle cx="20" cy="72" r="8" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.5" />
    </svg>
  );
}

// Budget Planning: wallet with coins + bar chart
export function BudgetArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="34" width="78" height="50" rx="8" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2.5" />
      <rect x="10" y="34" width="78" height="14" rx="8" fill="#3B82F6" />
      <rect x="64" y="48" width="24" height="20" rx="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="76" cy="58" r="3.5" fill="#92400E" />
      {/* mini bars */}
      <rect x="96" y="58" width="6" height="26" rx="2" fill="#8B5CF6" />
      <rect x="104" y="50" width="6" height="34" rx="2" fill="#C4B5FD" />
    </svg>
  );
}

// Travel Expenses: route with pin and money
export function TravelArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 78 C40 78 40 40 64 40 S92 78 104 78" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="78" r="6" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
      <path d="M64 30 C70 30 74 36 74 40 C74 48 64 58 64 58 C64 58 54 48 54 40 C54 36 58 30 64 30 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="64" cy="40" r="3.5" fill="#92400E" />
      <circle cx="104" cy="78" r="6" fill="#34D399" stroke="#059669" strokeWidth="2" />
    </svg>
  );
}

// Savings & Percentages: piggy bank
export function SavingsArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 50 C30 36 44 28 62 28 C84 28 96 40 96 54 C96 64 90 70 86 72 L86 84 L78 84 L76 78 L52 78 L50 84 L42 84 L42 70 C35 66 30 59 30 50 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="74" cy="48" r="3" fill="#92400E" />
      <rect x="62" y="28" width="8" height="6" rx="2" fill="#D97706" />
      {/* coin */}
      <circle cx="62" cy="20" r="9" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <text x="62" y="24" fontFamily="Baloo 2, sans-serif" fontSize="11" fontWeight="800" fill="#92400E" textAnchor="middle">$</text>
    </svg>
  );
}

// --- Learning for Everyone illustrations ---

// Kids: building blocks
export function KidsArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="20" y="56" width="40" height="36" rx="6" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
      <rect x="62" y="56" width="38" height="36" rx="6" fill="#60A5FA" stroke="#2563EB" strokeWidth="2.5" />
      <rect x="40" y="22" width="40" height="32" rx="6" fill="#C4B5FD" stroke="#7C3AED" strokeWidth="2.5" />
      <text x="40" y="80" fontFamily="Baloo 2, sans-serif" fontSize="18" fontWeight="800" fill="#92400E" textAnchor="middle">1</text>
      <text x="81" y="80" fontFamily="Baloo 2, sans-serif" fontSize="18" fontWeight="800" fill="white" textAnchor="middle">2</text>
      <text x="60" y="45" fontFamily="Baloo 2, sans-serif" fontSize="18" fontWeight="800" fill="#5B21B6" textAnchor="middle">3</text>
    </svg>
  );
}

// Students: graduation cap + book
export function StudentsArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M60 20 L104 38 L60 56 L16 38 Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 46 V62 C38 70 82 70 82 62 V46" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M104 38 V56" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="104" cy="58" r="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <rect x="30" y="70" width="60" height="16" rx="3" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" />
    </svg>
  );
}

// Adults: briefcase with calculator
export function AdultsArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="22" y="34" width="76" height="54" rx="8" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2.5" />
      <path d="M48 34 V26 C48 22 52 20 56 20 H64 C68 20 72 22 72 26 V34" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="34" y="48" width="52" height="32" rx="5" fill="white" stroke="#A78BFA" strokeWidth="2" />
      <rect x="34" y="48" width="52" height="10" rx="5" fill="#8B5CF6" />
      <rect x="40" y="63" width="8" height="6" rx="1.5" fill="#FBBF24" />
      <rect x="52" y="63" width="8" height="6" rx="1.5" fill="#DBEAFE" />
      <rect x="64" y="63" width="8" height="6" rx="1.5" fill="#DBEAFE" />
      <rect x="40" y="72" width="8" height="6" rx="1.5" fill="#DBEAFE" />
      <rect x="64" y="72" width="8" height="6" rx="1.5" fill="#34D399" />
    </svg>
  );
}

// Feature illustration: challenge zone (trophy + stars)
export function ChallengeArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M70 40 H130 V70 C130 95 115 108 100 108 C85 108 70 95 70 70 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M70 48 H54 C54 66 64 72 70 72 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M130 48 H146 C146 66 136 72 130 72 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2.5" />
      <rect x="92" y="108" width="16" height="14" fill="#F59E0B" />
      <rect x="78" y="120" width="44" height="10" rx="3" fill="#8B5CF6" />
      <text x="100" y="84" fontFamily="Baloo 2, sans-serif" fontSize="22" fontWeight="800" fill="#92400E" textAnchor="middle">1</text>
      {/* stars */}
      <path d="M40 35 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M162 30 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// Cooking Measurements: measuring cup with spoon
export function CookingArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 28 H78 L72 82 Q71 90 63 90 H37 Q29 90 28 82 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M78 40 Q98 40 98 56 Q98 70 76 70" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 56 H74 L72 82 Q71 90 63 90 H37 Q29 90 28 82 Z" fill="#FBBF24" opacity="0.55" />
      <path d="M26 44 H36 M26 56 H40 M26 68 H36" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <circle cx="98" cy="22" r="8" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" />
      <rect x="96.5" y="30" width="3" height="16" rx="1.5" fill="#60A5FA" />
    </svg>
  );
}
