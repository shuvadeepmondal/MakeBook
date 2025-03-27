"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { AlertCircle, Bell, Lock, LogOut, Mail, Shield, Trash2, User } from "lucide-react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function AccountSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [emailValues, setEmailValues] = useState({
    email: "jane.smith@example.com",
    newEmail: "",
  })

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    newComments: true,
    mentions: true,
    upvotes: false,
    productUpdates: true,
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

            <Tabs defaultValue="general">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 flex-shrink-0">
                  <div className="sticky top-20">
                    <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                      <TabsTrigger value="general" className="justify-start w-full data-[state=active]:bg-muted">
                        <User className="mr-2 h-4 w-4" />
                        General
                      </TabsTrigger>
                      <TabsTrigger value="security" className="justify-start w-full data-[state=active]:bg-muted">
                        <Lock className="mr-2 h-4 w-4" />
                        Security
                      </TabsTrigger>
                      <TabsTrigger value="notifications" className="justify-start w-full data-[state=active]:bg-muted">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger value="privacy" className="justify-start w-full data-[state=active]:bg-muted">
                        <Shield className="mr-2 h-4 w-4" />
                        Privacy
                      </TabsTrigger>
                      <TabsTrigger
                        value="danger"
                        className="justify-start w-full data-[state=active]:bg-muted text-destructive"
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Danger Zone
                      </TabsTrigger>
                    </TabsList>
                    <div className="mt-8 hidden md:block">
                      <Button variant="outline" className="w-full justify-start text-muted-foreground">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <TabsContent value="general" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Email Address</CardTitle>
                        <CardDescription>Update your email address</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-email">Current Email</Label>
                          <Input id="current-email" value={emailValues.email} disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-email">New Email</Label>
                          <Input
                            id="new-email"
                            type="email"
                            placeholder="Enter new email address"
                            value={emailValues.newEmail}
                            onChange={(e) => setEmailValues({ ...emailValues, newEmail: e.target.value })}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button disabled={!emailValues.newEmail}>Update Email</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" defaultValue="Jane" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" defaultValue="Smith" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="display-name">Display Name</Label>
                          <Input id="display-name" defaultValue="Jane Smith" />
                          <p className="text-xs text-muted-foreground">
                            This is the name that will be displayed on your profile and in comments.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="america-los_angeles">
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="america-los_angeles">Pacific Time (US & Canada)</SelectItem>
                              <SelectItem value="america-new_york">Eastern Time (US & Canada)</SelectItem>
                              <SelectItem value="europe-london">London</SelectItem>
                              <SelectItem value="europe-paris">Paris</SelectItem>
                              <SelectItem value="asia-tokyo">Tokyo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password to keep your account secure</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={passwordValues.currentPassword}
                            onChange={(e) => setPasswordValues({ ...passwordValues, currentPassword: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={passwordValues.newPassword}
                            onChange={(e) => setPasswordValues({ ...passwordValues, newPassword: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={passwordValues.confirmPassword}
                            onChange={(e) => setPasswordValues({ ...passwordValues, confirmPassword: e.target.value })}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          disabled={
                            !passwordValues.currentPassword ||
                            !passwordValues.newPassword ||
                            !passwordValues.confirmPassword ||
                            passwordValues.newPassword !== passwordValues.confirmPassword
                          }
                        >
                          Update Password
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>Add an extra layer of security to your account</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Authenticator App</div>
                            <div className="text-sm text-muted-foreground">
                              Use an authenticator app to generate one-time codes
                            </div>
                          </div>
                          <Button variant="outline">Set up</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Text Message</div>
                            <div className="text-sm text-muted-foreground">Receive codes via SMS</div>
                          </div>
                          <Button variant="outline">Set up</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Active Sessions</CardTitle>
                        <CardDescription>Manage your active sessions across devices</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <rect width="16" height="20" x="4" y="2" rx="2" />
                                  <path d="M12 18h.01" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">Current Device</div>
                                <div className="text-xs text-muted-foreground">San Francisco, CA • Last active now</div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" disabled>
                              Current
                            </Button>
                          </div>

                          <div className="flex justify-between items-center p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-primary"
                                >
                                  <rect width="20" height="14" x="2" y="3" rx="2" />
                                  <line x1="8" x2="16" y1="21" y2="21" />
                                  <line x1="12" x2="12" y1="17" y2="21" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">MacBook Pro</div>
                                <div className="text-xs text-muted-foreground">
                                  San Francisco, CA • Last active 2 hours ago
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Log out
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Log Out of All Devices
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Choose how you want to be notified</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Email Digest</div>
                              <div className="text-sm text-muted-foreground">Receive a daily digest of top stories</div>
                            </div>
                            <Switch
                              checked={notifications.emailDigest}
                              onCheckedChange={(checked) =>
                                setNotifications({ ...notifications, emailDigest: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">New Comments</div>
                              <div className="text-sm text-muted-foreground">When someone comments on your posts</div>
                            </div>
                            <Switch
                              checked={notifications.newComments}
                              onCheckedChange={(checked) =>
                                setNotifications({ ...notifications, newComments: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Mentions</div>
                              <div className="text-sm text-muted-foreground">
                                When someone mentions you in a comment
                              </div>
                            </div>
                            <Switch
                              checked={notifications.mentions}
                              onCheckedChange={(checked) => setNotifications({ ...notifications, mentions: checked })}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Upvotes</div>
                              <div className="text-sm text-muted-foreground">
                                When someone upvotes your posts or comments
                              </div>
                            </div>
                            <Switch
                              checked={notifications.upvotes}
                              onCheckedChange={(checked) => setNotifications({ ...notifications, upvotes: checked })}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Product Updates</div>
                              <div className="text-sm text-muted-foreground">
                                News about product updates and new features
                              </div>
                            </div>
                            <Switch
                              checked={notifications.productUpdates}
                              onCheckedChange={(checked) =>
                                setNotifications({ ...notifications, productUpdates: checked })
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save Preferences</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Email Notifications</CardTitle>
                        <CardDescription>Manage your email notification settings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Label htmlFor="notification-email">Notification Email</Label>
                          <div className="flex gap-2">
                            <Input id="notification-email" defaultValue="jane.smith@example.com" className="flex-1" />
                            <Button variant="outline">
                              <Mail className="mr-2 h-4 w-4" />
                              Verify
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            This is where we'll send your notifications. You can use a different email than your account
                            email.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="privacy" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>Control your privacy and visibility</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Profile Visibility</div>
                              <div className="text-sm text-muted-foreground">Who can see your profile</div>
                            </div>
                            <Select defaultValue="public">
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="followers">Followers</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Activity Status</div>
                              <div className="text-sm text-muted-foreground">
                                Show when you're active on the platform
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Search Engine Visibility</div>
                              <div className="text-sm text-muted-foreground">
                                Allow search engines to index your profile
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Save Privacy Settings</Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Data & Personalization</CardTitle>
                        <CardDescription>Manage how your data is used</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Personalized Content</div>
                              <div className="text-sm text-muted-foreground">Show content based on your interests</div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Data Analytics</div>
                              <div className="text-sm text-muted-foreground">
                                Allow us to collect usage data to improve our service
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start space-y-2">
                        <Button variant="outline" className="w-full">
                          Download Your Data
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          You can request a copy of all your data at any time.
                        </p>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="danger" className="space-y-6 mt-0">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>Actions in this section can permanently affect your account.</AlertDescription>
                    </Alert>

                    <Card>
                      <CardHeader>
                        <CardTitle>Deactivate Account</CardTitle>
                        <CardDescription>Temporarily disable your account</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          Deactivating your account will hide your profile and content from other users. You can
                          reactivate at any time by logging back in.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="text-amber-600 border-amber-600">
                          Deactivate Account
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Delete Account</CardTitle>
                        <CardDescription>Permanently delete your account and all data</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          This action is irreversible. All your data, including profile, posts, comments, and saved
                          items will be permanently deleted.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

