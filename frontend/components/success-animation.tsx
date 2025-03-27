"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface SuccessAnimationProps {
    message: string
    subMessage?: string
}

export default function SuccessAnimation({ message, subMessage }: SuccessAnimationProps) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
            <motion.div
                className="relative flex items-center justify-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
                <motion.div
                    className="absolute h-16 w-16 rounded-full bg-green-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                />
                <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                >
                    <CheckCircle className="relative z-10 h-12 w-12 text-green-500" strokeWidth={3} />
                </motion.div>
            </motion.div>

            <motion.h3
                className="mt-4 text-xl font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {message}
            </motion.h3>

            {subMessage && (
                <motion.p
                    className="mt-1 text-sm text-muted-foreground"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    {subMessage}
                </motion.p>
            )}
        </motion.div>
    )
}

