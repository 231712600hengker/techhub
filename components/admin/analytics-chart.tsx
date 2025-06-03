"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type ChartData = {
  name: string
  sales: number
  revenue: number
}

export default function AnalyticsChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const mockData: ChartData[] = [
          { name: "Jan", sales: 1200, revenue: 3100 },
          { name: "Feb", sales: 900, revenue: 2400 },
          { name: "Mar", sales: 1600, revenue: 4300 },
          { name: "Apr", sales: 1200, revenue: 3000 },
          { name: "May", sales: 2200, revenue: 5300 },
          { name: "Jun", sales: 1800, revenue: 4400 },
        ]
        
        setData(mockData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading chart data...</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="hsl(var(--chart-1))" name="Units Sold" />
        <Bar dataKey="revenue" fill="hsl(var(--chart-2))" name="Revenue ($)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
