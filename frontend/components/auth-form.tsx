"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Mail, Lock, User, Github, Twitter, Linkedin } from "lucide-react"

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
    }

    const toggleForm = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-xl"
            >
                <div className="relative">
                    {/* Form header */}
                    <div className="relative z-10 bg-primary px-6 py-8 text-primary-foreground sm:px-10">
                        <motion.h2
                            key={isLogin ? "login" : "signup"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-2xl font-bold"
                        >
                            {isLogin ? "Welcome back" : "Create an account"}
                        </motion.h2>
                        <motion.p
                            key={isLogin ? "login-desc" : "signup-desc"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.1 } }}
                            exit={{ opacity: 0 }}
                            className="mt-2 text-sm text-primary-foreground/80"
                        >
                            {isLogin ? "Sign in to your account to continue" : "Fill in your details to get started"}
                        </motion.p>
                    </div>

                    {/* Form content */}
                    <div className="px-6 py-8 sm:px-10">
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? "login-form" : "signup-form"}
                                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                                transition={{ duration: 0.3 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {!isLogin && (
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            Full Name
                                        </Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input id="name" placeholder="John Doe" className="pl-10" required />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input id="email" type="email" placeholder="you@example.com" className="pl-10" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            Password
                                        </Label>
                                        {isLogin && (
                                            <a href="#" className="text-xs text-primary hover:underline">
                                                Forgot password?
                                            </a>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <label htmlFor="terms" className="text-xs text-muted-foreground">
                                            I agree to the{" "}
                                            <a href="#" className="text-primary hover:underline">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a href="#" className="text-primary hover:underline">
                                                Privacy Policy
                                            </a>
                                        </label>
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                repeat: Number.POSITIVE_INFINITY,
                                                duration: 1,
                                                ease: "linear",
                                            }}
                                            className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                                        />
                                    ) : null}
                                    {isLogin ? "Sign in" : "Create account"}
                                </Button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-muted" />
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline" type="button" className="w-full">
                                        <Linkedin className="mr-2 h-4 w-4" />
                                        Linkedin
                                    </Button>
                                    <Button variant="outline" type="button" className="w-full">
                                        <Twitter className="mr-2 h-4 w-4" />
                                        Twitter
                                    </Button>
                                </div>
                            </motion.form>
                        </AnimatePresence>

                        <div className="mt-6 text-center text-sm">
                            <motion.p
                                key={isLogin ? "signup-prompt" : "login-prompt"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    type="button"
                                    onClick={toggleForm}
                                    className="ml-1 inline-flex items-center text-primary hover:underline"
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </button>
                            </motion.p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

