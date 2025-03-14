"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Download, Heart, MessageSquare, Repeat2, Twitter, Linkedin, MessageCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

export default function Analytics() {
  const [mounted, setMounted] = useState(false)
  const [timeframe, setTimeframe] = useState("7days")
  const [activeTab, setActiveTab] = useState("engagement")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Simulate loading for chart data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your social media performance across platforms.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            defaultValue="7days"
            value={timeframe}
            onValueChange={(value) => {
              setTimeframe(value)
              setIsLoading(true)
              setTimeout(() => setIsLoading(false), 800)
            }}
          >
            <SelectTrigger className="w-[180px] animated-button">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="animate-scale-up">
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="animated-button">
            <Download className="mr-2 h-4 w-4 animated-icon" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 staggered-fade-in">
        {metrics.map((metric, i) => (
          <Card key={i} className="animated-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground animated-icon hover-scale" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {metric.change > 0 ? "+" : ""}
                {metric.change}% from last period
              </p>
              <div className="h-[80px] mt-4">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={metric.data}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <defs>
                        <linearGradient id={`color${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill={`url(#color${i})`}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs
        defaultValue="engagement"
        className="w-full animate-fade-in"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 800)
        }}
      >
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="engagement" className="animated-button">
            Engagement
          </TabsTrigger>
          <TabsTrigger value="platforms" className="animated-button">
            Platforms
          </TabsTrigger>
          <TabsTrigger value="content" className="animated-button">
            Content Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-4">
          <Card className="animated-card">
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>Track likes, comments, and shares across all platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                {isLoading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={engagementData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="likes" fill="hsl(var(--primary))" name="Likes" animationDuration={1500} />
                      <Bar
                        dataKey="comments"
                        fill="#82ca9d"
                        name="Comments"
                        animationDuration={1500}
                        animationDelay={300}
                      />
                      <Bar
                        dataKey="shares"
                        fill="#ffc658"
                        name="Shares"
                        animationDuration={1500}
                        animationDelay={600}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="animated-card">
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Engagement distribution across platforms.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          animationDuration={1500}
                          animationBegin={200}
                        >
                          {platformData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="animated-card">
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Follower growth by platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isLoading ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={platformGrowthData}
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
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="followers" fill="hsl(var(--primary))" name="Followers" animationDuration={1500} />
                        <Bar
                          dataKey="growth"
                          fill="#82ca9d"
                          name="Growth %"
                          animationDuration={1500}
                          animationDelay={300}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card className="animated-card">
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your most engaging posts across platforms.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-64 w-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-rotate-360"></div>
                </div>
              ) : (
                <div className="space-y-4 staggered-fade-in">
                  {topPosts.map((post, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg transition-all duration-300 hover:shadow-md hover:border-primary/50"
                    >
                      {post.image && (
                        <div className="w-full md:w-48 h-32 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${post.platform.bgColor} animated-icon hover-scale`}
                          >
                            <post.platform.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium">{post.platform.name}</h3>
                            <p className="text-xs text-muted-foreground">{post.date}</p>
                          </div>
                        </div>
                        <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1 group cursor-pointer">
                            <Heart className="h-4 w-4 text-red-500 group-hover:scale-125 transition-all duration-300" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 group cursor-pointer">
                            <MessageSquare className="h-4 w-4 text-blue-500 group-hover:scale-125 transition-all duration-300" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1 group cursor-pointer">
                            <Repeat2 className="h-4 w-4 text-green-500 group-hover:scale-125 transition-all duration-300" />
                            <span className="text-sm">{post.shares}</span>
                          </div>
                          <div className="ml-auto">
                            <span className="text-sm font-medium">{post.engagement}% Engagement</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const metrics = [
  {
    name: "Total Posts",
    value: "24",
    change: 12,
    icon: BarChart,
    data: [
      { name: "Jan", value: 10 },
      { name: "Feb", value: 15 },
      { name: "Mar", value: 18 },
      { name: "Apr", value: 24 },
    ],
  },
  {
    name: "Engagement Rate",
    value: "12.4%",
    change: 3.2,
    icon: Heart,
    data: [
      { name: "Jan", value: 8 },
      { name: "Feb", value: 10 },
      { name: "Mar", value: 11 },
      { name: "Apr", value: 12.4 },
    ],
  },
  {
    name: "Total Likes",
    value: "842",
    change: 5.7,
    icon: Heart,
    data: [
      { name: "Jan", value: 600 },
      { name: "Feb", value: 680 },
      { name: "Mar", value: 750 },
      { name: "Apr", value: 842 },
    ],
  },
  {
    name: "Total Comments",
    value: "128",
    change: -2.3,
    icon: MessageSquare,
    data: [
      { name: "Jan", value: 140 },
      { name: "Feb", value: 135 },
      { name: "Mar", value: 130 },
      { name: "Apr", value: 128 },
    ],
  },
]

const engagementData = [
  {
    date: "Mar 1",
    likes: 120,
    comments: 15,
    shares: 10,
  },
  {
    date: "Mar 2",
    likes: 95,
    comments: 20,
    shares: 8,
  },
  {
    date: "Mar 3",
    likes: 150,
    comments: 25,
    shares: 12,
  },
  {
    date: "Mar 4",
    likes: 130,
    comments: 18,
    shares: 15,
  },
  {
    date: "Mar 5",
    likes: 110,
    comments: 22,
    shares: 9,
  },
  {
    date: "Mar 6",
    likes: 145,
    comments: 30,
    shares: 18,
  },
  {
    date: "Mar 7",
    likes: 160,
    comments: 35,
    shares: 20,
  },
]

const platformData = [
  { name: "Twitter", value: 45, color: "#1DA1F2" },
  { name: "LinkedIn", value: 30, color: "#0077B5" },
  { name: "Discord", value: 15, color: "#5865F2" },
  { name: "Telegram", value: 10, color: "#0088CC" },
]

const platformGrowthData = [
  {
    name: "Twitter",
    followers: 2500,
    growth: 12,
  },
  {
    name: "LinkedIn",
    followers: 1800,
    growth: 8,
  },
  {
    name: "Discord",
    followers: 950,
    growth: 15,
  },
  {
    name: "Telegram",
    followers: 750,
    growth: 5,
  },
]

const topPosts = [
  {
    platform: { name: "Twitter", icon: Twitter, bgColor: "bg-blue-500" },
    date: "Mar 5, 2024",
    content: "Just launched our new product! Check it out at example.com #launch #product",
    image: "/placeholder.svg?height=400&width=600",
    likes: 245,
    comments: 42,
    shares: 78,
    engagement: 8.7,
  },
  {
    platform: { name: "LinkedIn", icon: Linkedin, bgColor: "bg-blue-700" },
    date: "Mar 3, 2024",
    content: "Excited to announce that we've reached 10,000 customers! Thank you for your support. #milestone #growth",
    likes: 328,
    comments: 56,
    shares: 42,
    engagement: 7.2,
  },
  {
    platform: { name: "Discord", icon: MessageCircle, bgColor: "bg-indigo-600" },
    date: "Mar 7, 2024",
    content: "Join our community call this Friday at 3 PM EST to discuss upcoming features and provide feedback!",
    image: "/placeholder.svg?height=400&width=600",
    likes: 156,
    comments: 48,
    shares: 24,
    engagement: 6.8,
  },
]

