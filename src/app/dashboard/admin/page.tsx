'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Briefcase,
  Users,
  DollarSign,
  AlertTriangle,
  Shield,
  Settings,
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
} from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,458', change: '+12%', icon: Users },
  { label: 'Active Projects', value: '3,241', change: '+8%', icon: Briefcase },
  { label: 'Revenue', value: '$284K', change: '+15%', icon: DollarSign },
  { label: 'Disputes', value: '23', change: '-5%', icon: AlertTriangle },
];

const revenueData = [
  { month: 'Jul', amount: 42000 },
  { month: 'Aug', amount: 48000 },
  { month: 'Sep', amount: 52000 },
  { month: 'Oct', amount: 61000 },
  { month: 'Nov', amount: 58000 },
  { month: 'Dec', amount: 72000 },
];

const userGrowthData = [
  { month: 'Jul', freelancers: 2100, clients: 890 },
  { month: 'Aug', freelancers: 2400, clients: 1020 },
  { month: 'Sep', freelancers: 2800, clients: 1150 },
  { month: 'Oct', freelancers: 3200, clients: 1280 },
  { month: 'Nov', freelancers: 3600, clients: 1400 },
  { month: 'Dec', freelancers: 4100, clients: 1580 },
];

const recentUsers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'FREELANCER', status: 'ACTIVE', joinedAt: 'Dec 10, 2024' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'FREELANCER', status: 'PENDING', joinedAt: 'Dec 12, 2024' },
  { id: '3', name: 'TechCorp Inc.', email: 'contact@techcorp.com', role: 'CLIENT', status: 'ACTIVE', joinedAt: 'Dec 8, 2024' },
  { id: '4', name: 'Marcus Johnson', email: 'marcus@example.com', role: 'FREELANCER', status: 'SUSPENDED', joinedAt: 'Dec 5, 2024' },
];

const recentReports = [
  { id: '1', type: 'User Report', description: 'Suspicious account activity', status: 'PENDING', createdAt: '2h ago' },
  { id: '2', type: 'Project Dispute', description: 'Payment release disagreement', status: 'INVESTIGATING', createdAt: '5h ago' },
  { id: '3', type: 'Content Report', description: 'Inappropriate project description', status: 'RESOLVED', createdAt: '1d ago' },
];

const pendingVerifications = [
  { id: '1', user: 'Emily Rodriguez', type: 'Identity Verification', submittedAt: 'Dec 10, 2024' },
  { id: '2', user: 'David Kim', type: 'Skill Verification', submittedAt: 'Dec 11, 2024' },
  { id: '3', user: 'Maria Garcia', type: 'Portfolio Verification', submittedAt: 'Dec 12, 2024' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground">
                  <Briefcase className="size-5 text-primary" />
                </div>
                <span className="text-xl font-bold">Remoteok Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search users, projects..."
                className="w-64 bg-primary-foreground/10 border-primary-foreground/20"
              />
              <Button variant="secondary">Settings</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <stat.icon className="size-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-green-500">{stat.change} from last month</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Freelancers and clients over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Line type="monotone" dataKey="freelancers" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="clients" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge
                            variant={
                              user.status === 'ACTIVE'
                                ? 'default'
                                : user.status === 'PENDING'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{report.type}</p>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                        <Badge
                          variant={
                            report.status === 'RESOLVED'
                              ? 'default'
                              : report.status === 'INVESTIGATING'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex gap-2">
                    <Input placeholder="Search users..." className="w-64" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="freelancers">Freelancers</SelectItem>
                        <SelectItem value="clients">Clients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management interface coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Project management interface coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Report Center</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{report.type}</p>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verifications">
            <Card>
              <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((verification) => (
                    <div key={verification.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{verification.user}</p>
                        <p className="text-sm text-muted-foreground">{verification.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Submitted: {verification.submittedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="size-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="default">
                          <CheckCircle className="size-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="size-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings interface coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}