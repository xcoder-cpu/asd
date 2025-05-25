"use client"
import { useState, useEffect } from "react"

export function TypewriterTitle() {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const fullText = "Transform Your\nResearch with AI Power"
  const splitPoint = 28 // Позиция где начинается "AI Power" в полном тексте

  useEffect(() => {
    let currentIndex = 0

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typeInterval)

        // Начинаем плавное исчезновение через 200мс
        setTimeout(() => {
          const cursor = document.querySelector(".typewriter-cursor") as HTMLElement
          if (cursor) {
            cursor.style.opacity = "0"
          }
        }, 200)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [])

  // Разделяем текст на строки
  const lines = displayedText.split("\n")
  const firstLine = lines[0] || ""
  const secondLine = lines[1] || ""

  // Определяем где начинается "AI Power" во второй строке
  const aiPowerStart = "Research with ".length
  const secondLineBeforeAI = secondLine.slice(0, aiPowerStart)
  const aiPowerText = secondLine.slice(aiPowerStart)

  return (
    <span>
      <span className="text-white glow-white">{firstLine}</span>
      {secondLine && (
        <>
          <br />
          <span className="text-white glow-white">{secondLineBeforeAI}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 via-pink-500 to-purple-400 bg-[length:200%_100%] animate-gradient glow-gradient font-[family-name:var(--font-orbitron)] font-bold">
            {aiPowerText}
          </span>
        </>
      )}
      {showCursor && (
        <span className="typewriter-cursor text-white transition-opacity duration-150 ease-out inline-block w-3 glow-white">
          ▮
        </span>
      )}
    </span>
  )
}
