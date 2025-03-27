import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Textarea } from "./ui/textarea"
import { Edit, ImageIcon, MapPin, Calendar, Bookmark, MessageSquare, ThumbsUp } from "lucide-react"
import Header from "./Header"
import Sidebar from "./Sidebar"


export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [profile, setProfile] = useState({
    name: "Jane Smith",
    username: "janesmith",
    bio: "Digital content creator and tech enthusiast. I love sharing news and insights about the latest trends in technology and design.",
    location: "San Francisco, CA",
    website: "janesmith.com",
    joinDate: "January 2022",
    coverImage: "/placeholder.svg?height=300&width=1200",
    avatar: "/placeholder.svg?height=150&width=150",
  })

  const handleSaveProfile = () => {
    // In a real app, you would save the profile to the backend here
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <main className="flex-1">
          {/* Cover Image */}
          <div className="relative h-48 md:h-64 w-full overflow-hidden">
            <img src={profile.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
            {isEditing && (
              <Button variant="secondary" size="sm" className="absolute bottom-4 right-4 flex items-center gap-1">
                <ImageIcon className="h-4 w-4" />
                Change Cover
              </Button>
            )}
          </div>

          {/* Profile Header */}
          <div className="relative px-4 md:px-8 pb-4 -mt-16 flex flex-col md:flex-row md:items-end">
            <div className="relative z-10">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="secondary" size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>Save Profile</Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {profile.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Joined {profile.joinDate}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-4 md:px-8 py-6">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Your public profile information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={profile.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={profile.username}
                              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              rows={4}
                              value={profile.bio}
                              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={profile.location}
                              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={profile.website}
                              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm">{profile.bio}</p>
                          <div className="pt-4 border-t">
                            <h3 className="font-medium mb-2">Website</h3>
                            <a href={`https://${profile.website}`} className="text-primary hover:underline">
                              {profile.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Stats</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Upvotes</span>
                            </div>
                            <span className="font-medium">247</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Comments</span>
                            </div>
                            <span className="font-medium">89</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Bookmark className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>Saved</span>
                            </div>
                            <span className="font-medium">36</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Interests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">Technology</div>
                          <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">Design</div>
                          <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">Politics</div>
                          <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">Science</div>
                          <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">Health</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="posts">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Posts</CardTitle>
                    <CardDescription>Articles and comments you've posted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">You haven't posted any articles yet.</p>
                      <Button className="mt-4">Create Your First Post</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>Articles you've bookmarked for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={`/placeholder.svg?height=64&width=64&text=${item}`}
                              alt="Article thumbnail"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">Saved Article Title {item}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Short excerpt from the saved article...
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-muted-foreground">Saved 3 days ago</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Saved Items
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent interactions on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex gap-3 pb-4 border-b last:border-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {item % 2 === 0 ? (
                              <ThumbsUp className="h-5 w-5 text-primary" />
                            ) : (
                              <MessageSquare className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm">
                              You {item % 2 === 0 ? "upvoted" : "commented on"}{" "}
                              <span className="font-medium">Article Title {item}</span>
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {item} day{item !== 1 ? "s" : ""} ago
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

