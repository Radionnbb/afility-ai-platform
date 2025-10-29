"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle2, AlertCircle, Zap, Search, Brain, Link2, TrendingDown } from "lucide-react"

interface AgentStep {
  id: string
  name: string
  status: "pending" | "running" | "completed" | "error"
  message: string
  duration?: number
  details?: string
}

export default function LiveAgentPage() {
  const [steps, setSteps] = useState<AgentStep[]>([
    {
      id: "1",
      name: "Analyzing Input",
      status: "pending",
      message: "Preparing to analyze your request...",
    },
    {
      id: "2",
      name: "Fetching Product Data",
      status: "pending",
      message: "Connecting to Manus API...",
    },
    {
      id: "3",
      name: "Searching Alternatives",
      status: "pending",
      message: "Querying Admitad for alternatives...",
    },
    {
      id: "4",
      name: "AI Analysis",
      status: "pending",
      message: "Analyzing with OpenAI...",
    },
    {
      id: "5",
      name: "Generating Affiliate Links",
      status: "pending",
      message: "Creating affiliate URLs...",
    },
    {
      id: "6",
      name: "Compiling Results",
      status: "pending",
      message: "Organizing final results...",
    },
  ])

  const [overallProgress, setOverallProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate agent progress
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps]
        const pendingIndex = newSteps.findIndex((s) => s.status === "pending")

        if (pendingIndex === -1) {
          // All steps completed
          setIsComplete(true)
          clearInterval(interval)
          return newSteps
        }

        // Move current step to completed and next to running
        if (newSteps[pendingIndex - 1]?.status === "running") {
          newSteps[pendingIndex - 1].status = "completed"
          newSteps[pendingIndex - 1].duration = Math.floor(Math.random() * 2000) + 500
        }

        if (newSteps[pendingIndex].status === "pending") {
          newSteps[pendingIndex].status = "running"
        }

        return newSteps
      })

      setOverallProgress((prev) => Math.min(prev + Math.random() * 20, 95))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isComplete) {
      setOverallProgress(100)
    }
  }, [isComplete])

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
    }
  }

  const stepIcons: Record<string, React.ReactNode> = {
    "1": <Search className="w-4 h-4" />,
    "2": <Zap className="w-4 h-4" />,
    "3": <Search className="w-4 h-4" />,
    "4": <Brain className="w-4 h-4" />,
    "5": <Link2 className="w-4 h-4" />,
    "6": <TrendingDown className="w-4 h-4" />,
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Live Agent
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Analysis</span>
          </h1>
          <p className="text-xl text-gray-400">Watch as our AI analyzes your product in real-time</p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Overall Progress</CardTitle>
            <CardDescription className="text-gray-400">
              {isComplete ? "Analysis Complete!" : "Processing your request..."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={overallProgress} className="h-3" />
            <div className="text-right text-sm text-gray-400">{Math.round(overallProgress)}% Complete</div>
          </CardContent>
        </Card>

        {/* Steps Timeline */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <Card
              key={step.id}
              className={`border-gray-800 bg-gradient-to-br backdrop-blur-xl transition-all duration-300 ${
                step.status === "running"
                  ? "from-blue-900/30 to-blue-800/20 border-blue-600/50 shadow-lg shadow-blue-500/20"
                  : step.status === "completed"
                    ? "from-green-900/20 to-green-800/10 border-green-600/30"
                    : "from-gray-900/50 to-black/50"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getStepIcon(step.status)}</div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{step.name}</h3>
                      {stepIcons[step.id] && <span className="text-gray-400">{stepIcons[step.id]}</span>}
                      {step.status === "completed" && (
                        <Badge className="bg-green-600 text-white text-xs">
                          {step.duration ? `${(step.duration / 1000).toFixed(1)}s` : "Done"}
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm mb-2">{step.message}</p>

                    {step.details && (
                      <div className="mt-3 p-3 bg-gray-800/50 rounded text-xs text-gray-300 font-mono">
                        {step.details}
                      </div>
                    )}
                  </div>
                </div>

                {index < steps.length - 1 && <div className="ml-2.5 mt-4 h-8 border-l-2 border-gray-700"></div>}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completion Message */}
        {isComplete && (
          <Card className="mt-8 border-green-600/50 bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Analysis Complete!</h3>
              <p className="text-gray-400 mb-6">
                Your product has been analyzed and alternatives have been found. Check the results page for details.
              </p>
              <a
                href="/results"
                className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-300"
              >
                View Results
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
