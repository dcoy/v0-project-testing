"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle, Sparkles, SkullIcon } from "lucide-react"
import Briefcase from "./briefcase"
import Contraband from "./contraband"
import { NeonButton } from "./neon-button"

export default function ViceCityGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [contrabandPosition, setContrabandPosition] = useState(1)
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [isShuffling, setIsShuffling] = useState(false)
  const [result, setResult] = useState<"win" | "lose" | null>(null)
  const [score, setScore] = useState({ wins: 0, losses: 0 })
  const [cash, setCash] = useState(1000)
  const shuffleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showIntro, setShowIntro] = useState(true)

  // Sound effects
  const playSoundEffect = (type: "win" | "lose" | "select" | "shuffle" | "start") => {
    // In a real implementation, we would play actual sounds here
    console.log(`Playing sound: ${type}`)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (shuffleTimeoutRef.current) {
        clearTimeout(shuffleTimeoutRef.current)
      }
    }
  }, [])

  const startGame = () => {
    playSoundEffect("start")
    setShowIntro(false)
    setGameStarted(true)
    setGameOver(false)
    setSelectedCase(null)
    setResult(null)
    const newPosition = Math.floor(Math.random() * 3) + 1
    setContrabandPosition(newPosition)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setSelectedCase(null)
    setResult(null)
    setShowIntro(true)
    setCash(1000)
  }

  const shuffleCases = () => {
    if (isShuffling || gameOver) return

    playSoundEffect("shuffle")
    setIsShuffling(true)

    // Simulate shuffling animation
    shuffleTimeoutRef.current = setTimeout(() => {
      const newPosition = Math.floor(Math.random() * 3) + 1
      setContrabandPosition(newPosition)
      setIsShuffling(false)
    }, 1500)
  }

  const selectCase = (caseNumber: number) => {
    if (isShuffling || gameOver || !gameStarted || selectedCase !== null) return

    playSoundEffect("select")
    setSelectedCase(caseNumber)
    setGameOver(true)

    if (caseNumber === contrabandPosition) {
      playSoundEffect("win")
      setResult("win")
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }))
      setCash((prev) => prev + 500)
    } else {
      playSoundEffect("lose")
      setResult("lose")
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }))
      setCash((prev) => Math.max(0, prev - 200))
    }
  }

  return (
    <div className="w-full bg-black/60 backdrop-blur-sm rounded-xl shadow-[0_0_20px_rgba(255,65,180,0.3)] p-6 md:p-8 border border-teal-400/30">
      <div className="flex flex-col items-center">
        {showIntro ? (
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-pink-500 mb-4 uppercase tracking-wider">WELCOME TO THE HUSTLE</h2>
              <p className="text-teal-300 mb-6 text-lg">
                The cops are onto a shipment of <span className="text-pink-400 font-bold">contraband</span>. Your job is
                to track which briefcase contains the goods after the shuffle. Find it and earn $500. Guess wrong and
                lose $200.
              </p>
            </motion.div>

            <NeonButton onClick={startGame} color="pink">
              START GAMING
            </NeonButton>
          </div>
        ) : (
          <>
            <div className="flex justify-between w-full mb-6 px-4 py-2 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-lg border border-purple-500/30">
              <div className="text-teal-300 font-medium flex items-center gap-2">
                <span className="text-pink-500 font-bold">SCORE:</span> {score.wins}-{score.losses}
              </div>

              <div className="text-teal-300 font-medium flex items-center gap-2">
                <span className="text-pink-500 font-bold">CASH:</span> ${cash}
              </div>

              {!gameOver && (
                <NeonButton onClick={shuffleCases} disabled={isShuffling} color="teal" small>
                  <Shuffle size={16} className="mr-2" />
                  SHUFFLE
                </NeonButton>
              )}
            </div>

            <div className="relative w-full h-64 mb-8">
              {/* Neon glow effect on the table */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-xl"></div>

              {/* Contraband (only visible at start or when game is over) */}
              <AnimatePresence>
                {!isShuffling && (selectedCase !== null || !gameOver) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                    style={{
                      left: `${(contrabandPosition - 1) * 50 + 25 - 5}%`,
                      top: "70%",
                      transform: "translate(-50%, -50%)",
                      zIndex: selectedCase !== null ? 20 : 5,
                    }}
                  >
                    <Contraband />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Briefcases */}
              <div className="flex justify-around absolute w-full top-1/2 transform -translate-y-1/2">
                {[1, 2, 3].map((caseNumber) => (
                  <Briefcase
                    key={caseNumber}
                    position={caseNumber}
                    isSelected={selectedCase === caseNumber}
                    isShuffling={isShuffling}
                    onClick={() => selectCase(caseNumber)}
                    isRevealed={gameOver && (caseNumber === selectedCase || caseNumber === contrabandPosition)}
                    hasContraband={caseNumber === contrabandPosition}
                  />
                ))}
              </div>
            </div>

            {/* Game result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`text-center mb-6 p-4 rounded-lg ${
                    result === "win"
                      ? "bg-gradient-to-r from-teal-900/50 to-green-900/50 border border-teal-500/50"
                      : "bg-gradient-to-r from-pink-900/50 to-red-900/50 border border-pink-500/50"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">
                    {result === "win" ? (
                      <span className="flex items-center justify-center text-teal-300">
                        <Sparkles className="mr-2" size={20} />
                        SCORE! +$500
                      </span>
                    ) : (
                      <span className="flex items-center justify-center text-pink-400">
                        <SkullIcon className="mr-2" size={20} />
                        BUSTED! -$200
                      </span>
                    )}
                  </h3>
                  <p className="text-white">
                    {result === "win"
                      ? "You found the contraband! The cops are none the wiser."
                      : `The contraband was in briefcase ${contrabandPosition}. Better luck next time.`}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {gameOver ? (
                <NeonButton onClick={startGame} color="pink">
                  NEXT DEAL
                </NeonButton>
              ) : null}
              <NeonButton onClick={resetGame} color="purple" outline>
                BAIL OUT
              </NeonButton>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
