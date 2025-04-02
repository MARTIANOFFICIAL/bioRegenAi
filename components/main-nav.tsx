"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { FlaskConical, LineChart, Stethoscope } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-xl flex items-center mr-6">
          <FlaskConical className="h-6 w-6 mr-2" />
          BioRegen AI
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
            <Link
              href="/"
              className={cn("flex items-center", pathname === "/" ? "text-primary" : "text-muted-foreground")}
            >
              <FlaskConical className="h-4 w-4 mr-2" />
              Protocol Optimizer
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
            <Link
              href="/"
              className={cn("flex items-center", pathname === "/biomarkers" ? "text-primary" : "text-muted-foreground")}
            >
              <LineChart className="h-4 w-4 mr-2" />
              Biomarkers
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
            <Link
              href="/"
              className={cn("flex items-center", pathname === "/trials" ? "text-primary" : "text-muted-foreground")}
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Clinical Trials
            </Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

