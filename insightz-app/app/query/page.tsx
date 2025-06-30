"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReportModal } from "@/components/ReportModal"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
}

interface QuerySummary {
  company: string
  focusAreas: string[]
  timeframe: string
  analysisType: string
}

// Configurable API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_FLASK_API_BASE_URL;

export default function QueryPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm here to help you generate comprehensive stock reports. What company would you like me to analyze?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [querySummary, setQuerySummary] = useState<QuerySummary>({
    company: "",
    focusAreas: [],
    timeframe: "",
    analysisType: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportData, setReportData] = useState(null)
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    try {
      const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage], summary: querySummary }),
      })
      if (!response.ok) throw new Error("API error")
      const data = await response.json()
      // Expecting: { message: string, summary: Partial<QuerySummary> }
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.message,
      }
      setMessages((prev) => [...prev, botMessage])
      setQuerySummary((prev) => ({ ...prev, ...data.summary }))
    } catch (err) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "Sorry, there was a problem getting a response. Please try again.",
      }
      setMessages((prev) => [...prev, botMessage])
    }
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: querySummary, messages }),
      })
      if (!response.ok) throw new Error("API error")
      const data = await response.json()
      setReportData(data)
      setIsGenerating(false)
      setShowReportModal(true)
    } catch (err) {
      setIsGenerating(false)
      // Optionally show an error toast or message
    }
  }

  const canGenerateReport = querySummary.company && messages.length > 2

  return (
    <>
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Generate Stock Report</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Tell me what you'd like to analyze, and I'll help you create a comprehensive investment report.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2" style={{ minHeight: 0, maxHeight: 400 }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        }`}
                        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Query Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-6 pr-2" style={{ minHeight: 0, maxHeight: 400 }}>
                  {querySummary.company && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Company</h3>
                      <Badge variant="secondary" className="text-sm">
                        {querySummary.company}
                      </Badge>
                    </div>
                  )}

                  {querySummary.focusAreas.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Focus Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {querySummary.focusAreas.map((area, index) => (
                          <Badge key={index} variant="outline">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {querySummary.timeframe && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Timeframe</h3>
                      <Badge variant="secondary">{querySummary.timeframe}</Badge>
                    </div>
                  )}

                  <div className="pt-6 border-t">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Report Will Include:</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li>• Business Overview & Key Metrics</li>
                      <li>• Financial Performance Analysis</li>
                      <li>• Valuation & Investment Thesis</li>
                      <li>• Risk Factors & Board Information</li>
                      <li>• Competitive Landscape</li>
                      <li>• Strategic Outlook & Recommendations</li>
                    </ul>
                  </div>
                </div>
                <Button
                  onClick={handleGenerateReport}
                  disabled={!canGenerateReport || isGenerating}
                  className="w-full mt-6"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Report...
                    </>
                  ) : (
                    "Generate Report"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ReportModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportData={reportData}
      />
    </>
  )
}
