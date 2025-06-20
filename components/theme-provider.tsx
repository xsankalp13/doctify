"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        // Set dark/light class before anything is rendered
        const userTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = userTheme === 'dark' || (!userTheme && prefersDark);
        document.documentElement.classList.toggle('dark', isDark);

        setIsMounted(true);

    }, [])

    if (!isMounted) return null; // Avoid mismatch

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}