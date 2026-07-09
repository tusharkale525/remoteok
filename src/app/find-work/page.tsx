'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SwipeCards, type ProjectCardData } from '@/components/swipe-cards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  Clock,
  DollarSign,
  TrendingUp,
  Loader2,
  Briefcase,
} from 'lucide-react';

const mockProjects: ProjectCardData[] = [
  {
    id: '1',
    title: 'E-commerce Platform Development',
    description: 'We are looking for an experienced full-stack developer to build a modern e-commerce platform with React, Node.js, and PostgreSQL. The project includes user authentication, product management, shopping cart, and payment integration.',
    budget: { min: 5000, max: 8000 },
    duration: '4-6 weeks',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Stripe'],
    matchScore: 92,
    clientName: 'TechCorp Inc.',
    clientAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    clientRating: 4.8,
    postedTime: '2 hours ago',
    proposalCount: 12,
    urgency: 'HIGH',
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Seeking a talented UI/UX designer to create wireframes and high-fidelity mockups for a fitness tracking mobile app. Must have experience with Figma and a portfolio showcasing mobile app designs.',
    budget: { min: 3000, max: 5000 },
    duration: '2-3 weeks',
    skills: ['Figma', 'UI Design', 'Mobile Design', 'Prototyping', 'User Research'],
    matchScore: 88,
    clientName: 'FitLife Studios',
    clientAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
    clientRating: 4.9,
    postedTime: '5 hours ago',
    proposalCount: 8,
    urgency: 'MEDIUM',
  },
  {
    id: '3',
    title: 'Data Pipeline Development',
    description: 'Need an experienced data engineer to build a real-time data pipeline using Python, Apache Airflow, and AWS. The pipeline will process millions of events daily and feed into our data warehouse.',
    budget: { min: 8000, max: 12000 },
    duration: '6-8 weeks',
    skills: ['Python', 'AWS', 'Airflow', 'Data Engineering', 'PostgreSQL'],
    matchScore: 85,
    clientName: 'DataFlow Analytics',
    clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    clientRating: 4.7,
    postedTime: '1 day ago',
    proposalCount: 23,
    urgency: 'LOW',
  },
  {
    id: '4',
    title: 'WordPress Website Redesign',
    description: 'Looking for a WordPress developer to redesign and migrate our existing website to a modern theme. Must maintain SEO rankings and improve page load performance.',
    budget: { min: 2000, max: 3500 },
    duration: '2-4 weeks',
    skills: ['WordPress', 'PHP', 'CSS', 'SEO', 'Performance'],
    matchScore: 78,
    clientName: 'LocalBiz Solutions',
    clientRating: 4.5,
    postedTime: '3 days ago',
    proposalCount: 31,
    urgency: 'MEDIUM',
  },
  {
    id: '5',
    title: 'AI Chatbot Integration',
    description: 'We need to integrate an AI chatbot using OpenAI API into our customer support system. The chatbot should handle FAQs and escalate complex issues to human agents.',
    budget: { min: 4000, max: 6000 },
    duration: '3-4 weeks',
    skills: ['OpenAI', 'Python', 'API Integration', 'Chatbot', 'NLP'],
    matchScore: 82,
    clientName: 'SupportAI',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    clientRating: 4.6,
    postedTime: '6 hours ago',
    proposalCount: 15,
    urgency: 'HIGH',
  },
];

export default function FindWorkPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectCardData[]>(mockProjects);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [appliedProjects, setAppliedProjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSwipe = (projectId: string, direction: 'left' | 'right' | 'up') => {
    console.log(`Project ${projectId} swiped ${direction}`);
    
    if (direction === 'up' || direction === 'right') {
      setAppliedProjects(prev => [...prev, projectId]);
    }
  };

  const handleSave = (projectId: string) => {
    setSavedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleApply = (projectId: string) => {
    setAppliedProjects(prev => [...prev, projectId]);
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

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
                <Bookmark className="size-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Notifications</span>
              </Button>
              <Button onClick={() => router.push('/dashboard/freelancer')}>
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Find Work</h1>
                <p className="text-muted-foreground">Swipe through projects that match your skills</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="size-4 mr-2" />
                  Filters
                </Button>
                <Select defaultValue="match">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                    <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showFilters && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Min Budget</label>
                      <Input type="number" placeholder="$0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Budget</label>
                      <Input type="number" placeholder="$50,000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Duration</SelectItem>
                          <SelectItem value="week">Less than a week</SelectItem>
                          <SelectItem value="month">Less than a month</SelectItem>
                          <SelectItem value="3months">Up to 3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Urgency</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Urgency</SelectItem>
                          <SelectItem value="critical">Critical Only</SelectItem>
                          <SelectItem value="high">High+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Search skills..." className="flex-1" />
                    <Button>Apply Filters</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <SwipeCards
              projects={projects}
              onSwipe={handleSwipe}
              onSave={handleSave}
              onApply={handleApply}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Applied</span>
                  <Badge variant="secondary">{appliedProjects.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Saved</span>
                  <Badge variant="secondary">{savedProjects.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Viewed</span>
                  <Badge variant="secondary">24</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">92% Profile Match</p>
                    <p className="text-xs text-muted-foreground">Top 8% of freelancers</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Clock className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">4.8h Avg Response</p>
                    <p className="text-xs text-muted-foreground">Response time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <DollarSign className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">$75/hr Rate</p>
                    <p className="text-xs text-muted-foreground">Above market avg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Skills in Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Python', 'AWS', 'AI/ML', 'UI/UX'].map((skill) => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}