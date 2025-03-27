"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, ArrowRight, CheckCircle2 } from "lucide-react"

interface SocialConnectionsDrawerProps {
    isOpen: boolean
    onClose: () => void
    userName: string
}

export default function SocialConnectionsDrawer({ isOpen, onClose, userName }: SocialConnectionsDrawerProps) {
    const [connectedAccounts, setConnectedAccounts] = useState<string[]>([])
    const [loadingAccounts, setLoadingAccounts] = useState<string[]>([])

    const connectAccount = (platform: string) => {
        // Set loading state
        setLoadingAccounts((prev) => [...prev, platform])

        // Simulate connection process
        setTimeout(() => {
            setLoadingAccounts((prev) => prev.filter((p) => p !== platform))
            setConnectedAccounts((prev) => [...prev, platform])
        }, 2000)
    }

    const isConnected = (platform: string) => connectedAccounts.includes(platform)
    const isLoading = (platform: string) => loadingAccounts.includes(platform)

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="bottom" className="sm:max-w-md sm:rounded-t-2xl sm:mx-auto">
                <SheetHeader className="text-left">
                    <SheetTitle className="text-2xl">Complete your profile</SheetTitle>
                    <SheetDescription>
                        Welcome, {userName}! Connect your social accounts to enhance your experience.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-lg border p-4 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2]/10">
                                    <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Twitter</h3>
                                    <p className="text-sm text-muted-foreground">Connect to share updates</p>
                                </div>
                            </div>

                            {isConnected("twitter") ? (
                                <div className="flex items-center text-green-500">
                                    <CheckCircle2 className="mr-1 h-5 w-5" />
                                    <span className="text-sm font-medium">Connected</span>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
                                    onClick={() => connectAccount("twitter")}
                                    disabled={isLoading("twitter")}
                                >
                                    {isLoading("twitter") ? (
                                        <motion.div className="flex items-center">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    duration: 1,
                                                    ease: "linear",
                                                }}
                                                className="mr-2 h-4 w-4 border-2 border-[#1DA1F2] border-t-transparent rounded-full"
                                            />
                                            <span>Connecting...</span>
                                        </motion.div>
                                    ) : (
                                        <>
                                            Connect
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-lg border p-4 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2]/10">
                                    <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                                </div>
                                <div>
                                    <h3 className="font-medium">LinkedIn</h3>
                                    <p className="text-sm text-muted-foreground">Connect for professional networking</p>
                                </div>
                            </div>

                            {isConnected("linkedin") ? (
                                <div className="flex items-center text-green-500">
                                    <CheckCircle2 className="mr-1 h-5 w-5" />
                                    <span className="text-sm font-medium">Connected</span>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
                                    onClick={() => connectAccount("linkedin")}
                                    disabled={isLoading("linkedin")}
                                >
                                    {isLoading("linkedin") ? (
                                        <motion.div className="flex items-center">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    duration: 1,
                                                    ease: "linear",
                                                }}
                                                className="mr-2 h-4 w-4 border-2 border-[#0A66C2] border-t-transparent rounded-full"
                                            />
                                            <span>Connecting...</span>
                                        </motion.div>
                                    ) : (
                                        <>
                                            Connect
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 flex justify-between">
                    <Button variant="outline" onClick={onClose}>
                        Skip for now
                    </Button>
                    <Button onClick={onClose}>Continue</Button>
                </div>

                <div className="mt-4 text-center text-xs text-muted-foreground">
                    You can always connect these accounts later in your profile settings
                </div>
            </SheetContent>
        </Sheet>
    )
}

