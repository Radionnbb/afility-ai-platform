"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

interface WebPreviewProps {
  url: string
  isExpanded: boolean
  onClose: () => void
}

export function WebPreview({ url, isExpanded, onClose }: WebPreviewProps) {
  return (
    <motion.div
      initial={{ width: "300px", opacity: 0 }}
      animate={{
        width: isExpanded ? "100%" : "300px",
        opacity: isExpanded ? 1 : 0.8,
      }}
      exit={{ width: "300px", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative rounded-lg overflow-hidden border border-gray-700 bg-gray-900/50 backdrop-blur-sm shadow-lg"
    >
      {/* Close Button */}
      {isExpanded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4 text-gray-300" />
        </motion.button>
      )}

      {/* iframe Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full h-full"
      >
        <iframe
          src={url}
          title="Product Preview"
          className="w-full h-full border-none"
          style={{ minHeight: isExpanded ? "600px" : "300px" }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </motion.div>

      {/* Loading Indicator */}
      {!isExpanded && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-2 left-2 text-xs text-gray-400"
        >
          Loading preview...
        </motion.div>
      )}
    </motion.div>
  )
}
