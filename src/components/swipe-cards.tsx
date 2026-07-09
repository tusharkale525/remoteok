'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Bookmark, X, Heart, MessageSquare, Share2, Clock, DollarSign, Star, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  budget: { min: number; max: number };
  duration: string;
  skills: string[];
  matchScore: number;
  clientName: string;
  clientAvatar?: string;
  clientRating: number;
  postedTime: string;
  proposalCount: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

interface SwipeCardsProps {
  projects: ProjectCardData[];
  onSwipe: (projectId: string, direction: 'left' | 'right' | 'up') => void;
  onSave?: (projectId: string) => void;
  onApply?: (projectId: string) => void;
}

export function SwipeCards({ projects, onSwipe, onSave, onApply }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentProject = projects[currentIndex];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (!currentProject) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onSwipe(currentProject.id, direction);
      setCurrentIndex((prev) => prev + 1);
      setIsLoading(false);
    }, 300);
  };

  const handleDragEnd = (_event: unknown, info: { offset: { x: number; y: number } }) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      handleSwipe('right');
    } else if (info.offset.x < -threshold) {
      handleSwipe('left');
    } else if (info.offset.y < -threshold) {
      handleSwipe('up');
    }
  };

  if (!currentProject) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="py-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No more projects</h3>
          <p className="text-muted-foreground">Check back later for new opportunities</p>
        </CardContent>
      </Card>
    );
  }

  const urgencyColors = {
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    MEDIUM: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    HIGH: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    CRITICAL: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <AnimatePresence>
        <motion.div
          key={currentProject.id}
          style={{ x, rotate, opacity }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7}
          onDragEnd={handleDragEnd}
          className="cursor-grab active:cursor-grabbing"
        >
          <Card className="w-full overflow-hidden hover-lift">
            <div className="relative">
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <Badge className={cn('px-3 py-1', urgencyColors[currentProject.urgency])}>
                  {currentProject.urgency} Priority
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-green-500 text-white border-0">
                  {currentProject.matchScore}% Match
                </Badge>
              </div>
              {isLoading && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-20">
                  <Loader2 className="size-8 animate-spin" />
                </div>
              )}
            </div>
            
            <CardHeader>
              <div className="flex items-start gap-4 pt-8">
                <Avatar className="size-12">
                  <AvatarImage src={currentProject.clientAvatar} />
                  <AvatarFallback>{currentProject.clientName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-1">{currentProject.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>{currentProject.clientName}</span>
                    <span className="flex items-center gap-1">
                      <Star className="size-3 fill-yellow-500 text-yellow-500" />
                      {currentProject.clientRating.toFixed(1)}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {currentProject.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {currentProject.skills.slice(0, 5).map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
                {currentProject.skills.length > 5 && (
                  <Badge variant="outline">+{currentProject.skills.length - 5}</Badge>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600 font-semibold">
                    <DollarSign className="size-4" />
                    {currentProject.budget.min.toLocaleString()}-{currentProject.budget.max.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Budget</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-600 font-semibold">
                    <Clock className="size-4" />
                    {currentProject.duration}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Duration</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-600 font-semibold">
                    <Users className="size-4" />
                    {currentProject.proposalCount}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Proposals</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Skill Match</span>
                  <span className="font-medium">{currentProject.matchScore}%</span>
                </div>
                <Progress value={currentProject.matchScore} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center gap-4 mt-8">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
          onClick={() => handleSwipe('left')}
        >
          <X className="size-6" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 p-0 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500"
          onClick={() => onSave?.(currentProject.id)}
        >
          <Bookmark className="size-6" />
        </Button>
        <Button
          size="lg"
          variant="default"
          className="rounded-full w-14 h-14 p-0 bg-green-500 hover:bg-green-600"
          onClick={() => handleSwipe('right')}
        >
          <Heart className="size-6" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-14 h-14 p-0 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-500"
          onClick={() => onApply?.(currentProject.id)}
        >
          <MessageSquare className="size-6" />
        </Button>
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        Swipe right to save • Swipe up to apply • Swipe left to pass
      </p>
    </div>
  );
}