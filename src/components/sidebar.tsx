import { Home, Newspaper, Flame, Tv, Music, Heart, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {Link} from "react-router-dom"

interface SidebarProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function Sidebar({ activeCategory, setActiveCategory }: SidebarProps) {
  const categories = [
    { id: "all", name: "All", icon: Home },
    { id: "politics", name: "Politics", icon: Newspaper },
    { id: "trending", name: "Trending", icon: Flame },
    { id: "entertainment", name: "Entertainment", icon: Tv },
    { id: "music", name: "Music", icon: Music },
    { id: "health", name: "Health", icon: Heart },
  ]

  return (
    <aside className="border-r bg-background md:w-64 w-full md:sticky md:top-16 md:h-[calc(100vh-4rem)] flex-shrink-0">
      <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible md:h-full py-2 md:py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight hidden md:block">Categories</h2>
          <div className="flex md:flex-col gap-1">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "secondary" : "ghost"}
                  className={cn(
                    "justify-start whitespace-nowrap md:w-full",
                    activeCategory === category.id && "bg-secondary",
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="hidden md:inline-block">{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>
        <div className="mt-auto px-3 py-2 hidden md:block space-y-1">
          <h2 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">Account</h2>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to ="/profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to ="/account">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}

