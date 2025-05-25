"use client"

import { useEffect, useRef, useState } from "react"

interface SparklesProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
}

export const SparklesCore = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = "h-full w-full",
  particleColor = "#FFFFFF",
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Particle class
    class Particle {
      baseX: number
      baseY: number
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      depth: number // for parallax effect

      constructor() {
        this.baseX = Math.random() * canvas.width
        this.baseY = Math.random() * canvas.height
        this.x = this.baseX
        this.y = this.baseY
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * (maxSize - minSize) + minSize
        this.opacity = Math.random() * 0.5 + 0.5
        this.depth = Math.random() * 0.8 + 0.2 // 0.2 to 1.0 for parallax
      }

      update() {
        // Basic movement
        this.baseX += this.vx
        this.baseY += this.vy

        // Wrap around edges
        if (this.baseX < 0) this.baseX = canvas.width
        if (this.baseX > canvas.width) this.baseX = 0
        if (this.baseY < 0) this.baseY = canvas.height
        if (this.baseY > canvas.height) this.baseY = 0

        // Parallax effect based on mouse position
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const mouseOffsetX = (mousePos.x - centerX) * this.depth * 0.1
        const mouseOffsetY = (mousePos.y - centerY) * this.depth * 0.1

        this.x = this.baseX - mouseOffsetX
        this.y = this.baseY - mouseOffsetY
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity * this.depth
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * this.depth, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < particleDensity; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    // Resize handler
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [minSize, maxSize, particleDensity, particleColor])

  return <canvas ref={canvasRef} id={id} className={className} style={{ background }} />
}
