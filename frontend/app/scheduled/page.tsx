"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Edit2,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ScheduledPosts() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")

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
          <h1 className="text-3xl font-bold tracking-tight">Scheduled Posts</h1>
          <p className="text-muted-foreground">Manage your upcoming social media posts.</p>
        </div>
        <Button asChild className="animated-button">
          <Link href="/create">
            <Plus className="mr-2 h-4 w-4 animated-icon" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between animate-fade-in">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground animated-icon" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="w-full pl-8 transition-all duration-300 focus:shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex items-center gap-2 animated-button">
            <Filter className="h-4 w-4 animated-icon" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="animated-button">
                All Platforms
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-scale-up">
              <DropdownMenuItem className="animated-button">All Platforms</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="animated-button">Twitter</DropdownMenuItem>
              <DropdownMenuItem className="animated-button">LinkedIn</DropdownMenuItem>
              <DropdownMenuItem className="animated-button">Discord</DropdownMenuItem>
              <DropdownMenuItem className="animated-button">Telegram</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="upcoming" className="animated-button">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="posted" className="animated-button">
            Posted
          </TabsTrigger>
          <TabsTrigger value="failed" className="animated-button">
            Failed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 staggered-fade-in">
            {upcomingPosts.map((post, i) => (
              <ScheduledPostCard key={i} post={post} status="upcoming" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="posted" className="space-y-4">
          <div className="grid gap-4 staggered-fade-in">
            {postedPosts.map((post, i) => (
              <ScheduledPostCard key={i} post={post} status="posted" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="failed" className="space-y-4">
          <div className="grid gap-4 staggered-fade-in">
            {failedPosts.map((post, i) => (
              <ScheduledPostCard key={i} post={post} status="failed" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ScheduledPostCard({ post, status }: { post: any; status: "upcoming" | "posted" | "failed" }) {
  return (
    <Card className="animated-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${post.platform.bgColor} animated-icon hover-scale`}
                >
                  <post.platform.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">{post.platform.name}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {status === "upcoming" && (
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800 animate-pulse-slow"
                  >
                    Scheduled
                  </Badge>
                )}
                {status === "posted" && (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800"
                  >
                    Posted
                  </Badge>
                )}
                {status === "failed" && (
                  <Badge
                    variant="outline"
                    className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-800"
                  >
                    Failed
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 animated-button">
                      <MoreHorizontal className="h-4 w-4 animated-icon hover-rotate" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-scale-up">
                    <DropdownMenuItem className="animated-button">
                      <Edit2 className="mr-2 h-4 w-4 animated-icon" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="animated-button">
                      <Calendar className="mr-2 h-4 w-4 animated-icon" />
                      Reschedule
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 dark:text-red-400 animated-button">
                      <Trash2 className="mr-2 h-4 w-4 animated-icon" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 group">
                <Calendar className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">{post.date}</span>
              </div>
              <div className="flex items-center gap-1 group">
                <Clock className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">{post.time}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample data
const upcomingPosts = [
  {
    platform: { name: "Twitter", icon: Twitter, bgColor: "bg-blue-500" },
    content:
      "Don't miss our webinar on social media automation tomorrow at 2 PM EST! Register now at example.com/webinar #webinar #socialmedia",
    date: "Tomorrow",
    time: "9:00 AM",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    platform: { name: "LinkedIn", icon: Linkedin, bgColor: "bg-blue-700" },
    content:
      "We're hiring! Looking for talented developers to join our team. Apply at example.com/careers #hiring #jobs",
    date: "Mar 15",
    time: "1:00 PM",
  },
  {
    platform: { name: "Telegram", icon: Send, bgColor: "bg-sky-500" },
    content: "New tutorial: How to automate your social media posting schedule for maximum engagement",
    date: "Mar 17",
    time: "3:30 PM",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    platform: { name: "Discord", icon: MessageCircle, bgColor: "bg-indigo-600" },
    content: "Join our community call this Friday at 3 PM EST to discuss upcoming features and provide feedback!",
    date: "Mar 18",
    time: "6:00 PM",
  },
]

const postedPosts = [
  {
    platform: { name: "Twitter", icon: Twitter, bgColor: "bg-blue-500" },
    content: "Just launched our new product! Check it out at example.com #launch #product",
    date: "Today",
    time: "10:30 AM",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    platform: { name: "LinkedIn", icon: Linkedin, bgColor: "bg-blue-700" },
    content: "Excited to announce that we've reached 10,000 customers! Thank you for your support. #milestone #growth",
    date: "Yesterday",
    time: "2:15 PM",
  },
]

const failedPosts = [
  {
    platform: { name: "Discord", icon: MessageCircle, bgColor: "bg-indigo-600" },
    content:
      "We're experiencing some technical difficulties. Our team is working on resolving the issue as soon as possible.",
    date: "Yesterday",
    time: "4:20 PM",
  },
]

