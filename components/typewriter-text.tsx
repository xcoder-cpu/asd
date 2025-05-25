"use client"
import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
  hideCursorAfter?: number
}

export function TypewriterText({ text, delay = 0, className = "", hideCursorAfter }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const startTyping = () => {
      setShowCursor(true) // Показываем курсор сразу
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)

          // Убираем курсор через заданное время или через 100мс по умолчанию
          setTimeout(() => {
            setShowCursor(false)
          }, hideCursorAfter || 100)
        }
      }, 70) // Немного замедлили до 0.07 сек на символ
    }

    const timer = setTimeout(startTyping, delay)
    return () => clearTimeout(timer)
  }, [text, delay, hideCursorAfter])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="cursor">▮</span>}
    </span>
  )
}
