"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Hash, TrendingUp, AlertTriangle, Users, Target, Building } from "lucide-react"

export default function ReportPage() {
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [downloadingMd, setDownloadingMd] = useState(false)

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true)
    // Simulate PDF generation
    setTimeout(() => {
      setDownloadingPdf(false)
      // In real implementation, trigger PDF download
      console.log("Downloading PDF...")
    }, 2000)
  }

  const handleDownloadMarkdown = async () => {
    setDownloadingMd(true)
    // Simulate Markdown generation
    setTimeout(() => {
      setDownloadingMd(false)
      // In real implementation, trigger Markdown download
      console.log("Downloading Markdown...")
    }, 1500)
  }

  const reportData = {
    company: "Tesla, Inc. (TSLA)",
    generatedAt: new Date().toLocaleDateString(),
    summary:
      "Tesla continues to lead the electric vehicle revolution with strong growth prospects, though faces increasing competition and valuation concerns.",
    keyMetrics: {
      marketCap: "$800.2B",
      peRatio: "65.4",
      revenue: "$96.8B",
      grossMargin: "19.3%",
    },
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Investment Report</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span>{reportData.company}</span>
                <span>•</span>
                <span>Generated on {reportData.generatedAt}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                variant="outline"
                className="bg-white dark:bg-gray-800"
              >
                {downloadingPdf ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                PDF
              </Button>
              <Button
                onClick={handleDownloadMarkdown}
                disabled={downloadingMd}
                variant="outline"
                className="bg-white dark:bg-gray-800"
              >
                {downloadingMd ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                Markdown
              </Button>
            </div>
          </div>

          {/* Executive Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-blue-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{reportData.summary}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {reportData.keyMetrics.marketCap}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Market Cap</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {reportData.keyMetrics.peRatio}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">P/E Ratio</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {reportData.keyMetrics.revenue}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Revenue (TTM)</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {reportData.keyMetrics.grossMargin}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Gross Margin</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Sections */}
        <Accordion type="multiple" defaultValue={["business-overview"]} className="space-y-4">
          <AccordionItem value="business-overview">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="text-lg font-semibold">Business Overview</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Tesla, Inc. is a leading electric vehicle and clean energy company founded in 2003. The company
                      designs, develops, manufactures, and sells electric vehicles, energy generation and storage
                      systems, and related products and services globally.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Business Segments</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• Automotive (85% of revenue)</li>
                          <li>• Energy Generation & Storage (7%)</li>
                          <li>• Services & Other (8%)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Geographic Presence</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• United States (47% of revenue)</li>
                          <li>• China (23% of revenue)</li>
                          <li>• Other International (30%)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="financial-performance">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-lg font-semibold">Financial Performance</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">+15%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Revenue Growth (YoY)</div>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$15.0B</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Free Cash Flow (TTM)</div>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">22.8%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Net Margin</div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Tesla has demonstrated strong financial performance with consistent revenue growth, improving
                      margins, and robust cash generation. The company has achieved profitability across all major
                      segments and maintains a strong balance sheet position.
                    </p>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="valuation">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="text-lg font-semibold">Valuation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">Current Price: $248.50</Badge>
                      <Badge variant="outline">52W High: $299.29</Badge>
                      <Badge variant="outline">52W Low: $138.80</Badge>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Tesla trades at a premium valuation compared to traditional automakers, reflecting its growth
                      prospects and technology leadership. The stock appears fairly valued considering the company's
                      execution track record and market opportunity.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Valuation Metrics</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• P/E Ratio: 65.4x (vs Industry: 12.5x)</li>
                          <li>• PEG Ratio: 1.8x</li>
                          <li>• Price/Sales: 8.2x</li>
                          <li>• EV/EBITDA: 45.2x</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Price Targets</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• Average Target: $275</li>
                          <li>• High Target: $350</li>
                          <li>• Low Target: $180</li>
                          <li>• Upside Potential: +11%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="risk-factors">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="text-lg font-semibold">Risk Factors & Board Info</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Risk Factors</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Badge variant="destructive" className="mt-0.5">
                            High
                          </Badge>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Competition Risk</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              Increasing competition from traditional automakers and new EV entrants
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">
                            Medium
                          </Badge>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Regulatory Risk</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              Changes in EV incentives and autonomous driving regulations
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">
                            Medium
                          </Badge>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Supply Chain Risk</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              Dependence on battery supply chain and raw materials
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Board Composition</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Tesla's board includes 8 directors with diverse backgrounds in technology, automotive, and
                        finance. Recent governance improvements include enhanced independence and oversight
                        capabilities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="competitive-landscape">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span className="text-lg font-semibold">Competitive Landscape</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Tesla maintains a strong competitive position in the EV market, though faces increasing pressure
                      from both traditional automakers and new entrants.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Competitors</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• BYD (China market leader)</li>
                          <li>• Volkswagen Group (ID series)</li>
                          <li>• General Motors (Ultium platform)</li>
                          <li>• Ford (F-150 Lightning, Mustang Mach-E)</li>
                          <li>• Rivian (Electric trucks)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Competitive Advantages</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• Supercharger network</li>
                          <li>• Vertical integration</li>
                          <li>• Software capabilities</li>
                          <li>• Brand strength</li>
                          <li>• Manufacturing efficiency</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="strategic-outlook">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-indigo-600" />
                  <span className="text-lg font-semibold">Strategic Outlook</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Tesla is well-positioned for continued growth driven by global EV adoption, energy storage
                      expansion, and autonomous driving development.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Catalysts</h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          <li>• Model 3/Y refresh cycles</li>
                          <li>• Cybertruck production ramp</li>
                          <li>• Energy storage growth</li>
                          <li>• FSD/Robotaxi potential</li>
                          <li>• International expansion</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Investment Recommendation</h4>
                        <div className="space-y-2">
                          <Badge variant="default" className="bg-green-600">
                            BUY
                          </Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Strong execution track record, leading market position, and multiple growth drivers support
                            a positive outlook despite valuation premium.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
