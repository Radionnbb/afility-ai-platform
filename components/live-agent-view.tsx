"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface AnalysisStep {
  id: string
  label: string
  status: "pending" | "in-progress" | "completed"
}

interface LiveAgentViewProps {
  isVisible: boolean
}

export function LiveAgentView({ isVisible }: LiveAgentViewProps) {
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: "1", label: "تحليل الصفحة...", status: "pending" },
    { id: "2", label: "استخراج الصور...", status: "pending" },
    { id: "3", label: "تحليل المحتوى...", status: "pending" },
    { id: "4", label: "مقارنة الأسعار...", status: "pending" },
    { id: "5", label: "عرض النتائج...", status: "pending" },
  ])

  useEffect(() => {
    if (!isVisible) return

    // Simulate step progression
    steps.forEach((step, index) => {
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => {
            if (i === index) return { ...s, status: "in-progress" }
            if (i < index) return { ...s, status: "completed" }
            return s
          }),
        )
      }, index * 600)

      setTimeout(
        () => {
          setSteps((prev) =>
            prev.map((s, i) => {
              if (i === index) return { ...s, status: "completed" }
              return s
            }),
          )
        },
        index * 600 + 400,
      )
    })
  }, [isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto my-8 p-6 rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm"
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="w-5 h-5 text-blue-400" />
          </motion.div>
          Live Agent Analysis
        </h3>
        <p className="text-sm text-gray-400 mt-1">Processing your request in real-time...</p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
          >
            {/* Status Icon */}
            <motion.div
              animate={
                step.status === "in-progress"
                  ? { rotate: 360 }
                  : step.status === "completed"
                    ? { scale: [1, 1.2, 1] }
                    : {}
              }
              transition={
                step.status === "in-progress"
                  ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                  : step.status === "completed"
                    ? { duration: 0.4 }
                    : {}
              }
            >
              {step.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : step.status === "in-progress" ? (
                <Loader2 className="w-5 h-5 text-blue-400" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
              )}
            </motion.div>

            {/* Label */}
            <motion.span
              animate={step.status === "in-progress" ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
              transition={step.status === "in-progress" ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY } : {}}
              className={`text-sm font-medium ${
                step.status === "completed"
                  ? "text-green-400"
                  : step.status === "in-progress"
                    ? "text-blue-400"
                    : "text-gray-400"
              }`}
            >
              {step.label}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 pt-4 border-t border-gray-700/50 text-xs text-gray-500 text-center"
      >
        Powered by Manus AI & OpenAI
      </motion.div>
    </motion.div>
  )
}
