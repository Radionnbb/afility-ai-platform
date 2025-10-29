"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertCircle, Info, Trash2 } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "warning" | "info" | "error"
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Purchase Confirmed",
    message: "Your purchase of iPhone 15 Pro Max has been confirmed. You saved $89.99!",
    type: "success",
    timestamp: "2024-01-15T10:30:00",
    read: false,
  },
  {
    id: "2",
    title: "New Deal Available",
    message: "We found a 25% discount on MacBook Air M3. Check it out now!",
    type: "info",
    timestamp: "2024-01-14T15:45:00",
    read: false,
  },
  {
    id: "3",
    title: "Price Drop Alert",
    message: "The Samsung Galaxy Buds you viewed dropped by $15. Limited time offer!",
    type: "warning",
    timestamp: "2024-01-13T09:20:00",
    read: true,
  },
  {
    id: "4",
    title: "Commission Earned",
    message: "You earned $12.50 commission from your recent purchase referral.",
    type: "success",
    timestamp: "2024-01-12T14:00:00",
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Notifications</h1>
            {unreadCount > 0 && <Badge className="bg-red-600 text-white ml-auto">{unreadCount} unread</Badge>}
          </div>
          <p className="text-gray-400">Stay updated with your SaveAI activity and deals</p>
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300"}
          >
            All Notifications
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
            className={filter === "unread" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300"}
          >
            Unread ({unreadCount})
          </Button>
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No notifications</h3>
                <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-gray-800 backdrop-blur-xl transition-all duration-300 ${
                  notification.read
                    ? "bg-gradient-to-br from-gray-900/50 to-black/50"
                    : "bg-gradient-to-br from-gray-900/80 to-black/80 border-blue-600/50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg">{notification.title}</h3>
                          <p className="text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && <Badge className="bg-blue-600 text-white flex-shrink-0">New</Badge>}
                      </div>
                      <div className="flex gap-2 mt-4">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteNotification(notification.id)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
