/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { sipCalculator, formatIndianCurrency } from '../utils/sipCalculator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;
  console.log(value)
  value = value.replace(/^0+(?=\d)/, '');
  if (!isNaN(Number(value))) {
    console.log("hey", value)
    setter(value === '' ? '0' : value);
  }
};

export default function SIPCalculator() {
  const [sipAmount, setSipAmount] = useState<string>('10000')
  const [annualStepup, setAnnualStepup] = useState<string>('10')
  const [annualReturn, setAnnualReturn] = useState<string>('12')
  const [years, setYears] = useState<string>('30')
  const [inflationRate, setInflationRate] = useState<string>('6')
  const [result, setResult] = useState<any>(null)

  const handleCalculate = () => {
    const calculatedResult = sipCalculator(
      Number(sipAmount),
      Number(annualStepup),
      Number(annualReturn),
      Number(years),
      Number(inflationRate)
    )
    setResult(calculatedResult)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Card className="mb-8 bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">SIP Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sipAmount" className="text-sm font-medium text-gray-700">
                    Initial SIP Amount (₹)
                  </Label>
                  <Input
                    id="sipAmount"
                    type="string"
                    value={sipAmount}
                    onChange={handleInputChange(setSipAmount)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualStepup" className="text-sm font-medium text-gray-700">
                    Annual Step-up (%)
                  </Label>
                  <Input
                    id="annualStepup"
                    type="string"
                    value={annualStepup}
                    onChange={handleInputChange(setAnnualStepup)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualReturn" className="text-sm font-medium text-gray-700">
                    Expected Annual Return (%)
                  </Label>
                  <Input
                    id="annualReturn"
                    type="string"
                    value={annualReturn}
                    onChange={handleInputChange(setAnnualReturn)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years" className="text-sm font-medium text-gray-700">
                    Investment Duration (years)
                  </Label>
                  <Input
                    id="years"
                    type="string"
                    value={years}
                    onChange={handleInputChange(setYears)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inflationRate" className="text-sm font-medium text-gray-700">
                    Inflation Rate (%)
                  </Label>
                  <Input
                    id="inflationRate"
                    type="string"
                    value={inflationRate}
                    onChange={handleInputChange(setInflationRate)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <Button 
                onClick={handleCalculate} 
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Calculate
              </Button>
            </CardContent>
          </Card>

          {result && (
            <>
              <Card className="mb-8 bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">Results</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-6">
                    {/* Blue box - always full width */}
                    <div className="w-full bg-green-50 rounded-lg p-4 shadow border-2 border-green-500">
                      <p className="font-semibold text-gray-700">Inflation adjusted value of Corpus:</p>
                      <p className="text-3xl font-bold text-green-600">₹ {formatIndianCurrency(result.real_value_corpus)}</p>
                      <p className="text-sm text-gray-600 mt-2">This is what your investment will be worth in today's money.</p>
                    </div>

                    {/* Green box - always full width */}
                    <div className="w-full bg-blue-50 rounded-lg p-4 shadow border-2 border-blue-500">
                      <p className="font-semibold text-gray-700">Inflation adjusted value of Total Investment:</p>
                      <p className="text-3xl font-bold text-blue-600">₹ {formatIndianCurrency(result.real_value_investment)}</p>
                      <p className="text-sm text-gray-600 mt-2">This is what you're actually investing in today's money.</p>
                    </div>


                    {/* Gray boxes container - side by side on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4 shadow">
                        <p className="font-semibold text-gray-700">Total Investment:</p>
                        <p className="text-2xl font-bold text-gray-800">₹ {formatIndianCurrency(result.total_investment)}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 shadow">
                        <p className="font-semibold text-gray-700">Total Corpus:</p>
                        <p className="text-2xl font-bold text-gray-800">₹ {formatIndianCurrency(result.total_corpus)}</p>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8 bg-white shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">Investment Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ChartContainer
                    config={{
                      totalInvestment: {
                        label: "Total Investment",
                        color: "hsl(var(--chart-1))",
                      },
                      totalCorpus: {
                        label: "Total Corpus",
                        color: "hsl(var(--chart-3))",
                      },
                      realValueCorpus: {
                        label: "Inflation adjusted value of Corpus",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[400px] w-full overflow-x-auto"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                        data={result.yearlyData}
                        margin={{
                          top: 5,
                          right: 5,
                          left: 0,
                          bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="year" 
                          tick={{ fontSize: 12 }}
                          tickMargin={5}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => `${(value / 10000000).toFixed(1)}Cr`}
                          width={60}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Line type="monotone" dataKey="totalInvestment" stroke="var(--color-totalInvestment)" name="Total Investment" />
                        <Line type="monotone" dataKey="totalCorpus" stroke="var(--color-totalCorpus)" name="Total Corpus" />
                        <Line type="monotone" dataKey="realValueCorpus" stroke="var(--color-realValueCorpus)" name="Inflation adjusted value of Corpus" />
                        </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </>
          )}
        </div>
        <footer className="mt-auto text-center py-4">
          <a 
            href="https://github.com/budhirajamadhav" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-md hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Made with ❤️ by Madhav Budhiraja
          </a>
            <p className="mt-2 text-sm text-gray-600">
            powered by <a href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">v0.dev</a>
            </p>
        </footer>
      </div>
    </div>
  )
}

