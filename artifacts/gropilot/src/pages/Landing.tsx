import { Suspense } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Search, Wrench, BarChart2, CheckCircle2, Target, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Accordion } from "@/components/ui/accordion"
import { Hero3D } from "@/components/ui/Hero3D"
import { useSubmitContact } from "@workspace/api-client-react"
import { useToast } from "@/hooks/use-toast"

// Validation Schema based on OpenAPI specs
const contactSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  businessType: z.string().min(1, "Business type is required"),
  challenge: z.string().max(500, "Maximum 500 characters").min(1, "Please describe your challenge")
})

type ContactFormData = z.infer<typeof contactSchema>

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

export function Landing() {
  const { toast } = useToast()
  
  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  // Setup Mutation Hook
  const { mutate: submitForm, isPending } = useSubmitContact({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Strategy Call Requested!",
          description: "We'll be in touch shortly to confirm your booking.",
        })
        reset()
      },
      onError: (error: any) => {
        console.error("Form submission failed", error)
        toast({
          title: "Submission Failed",
          description: error?.message || "Please try again later.",
          variant: "destructive"
        })
      }
    }
  })

  const onSubmit = (data: ContactFormData) => {
    submitForm({ data })
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      <main>
        {/* SECTION 1: HERO */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-[90vh] overflow-hidden">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
              alt="GroPilot Agency Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>
          </div>

          {/* Animated background glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>

          {/* 3D Element */}
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="lg:max-w-[55%]">
              <motion.div 
                initial="hidden" animate="visible" variants={staggerContainer}
                className="flex flex-col items-start text-left lg:text-left"
              >
                <motion.div variants={fadeInUp} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                  Systems-Driven Growth Agency
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.05] mb-8">
                  We Build <span className="text-primary">Client-Generating</span> Systems for Business Owners
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl leading-relaxed">
                  Turn your online presence into a predictable source of leads — without cold outreach or guesswork.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg-pill" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-lg group shadow-lg shadow-primary/30">
                    Book a Free Strategy Call 
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg-pill" variant="outline" onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })} className="text-lg border-white/20 text-white/80 hover:bg-white/5">
                    See How It Works
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW IT WORKS */}
        <section id="process" className="py-24 md:py-32 bg-background relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.h2 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                className="text-4xl md:text-5xl font-display font-bold mb-6"
              >
                How It <span className="text-primary">Works</span>
              </motion.h2>
              <motion.p 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
                className="text-xl text-muted-foreground"
              >
                A simple, proven process to turn your online presence into a predictable source of leads
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-muted rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-8">
                  <Search className="w-7 h-7 text-brand-teal" />
                </div>
                <div className="text-brand-teal font-display font-bold text-5xl opacity-20 mb-4 absolute top-8 right-8 pointer-events-none">01</div>
                <h3 className="text-2xl font-bold text-white mb-4">Diagnose</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We analyze your current online presence and identify exactly what's preventing you from getting consistent leads.
                </p>
              </motion.div>

              {/* Card 2 - Featured */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="bg-card rounded-3xl p-8 border border-brand-blue/30 shadow-2xl shadow-brand-blue/5 relative -translate-y-2 md:-translate-y-4"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent rounded-3xl pointer-events-none"></div>
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 flex items-center justify-center mb-8 relative z-10">
                  <Wrench className="w-7 h-7 text-brand-blue" />
                </div>
                <div className="text-brand-blue font-display font-bold text-5xl opacity-20 mb-4 absolute top-8 right-8 pointer-events-none">02</div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Build</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  We install the exact system you need — traffic, authority, or conversion — tailored to your business and audience.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="bg-muted rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-8">
                  <BarChart2 className="w-7 h-7 text-brand-purple" />
                </div>
                <div className="text-brand-purple font-display font-bold text-5xl opacity-20 mb-4 absolute top-8 right-8 pointer-events-none">03</div>
                <h3 className="text-2xl font-bold text-white mb-4">Optimize</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We track performance, refine what works, and continuously improve your results over time.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR SOLUTIONS */}
        <section id="solutions" className="py-24 md:py-32 bg-muted/30 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Our <span className="text-primary">Solutions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Bundled systems designed to solve specific growth challenges — not random services
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Solution 1 */}
              <div className="bg-card rounded-3xl p-8 border border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Traffic & Visibility</h3>
                </div>
                <p className="text-muted-foreground mb-8 min-h-[80px]">
                  Get in front of the right people through paid ads, search visibility, and strategic content distribution.
                </p>
                <ul className="space-y-4">
                  {[
                    "Paid advertising strategy",
                    "Search engine optimization",
                    "Content distribution systems",
                    "Audience targeting & retargeting"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution 2 - Featured */}
              <div className="glass-card rounded-3xl p-8 border border-brand-blue/30 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Featured System
                </div>
                <div className="flex items-center gap-4 mb-6 pt-2">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center shrink-0 shadow-lg shadow-brand-blue/30">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Authority & Trust</h3>
                </div>
                <p className="text-muted-foreground mb-8 min-h-[80px]">
                  Position yourself as the obvious choice through brand positioning, content systems, and social proof.
                </p>
                <ul className="space-y-4">
                  {[
                    "Brand positioning & messaging",
                    "Authority content systems",
                    "Social proof amplification",
                    "Thought leadership strategy"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution 3 */}
              <div className="bg-card rounded-3xl p-8 border border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                    <BarChart2 className="w-6 h-6 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Conversion Systems</h3>
                </div>
                <p className="text-muted-foreground mb-8 min-h-[80px]">
                  Turn visitors into leads and leads into clients with optimized funnels, websites, and tracking.
                </p>
                <ul className="space-y-4">
                  {[
                    "High-converting landing pages",
                    "Lead capture & nurture funnels",
                    "Performance tracking & analytics",
                    "Conversion rate optimization"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY GROPILOT */}
        <section className="py-24 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Why <span className="text-primary">GroPilot</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                We're not just another agency. We're your growth partner.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-8 rounded-3xl border border-white/5 flex gap-6 group hover:border-brand-teal/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-brand-teal shadow-[0_0_15px_rgba(0,212,170,0.6)]"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-teal transition-colors">Strategy First Approach</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We don't sell you tactics. We start with understanding your business, your audience, and your goals.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-card p-8 rounded-3xl border border-white/5 flex gap-6 group hover:border-brand-blue/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-brand-blue shadow-[0_0_15px_rgba(77,142,240,0.6)]"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-blue transition-colors">System-Based Growth</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We build repeatable systems that generate leads consistently — not one-off campaigns that fade away.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-card p-8 rounded-3xl border border-white/5 flex gap-6 group hover:border-brand-purple/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-brand-purple shadow-[0_0_15px_rgba(124,92,191,0.6)]"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">Results Over Vanity Metrics</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We focus on what matters most: pipeline, conversions, and revenue. Not likes, followers, or impressions.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-card p-8 rounded-3xl border border-white/5 flex gap-6 group hover:border-brand-pink/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 rounded-full bg-brand-pink shadow-[0_0_15px_rgba(232,93,138,0.6)]"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-pink transition-colors">One Clear Plan</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No scattered shots or random tactics. Just one cohesive plan designed to move your business forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: ABOUT GROPILOT */}
        <section id="about" className="py-24 md:py-32 bg-muted/20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image side */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="relative rounded-[2rem] overflow-hidden aspect-4/3 border border-white/10 shadow-2xl"
              >
                <img 
                  src={`${import.meta.env.BASE_URL}images/about-img.png`} 
                  alt="About GroPilot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent"></div>
              </motion.div>

              {/* Text side */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-sm uppercase mb-6">
                  <div className="w-8 h-px bg-primary"></div>
                  About GroPilot
                </div>
                
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
                  We Help Business Owners Stop Guessing and Start Growing
                </h2>
                
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    GroPilot exists to solve one problem: business owners who work hard but struggle to turn their online presence into consistent, paying clients.
                  </p>
                  <p>
                    We're not here to sell you random services or make empty promises. We build complete client-generating systems based on proven strategies that actually work.
                  </p>
                  <p>
                    Our approach is simple: diagnose what's missing, build the right system, and optimize for results. No fluff, no guesswork — just clarity, strategy, and execution.
                  </p>
                  <p>
                    Whether you're a coach, consultant, or local business owner, we help you create a predictable path from visibility to revenue.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-white/10">
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">3.2x</div>
                    <div className="text-sm font-bold tracking-widest uppercase text-primary">Avg Lead Growth</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">94%</div>
                    <div className="text-sm font-bold tracking-widest uppercase text-brand-blue">Client Satisfaction</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ */}
        <section id="faq" className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-wide mb-6">
                Got Questions?
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know before booking your free strategy call
              </p>
            </div>

            <Accordion 
              items={[
                {
                  id: "faq-1",
                  title: "What exactly is a \"client-generating system\"?",
                  content: "A client-generating system is a complete, done-for-you infrastructure that consistently attracts, nurtures, and converts strangers into paying clients. It combines traffic, authority, and conversion elements into one cohesive machine — so you stop relying on referrals or cold outreach and start getting predictable leads on autopilot."
                },
                {
                  id: "faq-2",
                  title: "How quickly will I see results?",
                  content: "Most clients begin seeing measurable lead growth within 30–60 days of launch. Full system optimization typically takes 90 days. Unlike one-off campaigns, our systems compound over time — meaning results improve month after month, not plateau."
                },
                {
                  id: "faq-3",
                  title: "I've tried agencies before and been burned. Why is GroPilot different?",
                  content: "Most agencies sell you isolated services — a few ads here, some social posts there — with no cohesive strategy. GroPilot builds complete, bundled systems designed around one goal: getting you clients. We're strategy-first, results-obsessed, and we measure success by leads and revenue — not vanity metrics."
                },
                {
                  id: "faq-4",
                  title: "Will I have to do a lot of work myself?",
                  content: "Our systems are done for you. We handle strategy, build, and optimization. Your involvement is minimal — typically a short onboarding session and periodic check-ins. We do the heavy lifting so you can focus on serving your clients."
                },
                {
                  id: "faq-5",
                  title: "What types of businesses do you work with?",
                  content: "We specialize in coaches, consultants, service providers, and local business owners who have a proven offer but struggle to get consistent, qualified leads online. If you're great at what you do but your online presence isn't reflecting that — we're built for you."
                },
                {
                  id: "faq-6",
                  title: "What does the free strategy call include?",
                  content: "The free 30-minute strategy call is a genuine diagnostic session — not a sales pitch. We'll audit your current online presence, identify the biggest gaps in your client acquisition system, and map out a clear roadmap. You'll leave with actionable insights whether you work with us or not."
                },
                {
                  id: "faq-7",
                  title: "How do you measure success?",
                  content: "We track what actually matters: qualified leads generated, conversion rates, cost per acquisition, and revenue impact. We provide transparent reporting so you always know exactly what's working. Our clients average 3.2x lead growth — and we hold ourselves accountable to real numbers."
                }
              ]} 
              className="mb-16"
            />

            <div className="text-center bg-card p-10 rounded-3xl border border-primary/20 bg-gradient-to-b from-card to-primary/5">
              <h3 className="text-2xl font-bold text-white mb-6">Still have questions?</h3>
              <p className="text-muted-foreground mb-8">We're happy to answer them on a free, no-obligation strategy call.</p>
              <Button size="lg-pill" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Book Your Free Strategy Call
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTACT FORM */}
        <section id="contact" className="py-24 md:py-32 bg-muted/30 border-t border-white/5 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-sm uppercase mb-6">
                Let's Talk Growth
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Free Growth Strategy Call
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get clarity on what's missing in your client acquisition system. No pressure, just a clear path forward.
              </p>
            </div>

            {/* 3 Steps Mini-flow */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-16">
              <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-white/5">
                <Search className="w-5 h-5 text-brand-teal" />
                <span className="font-semibold">Identify what's broken</span>
              </div>
              <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
              <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-white/5">
                <Target className="w-5 h-5 text-brand-blue" />
                <span className="font-semibold">Get a clear roadmap</span>
              </div>
              <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
              <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full border border-white/5">
                <ShieldCheck className="w-5 h-5 text-brand-purple" />
                <span className="font-semibold">Decide next steps</span>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Full Name *</label>
                    <input 
                      {...register("fullName")}
                      placeholder="John Smith"
                      className="w-full bg-background border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Email Address *</label>
                    <input 
                      {...register("email")}
                      placeholder="john@example.com"
                      className="w-full bg-background border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Phone Number *</label>
                    <input 
                      {...register("phone")}
                      placeholder="+1 (555) 123-4567"
                      className="w-full bg-background border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
                  </div>

                  {/* Business Type */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Business Type *</label>
                    <input 
                      {...register("businessType")}
                      placeholder="e.g., Coaching, Consulting, Local Service"
                      className="w-full bg-background border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    {errors.businessType && <p className="text-red-400 text-sm">{errors.businessType.message}</p>}
                  </div>
                </div>

                {/* Challenge */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">What's your biggest challenge right now? *</label>
                  <textarea 
                    {...register("challenge")}
                    placeholder="Tell us about your current situation..."
                    rows={4}
                    className="w-full bg-background border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  />
                  {errors.challenge && <p className="text-red-400 text-sm">{errors.challenge.message}</p>}
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-16 text-lg rounded-2xl"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Book Your Free Strategy Call"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
                    <LockIcon className="w-4 h-4" /> We respect your privacy. Your information will never be shared.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* SECTION 8: FINAL CTA BANNER */}
        <section className="relative py-32 overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 z-0">
            <img 
              src={`${import.meta.env.BASE_URL}images/final-cta-bg.png`} 
              alt="Workspace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight mb-6">
              Ready to Build Your Client System?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
              Book a free strategy call. Get clarity on what's missing. No pressure. Just a clear path forward.
            </p>
            <Button size="lg-pill" variant="gradientCTA" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="text-lg">
              Schedule Your Call <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
