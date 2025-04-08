"use client"

import { motion } from "framer-motion"

interface BriefcaseProps {
  position: number
  isSelected: boolean
  isShuffling: boolean
  isRevealed: boolean
  hasContraband: boolean
  onClick: () => void
}

export default function Briefcase({
  position,
  isSelected,
  isShuffling,
  isRevealed,
  hasContraband,
  onClick,
}: BriefcaseProps) {
  // Calculate the lift amount based on whether the case is revealed
  const liftAmount = isRevealed ? -60 : 0

  // Shuffling animation variants
  const shuffleVariants = {
    initial: { x: 0 },
    shuffle: (custom: number) => ({
      x: [0, custom * 100, -custom * 80, custom * 60, -custom * 40, custom * 20, 0],
      transition: {
        duration: 1.5,
        times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
        ease: "easeInOut",
      },
    }),
  }

  // Custom factor for shuffle direction based on position
  const shuffleFactor = position === 1 ? -1 : position === 3 ? 1 : position % 2 === 0 ? 1 : -1

  return (
    <motion.div
      className="relative cursor-pointer"
      animate={isShuffling ? "shuffle" : "initial"}
      variants={shuffleVariants}
      custom={shuffleFactor}
      onClick={onClick}
      whileHover={!isShuffling && !isRevealed ? { y: -10, scale: 1.05 } : {}}
      style={{ zIndex: isSelected ? 30 : 10 }}
    >
      <motion.div
        animate={{
          y: liftAmount,
          rotateX: isRevealed ? 10 : 0,
          rotateY: isRevealed ? 5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="w-28 h-24 md:w-36 md:h-28 relative"
      >
        {/* Briefcase with 80s Vice City style */}
        <div className="w-full h-full relative">
          {/* Briefcase body */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-md overflow-hidden">
            {/* Briefcase texture and details */}
            <div className="absolute inset-0">
              {/* Leather texture */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-black"
                    style={{
                      height: `${1 + Math.random() * 2}px`,
                      width: `${80 + Math.random() * 20}%`,
                      top: `${10 + Math.random() * 80}%`,
                      left: `${10 + Math.random() * 10}%`,
                      opacity: 0.2,
                    }}
                  ></div>
                ))}
              </div>

              {/* Neon trim */}
              <div
                className={`absolute inset-0 border-2 rounded-md ${position === 1 ? "border-pink-500" : position === 2 ? "border-teal-400" : "border-purple-500"} opacity-70 shadow-[0_0_5px_rgba(255,65,180,0.5)]`}
              ></div>

              {/* Briefcase middle line */}
              <div className="absolute top-[30%] left-0 right-0 h-[2px] bg-gray-600"></div>

              {/* Briefcase handle */}
              <div className="absolute top-[10%] left-[40%] w-[20%] h-[10%]">
                <div className="absolute inset-0 bg-gray-700 rounded-t-md"></div>
                <div className="absolute top-full left-0 w-[20%] h-[100%] bg-gray-700"></div>
                <div className="absolute top-full right-0 w-[20%] h-[100%] bg-gray-700"></div>
              </div>

              {/* Briefcase locks */}
              <div className="absolute top-[30%] left-[15%] w-[10%] h-[5%] bg-gray-600 rounded-sm"></div>
              <div className="absolute top-[30%] right-[15%] w-[10%] h-[5%] bg-gray-600 rounded-sm"></div>

              {/* Neon glow effect */}
              <div
                className={`absolute inset-0 ${position === 1 ? "bg-pink-500" : position === 2 ? "bg-teal-400" : "bg-purple-500"} opacity-0 ${isSelected || isRevealed ? "animate-pulse opacity-10" : ""}`}
              ></div>
            </div>
          </div>

          {/* Position number in 80s style */}
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black border-2 border-white flex items-center justify-center text-white font-bold text-sm z-20">
            {position}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
