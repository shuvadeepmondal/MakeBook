import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Share2, Bookmark, Send, ChevronDown } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  date: string
}

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

interface NewsCardProps {
  news: NewsItem
  onVote: (id: number, direction: "up" | "down") => void
  onAddComment: (newsId: number, comment: Comment) => void
}

export default function NewsCard({ news, onVote, onAddComment }: NewsCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)

  const handleVote = (direction: "up" | "down") => {
    // If clicking the same direction, remove the vote
    if (userVote === direction) {
      onVote(news.id, direction === "up" ? "down" : "up") // Undo the vote
      setUserVote(null)
    }
    // If changing vote direction, count as 2 (remove previous, add new)
    else if (userVote !== null) {
      onVote(news.id, direction) // Add new vote
      onVote(news.id, direction) // Add extra impact to counter previous vote
      setUserVote(direction)
    }
    // First time voting
    else {
      onVote(news.id, direction)
      setUserVote(direction)
    }
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        date: new Date().toISOString().split("T")[0],
      }
      onAddComment(news.id, comment)
      setNewComment("")
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return dateString
    }
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      politics: "bg-blue-500",
      entertainment: "bg-purple-500",
      health: "bg-green-500",
      music: "bg-pink-500",
      trending: "bg-amber-500",
    }
    return colors[category] || "bg-slate-500"
  }

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl border-none bg-gradient-to-br from-background to-background/50 backdrop-blur-sm">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-primary/10 z-0"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-primary/5 z-0"></div>

        <div className="md:flex relative z-10">
          {/* Image section with overlay */}
          <div className="md:w-2/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent z-10"></div>
            <img
              src={news.image || "/placeholder.svg"}
              alt={news.title}
              width={300}
              height={200}
              className="w-full h-56 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className={`absolute top-3 left-3 ${getCategoryColor(news.category)} text-white text-xs px-3 py-1 rounded-full font-medium z-20`}
            >
              {news.category}
            </div>

            {/* Unique voting system */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center justify-center bg-background shadow-lg rounded-full h-12 px-1">
                <button
                  className={`relative group/vote flex items-center justify-center w-14 h-10 rounded-l-full transition-all ${
                    userVote === "down"
                      ? "bg-red-100 text-red-500"
                      : "hover:bg-red-50 text-muted-foreground hover:text-red-500"
                  }`}
                  onClick={() => handleVote("down")}
                >
                  {/* Custom downvote icon */}
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${userVote === "down" ? "scale-110" : ""}`}
                  >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>

                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/vote:opacity-100 transition-opacity">
                    Downvote
                  </span>
                </button>

                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-background to-background">
                  <span
                    className={`font-bold text-lg transition-all ${
                      userVote === "up" ? "text-green-500" : userVote === "down" ? "text-red-500" : "text-foreground"
                    }`}
                  >
                    {news.votes}
                  </span>
                </div>

                <button
                  className={`relative group/vote flex items-center justify-center w-14 h-10 rounded-r-full transition-all ${
                    userVote === "up"
                      ? "bg-green-100 text-green-500"
                      : "hover:bg-green-50 text-muted-foreground hover:text-green-500"
                  }`}
                  onClick={() => handleVote("up")}
                >
                  {/* Custom upvote icon */}
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${userVote === "up" ? "scale-110" : ""}`}
                  >
                    <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
                  </svg>

                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/vote:opacity-100 transition-opacity">
                    Upvote
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="md:w-3/5 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{news.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground"></span>
                    {formatDate(news.date)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={isBookmarked ? "text-primary" : "text-muted-foreground"}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`h-5 w-5 transition-all ${isBookmarked ? "fill-primary" : ""}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="py-2">
              <div className="space-y-3">
                {/* Show excerpt by default */}
                <p>{news.excerpt}</p>

                {/* Show full content when expanded */}
                {expanded && (
                  <div className="animate-slide-up pt-2">
                    <p>{news.content}</p>
                  </div>
                )}

                {/* Read more button instead of hover */}
                {!expanded && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary flex items-center gap-1 px-0 h-auto font-medium"
                    onClick={() => setExpanded(true)}
                  >
                    Read more
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-2 mt-auto">
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 rounded-full px-3 ${showComments ? "bg-primary/10 text-primary" : ""}`}
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{news.comments.length}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 rounded-full px-3">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">{news.comments.length} comments</div>
            </CardFooter>
          </div>
        </div>
      </div>

      {/* Comments section with slide animation */}
      {showComments && (
        <div className="px-4 pb-4 space-y-4 border-t mt-4 pt-4 animate-in slide-in-from-top duration-300">
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {news.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group/comment">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback className="bg-primary/10 text-primary">{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                  </div>
                  <p className="text-sm mt-1 bg-muted/50 p-2 rounded-md rounded-tl-none">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
              <AvatarFallback className="bg-primary/10 text-primary">Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] bg-muted/50 border-muted focus-visible:ring-primary"
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="rounded-full px-4"
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

