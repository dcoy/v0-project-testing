"use client"

import { motion } from "framer-motion"

interface ShellProps {
  position: number
  isSelected: boolean
  isShuffling: boolean
  isRevealed: boolean
  hasPearl: boolean
  onClick: () => void
}

export default function Shell({ position, isSelected, isShuffling, isRevealed, hasPearl, onClick }: ShellProps) {
  // Calculate the lift amount based on whether the shell is revealed and has the pearl
  const liftAmount = isRevealed ? (hasPearl ? -80 : -40) : 0

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
      whileHover={!isShuffling && !isRevealed ? { y: -10 } : {}}
      style={{ zIndex: isSelected ? 30 : 10 }}
    >
      <motion.div
        animate={{
          y: liftAmount,
          rotateX: isRevealed ? 40 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="w-24 h-24 md:w-32 md:h-32"
      >
        {/* Real coconut shell */}
        <div className="relative w-full h-full">
          {/* Coconut bottom half */}
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-full overflow-hidden">
            {/* Coconut texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-1/2 h-full bg-black opacity-10 rounded-full"></div>
              <div className="absolute top-1/4 left-1/3 w-1/3 h-1/2 bg-black opacity-10 rounded-full"></div>
            </div>
          </div>

          {/* Coconut top half */}
          <div className="absolute top-0 w-full h-3/5 overflow-hidden">
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-[100%]">
              {/* Coconut hair/fibers */}
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-amber-900"
                    style={{
                      height: `${2 + Math.random() * 4}px`,
                      width: `${30 + Math.random() * 20}%`,
                      top: `${10 + Math.random() * 40}%`,
                      left: `${10 + Math.random() * 60}%`,
                      transform: `rotate(${Math.random() * 180}deg)`,
                      opacity: 0.7,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Coconut rim/edge */}
          <div className="absolute top-[45%] w-full h-[10%] bg-amber-950 rounded-full transform -translate-y-1/2"></div>

          {/* Coconut inner edge */}
          <div className="absolute top-[45%] left-[10%] w-[80%] h-[5%] bg-amber-800 rounded-full transform -translate-y-1/2"></div>

          {/* Coconut highlights */}
          <div className="absolute top-[20%] left-[60%] w-[15%] h-[10%] bg-amber-600 rounded-full opacity-30"></div>
          <div className="absolute top-[30%] left-[20%] w-[10%] h-[8%] bg-amber-600 rounded-full opacity-20"></div>
        </div>
      </motion.div>
    </motion.div>
  )
}
