'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Star,
  Clock,
  Users,
  FileText,
  ArrowRight,
  Plus,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const earningsData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 5800 },
  { month: 'Mar', amount: 4900 },
  { month: 'Apr', amount: 6300 },
  { month: 'May', amount: 7200 },
  { month: 'Jun', amount: 8500 },
];

const skillsData = [
  { name: 'React', level: 92 },
  { name: 'Node.js', level: 85 },
  { name: 'TypeScript', level: 88 },
  { name: 'PostgreSQL', level: 78 },
  { name: 'AWS', level: 72 },
];

const projectStatusData = [
  { name: 'In Progress', value: 3, color: '#3b82f6' },
  { name: 'Review', value: 2, color: '#f59e0b' },
  { name: 'Completed', value: 12, color: '#22c55e' },
  { name: 'Pending', value: 5, color: '#a855f7' },
];

const recentProjects = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    client: 'TechCorp Inc.',
    budget: 7500,
    status: 'IN_PROGRESS',
    progress: 65,
    deadline: 'Dec 15, 2024',
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    client: 'FitLife Studios',
    budget: 4000,
    status: 'REVIEW',
    progress: 90,
    deadline: 'Nov 30, 2024',
  },
  {
    id: '3',
    title: 'API Integration',
    client: 'DataFlow Analytics',
    budget: 2500,
    status: 'COMPLETED',
    progress: 100,
    deadline: 'Oct 20, 2024',
  },
];

const notifications = [
  { id: 1, title: 'New proposal accepted', message: 'TechCorp accepted your proposal', time: '2h ago', unread: true },
  { id: 2, title: 'Payment received', message: '$2,500 released for milestone 2', time: '5h ago', unread: true },
  { id: 3, title: 'New message', message: 'FitLife Studios sent you a message', time: '1d ago', unread: false },
];

const statusColors: Record<string, string> = {
  IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  REVIEW: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  PENDING: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
};

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Remoteok</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="size-5" />
                </Button>
              </Link>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John</h1>
            <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your projects</p>
          </div>
          <div className="flex gap-3">
            <Link href="/find-work">
              <Button>
                <Search className="size-4 mr-2" />
                Find Work
              </Button>
            </Link>
            <Link href="/projects/new">
              <Button variant="outline">
                <Plus className="size-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              <DollarSign className="size-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$36,900</div>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <TrendingUp className="size-3" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <Briefcase className="size-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 in progress, 1 in review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Proposals</CardTitle>
              <FileText className="size-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 shortlisted, 3 pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
              <Star className="size-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9</div>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">(47 reviews)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Your earnings over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData}>
                          <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
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
                          <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorAmount)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Projects</CardTitle>
                      <Link href="/projects" className="text-sm text-primary hover:underline">
                        View All
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center gap-4 p-4 rounded-lg border">
                          <Avatar>
                            <AvatarFallback>{project.client.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{project.title}</p>
                            <p className="text-sm text-muted-foreground">{project.client}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={statusColors[project.status]}>{project.status.replace('_', ' ')}</Badge>
                            <p className="text-sm font-medium mt-1">${project.budget.toLocaleString()}</p>
                          </div>
                          <Progress value={project.progress} className="w-20 h-2" />
                          <ChevronRight className="size-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Proficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillsData.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={projectStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {projectStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {projectStatusData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex gap-3 p-3 rounded-lg ${notification.unread ? 'bg-primary/5' : ''}`}
                        >
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {notification.title.includes('accepted') && <CheckCircle className="size-4 text-green-500" />}
                            {notification.title.includes('Payment') && <DollarSign className="size-4 text-blue-500" />}
                            {notification.title.includes('message') && <MessageSquare className="size-4 text-purple-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Projects</CardTitle>
                  <Link href="/projects/new">
                    <Button size="sm">
                      <Plus className="size-4 mr-2" />
                      New Project
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Project list view with filtering and sorting coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Track your performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Detailed analytics with charts and insights coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with clients</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Chat interface coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}