"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Twitter, Linkedin, MessageCircle, Send, Key, Copy, Check, Save, Lock, User, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Settings() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("accounts")
  const [copiedKey, setCopiedKey] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopyKey = (id: number, key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="accounts" className="w-full animate-fade-in" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="accounts" className="animated-button">
            Accounts
          </TabsTrigger>
          <TabsTrigger value="profile" className="animated-button">
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="animated-button">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="animated-button">
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <Card className="animated-card">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your connected social media accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {platforms.map((platform, index) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:shadow-md hover:border-primary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.bgColor} animated-icon hover-scale`}
                    >
                      <platform.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{platform.name}</h3>
                      {platform.connected ? (
                        <p className="text-sm text-muted-foreground">Connected as {platform.username}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={platform.connected ? "outline" : "default"}
                    className={`animated-button ${platform.connected ? "" : "animate-pulse-slow"}`}
                  >
                    {platform.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card className="animated-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 animate-fade-in">
                <Avatar className="h-20 w-20 transition-all duration-300 hover:shadow-lg">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Profile"
                    className="transition-transform duration-500 hover:scale-110"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse-slow">
                    US
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="animated-button">
                  <User className="mr-2 h-4 w-4 animated-icon" />
                  Change Avatar
                </Button>
              </div>

              <div className="grid gap-4 py-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue="User" className="transition-all duration-300 focus:shadow-md" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue="Name" className="transition-all duration-300 focus:shadow-md" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue="user@example.com"
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="transition-all duration-300 focus:shadow-md"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="animated-button">
                <Save className="mr-2 h-4 w-4 animated-icon" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="animated-card">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current password</Label>
                  <Input id="currentPassword" type="password" className="transition-all duration-300 focus:shadow-md" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New password</Label>
                  <Input id="newPassword" type="password" className="transition-all duration-300 focus:shadow-md" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input id="confirmPassword" type="password" className="transition-all duration-300 focus:shadow-md" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="animated-button">
                <Lock className="mr-2 h-4 w-4 animated-icon" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="animated-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium animate-fade-in">Email Notifications</h3>
                <Separator className="animate-fade-in" />

                {emailNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between py-2 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Switch
                      id={notification.id}
                      defaultChecked={notification.enabled}
                      className="transition-all duration-300"
                    />
                  </div>
                ))}

                <h3 className="text-lg font-medium mt-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
                  Push Notifications
                </h3>
                <Separator className="animate-fade-in" style={{ animationDelay: "400ms" }} />

                {pushNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between py-2 animate-fade-in"
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <div>
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Switch
                      id={notification.id}
                      defaultChecked={notification.enabled}
                      className="transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="animated-button">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card className="animated-card">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for programmatic access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {apiKeys.map((key, index) => (
                  <div
                    key={key.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4 transition-all duration-300 hover:shadow-md hover:border-primary/50 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <h3 className="font-medium">{key.name}</h3>
                      <p className="text-sm text-muted-foreground">Created on {key.created}</p>
                      <div className="flex items-center mt-1">
                        <code className="bg-muted px-2 py-1 rounded text-xs transition-all duration-300 hover:bg-muted/80">
                          {key.key.substring(0, 8)}...{key.key.substring(key.key.length - 4)}
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="animated-button"
                        onClick={() => handleCopyKey(key.id, key.key)}
                      >
                        {copiedKey === key.id ? (
                          <Check className="mr-2 h-4 w-4 text-green-500 animated-icon" />
                        ) : (
                          <Copy className="mr-2 h-4 w-4 animated-icon" />
                        )}
                        {copiedKey === key.id ? "Copied!" : "Copy"}
                      </Button>
                      <Button variant="destructive" size="sm" className="animated-button">
                        <Trash2 className="mr-2 h-4 w-4 animated-icon" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                  <Button className="animated-button">
                    <Key className="mr-2 h-4 w-4 animated-icon" />
                    Generate New API Key
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const platforms = [
  {
    name: "Twitter",
    icon: Twitter,
    bgColor: "bg-blue-500",
    connected: true,
    username: "@yourusername",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    bgColor: "bg-blue-700",
    connected: true,
    username: "Your Name",
  },
  {
    name: "Discord",
    icon: MessageCircle,
    bgColor: "bg-indigo-600",
    connected: false,
  },
  {
    name: "Telegram",
    icon: Send,
    bgColor: "bg-sky-500",
    connected: true,
    username: "@yourusername",
  },
]

const emailNotifications = [
  {
    id: "email-scheduled",
    title: "Scheduled Posts",
    description: "Receive notifications when your scheduled posts are published",
    enabled: true,
  },
  {
    id: "email-failed",
    title: "Failed Posts",
    description: "Receive notifications when your posts fail to publish",
    enabled: true,
  },
  {
    id: "email-weekly",
    title: "Weekly Summary",
    description: "Receive a weekly summary of your social media performance",
    enabled: false,
  },
]

const pushNotifications = [
  {
    id: "push-scheduled",
    title: "Scheduled Posts",
    description: "Receive notifications when your scheduled posts are published",
    enabled: true,
  },
  {
    id: "push-failed",
    title: "Failed Posts",
    description: "Receive notifications when your posts fail to publish",
    enabled: true,
  },
  {
    id: "push-engagement",
    title: "Engagement Updates",
    description: "Receive notifications about likes, comments, and shares",
    enabled: false,
  },
]

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    created: "Mar 10, 2024",
    key: "sk_prod_2023xyzabc456789",
  },
  {
    id: 2,
    name: "Development API Key",
    created: "Feb 15, 2024",
    key: "sk_dev_2023abcxyz123456",
  },
]

