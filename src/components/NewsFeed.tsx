import { useState, useEffect } from "react"
import NewsCard from "./NewsCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  votes: number
  comments: Comment[]
}

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  date: string
}

interface NewsFeedProps {
  category: string
}

export default function NewsFeed({ category }: NewsFeedProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch news
    setLoading(true)
    setTimeout(() => {
      setNewsItems(getMockNewsItems())
      setLoading(false)
    }, 500)
  }, [])

  const filteredNews = category === "all" ? newsItems : newsItems.filter((item) => item.category === category)

  const handleVote = (id: number, direction: "up" | "down") => {
    setNewsItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, votes: item.votes + (direction === "up" ? 1 : -1) } : item)),
    )
  }

  const addComment = (newsId: number, comment: Comment) => {
    setNewsItems((prev) =>
      prev.map((item) => (item.id === newsId ? { ...item, comments: [...item.comments, comment] } : item)),
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {category === "all" ? "Latest News" : category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>

      <Tabs defaultValue="latest">
        <TabsList>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        <TabsContent value="latest" className="space-y-4 mt-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <NewsCard key={item.id} news={item} onVote={handleVote} onAddComment={addComment} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No news found in this category</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="popular" className="space-y-4 mt-4">
          {filteredNews
            .sort((a, b) => b.votes - a.votes)
            .map((item) => (
              <NewsCard key={item.id} news={item} onVote={handleVote} onAddComment={addComment} />
            ))}
        </TabsContent>
        <TabsContent value="trending" className="space-y-4 mt-4">
          {filteredNews
            .filter((item) => item.votes > 5)
            .map((item) => (
              <NewsCard key={item.id} news={item} onVote={handleVote} onAddComment={addComment} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getMockNewsItems(): NewsItem[] {
  return [
    {
      id: 1,
      title: "New Climate Policy Announced by Government",
      excerpt: "The government has announced a new climate policy aimed at reducing carbon emissions by 50% by 2030.",
      content:
        "The government has announced a new climate policy aimed at reducing carbon emissions by 50% by 2030. This ambitious plan includes investments in renewable energy, electric vehicles, and carbon capture technology. Environmental groups have praised the move, while some industry leaders have expressed concerns about the timeline.\n\nThe policy includes tax incentives for businesses that adopt green technologies, subsidies for homeowners who install solar panels, and stricter regulations on industrial emissions. The government has also committed to phasing out coal-fired power plants by 2028 and investing in a nationwide network of charging stations for electric vehicles.",
      image: "/placeholder.svg?height=400&width=600",
      category: "politics",
      date: "2023-06-15",
      votes: 24,
      comments: [
        {
          id: 1,
          author: "Jane Smith",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "This is a step in the right direction, but we need more action.",
          date: "2023-06-15",
        },
        {
          id: 2,
          author: "John Doe",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "I'm concerned about the economic impact of these policies.",
          date: "2023-06-16",
        },
      ],
    },
    {
      id: 2,
      title: "New Blockbuster Movie Breaks Box Office Records",
      excerpt: "The latest superhero movie has broken all box office records in its opening weekend.",
      content:
        "The latest superhero movie has broken all box office records in its opening weekend, grossing over $300 million globally. Critics have praised the film's special effects, storytelling, and performances. Fans are already speculating about potential sequels and spin-offs.\n\nThe film's success highlights the continued popularity of the superhero genre despite predictions of audience fatigue. The director has credited the film's success to its focus on character development and emotional storytelling, rather than just action sequences. The studio has already greenlit a sequel, scheduled for release in 2025.",
      image: "/placeholder.svg?height=400&width=600",
      category: "entertainment",
      date: "2023-06-14",
      votes: 42,
      comments: [
        {
          id: 1,
          author: "Movie Fan",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "I saw it twice already! The special effects were amazing.",
          date: "2023-06-14",
        },
      ],
    },
    {
      id: 3,
      title: "New Study Reveals Health Benefits of Mediterranean Diet",
      excerpt:
        "A new study has found that following a Mediterranean diet can reduce the risk of heart disease by up to 30%.",
      content:
        "A new study published in the Journal of Nutrition has found that following a Mediterranean diet can reduce the risk of heart disease by up to 30%. The study followed 10,000 participants over a period of 5 years and found that those who adhered closely to the diet had significantly better cardiovascular outcomes.\n\nThe Mediterranean diet is rich in olive oil, nuts, fish, fruits, and vegetables, and has been associated with numerous health benefits. Researchers believe that the combination of healthy fats, antioxidants, and fiber in the diet contributes to its heart-protective effects. The study also found benefits for brain health and longevity.",
      image: "/placeholder.svg?height=400&width=600",
      category: "health",
      date: "2023-06-13",
      votes: 18,
      comments: [
        {
          id: 1,
          author: "Health Enthusiast",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "I've been following this diet for years and feel great!",
          date: "2023-06-13",
        },
        {
          id: 2,
          author: "Skeptic",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "I'd like to see more long-term studies on this.",
          date: "2023-06-14",
        },
      ],
    },
    {
      id: 4,
      title: "Popular Artist Announces Surprise Album Release",
      excerpt: "A chart-topping artist has surprised fans with an unexpected album release at midnight.",
      content:
        "A chart-topping artist has surprised fans with an unexpected album release at midnight. The album, which was not previously announced, features 12 new tracks and collaborations with several other popular musicians.\n\nFans and critics are already praising the album's innovative sound and lyrical depth. This marks the artist's first release in three years and represents a new creative direction. The album explores themes of personal growth, social justice, and mental health, with production that blends electronic, orchestral, and acoustic elements.",
      image: "/placeholder.svg?height=400&width=600",
      category: "music",
      date: "2023-06-12",
      votes: 37,
      comments: [
        {
          id: 1,
          author: "Music Lover",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "I've been listening to it on repeat all day!",
          date: "2023-06-12",
        },
      ],
    },
    {
      id: 5,
      title: "Tech Company Unveils Revolutionary New Smartphone",
      excerpt: "A leading tech company has unveiled its latest smartphone with groundbreaking features.",
      content:
        "A leading tech company has unveiled its latest smartphone with groundbreaking features, including an all-day battery life, advanced AI capabilities, and a revolutionary camera system. The phone will be available for pre-order next week and is expected to ship by the end of the month.\n\nAnalysts predict strong sales despite the premium price point, citing the device's innovative features and the company's loyal customer base. The new AI system can understand complex voice commands, translate languages in real-time, and adapt to the user's habits to optimize performance and battery life. The camera system includes a periscope lens for 10x optical zoom and computational photography features.",
      image: "/placeholder.svg?height=400&width=600",
      category: "trending",
      date: "2023-06-11",
      votes: 29,
      comments: [
        {
          id: 1,
          author: "Tech Enthusiast",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Can't wait to get my hands on this!",
          date: "2023-06-11",
        },
        {
          id: 2,
          author: "Budget Conscious",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Looks great but the price is too high for me.",
          date: "2023-06-12",
        },
      ],
    },
  ]
}

