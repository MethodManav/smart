"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface ConnectionButtonProps {
    platform: string
    color: string
    onConnect: (platform: string) => void
    isConnected: boolean
    isLoading: boolean
}

export default function ConnectionButton({
    platform,
    color,
    onConnect,
    isConnected,
    isLoading,
}: ConnectionButtonProps) {
    const [pulseAnimation, setPulseAnimation] = useState(false)

    // Add pulse animation when connected
    useEffect(() => {
        if (isConnected) {
            setPulseAnimation(true)
            const timer = setTimeout(() => setPulseAnimation(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [isConnected])

    if (isConnected) {
        return (
            <motion.div
                className="flex items-center text-green-500"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <motion.div
                    animate={
                        pulseAnimation
                            ? {
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.8, 1],
                            }
                            : {}
                    }
                    transition={{ duration: 0.5 }}
                >
                    <CheckCircle2 className="mr-1 h-5 w-5" />
                </motion.div>
                <span className="text-sm font-medium">Connected</span>
            </motion.div>
        )
    }

    return (
        <Button
            variant="outline"
            className={`border-[${color}] text-[${color}] hover:bg-[${color}]/10 hover:text-[${color}]`}
            onClick={() => onConnect(platform)}
            disabled={isLoading}
        >
            {isLoading ? (
                <motion.div className="flex items-center">
                    <motion.div
                        animate={{
                            rotate: 360,
                            borderColor: [color, `${color}50`, color],
                            borderWidth: ["2px", "3px", "2px"],
                        }}
                        transition={{
                            rotate: { repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" },
                            borderColor: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
                            borderWidth: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
                        }}
                        className={`mr-2 h-4 w-4 border-2 border-[${color}] border-t-transparent rounded-full`}
                        style={{ borderColor: color, borderTopColor: "transparent" }}
                    />
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        transition={{ duration: 0.3 }}
                    >
                        Connecting...
                    </motion.span>
                </motion.div>
            ) : (
                <motion.div
                    className="flex items-center"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    Connect
                    <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
            )}
        </Button>
    )
}

