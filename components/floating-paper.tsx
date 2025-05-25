"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export function FloatingPaper({ count = 5 }) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [papers, setPapers] = useState<
    Array<{
      id: number
      initialX: number
      initialY: number
      duration: number
      delay: number
    }>
  >([])

  useEffect(() => {
    // Update dimensions only on client side
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Generate paper configurations
    const newPapers = Array.from({ length: count }).map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      duration: 25 + Math.random() * 15,
      delay: Math.random() * 5,
    }))
    setPapers(newPapers)

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [count])

  const generatePath = (paper: (typeof papers)[0]) => {
    const margin = 100
    return [
      { x: paper.initialX, y: paper.initialY },
      {
        x: margin + Math.random() * (dimensions.width - 2 * margin),
        y: margin + Math.random() * (dimensions.height - 2 * margin),
      },
      {
        x: margin + Math.random() * (dimensions.width - 2 * margin),
        y: margin + Math.random() * (dimensions.height - 2 * margin),
      },
      {
        x: margin + Math.random() * (dimensions.width - 2 * margin),
        y: margin + Math.random() * (dimensions.height - 2 * margin),
      },
    ]
  }

  return (
    <div className="relative w-full h-full">
      {papers.map((paper) => {
        const path = generatePath(paper)

        return (
          <motion.div
            key={paper.id}
            className="absolute"
            initial={{
              x: path[0].x,
              y: path[0].y,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: path.map((p) => p.x),
              y: path.map((p) => p.y),
              rotate: [0, 180, 360, 540],
              opacity: [0, 1, 1, 1, 0],
              scale: [0.8, 1, 1, 1, 0.8],
            }}
            transition={{
              duration: paper.duration,
              delay: paper.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              times: [0, 0.1, 0.5, 0.9, 1],
            }}
          >
            <motion.div
              className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <FileText className="w-8 h-8 text-purple-400/50" />
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
