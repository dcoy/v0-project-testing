"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { motion } from "framer-motion"

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  color?: "pink" | "teal" | "purple"
  outline?: boolean
  small?: boolean
}

export function NeonButton({ children, color = "pink", outline = false, small = false, ...props }: NeonButtonProps) {
  const colorMap = {
    pink: {
      bg: "bg-pink-500",
      border: "border-pink-500",
      text: "text-white",
      shadow: "shadow-[0_0_10px_rgba(255,65,180,0.7)]",
      hoverBg: "hover:bg-pink-600",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(255,65,180,0.9)]",
      outlineBg: "bg-transparent",
      outlineText: "text-pink-500",
      outlineHoverBg: "hover:bg-pink-500/10",
    },
    teal: {
      bg: "bg-teal-400",
      border: "border-teal-400",
      text: "text-black",
      shadow: "shadow-[0_0_10px_rgba(0,242,234,0.7)]",
      hoverBg: "hover:bg-teal-500",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(0,242,234,0.9)]",
      outlineBg: "bg-transparent",
      outlineText: "text-teal-400",
      outlineHoverBg: "hover:bg-teal-400/10",
    },
    purple: {
      bg: "bg-purple-500",
      border: "border-purple-500",
      text: "text-white",
      shadow: "shadow-[0_0_10px_rgba(185,103,255,0.7)]",
      hoverBg: "hover:bg-purple-600",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(185,103,255,0.9)]",
      outlineBg: "bg-transparent",
      outlineText: "text-purple-500",
      outlineHoverBg: "hover:bg-purple-500/10",
    },
  }

  const selectedColor = colorMap[color]

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${small ? "px-3 py-1 text-sm" : "px-6 py-2 text-lg"} 
        ${outline ? selectedColor.outlineBg : selectedColor.bg}
        ${outline ? selectedColor.outlineText : selectedColor.text}
        ${outline ? selectedColor.border : selectedColor.border}
        ${outline ? "" : selectedColor.shadow}
        ${outline ? selectedColor.outlineHoverBg : selectedColor.hoverBg}
        ${outline ? "" : selectedColor.hoverShadow}
        font-bold uppercase tracking-wider rounded border-2 transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}
