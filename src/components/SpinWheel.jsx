import { useRef, useState, useCallback } from 'react';

const SLOT_COLORS = {
  normal: ['#dc2626', '#ea580c', '#d97706'],
  named:  ['#ca8a04', '#b45309', '#92400e'],
};

const TOTAL_SLOTS = 10;

function buildSlots(referrals) {
  const slots = Array(TOTAL_SLOTS).fill(null).map((_, i) => ({
    index: i,
    label: '？',
    isNamed: false,
  }));
  referrals.forEach((ref, i) => {
    if (i < TOTAL_SLOTS) {
      slots[i] = { index: i, label: ref.name, code: ref.code, isNamed: true };
    }
  });
  return slots;
}

function getSlotColor(slot, slotIndex) {
  if (slot.isNamed) return SLOT_COLORS.named[slotIndex % SLOT_COLORS.named.length];
  return SLOT_COLORS.normal[slotIndex % SLOT_COLORS.normal.length];
}

export default function SpinWheel({ referrals, spinsRemaining, onSpinComplete }) {
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [currentDeg, setCurrentDeg] = useState(0);

  const slots = buildSlots(referrals);
  const sliceAngle = 360 / TOTAL_SLOTS;
  const radius = 150;
  const cx = 160;
  const cy = 160;
  const size = 320;

  function polarToCartesian(angleDeg, r) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function slicePath(startAngle, endAngle) {
    const p1 = polarToCartesian(startAngle, radius);
    const p2 = polarToCartesian(endAngle, radius);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;
  }

  const handleSpin = useCallback(() => {
    if (spinning || spinsRemaining <= 0) return;

    const targetSlotIndex = Math.floor(Math.random() * TOTAL_SLOTS);
    const targetSlot = slots[targetSlotIndex];

    // angle of the center of the target slot from top (0°)
    const targetCenter = targetSlotIndex * sliceAngle + sliceAngle / 2;
    // how many extra degrees to spin (5–7 full rotations)
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    // we want targetCenter to end up at top (0°/360°)
    const additionalDeg = (360 - (targetCenter % 360)) % 360;
    const totalSpin = extraRotations + additionalDeg;
    const newDeg = currentDeg + totalSpin;

    const wheel = wheelRef.current;
    wheel.style.setProperty('--spin-deg', `${totalSpin}deg`);
    wheel.style.setProperty('--spin-duration', '4s');
    wheel.style.transform = `rotate(${currentDeg}deg)`;
    wheel.classList.remove('wheel-spinning', 'wheel-shake');

    // force reflow
    void wheel.offsetWidth;
    wheel.classList.add('wheel-spinning');
    setSpinning(true);

    setTimeout(() => {
      wheel.classList.remove('wheel-spinning');
      wheel.style.transform = `rotate(${newDeg}deg)`;
      setCurrentDeg(newDeg);
      setSpinning(false);

      if (!targetSlot.isNamed) {
        wheel.classList.add('wheel-shake');
        setTimeout(() => wheel.classList.remove('wheel-shake'), 700);
      }

      onSpinComplete(targetSlot);
    }, 4100);
  }, [spinning, spinsRemaining, currentDeg, slots, sliceAngle, onSpinComplete]);

  return (
    <div className="flex flex-col items-center gap-7">
      {/* Pointer */}
      <div className="relative">
        <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 z-10 w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '24px solid #fbbf24',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          }}
        />

        {/* Outer ring */}
        <div className="rounded-full p-2 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706, #fbbf24)', padding: '6px' }}>
          <div className="rounded-full overflow-hidden"
            style={{ width: size, height: size, background: '#1c0a00' }}>

            {/* SVG Wheel */}
            <svg
              ref={wheelRef}
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              style={{ transform: `rotate(${currentDeg}deg)`, transformOrigin: 'center', display: 'block' }}
            >
              {slots.map((slot, i) => {
                const startAngle = i * sliceAngle;
                const endAngle = startAngle + sliceAngle;
                const midAngle = startAngle + sliceAngle / 2;
                const textR = radius * 0.65;
                const textPos = polarToCartesian(midAngle, textR);
                const color = getSlotColor(slot, i);

                return (
                  <g key={i}>
                    {/* Slice */}
                    <path
                      d={slicePath(startAngle, endAngle)}
                      fill={color}
                      stroke={slot.isNamed ? '#fbbf24' : '#7f1d1d'}
                      strokeWidth={slot.isNamed ? 2.5 : 1}
                    />
                    {/* Highlight overlay for named slots */}
                    {slot.isNamed && (
                      <path
                        d={slicePath(startAngle, endAngle)}
                        fill="rgba(251,191,36,0.18)"
                        stroke="none"
                      />
                    )}
                    {/* Text */}
                    <text
                      x={textPos.x}
                      y={textPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                      fontSize={slot.isNamed ? '11' : '16'}
                      fontWeight={slot.isNamed ? 'bold' : 'normal'}
                      fill={slot.isNamed ? '#fef08a' : 'rgba(255,255,255,0.8)'}
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {slot.label}
                    </text>
                    {/* Gold dot for named slots */}
                    {slot.isNamed && (
                      <circle
                        cx={polarToCartesian(midAngle, radius * 0.88).x}
                        cy={polarToCartesian(midAngle, radius * 0.88).y}
                        r="4"
                        fill="#fbbf24"
                      />
                    )}
                  </g>
                );
              })}

              {/* Center circle / logo */}
              <circle cx={cx} cy={cy} r="30" fill="#7f1d1d" stroke="#fbbf24" strokeWidth="3" />
              <circle cx={cx} cy={cy} r="26" fill="#991b1b" />
              <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fill="#fbbf24" fontWeight="bold">幸運</text>
              <text x={cx} y={cy + 12} textAnchor="middle" fontSize="14" fill="#fbbf24" fontWeight="bold">轉盤</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={spinning || spinsRemaining <= 0}
        className={`
          relative px-11 py-4 rounded-full text-xl font-bold shadow-xl transition-all
          ${spinning || spinsRemaining <= 0
            ? 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-60'
            : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-900 hover:from-yellow-300 hover:to-yellow-500 active:scale-95 hover:shadow-yellow-400/50 hover:shadow-2xl'
          }
        `}
      >
        {spinning ? '轉動中…' : '立即轉動！'}
        {spinsRemaining > 0 && !spinning && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
            {spinsRemaining}
          </span>
        )}
      </button>
    </div>
  );
}
