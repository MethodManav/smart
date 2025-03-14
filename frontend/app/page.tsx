"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquarePlus, Calendar, ArrowUpRight, BarChart3, Heart, MessageSquare, Repeat2 } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("recent")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your social media posts across multiple platforms.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="animated-button">
            <Link href="/create">
              <MessageSquarePlus className="mr-2 h-4 w-4 animated-icon" />
              New Post
            </Link>
          </Button>
          <Button variant="outline" asChild className="animated-button">
            <Link href="/scheduled">
              <Calendar className="mr-2 h-4 w-4 animated-icon" />
              View Schedule
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recent" className="w-full animate-fade-in" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="recent" className="animated-button">
            Recent Posts
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="animated-button">
            Upcoming Posts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 staggered-fade-in">
            {recentPosts.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 staggered-fade-in">
            {scheduledPosts.map((post, i) => (
              <ScheduledPostCard key={i} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 staggered-fade-in">
        <Card className="animated-card">
          <CardHeader className="pb-2">
            <CardTitle>Platform Overview</CardTitle>
            <CardDescription>Your connected social accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {platforms.map((platform, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between transition-all duration-300 hover:bg-muted/50 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${platform.bgColor} animated-icon hover-scale`}
                    >
                      <platform.icon className="h-4 w-4 text-white" />
                    </div>
                    <span>{platform.name}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${platform.connected ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}`}
                  >
                    {platform.connected ? "Connected" : "Disconnected"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full animated-button" asChild>
              <Link href="/settings">
                Manage Connections
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="animated-card">
          <CardHeader className="pb-2">
            <CardTitle>Quick Analytics</CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between transition-all duration-300 hover:bg-muted/50 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center animated-icon hover-scale">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full animated-button" asChild>
              <Link href="/analytics">
                View Full Analytics
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="animated-card">
          <CardHeader className="pb-2">
            <CardTitle>Best Time to Post</CardTitle>
            <CardDescription>Based on your audience engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bestTimes.map((time, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between transition-all duration-300 hover:bg-muted/50 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${time.bgColor} animated-icon hover-scale`}
                    >
                      <time.icon className="h-4 w-4 text-white" />
                    </div>
                    <span>{time.platform}</span>
                  </div>
                  <span className="text-sm font-medium">{time.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full animated-button" asChild>
              <Link href="/create">
                Schedule a Post
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: any }) {
  return (
    <Card className="overflow-hidden animated-card">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${post.platform.bgColor} animated-icon hover-scale`}
            >
              <post.platform.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm">{post.platform.name}</CardTitle>
              <CardDescription className="text-xs">{post.date}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 animated-button">
            <ArrowUpRight className="h-4 w-4 animated-icon hover-scale" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm line-clamp-3">{post.content}</p>
        {post.image && (
          <div className="mt-2 rounded-md overflow-hidden bg-muted h-32 flex items-center justify-center">
            <img
              src={post.image || "/placeholder.svg"}
              alt="Post image"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex gap-3">
          <div className="flex items-center gap-1 text-muted-foreground group cursor-pointer">
            <Heart className="h-4 w-4 group-hover:text-red-500 group-hover:scale-125 transition-all duration-300" />
            <span className="text-xs group-hover:text-red-500 transition-colors">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground group cursor-pointer">
            <MessageSquare className="h-4 w-4 group-hover:text-blue-500 group-hover:scale-125 transition-all duration-300" />
            <span className="text-xs group-hover:text-blue-500 transition-colors">{post.comments}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground group cursor-pointer">
            <Repeat2 className="h-4 w-4 group-hover:text-green-500 group-hover:scale-125 transition-all duration-300" />
            <span className="text-xs group-hover:text-green-500 transition-colors">{post.shares}</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">{post.engagement}% Engagement</div>
      </CardFooter>
    </Card>
  )
}

function ScheduledPostCard({ post }: { post: any }) {
  return (
    <Card className="animated-card">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${post.platform.bgColor} animated-icon hover-scale`}
            >
              <post.platform.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm">{post.platform.name}</CardTitle>
              <CardDescription className="text-xs">{post.scheduledFor}</CardDescription>
            </div>
          </div>
          <div className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 text-xs animate-pulse-slow">
            Scheduled
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm line-clamp-3">{post.content}</p>
        {post.image && (
          <div className="mt-2 rounded-md overflow-hidden bg-muted h-32 flex items-center justify-center">
            <img
              src={post.image || "/placeholder.svg"}
              alt="Post image"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="animated-button">
          Edit
        </Button>
        <Button variant="outline" size="sm" className="animated-button">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data
import { Twitter, Linkedin, MessageCircle, Send } from "lucide-react"

const platforms = [
  { name: "Twitter", icon: Twitter, connected: true, bgColor: "bg-blue-500" },
  { name: "LinkedIn", icon: Linkedin, connected: true, bgColor: "bg-blue-700" },
  { name: "Discord", icon: MessageCircle, connected: false, bgColor: "bg-indigo-600" },
  { name: "Telegram", icon: Send, connected: true, bgColor: "bg-sky-500" },
]

const analytics = [
  { name: "Posts", value: "24", icon: MessageSquarePlus },
  { name: "Engagement", value: "12.4%", icon: BarChart3 },
  { name: "Likes", value: "842", icon: Heart },
  { name: "Comments", value: "128", icon: MessageSquare },
]

const bestTimes = [
  { platform: "Twitter", time: "9:00 AM - 11:00 AM", icon: Twitter, bgColor: "bg-blue-500" },
  { platform: "LinkedIn", time: "1:00 PM - 3:00 PM", icon: Linkedin, bgColor: "bg-blue-700" },
  { platform: "Discord", time: "6:00 PM - 8:00 PM", icon: MessageCircle, bgColor: "bg-indigo-600" },
]

const recentPosts = [
  {
    platform: { name: "Twitter", icon: Twitter, bgColor: "bg-blue-500" },
    date: "Today, 10:30 AM",
    content: "Just launched our new product! Check it out at example.com #launch #product",
    image: "/placeholder.svg?height=400&width=600",
    likes: 42,
    comments: 12,
    shares: 8,
    engagement: 3.2,
  },
  {
    platform: { name: "LinkedIn", icon: Linkedin, bgColor: "bg-blue-700" },
    date: "Yesterday, 2:15 PM",
    content: "Excited to announce that we've reached 10,000 customers! Thank you for your support. #milestone #growth",
    likes: 128,
    comments: 24,
    shares: 16,
    engagement: 5.7,
  },
  {
    platform: { name: "Discord", icon: MessageCircle, bgColor: "bg-indigo-600" },
    date: "2 days ago, 4:20 PM",
    content: "Join our community call this Friday at 3 PM EST to discuss upcoming features and provide feedback!",
    image: "/placeholder.svg?height=400&width=600",
    likes: 56,
    comments: 18,
    shares: 4,
    engagement: 2.8,
  },
]

const scheduledPosts = [
  {
    platform: { name: "Twitter", icon: Twitter, bgColor: "bg-blue-500" },
    scheduledFor: "Tomorrow, 9:00 AM",
    content:
      "Don't miss our webinar on social media automation tomorrow at 2 PM EST! Register now at example.com/webinar",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    platform: { name: "LinkedIn", icon: Linkedin, bgColor: "bg-blue-700" },
    scheduledFor: "Mar 15, 1:00 PM",
    content:
      "We're hiring! Looking for talented developers to join our team. Apply at example.com/careers #hiring #jobs",
  },
  {
    platform: { name: "Telegram", icon: Send, bgColor: "bg-sky-500" },
    scheduledFor: "Mar 17, 3:30 PM",
    content: "New tutorial: How to automate your social media posting schedule for maximum engagement",
    image: "/placeholder.svg?height=400&width=600",
  },
]

