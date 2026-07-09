'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  Upload,
  User,
  Briefcase,
  DollarSign,
  Clock,
  Linkedin,
  Github,
  Figma,
  Loader2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Resume', icon: FileText },
  { id: 3, title: 'Experience', icon: Briefcase },
  { id: 4, title: 'Skills', icon: Sparkles },
  { id: 5, title: 'Portfolio', icon: FileText },
  { id: 6, title: 'Rates', icon: DollarSign },
  { id: 7, title: 'Links', icon: Linkedin },
];

const skillLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
const availabilityOptions = ['full-time', 'part-time', 'contract', 'freelance'];
const languages = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Chinese', 'Japanese', 'Arabic', 'Hindi'];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState<{ name: string; parsed: boolean } | null>(null);
  const [parsedResumeData, setParsedResumeData] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState({
    headline: '',
    summary: '',
    hourlyRate: 50,
    availability: 'full-time',
    yearsOfExperience: 0,
    timezone: 'UTC',
    country: '',
    city: '',
    skills: [] as { id: string; name: string; level: string; yearsExp?: number }[],
    languages: ['English'],
    linkedInUrl: '',
    githubUrl: '',
    figmaUrl: '',
    notionUrl: '',
    portfolioItems: [] as { title: string; url: string; description: string }[],
  });

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillAdd = (skill: { id: string; name: string; level: string }) => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...skill, yearsExp: 0 }],
    }));
  };

  const handleSkillRemove = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== skillId),
    }));
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsLoading(true);
      setUploadedResume({ name: file.name, parsed: false });

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload/resume', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setParsedResumeData(data.parsed);
          setUploadedResume({ name: file.name, parsed: true });
          
          if (data.parsed) {
            setFormData(prev => ({
              ...prev,
              skills: data.parsed.skills?.map((s: string, i: number) => ({
                id: `skill-${i}`,
                name: s,
                level: 'INTERMEDIATE',
              })) || prev.skills,
              languages: data.parsed.languages || prev.languages,
            }));
          }
        }
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/find-work');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.headline.length >= 10 && formData.summary.length >= 50;
      case 2:
        return uploadedResume !== null;
      case 3:
        return formData.yearsOfExperience >= 0;
      case 4:
        return formData.skills.length > 0;
      case 5:
        return true;
      case 6:
        return formData.hourlyRate >= 5;
      case 7:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="size-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">Complete Your Profile</span>
          </div>
          <p className="text-muted-foreground">Let&apos;s set up your freelancer profile</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                    currentStep >= step.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-muted'
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="size-5" />
                  ) : (
                    <step.icon className="size-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-12 h-0.5 mx-2',
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              {currentStep === 1 && (
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </CardHeader>
              )}
              {currentStep === 1 && (
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="headline">Professional Headline</Label>
                    <Input
                      id="headline"
                      placeholder="e.g. Full-Stack Developer | React & Node.js Expert"
                      value={formData.headline}
                      onChange={(e) => handleInputChange('headline', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.headline.length}/100 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="summary">Bio Summary</Label>
                    <Textarea
                      id="summary"
                      placeholder="Tell clients about yourself, your expertise, and what makes you unique..."
                      rows={5}
                      value={formData.summary}
                      onChange={(e) => handleInputChange('summary', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.summary.length}/1000 characters (minimum 50)
                    </p>
                  </div>
                </CardContent>
              )}

              {currentStep === 2 && (
                <CardHeader>
                  <CardTitle>Upload Your Resume</CardTitle>
                  <CardDescription>Upload a PDF and let AI extract your information</CardDescription>
                </CardHeader>
              )}
              {currentStep === 2 && (
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={cn(
                      'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                      isDragActive ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary'
                    )}
                  >
                    <input {...getInputProps()} />
                    {isLoading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="size-12 animate-spin text-primary mb-4" />
                        <p className="text-lg font-medium">Uploading and parsing resume...</p>
                      </div>
                    ) : uploadedResume ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="size-12 text-green-500 mb-4" />
                        <p className="text-lg font-medium">{uploadedResume.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {uploadedResume.parsed ? 'Successfully parsed!' : 'Uploaded'}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="size-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium">Drag and drop your resume here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                        <p className="text-xs text-muted-foreground mt-2">PDF files only, max 10MB</p>
                      </div>
                    )}
                  </div>
                  {parsedResumeData && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Extracted Information</h4>
                      <div className="space-y-2">
                        {parsedResumeData && Array.isArray(parsedResumeData.skills) && (
                          <div>
                            <span className="text-sm font-medium">Skills:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(parsedResumeData.skills as string[]).map((skill, i) => (
                                <Badge key={i} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {parsedResumeData && Array.isArray(parsedResumeData.languages) && (
                          <div>
                            <span className="text-sm font-medium">Languages:</span>
                            <p className="text-sm text-muted-foreground">{(parsedResumeData.languages as string[]).join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}

              {currentStep === 3 && (
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                  <CardDescription>Tell us about your work experience</CardDescription>
                </CardHeader>
              )}
              {currentStep === 3 && (
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="years">Years of Experience</Label>
                    <Input
                      id="years"
                      type="number"
                      min="0"
                      max="50"
                      value={formData.yearsOfExperience}
                      onChange={(e) => handleInputChange('yearsOfExperience', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(v) => handleInputChange('timezone', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="CET">Central European</SelectItem>
                        <SelectItem value="IST">India Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              )}

              {currentStep === 4 && (
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>Add your top skills</CardDescription>
                </CardHeader>
              )}
              {currentStep === 4 && (
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="gap-2">
                        {skill.name}
                        <button onClick={() => handleSkillRemove(skill.id)} className="ml-1 hover:text-destructive">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill (e.g., React, Python, Design)"
                      id="skill-input"
                    />
                    <Select defaultValue="INTERMEDIATE">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {skillLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => {
                        const input = document.getElementById('skill-input') as HTMLInputElement;
                        if (input?.value) {
                          handleSkillAdd({
                            id: `skill-${Date.now()}`,
                            name: input.value,
                            level: 'INTERMEDIATE',
                          });
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'AWS', 'Figma', 'UI/UX'].map((skill) => (
                      <Button
                        key={skill}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSkillAdd({ id: `skill-${skill}`, name: skill, level: 'INTERMEDIATE' })}
                      >
                        + {skill}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              )}

              {currentStep === 5 && (
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Showcase your best work</CardDescription>
                </CardHeader>
              )}
              {currentStep === 5 && (
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    You can add portfolio items later from your profile settings.
                  </p>
                  <div className="flex gap-2">
                    <Input placeholder="Portfolio URL" />
                    <Button variant="outline">Add</Button>
                  </div>
                </CardContent>
              )}

              {currentStep === 6 && (
                <CardHeader>
                  <CardTitle>Rates & Availability</CardTitle>
                  <CardDescription>Set your pricing</CardDescription>
                </CardHeader>
              )}
              {currentStep === 6 && (
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${formData.hourlyRate}</span>
                      <span className="text-muted-foreground">/hour</span>
                    </div>
                    <Input
                      id="hourlyRate"
                      type="range"
                      min="5"
                      max="500"
                      step="5"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$5</span>
                      <span>$500</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Select value={formData.availability} onValueChange={(v) => handleInputChange('availability', v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availabilityOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt.replace('-', ' ')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Languages</Label>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang) => (
                        <Badge
                          key={lang}
                          variant={formData.languages.includes(lang) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => {
                            if (formData.languages.includes(lang)) {
                              handleInputChange('languages', formData.languages.filter((l: string) => l !== lang));
                            } else {
                              handleInputChange('languages', [...formData.languages, lang]);
                            }
                          }}
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}

              {currentStep === 7 && (
                <CardHeader>
                  <CardTitle>Connect Your Links</CardTitle>
                  <CardDescription>Add your professional profiles</CardDescription>
                </CardHeader>
              )}
              {currentStep === 7 && (
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="size-4" /> LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="linkedin.com/in/yourprofile"
                      value={formData.linkedInUrl}
                      onChange={(e) => handleInputChange('linkedInUrl', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="size-4" /> GitHub
                    </Label>
                    <Input
                      id="github"
                      placeholder="github.com/yourusername"
                      value={formData.githubUrl}
                      onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="figma" className="flex items-center gap-2">
                      <Figma className="size-4" /> Figma
                    </Label>
                    <Input
                      id="figma"
                      placeholder="figma.com/@yourusername"
                      value={formData.figmaUrl}
                      onChange={(e) => handleInputChange('figmaUrl', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notion" className="flex items-center gap-2">
                      <FileText className="size-4" /> Notion
                    </Label>
                    <Input
                      id="notion"
                      placeholder="notion.so/yourworkspace"
                      value={formData.notionUrl}
                      onChange={(e) => handleInputChange('notionUrl', e.target.value)}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  Complete Profile
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}