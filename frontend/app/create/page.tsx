"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  Image,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  X,
  Heart,
  Repeat2,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-blue-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
  {
    id: "discord",
    name: "Discord",
    icon: MessageCircle,
    color: "bg-indigo-600",
  },
  { id: "telegram", name: "Telegram", icon: Send, color: "bg-sky-500" },
];

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "twitter",
  ]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [scheduleType, setScheduleType] = useState("now");
  const [image, setImage] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setImage("/placeholder.svg?height=400&width=600");
        setIsUploading(false);
      }, 1500);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-down">
        <h1 className="text-3xl font-bold tracking-tight">Create Post</h1>
        <p className="text-muted-foreground">
          Compose and schedule your social media posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="animated-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="animate-fade-in">
                  <Label htmlFor="content">Post Content</Label>
                  <div className="mt-1 relative">
                    <Textarea
                      id="content"
                      placeholder="What do you want to share?"
                      className="min-h-32 resize-none transition-all duration-300 focus:shadow-md"
                      value={content}
                      onChange={handleContentChange}
                    />
                    <div
                      className={`absolute bottom-2 right-2 text-xs ${
                        charCount > 250
                          ? "text-amber-500"
                          : charCount > 280
                          ? "text-red-500"
                          : "text-muted-foreground"
                      } transition-colors`}
                    >
                      {charCount}/280
                    </div>
                  </div>
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "100ms" }}
                >
                  <Label>Platforms</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.id}
                        type="button"
                        variant={
                          selectedPlatforms.includes(platform.id)
                            ? "default"
                            : "outline"
                        }
                        className={cn(
                          "flex items-center gap-2 transition-all duration-300 animated-button",
                          selectedPlatforms.includes(platform.id)
                            ? platform.color + " text-white hover:opacity-90"
                            : "hover:border-primary"
                        )}
                        onClick={() => togglePlatform(platform.id)}
                      >
                        <platform.icon
                          className={`h-4 w-4 ${
                            selectedPlatforms.includes(platform.id)
                              ? "animate-bounce-light"
                              : ""
                          }`}
                        />
                        {platform.name}
                        {selectedPlatforms.includes(platform.id) && (
                          <Check className="h-4 w-4 ml-1 animate-fade-in" />
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "200ms" }}
                >
                  <Label htmlFor="image">Media</Label>
                  <div className="mt-2">
                    {image ? (
                      <div className="relative rounded-md overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Uploaded preview"
                          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 rounded-full animated-button"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4 animated-icon hover-rotate" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-8 text-center transition-all duration-300 hover:border-primary/50">
                        {isUploading ? (
                          <div className="flex flex-col items-center">
                            <Loader2 className="h-8 w-8 mx-auto text-primary animate-rotate-360" />
                            <p className="text-sm text-muted-foreground mt-2">
                              Uploading...
                            </p>
                          </div>
                        ) : (
                          <>
                            <Image className="h-8 w-8 mx-auto text-muted-foreground animated-icon hover-scale" />
                            <div className="mt-2">
                              <Label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:text-primary/80 focus-within:outline-none transition-colors"
                              >
                                <span>Upload a file</span>
                                <Input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  onChange={handleImageUpload}
                                />
                              </Label>
                              <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="animate-fade-in"
                  style={{ animationDelay: "300ms" }}
                >
                  <Label>Scheduling</Label>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="schedule-now"
                        checked={scheduleType === "now"}
                        onCheckedChange={() => setScheduleType("now")}
                        className="transition-all duration-300"
                      />
                      <Label htmlFor="schedule-now">Post now</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="schedule-later"
                        checked={scheduleType === "later"}
                        onCheckedChange={() => setScheduleType("later")}
                        className="transition-all duration-300"
                      />
                      <Label htmlFor="schedule-later">Schedule for later</Label>
                    </div>

                    {scheduleType === "later" && (
                      <div className="grid grid-cols-2 gap-4 pt-2 animate-fade-in">
                        <div>
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal mt-1 animated-button"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 animated-icon" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 animate-scale-up">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="mt-1 transition-all duration-300 focus:shadow-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div
            className="flex justify-end gap-2 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <Button variant="outline" className="animated-button">
              Save as Draft
            </Button>
            <Button className="animated-button">
              {scheduleType === "now" ? "Post Now" : "Schedule Post"}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="animated-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Preview</h3>
              <Tabs
                defaultValue={selectedPlatforms[0] || "twitter"}
                className="animate-fade-in"
              >
                {/* <TabsList className="w-full">
                  {platforms
                    .filter((p) => selectedPlatforms.includes(p.id))
                    .map((platform) => (
                      <TabsTrigger
                        key={platform.id}
                        value={platform.id}
                        className="flex items-center gap-1 animated-button"
                      >
                        <platform.icon className="h-4 w-4 animated-icon" />
                        <span className="hidden sm:inline">
                          {platform.name}
                        </span>
                      </TabsTrigger>
                    ))}
                </TabsList> */}
                {platforms.map((platform) => (
                  <TabsContent key={platform.id} value={platform.id}>
                    <div className="border rounded-md p-4 mt-2 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`w-8 h-8 rounded-full ${platform.color} flex items-center justify-center animated-icon hover-scale`}
                        >
                          <platform.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            Your Account
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {scheduleType === "now"
                              ? "Just now"
                              : date
                              ? `Scheduled for ${format(
                                  date,
                                  "MMM d"
                                )} at ${time}`
                              : "Scheduled for later"}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm mb-3">
                        {content || "Your post content will appear here"}
                      </div>
                      {image && (
                        <div className="rounded-md overflow-hidden mb-3">
                          <img
                            src={image || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
