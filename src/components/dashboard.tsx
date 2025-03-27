import { useState } from "react"
import NewsFeed from "./NewsFeed"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<string>("all")

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <main className="flex-1 p-4 md:p-6">
          <NewsFeed category={activeCategory} />
        </main>
      </div>
    </div>
  )
}

