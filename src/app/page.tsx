import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  ArrowRight, 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  DollarSign, 
  Clock,
  CheckCircle,
  Star,
  ChevronRight,
  Sparkles,
  Briefcase,
  TrendingUp,
  MessageSquare,
  FileText,
  GitBranch
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Our intelligent algorithm analyzes skills, experience, and preferences to find perfect job matches instantly.',
  },
  {
    icon: Zap,
    title: 'Swipe to Connect',
    description: 'Discover projects in a modern, Tinder-style card interface. Swipe right to apply, left to pass.',
  },
  {
    icon: FileText,
    title: 'AI Resume Parser',
    description: 'Upload your resume and let AI extract your skills, experience, and achievements automatically.',
  },
  {
    icon: DollarSign,
    title: 'Smart Pricing',
    description: 'Get AI-generated bid suggestions based on market data, competition, and your profile.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Escrow protection, milestone-based payments, and dispute resolution for peace of mind.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Track your earnings, skill growth, and performance with beautiful visualizations.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Full-Stack Developer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Remoteok changed how I find work. The AI matching is incredible - I found my last 3 clients through the swipe feature!',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'The AI proposal generator saved me hours. It helps me create professional proposals that win projects.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Content Writer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Best platform for freelancers. The analytics help me understand my growth and set better rates.',
    rating: 5,
  },
];

const stats = [
  { value: '50K+', label: 'Active Freelancers' },
  { value: '$25M+', label: 'Paid to Freelancers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '150+', label: 'Countries' },
];

const howItWorks = [
  {
    step: 1,
    title: 'Create Your Profile',
    description: 'Sign up and let AI parse your resume, or build your profile from scratch with our guided wizard.',
  },
  {
    step: 2,
    title: 'Get Matched',
    description: 'Our AI analyzes your skills and preferences to find projects you will love.',
  },
  {
    step: 3,
    title: 'Swipe & Apply',
    description: 'Browse projects in our card interface. Swipe right to apply, save for later, or pass.',
  },
  {
    step: 4,
    title: 'Get Hired & Earn',
    description: 'Connect with clients, sign contracts, and start earning with secure payments.',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '5 proposal credits/month',
      'Basic AI suggestions',
      'Profile hosting',
      'Community support',
      'Standard matching',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    description: 'For serious freelancers',
    features: [
      'Unlimited proposals',
      'Advanced AI features',
      'Priority matching',
      'Analytics dashboard',
      'Resume optimization',
      'Smart bid suggestions',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'For agencies and teams',
    features: [
      'Everything in Pro',
      'Team management',
      'API access',
      'Custom branding',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'How does the AI matching work?',
    answer: 'Our AI analyzes your profile skills, experience, preferences, and work history to match you with projects that align with your expertise. The matching algorithm considers over 50 data points to ensure quality matches.',
  },
  {
    question: 'Is there a cost to join?',
    answer: 'Remoteok offers a free tier that includes 5 proposal credits per month. Our Pro plan at $29/month provides unlimited proposals and access to all AI features.',
  },
  {
    question: 'How do payments work?',
    answer: 'We use Stripe Connect for secure payments. Clients fund escrow before work begins, and freelancers receive payments upon milestone approval. This protects both parties.',
  },
  {
    question: 'What AI features are available?',
    answer: 'We offer AI-powered resume parsing, proposal generation, bid pricing suggestions, contract creation, profile optimization, and analytics insights to help you succeed.',
  },
  {
    question: 'Can I work with clients internationally?',
    answer: 'Yes! Remoteok connects freelancers with clients from over 150 countries. Our platform supports multiple currencies and provides localized support.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Remoteok</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/find-work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Find Work
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-1">
              <Sparkles className="size-3 mr-1" />
              AI-Powered Freelance Marketplace
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Find work that fits you,
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                not jobs you must search for
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Swipe through curated projects. Let AI build your proposals. 
              Get matched with clients who need exactly what you offer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Start Finding Work <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-20">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-xl border bg-card p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-muted-foreground">AI Match Feed</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Project Card 1 */}
                <Card className="relative overflow-hidden">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2" variant="default">92% Match</Badge>
                    <CardTitle className="text-lg">E-commerce Platform</CardTitle>
                    <CardDescription>$5,000 - $8,000</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="secondary" className="text-xs">React</Badge>
                      <Badge variant="secondary" className="text-xs">Node.js</Badge>
                      <Badge variant="secondary" className="text-xs">PostgreSQL</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="size-4" />
                      <span>Enterprise Client</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Card 2 */}
                <Card className="relative overflow-hidden border-primary/50">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2" variant="default">88% Match</Badge>
                    <CardTitle className="text-lg">Mobile App UI/UX</CardTitle>
                    <CardDescription>$3,000 - $5,000</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="secondary" className="text-xs">Figma</Badge>
                      <Badge variant="secondary" className="text-xs">UI Design</Badge>
                      <Badge variant="secondary" className="text-xs">Prototyping</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="size-4 text-yellow-500" />
                      <span>4.9 Rating</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Card 3 */}
                <Card className="relative overflow-hidden">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2" variant="default">85% Match</Badge>
                    <CardTitle className="text-lg">Data Pipeline</CardTitle>
                    <CardDescription>$4,000 - $6,000</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="secondary" className="text-xs">Python</Badge>
                      <Badge variant="secondary" className="text-xs">AWS</Badge>
                      <Badge variant="secondary" className="text-xs">Airflow</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      <span>2-4 weeks</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools and features designed to help you find better work, faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and start finding meaningful work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-muted/20 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by freelancers worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who found their dream work on Remoteok
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="hover-lift">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    &ldquo;{testimonial.content}&rdquo;
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for you. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={plan.popular ? 'border-primary shadow-lg' : ''}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-4">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about Remoteok
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg cursor-pointer flex items-center justify-between">
                    {faq.question}
                    <ChevronRight className="size-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to find better work?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers who found their dream projects on Remoteok.
            It takes less than 5 minutes to get started.
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Create Free Account <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Briefcase className="size-4 text-primary-foreground" />
                </div>
                <span className="font-bold">Remoteok</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Find work that fits you, not jobs you must search for.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/how-it-works">How it Works</Link></li>
                <li><Link href="/ai-tools">AI Tools</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/press">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
                <li><Link href="/cookies">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Remoteok. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com/remoteok" className="text-muted-foreground hover:text-foreground">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Link>
              <Link href="https://github.com/remoteok" className="text-muted-foreground hover:text-foreground">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </Link>
              <Link href="https://linkedin.com/company/remoteok" className="text-muted-foreground hover:text-foreground">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}