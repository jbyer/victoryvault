"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  Heart,
  Download,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Flag,
  Mail,
} from "lucide-react"
import Link from "next/link"

interface DashboardData {
  user: {
    name: string
    email: string
    role: string
    memberSince: string
    profilePicture?: string
  }
  stats: {
    totalDonated: number
    candidatesSupported: number
    causesSupported: number
    thisMonthDonations: number
    lastMonthDonations: number
  }
  recentDonations: Array<{
    id: string
    recipient: string
    type: "candidate" | "cause"
    amount: number
    date: string
    status: "completed" | "pending" | "failed"
  }>
  supportedCandidates: Array<{
    id: string
    name: string
    office: string
    state: string
    totalDonated: number
    lastDonation: string
    status: "active" | "won" | "lost"
  }>
  supportedCauses: Array<{
    id: string
    name: string
    category: string
    totalDonated: number
    lastDonation: string
    progress: number
  }>
  upcomingEvents: Array<{
    id: string
    title: string
    date: string
    type: "election" | "fundraiser" | "event"
  }>
  notifications: Array<{
    id: string
    title: string
    message: string
    type: "success" | "info" | "warning"
    date: string
    read: boolean
  }>
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in a real app, this would come from an API
  const dashboardData: DashboardData = {
    user: {
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Individual Donor",
      memberSince: "January 2023",
    },
    stats: {
      totalDonated: 2850,
      candidatesSupported: 12,
      causesSupported: 8,
      thisMonthDonations: 450,
      lastMonthDonations: 320,
    },
    recentDonations: [
      {
        id: "1",
        recipient: "Sarah Johnson",
        type: "candidate",
        amount: 100,
        date: "2024-01-15",
        status: "completed",
      },
      {
        id: "2",
        recipient: "Border Security Initiative",
        type: "cause",
        amount: 250,
        date: "2024-01-12",
        status: "completed",
      },
      {
        id: "3",
        recipient: "Mike Thompson",
        type: "candidate",
        amount: 100,
        date: "2024-01-10",
        status: "pending",
      },
      {
        id: "4",
        recipient: "Veterans Support Program",
        type: "cause",
        amount: 75,
        date: "2024-01-08",
        status: "completed",
      },
    ],
    supportedCandidates: [
      {
        id: "1",
        name: "Sarah Johnson",
        office: "U.S. Senate",
        state: "Texas",
        totalDonated: 500,
        lastDonation: "2024-01-15",
        status: "active",
      },
      {
        id: "2",
        name: "Mike Thompson",
        office: "Governor",
        state: "Florida",
        totalDonated: 300,
        lastDonation: "2024-01-10",
        status: "active",
      },
      {
        id: "3",
        name: "Lisa Chen",
        office: "U.S. House",
        state: "Arizona",
        totalDonated: 200,
        lastDonation: "2023-12-20",
        status: "won",
      },
    ],
    supportedCauses: [
      {
        id: "1",
        name: "Border Security Initiative",
        category: "National Security",
        totalDonated: 750,
        lastDonation: "2024-01-12",
        progress: 68,
      },
      {
        id: "2",
        name: "Veterans Support Program",
        category: "Veterans Affairs",
        totalDonated: 425,
        lastDonation: "2024-01-08",
        progress: 45,
      },
      {
        id: "3",
        name: "Small Business Relief",
        category: "Economy",
        totalDonated: 300,
        lastDonation: "2023-12-28",
        progress: 72,
      },
    ],
    upcomingEvents: [
      {
        id: "1",
        title: "Texas Senate Primary",
        date: "2024-03-05",
        type: "election",
      },
      {
        id: "2",
        title: "Conservative Leadership Gala",
        date: "2024-02-20",
        type: "fundraiser",
      },
      {
        id: "3",
        title: "Border Security Town Hall",
        date: "2024-02-15",
        type: "event",
      },
    ],
    notifications: [
      {
        id: "1",
        title: "Donation Successful",
        message: "Your $100 donation to Sarah Johnson has been processed.",
        type: "success",
        date: "2024-01-15",
        read: false,
      },
      {
        id: "2",
        title: "Campaign Update",
        message: "Border Security Initiative has reached 68% of its funding goal.",
        type: "info",
        date: "2024-01-14",
        read: false,
      },
      {
        id: "3",
        title: "Election Reminder",
        message: "Texas Senate Primary is coming up on March 5th.",
        type: "warning",
        date: "2024-01-13",
        read: true,
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "won":
        return "text-green-600 bg-green-100"
      case "pending":
      case "active":
        return "text-blue-600 bg-blue-100"
      case "failed":
      case "lost":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <Bell className="h-4 w-4 text-blue-600" />
    }
  }

  const monthlyChange = dashboardData.stats.thisMonthDonations - dashboardData.stats.lastMonthDonations
  const monthlyChangePercent = Math.round((monthlyChange / dashboardData.stats.lastMonthDonations) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {dashboardData.user.name}</h1>
              <p className="text-gray-600 mt-1">Here's your conservative impact dashboard</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link href="/admin/create-campaign">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </Link>
              
              
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${dashboardData.stats.totalDonated.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                {monthlyChange >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={monthlyChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {monthlyChangePercent}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidates Supported</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.stats.candidatesSupported}</div>
              <p className="text-xs text-gray-600 mt-1">Across multiple races</p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Causes Supported</CardTitle>
              <Heart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.stats.causesSupported}</div>
              <p className="text-xs text-gray-600 mt-1">Conservative initiatives</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${dashboardData.stats.thisMonthDonations}</div>
              <p className="text-xs text-gray-600 mt-1">January donations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Donations */}
            <Card className="border-red-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Recent Donations</CardTitle>
                    <CardDescription>Your latest contributions to candidates and causes</CardDescription>
                  </div>
                  <Link href="/donations">
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-red-500 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-red-100 p-2 rounded-full">
                          {donation.type === "candidate" ? (
                            <User className="h-4 w-4 text-red-600" />
                          ) : (
                            <Flag className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{donation.recipient}</div>
                          <div className="text-sm text-gray-600 capitalize">{donation.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${donation.amount}</div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{donation.date}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}
                          >
                            {donation.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supported Candidates */}
            <Card className="border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Supported Candidates</CardTitle>
                    <CardDescription>Track your candidate contributions and their progress</CardDescription>
                  </div>
                  <Link href="/candidates">
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-red-500 bg-transparent">
                      <Plus className="mr-2 h-4 w-4" />
                      Support More
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.supportedCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-600">
                            {candidate.office} • {candidate.state}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">${candidate.totalDonated}</div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Last: {candidate.lastDonation}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}
                          >
                            {candidate.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supported Causes */}
            <Card className="border-green-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Supported Causes</CardTitle>
                    <CardDescription>Your contributions to conservative initiatives</CardDescription>
                  </div>
                  <Link href="/causes">
                    <Button variant="outline" size="sm" className="border-gray-300 hover:border-red-500 bg-transparent">
                      <Plus className="mr-2 h-4 w-4" />
                      Support More
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.supportedCauses.map((cause) => (
                    <div key={cause.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-gray-900">{cause.name}</div>
                          <div className="text-sm text-gray-600">{cause.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${cause.totalDonated}</div>
                          <div className="text-xs text-gray-500">Last: {cause.lastDonation}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${cause.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{cause.progress}% of goal reached</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{dashboardData.user.name}</div>
                    <div className="text-sm text-gray-600">{dashboardData.user.role}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {dashboardData.user.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {dashboardData.user.memberSince}
                  </div>
                </div>
                <Link href="/profile">
                  <Button variant="outline" className="w-full border-gray-300 hover:border-red-500 bg-transparent">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900">Notifications</CardTitle>
                  <div className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                    {dashboardData.notifications.filter((n) => !n.read).length} new
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.read ? "bg-gray-50 border-gray-200" : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                          <div className="text-xs text-gray-600 mt-1">{notification.message}</div>
                          <div className="text-xs text-gray-500 mt-1">{notification.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/notifications">
                  <Button variant="outline" className="w-full mt-4 border-gray-300 hover:border-red-500 bg-transparent">
                    View All Notifications
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-xs text-gray-600">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/create-campaign">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Campaign
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Make a Donation
                  </Button>
                </Link>
                <Link href="/tax-receipt">
                  <Button variant="outline" className="w-full border-gray-300 hover:border-red-500 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download Tax Receipt
                  </Button>
                </Link>
                <Link href="/recurring">
                  <Button variant="outline" className="w-full border-gray-300 hover:border-red-500 bg-transparent">
                    <Clock className="mr-2 h-4 w-4" />
                    Manage Recurring
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
