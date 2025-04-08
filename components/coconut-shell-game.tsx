"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Shuffle } from "lucide-react"
import Shell from "./shell"
import Pearl from "./pearl"

export default function CoconutShellGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [pearlPosition, setPearlPosition] = useState(1)
  const [selectedShell, setSelectedShell] = useState<number | null>(null)
  const [isShuffling, setIsShuffling] = useState(false)
  const [result, setResult] = useState<"win" | "lose" | null>(null)
  const [score, setScore] = useState({ wins: 0, losses: 0 })
  const shuffleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (shuffleTimeoutRef.current) {
        clearTimeout(shuffleTimeoutRef.current)
      }
    }
  }, [])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setSelectedShell(null)
    setResult(null)
    const newPosition = Math.floor(Math.random() * 3) + 1
    setPearlPosition(newPosition)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setSelectedShell(null)
    setResult(null)
  }

  const shuffleShells = () => {
    if (isShuffling || gameOver) return

    setIsShuffling(true)

    // Simulate shuffling animation
    shuffleTimeoutRef.current = setTimeout(() => {
      const newPosition = Math.floor(Math.random() * 3) + 1
      setPearlPosition(newPosition)
      setIsShuffling(false)
    }, 1500)
  }

  const selectShell = (shellNumber: number) => {
    if (isShuffling || gameOver || !gameStarted || selectedShell !== null) return

    setSelectedShell(shellNumber)
    setGameOver(true)

    if (shellNumber === pearlPosition) {
      setResult("win")
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }))
    } else {
      setResult("lose")
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }))
    }
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="flex flex-col items-center">
        {!gameStarted ? (
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-teal-700 mb-4">How to Play</h2>
            <p className="text-teal-600 mb-6">
              A pearl will be hidden under one of the three coconut shells. After shuffling, try to guess which shell
              hides the pearl!
            </p>
            <Button
              onClick={startGame}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 rounded-full text-lg"
            >
              Start Game
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between w-full mb-4">
              <div className="text-teal-700 font-medium">
                Score: {score.wins} - {score.losses}
              </div>
              {!gameOver && (
                <Button
                  onClick={shuffleShells}
                  disabled={isShuffling}
                  variant="outline"
                  className="flex items-center gap-2 text-teal-600 border-teal-300"
                >
                  <Shuffle size={16} />
                  Shuffle
                </Button>
              )}
            </div>

            <div className="relative w-full h-64 mb-8">
              {/* Pearl (only visible at start or when game is over) */}
              <AnimatePresence>
                {!isShuffling && (selectedShell !== null || !gameOver) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                    style={{
                      left: `${(pearlPosition - 1) * 50 + 25 - 5}%`,
                      top: "70%",
                      transform: "translate(-50%, -50%)",
                      zIndex: selectedShell !== null ? 20 : 5,
                    }}
                  >
                    <Pearl />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shells */}
              <div className="flex justify-around absolute w-full top-1/2 transform -translate-y-1/2">
                {[1, 2, 3].map((shellNumber) => (
                  <Shell
                    key={shellNumber}
                    position={shellNumber}
                    isSelected={selectedShell === shellNumber}
                    isShuffling={isShuffling}
                    onClick={() => selectShell(shellNumber)}
                    isRevealed={gameOver && (shellNumber === selectedShell || shellNumber === pearlPosition)}
                    hasPearl={shellNumber === pearlPosition}
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
                    result === "win" ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{result === "win" ? "You found it!" : "Not this time!"}</h3>
                  <p>
                    {result === "win"
                      ? "Great job! You found the pearl!"
                      : `The pearl was under shell ${pearlPosition}.`}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {gameOver ? (
                <Button onClick={startGame} className="bg-teal-500 hover:bg-teal-600 text-white px-6">
                  Play Again
                </Button>
              ) : null}
              <Button onClick={resetGame} variant="outline" className="border-teal-300 text-teal-600">
                Reset Game
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
