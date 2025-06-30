"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Eye, Download, Search, Calendar, TrendingUp, Filter } from "lucide-react"
import Link from "next/link"

interface Report {
  id: string
  company: string
  ticker: string
  query: string
  timestamp: Date
  status: "completed" | "processing" | "failed"
  type: string
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "processing" | "failed">("all")

  // Mock data - in real app, this would come from API
  const reports: Report[] = [
    {
      id: "1",
      company: "Tesla, Inc.",
      ticker: "TSLA",
      query: "Generate comprehensive analysis focusing on financial performance and competitive position",
      timestamp: new Date("2024-01-15T10:30:00"),
      status: "completed",
      type: "Comprehensive Analysis",
    },
    {
      id: "2",
      company: "Apple Inc.",
      ticker: "AAPL",
      query: "Analyze Q4 earnings and provide valuation assessment",
      timestamp: new Date("2024-01-14T15:45:00"),
      status: "completed",
      type: "Earnings Analysis",
    },
    {
      id: "3",
      company: "Microsoft Corporation",
      ticker: "MSFT",
      query: "Risk assessment and competitive landscape analysis",
      timestamp: new Date("2024-01-13T09:15:00"),
      status: "completed",
      type: "Risk Analysis",
    },
    {
      id: "4",
      company: "NVIDIA Corporation",
      ticker: "NVDA",
      query: "AI market opportunity and growth prospects evaluation",
      timestamp: new Date("2024-01-12T14:20:00"),
      status: "processing",
      type: "Growth Analysis",
    },
    {
      id: "5",
      company: "Amazon.com Inc.",
      ticker: "AMZN",
      query: "Cloud business segment analysis and AWS competitive position",
      timestamp: new Date("2024-01-11T11:00:00"),
      status: "completed",
      type: "Segment Analysis",
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.query.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || report.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleViewReport = (reportId: string) => {
    // In real app, navigate to specific report
    console.log("Viewing report:", reportId)
  }

  const handleDownloadReport = (reportId: string, format: "pdf" | "markdown") => {
    // In real app, trigger download
    console.log(`Downloading report ${reportId} as ${format}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-600">
            Completed
          </Badge>
        )
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Report History</h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your previously generated investment reports.
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by company, ticker, or query..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "completed" ? "default" : "outline"}
                  onClick={() => setFilterStatus("completed")}
                  size="sm"
                >
                  Completed
                </Button>
                <Button
                  variant={filterStatus === "processing" ? "default" : "outline"}
                  onClick={() => setFilterStatus("processing")}
                  size="sm"
                >
                  Processing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No reports found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "You haven't generated any reports yet."}
                </p>
                <Link href="/query">
                  <Button>Generate Your First Report</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.company}</h3>
                        <Badge variant="outline">{report.ticker}</Badge>
                        {getStatusBadge(report.status)}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{report.query}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {report.timestamp.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Filter className="h-4 w-4" />
                          {report.type}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {report.status === "completed" && (
                        <>
                          <Link href="/report">
                            <Button variant="outline" size="sm" onClick={() => handleViewReport(report.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.id, "pdf")}>
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadReport(report.id, "markdown")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            MD
                          </Button>
                        </>
                      )}
                      {report.status === "processing" && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                          Processing...
                        </div>
                      )}
                      {report.status === "failed" && (
                        <Button variant="outline" size="sm">
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination would go here in a real app */}
        {filteredReports.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing {filteredReports.length} of {reports.length} reports
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
