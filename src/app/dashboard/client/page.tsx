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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Briefcase,
  DollarSign,
  Users,
  Plus,
  Search,
  Settings,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  FileText,
  ArrowRight,
  Loader2,
} from 'lucide-react';

const activeProjects = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    freelancer: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    budget: 7500,
    spent: 4500,
    status: 'IN_PROGRESS',
    progress: 60,
    deadline: 'Dec 15, 2024',
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    freelancer: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    budget: 4000,
    spent: 4000,
    status: 'REVIEW',
    progress: 100,
    deadline: 'Nov 30, 2024',
  },
];

const proposals = [
  {
    id: '1',
    projectTitle: 'Website Redesign',
    freelancer: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.9,
      skills: ['React', 'Node.js', 'UI/UX'],
    },
    bidAmount: 3500,
    coverLetter: 'I am excited about this project...',
    submittedAt: '2 days ago',
    matchScore: 92,
  },
  {
    id: '2',
    projectTitle: 'Website Redesign',
    freelancer: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 4.7,
      skills: ['Figma', 'React', 'CSS'],
    },
    bidAmount: 4200,
    coverLetter: 'With my experience in...',
    submittedAt: '3 days ago',
    matchScore: 85,
  },
];

const stats = [
  { label: 'Active Projects', value: '3', icon: Briefcase },
  { label: 'Total Spent', value: '$24,500', icon: DollarSign },
  { label: 'Hired Freelancers', value: '8', icon: Users },
  { label: 'Success Rate', value: '96%', icon: TrendingUp },
];

export default function ClientDashboard() {
  const [isCreatingProject, setIsCreatingProject] = useState(false);
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
                <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Client Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects and freelancers</p>
          </div>
          <Dialog open={isCreatingProject} onOpenChange={setIsCreatingProject}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                Post New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Describe your project and let AI find the best freelancers for you
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="e.g. E-commerce Platform Development" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project in detail..."
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Budget</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">$</span>
                      <Input type="number" placeholder="5000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select defaultValue="4weeks">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1week">1 week</SelectItem>
                        <SelectItem value="2weeks">2 weeks</SelectItem>
                        <SelectItem value="1month">1 month</SelectItem>
                        <SelectItem value="2months">2 months</SelectItem>
                        <SelectItem value="3months">3+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <Input placeholder="Type skills and press Enter..." />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['React', 'Node.js', 'TypeScript', 'PostgreSQL'].map((skill) => (
                      <Badge key={skill} variant="secondary" className="cursor-pointer">
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreatingProject(false)}>
                    Cancel
                  </Button>
                  <Button>Create Project</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

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
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeProjects.map((project) => (
                      <div key={project.id} className="flex gap-4 p-4 rounded-lg border">
                        <Avatar className="size-12">
                          <AvatarImage src={project.freelancer.avatar} />
                          <AvatarFallback>{project.freelancer.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{project.title}</p>
                          <p className="text-sm text-muted-foreground">
                            with {project.freelancer.name}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex-1">
                              <Progress value={project.progress} className="h-2" />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Proposals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proposals.slice(0, 2).map((proposal) => (
                      <div key={proposal.id} className="flex gap-4 p-4 rounded-lg border">
                        <Avatar className="size-12">
                          <AvatarImage src={proposal.freelancer.avatar} />
                          <AvatarFallback>{proposal.freelancer.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{proposal.freelancer.name}</p>
                            <Badge variant="secondary">{proposal.matchScore}% Match</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Star className="size-3 fill-yellow-500 text-yellow-500" />
                            {proposal.freelancer.rating}
                          </div>
                          <p className="text-sm font-medium mt-2">
                            ${proposal.bidAmount.toLocaleString()}
                          </p>
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View and manage all your projects.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Received Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="flex gap-4 p-4 rounded-lg border">
                      <Avatar className="size-12">
                        <AvatarImage src={proposal.freelancer.avatar} />
                        <AvatarFallback>{proposal.freelancer.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{proposal.freelancer.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {proposal.matchScore}% Match
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {proposal.submittedAt}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${proposal.bidAmount.toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {proposal.coverLetter}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {proposal.freelancer.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm">Accept Proposal</Button>
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freelancers">
            <Card>
              <CardHeader>
                <CardTitle>Hired Freelancers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View your hired freelancers.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}