import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3, PieChart, Activity, ArrowRight, Zap, Shield, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white">Smart Stock Insights</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                from Simple Queries
              </span>
              <span className="block text-gray-600 dark:text-gray-300 text-2xl sm:text-3xl lg:text-4xl mt-2">
                Powered by AI
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your investment research with AI-powered reports. Simply ask a question about any stock, and get
              comprehensive analysis in seconds.
            </p>
            <div className="mt-10">
              <Link href="/query">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 opacity-20 dark:opacity-10">
          <TrendingUp className="h-16 w-16 text-blue-500" />
        </div>
        <div className="absolute top-32 right-20 opacity-20 dark:opacity-10">
          <BarChart3 className="h-12 w-12 text-purple-500" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20 dark:opacity-10">
          <PieChart className="h-14 w-14 text-green-500" />
        </div>
        <div className="absolute bottom-32 right-10 opacity-20 dark:opacity-10">
          <Activity className="h-10 w-10 text-orange-500" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Insightz?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get professional-grade investment analysis without the complexity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get comprehensive stock reports in seconds, not hours. Our AI processes complex financial data
                  instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Professional Grade</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Institutional-quality analysis covering financials, valuation, risks, and competitive landscape.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Always Updated</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time data integration ensures your reports reflect the latest market conditions and company
                  updates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Investment Research?
          </h2>
          <Link href="/query">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-full">
              Start Your First Report
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Insightz</span>
            </div>
            <div className="flex space-x-8">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Insightz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
