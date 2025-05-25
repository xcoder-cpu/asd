"use client"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import { TypewriterTitle } from "@/components/typewriter-title"

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <TypewriterTitle />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Upload your research papers and let our AI transform them into engaging presentations, podcasts, and visual
            content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group relative px-8 py-4 text-lg font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_100%] animate-gradient-slow hover:shadow-2xl hover:shadow-purple-500/50 font-[family-name:var(--font-orbitron)]">
              <span className="relative z-10 flex items-center text-white group-hover:text-gray-100 transition-colors duration-300">
                <FileText className="mr-2 h-5 w-5" />
                Upload Paper
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group relative px-8 py-4 text-lg font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 border-2 border-purple-500 bg-transparent hover:shadow-2xl hover:shadow-purple-500/30 font-[family-name:var(--font-orbitron)]">
              <span className="relative z-10 flex items-center text-white group-hover:text-gray-100 transition-colors duration-300">
                <Sparkles className="mr-2 h-5 w-5" />
                See Examples
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 bg-[length:200%_100%] animate-gradient-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}
